import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { userAPI } from '../utils/api'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts'

// Demo equity data (baad me MT5 se real aayega)
const equityData = [
  { day: 'Day 1', equity: 50000 },
  { day: 'Day 2', equity: 50800 },
  { day: 'Day 3', equity: 50400 },
  { day: 'Day 4', equity: 51200 },
  { day: 'Day 5', equity: 51800 },
  { day: 'Day 6', equity: 51400 },
  { day: 'Day 7', equity: 52300 },
]

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: active ? 'rgba(0,212,255,0.1)' : 'transparent',
      border: 'none',
      borderLeft: active ? '3px solid #00D4FF' : '3px solid transparent',
      borderRadius: '0 8px 8px 0',
      color: active ? '#00D4FF' : 'rgba(255,255,255,0.5)',
      fontSize: '14px',
      fontWeight: active ? '600' : '400',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.3s',
    }}
  >
    <span style={{ fontSize: '18px' }}>{icon}</span>
    {label}
  </button>
)

const StatCard = ({ icon, label, value, color, sub }) => (
  <motion.div
    whileHover={{ y: -5 }}
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${color}33`,
      borderRadius: '16px',
      padding: '20px',
      flex: '1',
      minWidth: '150px',
    }}
  >
    <div style={{ fontSize: '28px', marginBottom: '8px' }}>{icon}</div>
    <div style={{
      color: color,
      fontSize: '22px',
      fontWeight: '800',
      fontFamily: 'Poppins, sans-serif',
      marginBottom: '4px',
    }}>
      {value}
    </div>
    <div style={{
      color: 'rgba(255,255,255,0.4)',
      fontSize: '12px',
      textTransform: 'uppercase',
    }}>
      {label}
    </div>
    {sub && (
      <div style={{
        color: 'rgba(255,255,255,0.25)',
        fontSize: '11px',
        marginTop: '4px',
      }}>
        {sub}
      </div>
    )}
  </motion.div>
)

const Dashboard = () => {
  const { user, logout, login } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [promoCode, setPromoCode] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [profile, setProfile] = useState(null)
  const [mt5, setMt5] = useState(null)
  const [referral, setReferral] = useState({ totalReferrals: 0, referralEarnings: 0 })
  const [loading, setLoading] = useState(true)

  // Payout form
  const [payoutForm, setPayoutForm] = useState({
    amount: '',
    method: 'bank',
    walletAddress: '',
  })

  // Load user data on mount
  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Get profile
      const profileRes = await userAPI.getProfile()
      setProfile(profileRes.data.user)

      // Get MT5 account (may not exist yet)
      try {
        const mt5Res = await userAPI.getMT5Account()
        setMt5(mt5Res.data.mt5)
      } catch (err) {
        setMt5(null)
      }

      // Get referral info
      try {
        const refRes = await userAPI.getReferralInfo()
        setReferral(refRes.data)
      } catch (err) {
        console.log('Referral data unavailable')
      }
    } catch (error) {
      toast.error('Could not load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully!')
    navigate('/login')
  }

  const handleApplyPromo = async () => {
    if (!promoCode) {
      toast.error('Please enter a promo code!')
      return
    }
    try {
      const { data } = await userAPI.applyPromo({ code: promoCode })
      toast.success(data.message)
      setPromoCode('')
      loadDashboardData()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid promo code!')
    }
  }

  const handlePayoutRequest = async (e) => {
    e.preventDefault()
    if (!payoutForm.amount || payoutForm.amount < 100) {
      toast.error('Minimum payout amount is $100')
      return
    }
    try {
      await userAPI.requestPayout(payoutForm)
      toast.success('Payout request submitted! 💰')
      setPayoutForm({ amount: '', method: 'bank', walletAddress: '' })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Request failed!')
    }
  }

  const copyReferralLink = () => {
    if (referral.referralLink) {
      navigator.clipboard.writeText(referral.referralLink)
      toast.success('Referral link copied! 🔗')
    }
  }

  const sidebarItems = [
    { id: 'overview', icon: '🏠', label: 'Overview' },
    { id: 'trading', icon: '📊', label: 'MT5 Account' },
    { id: 'payout', icon: '💰', label: 'Request Payout' },
    { id: 'referral', icon: '🔗', label: 'Referral' },
    { id: 'promo', icon: '🎫', label: 'Promo Code' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ]

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0A0E17',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ color: '#00D4FF', fontSize: '20px' }}>⏳ Loading...</div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A0E17', display: 'flex' }}>

      {/* SIDEBAR */}
      <div style={{
        width: isSidebarOpen ? '240px' : '0px',
        minHeight: '100vh',
        background: '#0D1421',
        borderRight: '1px solid rgba(0,212,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <div style={{
          padding: '25px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00D4FF, #1E3A5F)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'white',
              flexShrink: 0,
            }}>M</div>
            <span style={{
              fontSize: '15px',
              fontWeight: '700',
              color: 'white',
              whiteSpace: 'nowrap',
            }}>
              My<span style={{ color: '#00D4FF' }}>Funding</span>Hub
            </span>
          </div>
        </div>

        <div style={{
          padding: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00D4FF22, #1E3A5F)',
            border: '2px solid #00D4FF44',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            marginBottom: '10px',
          }}>👤</div>
          <div style={{ color: 'white', fontWeight: '600', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {profile?.name || 'User'}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {profile?.email}
          </div>
          <div style={{
            display: 'inline-block',
            background: 'rgba(0,255,136,0.1)',
            border: '1px solid rgba(0,255,136,0.3)',
            color: '#00FF88',
            fontSize: '10px',
            fontWeight: '700',
            padding: '2px 8px',
            borderRadius: '10px',
            marginTop: '6px',
          }}>
            🟢 Verified
          </div>
        </div>

        <div style={{ flex: 1, padding: '15px 0' }}>
          {sidebarItems.map(item => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </div>

        <div style={{ padding: '15px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '10px',
              background: 'rgba(255,68,68,0.08)',
              border: '1px solid rgba(255,68,68,0.2)',
              borderRadius: '8px',
              color: '#FF4444',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{
          padding: '20px 30px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#0D1421',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >☰</button>
            <h1 style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: '700',
              margin: 0,
            }}>
              {sidebarItems.find(i => i.id === activeTab)?.icon}{' '}
              {sidebarItems.find(i => i.id === activeTab)?.label}
            </h1>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
            Welcome, {profile?.name?.split(' ')[0]}! 👋
          </div>
        </div>

        <div style={{ padding: '30px' }}>

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Welcome Banner */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(30,58,95,0.3))',
                border: '1px solid rgba(0,212,255,0.2)',
                borderRadius: '16px',
                padding: '25px',
                marginBottom: '25px',
              }}>
                <h2 style={{
                  color: 'white',
                  fontSize: '22px',
                  fontWeight: '700',
                  marginBottom: '8px',
                }}>
                  Welcome, {profile?.name}! 🎉
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                  {mt5
                    ? `Your MT5 account is active. Login: #${mt5.login}`
                    : 'Choose a funding model to get your MT5 account!'}
                </p>
              </div>

              <div style={{
                display: 'flex',
                gap: '15px',
                flexWrap: 'wrap',
                marginBottom: '25px',
              }}>
                <StatCard
                  icon="🎯"
                  label="Model"
                  value={mt5?.model || 'None'}
                  color="#00D4FF"
                  sub="Trading model"
                />
                <StatCard
                  icon="💰"
                  label="Challenge Size"
                  value={mt5 ? `$${mt5.challengeAmount || 0}` : '$0'}
                  color="#FFD700"
                  sub="Account size"
                />
                <StatCard
                  icon="🔗"
                  label="Referrals"
                  value={referral.totalReferrals || 0}
                  color="#00FF88"
                  sub={`Earned: $${referral.referralEarnings || 0}`}
                />
                <StatCard
                  icon="📊"
                  label="Status"
                  value={mt5?.challengeStatus || 'None'}
                  color="#A855F7"
                  sub="Challenge status"
                />
              </div>

              {/* Equity Chart (Demo - will be real with MT5) */}
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '25px',
              }}>
                <h3 style={{
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '700',
                  marginBottom: '20px',
                }}>
                  📈 Equity Curve (Demo)
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={equityData}>
                    <defs>
                      <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: '#151C2C',
                        border: '1px solid rgba(0,212,255,0.3)',
                        borderRadius: '8px',
                        color: 'white',
                      }}
                    />
                    <Area type="monotone" dataKey="equity" stroke="#00D4FF" strokeWidth={2} fill="url(#equityGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
                <p style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '12px',
                  marginTop: '15px',
                  textAlign: 'center',
                }}>
                  💡 Real MT5 equity data will show here once your account is connected
                </p>
              </div>
            </motion.div>
          )}

          {/* MT5 TRADING */}
          {activeTab === 'trading' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {mt5 ? (
                <div style={{
                  background: 'rgba(0,212,255,0.05)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  borderRadius: '16px',
                  padding: '25px',
                }}>
                  <h3 style={{
                    color: '#00D4FF',
                    fontSize: '18px',
                    fontWeight: '700',
                    marginBottom: '20px',
                  }}>
                    🟢 Your MT5 Account
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '15px',
                  }}>
                    {[
                      { label: 'Login', value: `#${mt5.login}` },
                      { label: 'Password', value: mt5.password },
                      { label: 'Server', value: mt5.server },
                      { label: 'Model', value: mt5.model },
                      { label: 'Account Size', value: `$${mt5.challengeAmount}` },
                      { label: 'Status', value: mt5.challengeStatus },
                    ].map((item, i) => (
                      <div key={i} style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '10px',
                        padding: '12px 15px',
                      }}>
                        <div style={{
                          color: 'rgba(255,255,255,0.4)',
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          marginBottom: '5px',
                        }}>
                          {item.label}
                        </div>
                        <div style={{
                          color: '#00D4FF',
                          fontSize: '16px',
                          fontWeight: '700',
                        }}>
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  padding: '40px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '60px', marginBottom: '15px' }}>📊</div>
                  <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '10px' }}>
                    No MT5 Account Assigned Yet
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                    Contact support or purchase a challenge to get your MT5 account
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* PAYOUT */}
          {activeTab === 'payout' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <form onSubmit={handlePayoutRequest} style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '25px',
              }}>
                <h3 style={{ color: '#FFD700', fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
                  💰 Request Payout
                </h3>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
                    Amount ($) - Min $100
                  </label>
                  <input
                    type="number"
                    value={payoutForm.amount}
                    onChange={e => setPayoutForm({ ...payoutForm, amount: e.target.value })}
                    placeholder="Enter amount"
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
                    Payment Method
                  </label>
                  <select
                    value={payoutForm.method}
                    onChange={e => setPayoutForm({ ...payoutForm, method: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: '#151C2C',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="bank">Bank Transfer</option>
                    <option value="bitcoin">Bitcoin (BTC)</option>
                    <option value="usdt">USDT (TRC20)</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
                    Wallet Address / Account Details
                  </label>
                  <input
                    type="text"
                    value={payoutForm.walletAddress}
                    onChange={e => setPayoutForm({ ...payoutForm, walletAddress: e.target.value })}
                    placeholder="Enter wallet address or bank details"
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#000',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  💰 Submit Request
                </button>
              </form>
            </motion.div>
          )}

          {/* REFERRAL */}
          {activeTab === 'referral' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{
                display: 'flex',
                gap: '15px',
                flexWrap: 'wrap',
                marginBottom: '25px',
              }}>
                <StatCard icon="👥" label="Total Referrals" value={referral.totalReferrals} color="#00D4FF" />
                <StatCard icon="💰" label="Earned" value={`$${referral.referralEarnings}`} color="#FFD700" />
                <StatCard icon="🔑" label="Your Code" value={referral.referralCode || profile?.referralCode} color="#00FF88" />
              </div>

              <div style={{
                background: 'rgba(0,212,255,0.05)',
                border: '1px solid rgba(0,212,255,0.2)',
                borderRadius: '16px',
                padding: '25px',
              }}>
                <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '15px' }}>
                  🔗 Your Referral Link
                </h3>
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                  <div style={{
                    flex: 1,
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    borderRadius: '10px',
                    color: '#00D4FF',
                    fontSize: '13px',
                    wordBreak: 'break-all',
                  }}>
                    {referral.referralLink || `http://localhost:5173/signup?ref=${profile?.referralCode}`}
                  </div>
                  <button
                    onClick={copyReferralLink}
                    style={{
                      padding: '12px 20px',
                      background: 'linear-gradient(135deg, #00D4FF, #1E3A5F)',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                  >
                    📋 Copy
                  </button>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '12px' }}>
                  💡 Earn 10% commission for every successful referral!
                </p>
              </div>
            </motion.div>
          )}

          {/* PROMO */}
          {activeTab === 'promo' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{
                background: 'rgba(168,85,247,0.05)',
                border: '1px solid rgba(168,85,247,0.2)',
                borderRadius: '16px',
                padding: '25px',
              }}>
                <h3 style={{ color: '#A855F7', fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
                  🎫 Apply Promo Code
                </h3>

                {profile?.promoCodeUsed ? (
                  <div style={{
                    background: 'rgba(0,255,136,0.1)',
                    border: '1px solid rgba(0,255,136,0.3)',
                    borderRadius: '10px',
                    padding: '15px',
                    marginBottom: '15px',
                  }}>
                    <p style={{ color: '#00FF88', fontSize: '14px' }}>
                      ✅ You have applied: <strong>{profile.promoCodeUsed}</strong>
                      <br />Discount: {profile.discount}%
                    </p>
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '20px',
                    flexWrap: 'wrap',
                  }}>
                    <input
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter promo code"
                      style={{
                        flex: 1,
                        padding: '14px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(168,85,247,0.3)',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '15px',
                        outline: 'none',
                        minWidth: '200px',
                        letterSpacing: '2px',
                        fontWeight: '700',
                      }}
                    />
                    <button
                      onClick={handleApplyPromo}
                      style={{
                        padding: '14px 25px',
                        background: 'linear-gradient(135deg, #A855F7, #1E3A5F)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '15px',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '25px',
              }}>
                <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>
                  ⚙️ Profile Info
                </h3>
                {[
                  { label: 'Name', value: profile?.name },
                  { label: 'Email', value: profile?.email },
                  { label: 'Referral Code', value: profile?.referralCode },
                  { label: 'Email Verified', value: profile?.isEmailVerified ? '✅ Yes' : '❌ No' },
                  { label: 'Account Status', value: profile?.isActive ? '🟢 Active' : '🔴 Inactive' },
                ].map((f, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>{f.label}</span>
                    <span style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>{f.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Dashboard