import { motion } from 'framer-motion'
import { useState } from 'react'

const rulesData = {
  'instant': {
    color: '#FFD700',
    icon: '⚡',
    rules: [
      { label: 'Daily Drawdown', value: '5%', good: true },
      { label: 'Max Drawdown', value: '10%', good: true },
      { label: 'Profit Target', value: 'None', good: true },
      { label: 'Min Trading Days', value: 'None', good: true },
      { label: 'Time Limit', value: 'None', good: true },
      { label: 'Leverage', value: '1:100', good: true },
      { label: 'Weekend Holding', value: '✅ Allowed', good: true },
      { label: 'News Trading', value: '✅ Allowed', good: true },
      { label: 'EA/Bots', value: '✅ Allowed', good: true },
      { label: 'Profit Split', value: '80%', good: true },
      { label: 'Payout Time', value: '24 Hours', good: true },
      { label: 'Challenge Fee', value: 'Starting $99', good: true },
    ]
  },
  '1-step': {
    color: '#00D4FF',
    icon: '🎯',
    rules: [
      { label: 'Phase 1 Target', value: '8%', good: true },
      { label: 'Daily Drawdown', value: '5%', good: true },
      { label: 'Max Drawdown', value: '10%', good: true },
      { label: 'Min Trading Days', value: '5 Days', good: true },
      { label: 'Time Limit', value: 'None', good: true },
      { label: 'Leverage', value: '1:100', good: true },
      { label: 'Weekend Holding', value: '✅ Allowed', good: true },
      { label: 'News Trading', value: '✅ Allowed', good: true },
      { label: 'EA/Bots', value: '✅ Allowed', good: true },
      { label: 'Profit Split', value: '85%', good: true },
      { label: 'Payout Time', value: '24 Hours', good: true },
      { label: 'Challenge Fee', value: 'Starting $49', good: true },
    ]
  },
  '2-step': {
    color: '#00FF88',
    icon: '🏆',
    rules: [
      { label: 'Phase 1 Target', value: '8%', good: true },
      { label: 'Phase 2 Target', value: '5%', good: true },
      { label: 'Daily Drawdown', value: '5%', good: true },
      { label: 'Max Drawdown', value: '10%', good: true },
      { label: 'Min Trading Days', value: '5 Days', good: true },
      { label: 'Time Limit', value: 'None', good: true },
      { label: 'Leverage', value: '1:100', good: true },
      { label: 'Weekend Holding', value: '✅ Allowed', good: true },
      { label: 'News Trading', value: '✅ Allowed', good: true },
      { label: 'EA/Bots', value: '✅ Allowed', good: true },
      { label: 'Profit Split', value: '90%', good: true },
      { label: 'Challenge Fee', value: 'Starting $29', good: true },
    ]
  },
}

const RulesSection = () => {
  const [activeModel, setActiveModel] = useState('instant')
  const active = rulesData[activeModel]

  return (
    <div style={{
      backgroundColor: '#0A0E17',
      padding: '80px 40px',
      position: 'relative',
    }}>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '50px' }}
      >
        <div style={{
          display: 'inline-block',
          background: 'rgba(0, 255, 136, 0.1)',
          border: '1px solid rgba(0, 255, 136, 0.3)',
          borderRadius: '50px',
          padding: '6px 20px',
          color: '#00FF88',
          fontSize: '13px',
          fontWeight: '600',
          marginBottom: '15px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          Trading Rules
        </div>

        <h2 style={{
          fontSize: '42px',
          fontWeight: '800',
          color: 'white',
          fontFamily: 'Poppins, sans-serif',
          marginBottom: '15px',
        }}>
          Clear &{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00FF88, #00D4FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Simple Rules
          </span>
        </h2>

        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '16px',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          No hidden rules. No surprises. Trade with confidence.
        </p>
      </motion.div>

      {/* Model Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '50px',
        flexWrap: 'wrap',
      }}>
        {[
          { id: 'instant', label: '⚡ Instant', color: '#FFD700' },
          { id: '1-step', label: '🎯 1 Step', color: '#00D4FF' },
          { id: '2-step', label: '🏆 2 Step', color: '#00FF88' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveModel(tab.id)}
            style={{
              padding: '12px 30px',
              borderRadius: '50px',
              border: `2px solid ${activeModel === tab.id ? tab.color : 'rgba(255,255,255,0.1)'}`,
              background: activeModel === tab.id
                ? `${tab.color}22`
                : 'transparent',
              color: activeModel === tab.id ? tab.color : 'rgba(255,255,255,0.5)',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: activeModel === tab.id
                ? `0 0 20px ${tab.color}33`
                : 'none',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Rules Table */}
      <motion.div
        key={activeModel}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: 'rgba(255,255,255,0.02)',
          border: `1px solid ${active.color}33`,
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: `0 0 40px ${active.color}11`,
        }}
      >
        {/* Table Header */}
        <div style={{
          background: `${active.color}15`,
          padding: '20px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${active.color}33`,
        }}>
          <span style={{
            color: active.color,
            fontWeight: '700',
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif',
          }}>
            {active.icon} Trading Rule
          </span>
          <span style={{
            color: active.color,
            fontWeight: '700',
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif',
          }}>
            Value
          </span>
        </div>

        {/* Rules List */}
        {active.rules.map((rule, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 30px',
              borderBottom: i < active.rules.length - 1
                ? '1px solid rgba(255,255,255,0.05)'
                : 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${active.color}08`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            {/* Rule Label */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: active.color,
                boxShadow: `0 0 6px ${active.color}`,
                flexShrink: 0,
              }} />
              <span style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '15px',
              }}>
                {rule.label}
              </span>
            </div>

            {/* Rule Value */}
            <span style={{
              color: active.color,
              fontWeight: '700',
              fontSize: '15px',
              background: `${active.color}15`,
              padding: '4px 14px',
              borderRadius: '20px',
              border: `1px solid ${active.color}33`,
            }}>
              {rule.value}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        style={{
          textAlign: 'center',
          marginTop: '40px',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '14px',
        }}
      >
        💡 All accounts come with real MT5 access and live tracking dashboard
      </motion.div>

    </div>
  )
}

export default RulesSection