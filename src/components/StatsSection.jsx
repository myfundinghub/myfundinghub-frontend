import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// ===== COUNT UP HOOK =====
const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * (end - start) + start))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isVisible, end, duration, start])

  return { count, ref }
}

// ===== STAT CARD =====
const StatCard = ({ icon, number, suffix, label, color, delay }) => {
  const { count, ref } = useCountUp(number, 2000)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${color}33`,
        borderRadius: '20px',
        padding: '30px',
        textAlign: 'center',
        flex: '1',
        minWidth: '200px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'all 0.3s ease',
      }}
      whileHover={{
        y: -10,
        boxShadow: `0 20px 40px ${color}22`,
        borderColor: color,
      }}
    >
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        right: '-30px',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}15, transparent)`,
      }} />

      {/* Icon */}
      <div style={{
        fontSize: '40px',
        marginBottom: '15px',
      }}>
        {icon}
      </div>

      {/* Number */}
      <div style={{
        fontSize: '42px',
        fontWeight: '900',
        color: color,
        fontFamily: 'Poppins, sans-serif',
        lineHeight: '1',
        marginBottom: '8px',
      }}>
        {count}{suffix}
      </div>

      {/* Label */}
      <div style={{
        fontSize: '14px',
        color: 'rgba(255,255,255,0.5)',
        fontWeight: '500',
        letterSpacing: '1px',
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
    </motion.div>
  )
}

// ===== MAIN STATS SECTION =====
const StatsSection = () => {
  const stats = [
    {
      icon: '💰',
      number: 50,
      suffix: 'M+',
      label: 'Total Funded',
      color: '#FFD700',
      delay: 0,
    },
    {
      icon: '👥',
      number: 10000,
      suffix: '+',
      label: 'Active Traders',
      color: '#00D4FF',
      delay: 0.1,
    },
    {
      icon: '✅',
      number: 95,
      suffix: '%',
      label: 'Payout Rate',
      color: '#00FF88',
      delay: 0.2,
    },
    {
      icon: '🌍',
      number: 150,
      suffix: '+',
      label: 'Countries',
      color: '#FF6B6B',
      delay: 0.3,
    },
    {
      icon: '⚡',
      number: 24,
      suffix: 'H',
      label: 'Fast Payout',
      color: '#A855F7',
      delay: 0.4,
    },
  ]

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
        style={{ textAlign: 'center', marginBottom: '60px' }}
      >
        <div style={{
          display: 'inline-block',
          background: 'rgba(0, 212, 255, 0.1)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          borderRadius: '50px',
          padding: '6px 20px',
          color: '#00D4FF',
          fontSize: '13px',
          fontWeight: '600',
          marginBottom: '15px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          Our Numbers
        </div>

        <h2 style={{
          fontSize: '42px',
          fontWeight: '800',
          color: 'white',
          fontFamily: 'Poppins, sans-serif',
          marginBottom: '15px',
        }}>
          Trusted By{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00D4FF, #FFD700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Thousands
          </span>{' '}
          of Traders
        </h2>

        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '16px',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          Real numbers. Real traders. Real profits.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Bottom Line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #00D4FF, transparent)',
          marginTop: '60px',
          maxWidth: '600px',
          margin: '60px auto 0',
        }}
      />
    </div>
  )
}

export default StatsSection