import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { authAPI } from '../utils/api'

const Signup = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
  })
  const [otp, setOtp] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

   // STEP 1 - Signup (Direct Account Creation - No OTP)
  const handleSignup = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters!')
      return
    }

    setLoading(true)
    try {
      const { data } = await authAPI.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        referralCode: formData.referralCode,
      })

      // Save token + user directly
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      toast.success('Account created successfully! 🎉')
      
      // Redirect to dashboard
      window.location.href = '/dashboard'
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed!')
    } finally {
      setLoading(false)
    }
  }
      // Save token
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      toast.success('Account created successfully! 🎉')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP!')
    } finally {
      setLoading(false)
    }
  }

  // Resend OTP
  const handleResendOTP = async () => {
    try {
      await authAPI.resendOTP({ email: formData.email })
      toast.success('OTP resent to your email!')
    } catch (error) {
      toast.error('Could not resend OTP!')
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '100%',
          maxWidth: '480px',
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
              fontSize: '24px',
              fontWeight: '800',
              fontFamily: 'Poppins, sans-serif',
              marginBottom: '5px',
            }}>
              {step === 1 ? 'Create Account' : 'Verify Email'}
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '14px',
            }}>
              {step === 1
                ? 'Join MyFundingHub and start trading'
                : `OTP sent to ${formData.email}`}
            </p>
          </div>

          {/* Step Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '30px',
          }}>
            {[1, 2].map((s) => (
              <div key={s} style={{
                width: s === step ? '30px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: s <= step ? '#00D4FF' : 'rgba(255,255,255,0.15)',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleSignup}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '13px',
                  fontWeight: '600',
                  display: 'block',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
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

              <div style={{ marginBottom: '16px' }}>
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
                  placeholder="Min 6 characters"
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

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '13px',
                  fontWeight: '600',
                  display: 'block',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                }}>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
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

              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '13px',
                  fontWeight: '600',
                  display: 'block',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                }}>Referral Code (Optional)</label>
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                  placeholder="Enter referral code"
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
                }}
              >
                {loading ? '⏳ Sending OTP...' : '📧 Send OTP & Continue'}
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP}>
              <div style={{
                background: 'rgba(0,212,255,0.08)',
                border: '1px solid rgba(0,212,255,0.2)',
                borderRadius: '12px',
                padding: '15px',
                marginBottom: '25px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '35px', marginBottom: '8px' }}>📧</div>
                <p style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '14px',
                  lineHeight: '1.6',
                }}>
                  We sent a 6-digit OTP to<br />
                  <strong style={{ color: '#00D4FF' }}>{formData.email}</strong>
                </p>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '13px',
                  fontWeight: '600',
                  display: 'block',
                  marginBottom: '8px',
                  textAlign: 'center',
                }}>Enter 6-Digit OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="_ _ _ _ _ _"
                  maxLength={6}
                  style={{
                    width: '100%',
                    padding: '18px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '2px solid rgba(0,212,255,0.3)',
                    borderRadius: '12px',
                    color: '#00D4FF',
                    fontSize: '28px',
                    fontWeight: '800',
                    outline: 'none',
                    textAlign: 'center',
                    letterSpacing: '10px',
                    boxSizing: 'border-box',
                  }}
                />
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
                  marginBottom: '15px',
                }}
              >
                {loading ? '⏳ Verifying...' : '✅ Verify & Create Account'}
              </button>

              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#00D4FF',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Resend OTP
                </button>
              </div>

              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  ← Back to Signup
                </button>
              </div>
            </form>
          )}

          {step === 1 && (
            <div style={{
              textAlign: 'center',
              marginTop: '25px',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '14px',
            }}>
              Already have an account?{' '}
              <Link to="/login" style={{
                color: '#00D4FF',
                textDecoration: 'none',
                fontWeight: '600',
              }}>
                Login here
              </Link>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  )
}

export default Signup