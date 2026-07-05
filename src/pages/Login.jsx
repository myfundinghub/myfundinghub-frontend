import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../utils/api'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      toast.error('Please fill all fields!')
      return
    }

    setLoading(true)
    try {
      const { data } = await authAPI.login({
        email: formData.email,
        password: formData.password,
      })

      // Save token + user
      login(data.user, data.token)

      toast.success('Login successful! 🎉')

      // Redirect based on role
      if (data.user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0A0E17',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
        zIndex: 0,
      }} />

      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          fontSize: '40px',
          opacity: 0.2,
        }}
      >
        📈
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          fontSize: '40px',
          opacity: 0.2,
        }}
      >
        💰
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '100%',
          maxWidth: '440px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(0,212,255,0.2)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 0 60px rgba(0,212,255,0.08)',
        }}>

          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00D4FF, #1E3A5F)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 auto 15px',
                boxShadow: '0 0 20px rgba(0,212,255,0.4)',
              }}>
                M
              </div>
            </Link>
            <h1 style={{
              color: 'white',
              fontSize: '26px',
              fontWeight: '800',
              fontFamily: 'Poppins, sans-serif',
              marginBottom: '5px',
            }}>
              Welcome Back! 👋
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '14px',
            }}>
              Login to your MyFundingHub account
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '13px',
                fontWeight: '600',
                display: 'block',
                marginBottom: '8px',
                textTransform: 'uppercase',
              }}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '13px',
                fontWeight: '600',
                display: 'block',
                marginBottom: '8px',
                textTransform: 'uppercase',
              }}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{
              textAlign: 'right',
              marginBottom: '25px',
            }}>
              <Link to="/forgot-password" style={{
                color: '#00D4FF',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: '600',
              }}>
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                background: loading
                  ? 'rgba(0,212,255,0.3)'
                  : 'linear-gradient(135deg, #00D4FF, #1E3A5F)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 0 20px rgba(0,212,255,0.3)',
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '20px',
              }}
            >
              {loading ? '⏳ Logging in...' : '🚀 Login to Dashboard'}
            </button>
          </form>

          <div style={{
            textAlign: 'center',
            marginTop: '25px',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '14px',
          }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{
              color: '#00D4FF',
              textDecoration: 'none',
              fontWeight: '600',
            }}>
              Sign up free
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  )
}

export default Login