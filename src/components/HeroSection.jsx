import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// ===== FLOATING PARTICLES =====
const Particles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => i)

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      zIndex: 0,
    }}>
      {particles.map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 4 + 1 + 'px',
            height: Math.random() * 4 + 1 + 'px',
            background: i % 3 === 0 ? '#00D4FF' : i % 3 === 1 ? '#FFD700' : '#ffffff',
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5 + 0.1,
            animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
            animationDelay: Math.random() * 5 + 's',
          }}
        />
      ))}
    </div>
  )
}

// ===== 3D FLOATING COIN =====
const FloatingCoin = ({ style }) => {
  return (
    <motion.div
      animate={{
        y: [-20, 20, -20],
        rotateY: [0, 360],
        rotateX: [-10, 10, -10],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #FFD700, #FFA500, #FFD700)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '35px',
        boxShadow: '0 0 30px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(255,255,255,0.2)',
        position: 'absolute',
        ...style,
      }}
    >
      💰
    </motion.div>
  )
}

// ===== HERO SECTION =====
const HeroSection = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A0E17 0%, #0D1B2A 50%, #0A0E17 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '80px',
    }}>

      {/* Background Particles */}
      <Particles />

      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
      }} />

      {/* Floating Coins */}
      <FloatingCoin style={{ top: '15%', left: '8%' }} />
      <FloatingCoin style={{ top: '20%', right: '10%', animationDelay: '2s' }} />
      <FloatingCoin style={{ bottom: '20%', left: '12%', animationDelay: '4s' }} />
      <FloatingCoin style={{ bottom: '15%', right: '8%', animationDelay: '1s' }} />

      {/* Floating Chart Icon */}
      <motion.div
        animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '25%',
          right: '20%',
          fontSize: '60px',
          opacity: 0.3,
          zIndex: 0,
        }}
      >
        📈
      </motion.div>

      <motion.div
        animate={{ y: [15, -15, 15], rotate: [5, -5, 5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '20%',
          fontSize: '50px',
          opacity: 0.3,
          zIndex: 0,
        }}
      >
        📊
      </motion.div>

      {/* MAIN CONTENT */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: '0 20px',
        maxWidth: '900px',
      }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-block',
            background: 'rgba(0, 212, 255, 0.1)',
            border: '1px solid rgba(0, 212, 255, 0.4)',
            borderRadius: '50px',
            padding: '8px 20px',
            marginBottom: '25px',
            color: '#00D4FF',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          🔥 #1 Prop Trading Firm — Zero Investment
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: '64px',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: '20px',
            fontFamily: 'Poppins, sans-serif',
            color: 'white',
          }}
        >
          Trade With{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00D4FF, #FFD700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Our Capital
          </span>
          <br />
          Keep The Profits 💰
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '40px',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 40px',
          }}
        >
          Join thousands of traders worldwide. Get funded up to{' '}
          <span style={{ color: '#FFD700', fontWeight: '700' }}>$200,000</span>{' '}
          with zero personal investment. Start your journey today!
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '50px',
          }}
        >
          <Link to="/signup" style={{
            background: 'linear-gradient(135deg, #00D4FF, #1E3A5F)',
            color: 'white',
            textDecoration: 'none',
            padding: '16px 40px',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '700',
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)',
            transition: 'all 0.3s',
            display: 'inline-block',
          }}>
            🚀 Get Funded Now
          </Link>

          <Link to="/models" style={{
            background: 'transparent',
            color: 'white',
            textDecoration: 'none',
            padding: '16px 40px',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '600',
            border: '2px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s',
            display: 'inline-block',
          }}>
            📋 View Plans
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { number: '$50M+', label: 'Funded' },
            { number: '10K+', label: 'Traders' },
            { number: '95%', label: 'Payout Rate' },
            { number: '150+', label: 'Countries' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#00D4FF',
                fontFamily: 'Poppins, sans-serif',
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                marginTop: '4px',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Bottom Wave */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100px',
        background: 'linear-gradient(to top, #0A0E17, transparent)',
        zIndex: 1,
      }} />

    </div>
  )
}

export default HeroSection