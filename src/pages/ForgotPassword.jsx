import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { authAPI } from '../utils/api'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  })

  // STEP 1 - Send OTP (Real API)
  const handleSendOTP = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email!')
      return
    }

    setLoading(true)
    try {
      const { data } = await authAPI.forgotPassword({ email })
      toast.success(data.message || 'OTP sent to your email!')
      setStep(2)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Email not found!')
    } finally {
      setLoading(false)
    }
  }

  // STEP 2 - Verify OTP (Real API)
  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    if (otp.length !== 6) {
      toast.error('Please enter 6 digit OTP!')
      return
    }

    setLoading(true)
    try {
      const { data } = await authAPI.verifyResetOTP({ email, otp })
      toast.success(data.message || 'OTP verified!')
      setStep(3)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP!')
    } finally {
      setLoading(false)
    }
  }

  // STEP 3 - Reset Password (Real API)
  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }
    if (passwords.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters!')
      return
    }

    setLoading(true)
    try {
      const { data } = await authAPI.resetPassword({
        email,
        otp,
        newPassword: passwords.newPassword,
      })
      toast.success(data.message || 'Password reset successful! 🎉')
      navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  const stepTitles = {
    1: { title: 'Forgot Password?', subtitle: 'Enter your email to receive OTP' },
    2: { title: 'Verify OTP', subtitle: `OTP sent to ${email}` },
    3: { title: 'New Password', subtitle: 'Set your new password' },
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
        background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
        zIndex: 0,
      }} />

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
          border: '1px solid rgba(168,85,247,0.2)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 0 60px rgba(168,85,247,0.08)',
        }}>

          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #A855F7, #1E3A5F)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 auto 15px',
                boxShadow: '0 0 20px rgba(168,85,247,0.4)',
              }}>
                🔑
              </div>
            </Link>
            <h1 style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: '800',
              fontFamily: 'Poppins, sans-serif',
              marginBottom: '5px',
            }}>
              {stepTitles[step].title}
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '14px',
            }}>
              {stepTitles[step].subtitle}
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '30px',
          }}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: s <= step
                    ? 'linear-gradient(135deg, #A855F7, #1E3A5F)'
                    : 'rgba(255,255,255,0.08)',
                  border: s === step ? '2px solid #A855F7' : '2px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: s <= step ? 'white' : 'rgba(255,255,255,0.3)',
                  fontSize: '13px',
                  fontWeight: '700',
                }}>
                  {s < step ? '✓' : s}
                </div>
                {s < 3 && (
                  <div style={{
                    width: '30px',
                    height: '2px',
                    background: s < step ? '#A855F7' : 'rgba(255,255,255,0.1)',
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleSendOTP}>
              <div style={{ marginBottom: '25px' }}>
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
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
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

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: loading ? 'rgba(168,85,247,0.3)' : 'linear-gradient(135deg, #A855F7, #1E3A5F)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 0 20px rgba(168,85,247,0.3)',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {loading ? '⏳ Sending...' : '📧 Send OTP'}
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP}>
              <div style={{
                background: 'rgba(168,85,247,0.08)',
                border: '1px solid rgba(168,85,247,0.2)',
                borderRadius: '12px',
                padding: '15px',
                marginBottom: '25px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '35px', marginBottom: '8px' }}>📧</div>
                <p style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '14px',
                }}>
                  OTP sent to<br />
                  <strong style={{ color: '#A855F7' }}>{email}</strong>
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
                    border: '2px solid rgba(168,85,247,0.3)',
                    borderRadius: '12px',
                    color: '#A855F7',
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
                  background: loading ? 'rgba(168,85,247,0.3)' : 'linear-gradient(135deg, #A855F7, #1E3A5F)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 0 20px rgba(168,85,247,0.3)',
                }}
              >
                {loading ? '⏳ Verifying...' : '✅ Verify OTP'}
              </button>
            </form>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '13px',
                  fontWeight: '600',
                  display: 'block',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                }}>New Password</label>
                <input
                  type="password"
                  value={passwords.newPassword}
                  onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })}
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

              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '13px',
                  fontWeight: '600',
                  display: 'block',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                }}>Confirm New Password</label>
                <input
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={e => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                  placeholder="Repeat new password"
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

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: loading ? 'rgba(168,85,247,0.3)' : 'linear-gradient(135deg, #A855F7, #1E3A5F)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 0 20px rgba(168,85,247,0.3)',
                }}
              >
                {loading ? '⏳ Resetting...' : '🔐 Reset Password'}
              </button>
            </form>
          )}

          <div style={{
            textAlign: 'center',
            marginTop: '25px',
          }}>
            <Link to="/login" style={{
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              fontSize: '14px',
            }}>
              ← Back to Login
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPassword