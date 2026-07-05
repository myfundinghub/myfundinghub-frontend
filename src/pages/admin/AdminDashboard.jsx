import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { adminAPI } from '../../utils/api'

const SidebarItem = ({ icon, label, active, onClick, badge }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: active ? 'rgba(255,215,0,0.1)' : 'transparent',
      border: 'none',
      borderLeft: active ? '3px solid #FFD700' : '3px solid transparent',
      color: active ? '#FFD700' : 'rgba(255,255,255,0.5)',
      fontSize: '14px',
      fontWeight: active ? '600' : '400',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.3s',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ fontSize: '18px' }}>{icon}</span>
      {label}
    </div>
    {badge > 0 && (
      <span style={{
        background: '#FF4444',
        color: 'white',
        fontSize: '10px',
        fontWeight: '700',
        padding: '2px 7px',
        borderRadius: '10px',
      }}>
        {badge}
      </span>
    )}
  </button>
)

const StatCard = ({ icon, label, value, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${color}33`,
      borderRadius: '16px',
      padding: '22px',
      flex: '1',
      minWidth: '180px',
    }}
  >
    <div style={{ fontSize: '30px', marginBottom: '10px' }}>{icon}</div>
    <div style={{
      color: color,
      fontSize: '26px',
      fontWeight: '800',
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
  </motion.div>
)

const AdminDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)

  // Data States
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, pendingPayouts: 0 })
  const [users, setUsers] = useState([])
  const [promos, setPromos] = useState([])
  const [payouts, setPayouts] = useState([])
  const [stories, setStories] = useState([])

  // Form States
  const [newPromo, setNewPromo] = useState({ code: '', discountType: 'percentage', discountValue: '' })
  const [newMT5, setNewMT5] = useState({
    userId: '', mt5Login: '', mt5Password: '', mt5Server: '',
    selectedModel: 'instant', challengeAmount: ''
  })
  const [newStory, setNewStory] = useState({
    traderName: '', country: '', earningsAmount: '', accountSize: '',
    model: '1-step', testimonial: '', rating: 5
  })

  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    setLoading(true)
    try {
      const [statsRes, usersRes, promosRes, payoutsRes, storiesRes] = await Promise.all([
        adminAPI.getStats().catch(() => ({ data: { stats: {} } })),
        adminAPI.getAllUsers().catch(() => ({ data: { users: [] } })),
        adminAPI.getAllPromos().catch(() => ({ data: { promos: [] } })),
        adminAPI.getPayouts().catch(() => ({ data: { payouts: [] } })),
        adminAPI.getSuccessStories().catch(() => ({ data: { stories: [] } })),
      ])

      setStats(statsRes.data.stats || {})
      setUsers(usersRes.data.users || [])
      setPromos(promosRes.data.promos || [])
      setPayouts(payoutsRes.data.payouts || [])
      setStories(storiesRes.data.stories || [])
    } catch (error) {
      toast.error('Could not load admin data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out!')
    navigate('/login')
  }

  // Ban user
  const handleBanUser = async (id, name) => {
    if (!confirm(`Ban ${name}?`)) return
    try {
      await adminAPI.banUser(id)
      toast.success(`${name} banned!`)
      loadAllData()
    } catch (error) {
      toast.error('Could not ban user')
    }
  }

  // Unban user
  const handleUnbanUser = async (id, name) => {
    try {
      await adminAPI.unbanUser(id)
      toast.success(`${name} unbanned!`)
      loadAllData()
    } catch (error) {
      toast.error('Could not unban user')
    }
  }

  // Delete user
  const handleDeleteUser = async (id, name) => {
    if (!confirm(`DELETE ${name}? This cannot be undone!`)) return
    try {
      await adminAPI.deleteUser(id)
      toast.success(`${name} deleted!`)
      loadAllData()
    } catch (error) {
      toast.error('Could not delete user')
    }
  }

  // Create promo
  const handleCreatePromo = async (e) => {
    e.preventDefault()
    if (!newPromo.code || !newPromo.discountValue) {
      toast.error('Fill all fields!')
      return
    }
    try {
      await adminAPI.createPromo(newPromo)
      toast.success('Promo created!')
      setNewPromo({ code: '', discountType: 'percentage', discountValue: '' })
      loadAllData()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not create')
    }
  }

  // Delete promo
  const handleDeletePromo = async (id) => {
    if (!confirm('Delete this promo?')) return
    try {
      await adminAPI.deletePromo(id)
      toast.success('Promo deleted!')
      loadAllData()
    } catch (error) {
      toast.error('Could not delete')
    }
  }

  // Assign MT5
  const handleAssignMT5 = async (e) => {
    e.preventDefault()
    if (!newMT5.userId || !newMT5.mt5Login || !newMT5.mt5Password || !newMT5.mt5Server) {
      toast.error('Fill all required fields!')
      return
    }
    try {
      await adminAPI.assignMT5(newMT5)
      toast.success('MT5 assigned!')
      setNewMT5({
        userId: '', mt5Login: '', mt5Password: '', mt5Server: '',
        selectedModel: 'instant', challengeAmount: ''
      })
      loadAllData()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not assign')
    }
  }

  // Payout actions
  const handleUpdatePayout = async (id, status) => {
    try {
      await adminAPI.updatePayout(id, { status })
      toast.success(`Payout ${status}!`)
      loadAllData()
    } catch (error) {
      toast.error('Could not update')
    }
  }

  // Add story
  const handleAddStory = async (e) => {
    e.preventDefault()
    if (!newStory.traderName || !newStory.earningsAmount || !newStory.testimonial) {
      toast.error('Fill required fields!')
      return
    }
    try {
      await adminAPI.addSuccessStory(newStory)
      toast.success('Story added!')
      setNewStory({
        traderName: '', country: '', earningsAmount: '', accountSize: '',
        model: '1-step', testimonial: '', rating: 5
      })
      loadAllData()
    } catch (error) {
      toast.error('Could not add story')
    }
  }

  // Delete story
  const handleDeleteStory = async (id) => {
    if (!confirm('Delete this story?')) return
    try {
      await adminAPI.deleteStory(id)
      toast.success('Story deleted!')
      loadAllData()
    } catch (error) {
      toast.error('Could not delete')
    }
  }

  const sidebarItems = [
    { id: 'overview', icon: '🏠', label: 'Overview' },
    { id: 'users', icon: '👥', label: 'Users' },
    { id: 'mt5', icon: '📊', label: 'MT5 Accounts' },
    { id: 'payouts', icon: '💰', label: 'Payouts', badge: payouts.filter(p => p.status === 'pending').length },
    { id: 'promo', icon: '🎫', label: 'Promo Codes' },
    { id: 'stories', icon: '🏆', label: 'Success Stories' },
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
        <div style={{ color: '#FFD700', fontSize: '20px' }}>⏳ Loading Admin Panel...</div>
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
        borderRight: '1px solid rgba(255,215,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <div style={{ padding: '25px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: '#000',
              flexShrink: 0,
            }}>🛡️</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'white', whiteSpace: 'nowrap' }}>Admin Panel</div>
              <div style={{ fontSize: '11px', color: '#FFD700', whiteSpace: 'nowrap' }}>MyFundingHub</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFD70022, #FFA500)',
            border: '2px solid #FFD70044',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            marginBottom: '10px',
          }}>🛡️</div>
          <div style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>{user?.name}</div>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,215,0,0.1)',
            border: '1px solid rgba(255,215,0,0.3)',
            color: '#FFD700',
            fontSize: '10px',
            fontWeight: '700',
            padding: '2px 8px',
            borderRadius: '10px',
            marginTop: '6px',
          }}>
            👑 Super Admin
          </div>
        </div>

        <div style={{ flex: 1, padding: '15px 0' }}>
          {sidebarItems.map(item => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              badge={item.badge}
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

      {/* MAIN */}
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
              style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}
            >☰</button>
            <h1 style={{ color: 'white', fontSize: '20px', fontWeight: '700', margin: 0 }}>
              {sidebarItems.find(i => i.id === activeTab)?.icon}{' '}
              {sidebarItems.find(i => i.id === activeTab)?.label}
            </h1>
          </div>
          <button
            onClick={loadAllData}
            style={{
              background: 'rgba(255,215,0,0.1)',
              border: '1px solid rgba(255,215,0,0.2)',
              color: '#FFD700',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            🔄 Refresh
          </button>
        </div>

        <div style={{ padding: '30px' }}>

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '25px' }}>
                <StatCard icon="👥" label="Total Users" value={stats.totalUsers || 0} color="#00D4FF" />
                <StatCard icon="✅" label="Active Users" value={stats.activeUsers || 0} color="#00FF88" />
                <StatCard icon="🚫" label="Banned" value={stats.bannedUsers || 0} color="#FF4444" />
                <StatCard icon="⏳" label="Pending Payouts" value={stats.pendingPayouts || 0} color="#FFD700" />
                <StatCard icon="💰" label="Total Paid Out" value={`$${stats.totalPaidOut || 0}`} color="#A855F7" />
              </div>

              <div style={{
                background: 'rgba(0,212,255,0.05)',
                border: '1px solid rgba(0,212,255,0.2)',
                borderRadius: '16px',
                padding: '25px',
              }}>
                <h3 style={{ color: '#00D4FF', fontSize: '18px', fontWeight: '700', marginBottom: '15px' }}>
                  📊 Quick Overview
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                    <strong>Total Registrations:</strong> {stats.totalUsers}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                    <strong>Verified Users:</strong> {stats.activeUsers}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                    <strong>Total Promos:</strong> {promos.length}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                    <strong>Success Stories:</strong> {stories.length}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* USERS */}
          {activeTab === 'users' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}>
                <div style={{ padding: '20px 25px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700', margin: 0 }}>
                    👥 All Users ({users.length})
                  </h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                        {['Name', 'Email', 'Verified', 'Model', 'Status', 'Actions'].map(h => (
                          <th key={h} style={{
                            padding: '12px 20px',
                            color: 'rgba(255,255,255,0.4)',
                            fontSize: '11px',
                            fontWeight: '600',
                            textAlign: 'left',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                          }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
                            No users yet
                          </td>
                        </tr>
                      ) : (
                        users.map((u) => (
                          <tr key={u._id} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                            <td style={{ padding: '14px 20px', color: 'white', fontWeight: '600' }}>{u.name}</td>
                            <td style={{ padding: '14px 20px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>{u.email}</td>
                            <td style={{ padding: '14px 20px' }}>
                              <span style={{
                                color: u.isEmailVerified ? '#00FF88' : '#FF4444',
                                fontSize: '13px',
                              }}>
                                {u.isEmailVerified ? '✅' : '❌'}
                              </span>
                            </td>
                            <td style={{ padding: '14px 20px', color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
                              {u.selectedModel || '-'}
                            </td>
                            <td style={{ padding: '14px 20px' }}>
                              <span style={{
                                background: u.isBanned ? 'rgba(255,68,68,0.1)' : 'rgba(0,255,136,0.1)',
                                color: u.isBanned ? '#FF4444' : '#00FF88',
                                padding: '3px 10px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600',
                              }}>
                                {u.isBanned ? '🔴 Banned' : '🟢 Active'}
                              </span>
                            </td>
                            <td style={{ padding: '14px 20px' }}>
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {u.isBanned ? (
                                  <button
                                    onClick={() => handleUnbanUser(u._id, u.name)}
                                    style={{
                                      padding: '5px 10px',
                                      background: 'rgba(0,255,136,0.1)',
                                      border: '1px solid rgba(0,255,136,0.3)',
                                      borderRadius: '6px',
                                      color: '#00FF88',
                                      fontSize: '11px',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    ✅ Unban
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleBanUser(u._id, u.name)}
                                    style={{
                                      padding: '5px 10px',
                                      background: 'rgba(255,68,68,0.1)',
                                      border: '1px solid rgba(255,68,68,0.3)',
                                      borderRadius: '6px',
                                      color: '#FF4444',
                                      fontSize: '11px',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    🚫 Ban
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteUser(u._id, u.name)}
                                  style={{
                                    padding: '5px 10px',
                                    background: 'rgba(255,68,68,0.2)',
                                    border: '1px solid rgba(255,68,68,0.4)',
                                    borderRadius: '6px',
                                    color: '#FF4444',
                                    fontSize: '11px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* MT5 */}
          {activeTab === 'mt5' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <form onSubmit={handleAssignMT5} style={{
                background: 'rgba(0,212,255,0.05)',
                border: '1px solid rgba(0,212,255,0.2)',
                borderRadius: '16px',
                padding: '25px',
                marginBottom: '20px',
              }}>
                <h3 style={{ color: '#00D4FF', fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>
                  ➕ Assign MT5 Account
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '15px' }}>
                  <select
                    value={newMT5.userId}
                    onChange={e => setNewMT5({ ...newMT5, userId: e.target.value })}
                    style={{
                      padding: '12px',
                      background: '#151C2C',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                    required
                  >
                    <option value="">Select User</option>
                    {users.filter(u => u.isEmailVerified).map(u => (
                      <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                    ))}
                  </select>
                  <input placeholder="MT5 Login" value={newMT5.mt5Login} onChange={e => setNewMT5({ ...newMT5, mt5Login: e.target.value })} required style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                  <input placeholder="MT5 Password" value={newMT5.mt5Password} onChange={e => setNewMT5({ ...newMT5, mt5Password: e.target.value })} required style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                  <input placeholder="Server (MyFundingHub-Live)" value={newMT5.mt5Server} onChange={e => setNewMT5({ ...newMT5, mt5Server: e.target.value })} required style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                  <select value={newMT5.selectedModel} onChange={e => setNewMT5({ ...newMT5, selectedModel: e.target.value })} style={{ padding: '12px', background: '#151C2C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none' }}>
                    <option value="instant">Instant</option>
                    <option value="1-step">1-Step</option>
                    <option value="2-step">2-Step</option>
                  </select>
                  <input type="number" placeholder="Amount ($)" value={newMT5.challengeAmount} onChange={e => setNewMT5({ ...newMT5, challengeAmount: e.target.value })} style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <button type="submit" style={{
                  padding: '12px 25px',
                  background: 'linear-gradient(135deg, #00D4FF, #1E3A5F)',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}>
                  ✅ Assign Account
                </button>
              </form>
            </motion.div>
          )}

          {/* PAYOUTS */}
          {activeTab === 'payouts' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ padding: '20px 25px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700', margin: 0 }}>💰 All Payouts ({payouts.length})</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                        {['User', 'Amount', 'Method', 'Status', 'Actions'].map(h => (
                          <th key={h} style={{ padding: '12px 20px', color: 'rgba(255,255,255,0.4)', fontSize: '11px', textAlign: 'left', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {payouts.length === 0 ? (
                        <tr><td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>No payouts yet</td></tr>
                      ) : (
                        payouts.map(p => (
                          <tr key={p._id} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                            <td style={{ padding: '14px 20px', color: 'white', fontWeight: '600' }}>{p.userId?.name}</td>
                            <td style={{ padding: '14px 20px', color: '#FFD700', fontWeight: '800', fontSize: '16px' }}>${p.amount}</td>
                            <td style={{ padding: '14px 20px', color: 'rgba(255,255,255,0.5)' }}>{p.method}</td>
                            <td style={{ padding: '14px 20px' }}>
                              <span style={{
                                background: p.status === 'pending' ? 'rgba(255,215,0,0.1)' : p.status === 'approved' ? 'rgba(0,255,136,0.1)' : 'rgba(255,68,68,0.1)',
                                color: p.status === 'pending' ? '#FFD700' : p.status === 'approved' ? '#00FF88' : '#FF4444',
                                padding: '3px 10px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600',
                              }}>{p.status}</span>
                            </td>
                            <td style={{ padding: '14px 20px' }}>
                              {p.status === 'pending' && (
                                <div style={{ display: 'flex', gap: '6px' }}>
                                  <button onClick={() => handleUpdatePayout(p._id, 'approved')} style={{ padding: '5px 10px', background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)', borderRadius: '6px', color: '#00FF88', fontSize: '11px', cursor: 'pointer' }}>✅ Approve</button>
                                  <button onClick={() => handleUpdatePayout(p._id, 'rejected')} style={{ padding: '5px 10px', background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.3)', borderRadius: '6px', color: '#FF4444', fontSize: '11px', cursor: 'pointer' }}>❌ Reject</button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* PROMO */}
          {activeTab === 'promo' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <form onSubmit={handleCreatePromo} style={{ background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '16px', padding: '25px', marginBottom: '20px' }}>
                <h3 style={{ color: '#A855F7', fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>➕ Create Promo Code</h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <input placeholder="CODE" value={newPromo.code} onChange={e => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })} style={{ flex: 1, minWidth: '150px', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box', letterSpacing: '2px', fontWeight: '700' }} />
                  <select value={newPromo.discountType} onChange={e => setNewPromo({ ...newPromo, discountType: e.target.value })} style={{ padding: '12px', background: '#151C2C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none' }}>
                    <option value="percentage">%</option>
                    <option value="fixed">$</option>
                  </select>
                  <input type="number" placeholder="Value" value={newPromo.discountValue} onChange={e => setNewPromo({ ...newPromo, discountValue: e.target.value })} style={{ width: '120px', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                  <button type="submit" style={{ padding: '12px 20px', background: 'linear-gradient(135deg, #A855F7, #1E3A5F)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>✅ Create</button>
                </div>
              </form>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ padding: '20px 25px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700', margin: 0 }}>🎫 All Promos ({promos.length})</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                        {['Code', 'Type', 'Value', 'Used', 'Actions'].map(h => (
                          <th key={h} style={{ padding: '12px 20px', color: 'rgba(255,255,255,0.4)', fontSize: '11px', textAlign: 'left', textTransform: 'uppercase' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {promos.length === 0 ? (
                        <tr><td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>No promos yet</td></tr>
                      ) : (
                        promos.map(p => (
                          <tr key={p._id} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                            <td style={{ padding: '14px 20px' }}>
                              <span style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', color: '#A855F7', padding: '4px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '800', letterSpacing: '2px' }}>{p.code}</span>
                            </td>
                            <td style={{ padding: '14px 20px', color: 'rgba(255,255,255,0.5)' }}>{p.discountType}</td>
                            <td style={{ padding: '14px 20px', color: '#FFD700', fontWeight: '700' }}>{p.discountValue}{p.discountType === 'percentage' ? '%' : '$'}</td>
                            <td style={{ padding: '14px 20px', color: 'rgba(255,255,255,0.5)' }}>{p.usedCount}/{p.maxUses}</td>
                            <td style={{ padding: '14px 20px' }}>
                              <button onClick={() => handleDeletePromo(p._id)} style={{ padding: '5px 12px', background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.3)', borderRadius: '6px', color: '#FF4444', fontSize: '12px', cursor: 'pointer' }}>🗑️ Delete</button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* STORIES */}
          {activeTab === 'stories' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <form onSubmit={handleAddStory} style={{ background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: '16px', padding: '25px', marginBottom: '20px' }}>
                <h3 style={{ color: '#FFD700', fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>➕ Add Success Story</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  <input placeholder="Trader Name" value={newStory.traderName} onChange={e => setNewStory({ ...newStory, traderName: e.target.value })} required style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                  <input placeholder="Country" value={newStory.country} onChange={e => setNewStory({ ...newStory, country: e.target.value })} style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                  <input type="number" placeholder="Earnings ($)" value={newStory.earningsAmount} onChange={e => setNewStory({ ...newStory, earningsAmount: e.target.value })} required style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                  <input type="number" placeholder="Account Size ($)" value={newStory.accountSize} onChange={e => setNewStory({ ...newStory, accountSize: e.target.value })} required style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <textarea placeholder="Testimonial..." value={newStory.testimonial} onChange={e => setNewStory({ ...newStory, testimonial: e.target.value })} required rows={3} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', marginBottom: '12px' }} />
                <button type="submit" style={{ padding: '12px 25px', background: 'linear-gradient(135deg, #FFD700, #FFA500)', border: 'none', borderRadius: '10px', color: '#000', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>✅ Add Story</button>
              </form>

              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                {stories.length === 0 ? (
                  <div style={{ width: '100%', padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.02)', borderRadius: '16px' }}>No stories yet</div>
                ) : (
                  stories.map(s => (
                    <div key={s._id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: '12px', padding: '20px', flex: '1', minWidth: '250px' }}>
                      <div style={{ color: 'white', fontWeight: '700', fontSize: '16px', marginBottom: '8px' }}>🏆 {s.traderName}</div>
                      <div style={{ color: '#00FF88', fontWeight: '800', fontSize: '20px', marginBottom: '4px' }}>${s.earningsAmount}</div>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginBottom: '10px' }}>{s.model} • {s.country}</div>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '15px', fontStyle: 'italic' }}>"{s.testimonial}"</p>
                      <button onClick={() => handleDeleteStory(s._id)} style={{ padding: '6px 14px', background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.3)', borderRadius: '6px', color: '#FF4444', fontSize: '12px', cursor: 'pointer' }}>🗑️ Remove</button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  )
}

export default AdminDashboard