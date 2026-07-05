import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    icon: '📝',
    title: 'Sign Up',
    description: 'Create your free account in less than 2 minutes. Verify your email with OTP.',
    color: '#00D4FF',
  },
  {
    number: '02',
    icon: '💳',
    title: 'Choose Plan',
    description: 'Select your funding model — Instant, 1 Step or 2 Step. Apply promo code for discount.',
    color: '#FFD700',
  },
  {
    number: '03',
    icon: '📊',
    title: 'Start Trading',
    description: 'Get your MT5 account credentials instantly. Trade on real markets with our capital.',
    color: '#00FF88',
  },
  {
    number: '04',
    icon: '💰',
    title: 'Get Paid',
    description: 'Request payout anytime. Get paid within 24 hours directly to your account.',
    color: '#A855F7',
  },
]

const HowItWorks = () => {
  return (
    <div style={{
      backgroundColor: '#0D1B2A',
      padding: '80px 40px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background Decoration */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.03) 0%, transparent 70%)',
        zIndex: 0,
      }} />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          textAlign: 'center',
          marginBottom: '70px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{
          display: 'inline-block',
          background: 'rgba(168, 85, 247, 0.1)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: '50px',
          padding: '6px 20px',
          color: '#A855F7',
          fontSize: '13px',
          fontWeight: '600',
          marginBottom: '15px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          Simple Process
        </div>

        <h2 style={{
          fontSize: '42px',
          fontWeight: '800',
          color: 'white',
          fontFamily: 'Poppins, sans-serif',
          marginBottom: '15px',
        }}>
          How It{' '}
          <span style={{
            background: 'linear-gradient(135deg, #A855F7, #00D4FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Works
          </span>
        </h2>

        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '16px',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          4 simple steps to start your funded trading journey
        </p>
      </motion.div>

      {/* Steps */}
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Connecting Line (Desktop) */}
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '15%',
          right: '15%',
          height: '2px',
          background: 'linear-gradient(90deg, #00D4FF, #FFD700, #00FF88, #A855F7)',
          opacity: 0.3,
          zIndex: 0,
        }} />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            style={{
              flex: '1',
              minWidth: '220px',
              maxWidth: '260px',
              textAlign: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Step Circle */}
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 20px ${step.color}44`,
                  `0 0 40px ${step.color}66`,
                  `0 0 20px ${step.color}44`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: `${step.color}15`,
                border: `2px solid ${step.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '35px',
                position: 'relative',
              }}
            >
              {step.icon}

              {/* Step Number Badge */}
              <div style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: step.color,
                color: '#000',
                fontSize: '11px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {step.number}
              </div>
            </motion.div>

            {/* Title */}
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: step.color,
              fontFamily: 'Poppins, sans-serif',
              marginBottom: '12px',
            }}>
              {step.title}
            </h3>

            {/* Description */}
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '14px',
              lineHeight: '1.7',
            }}>
              {step.description}
            </p>

            {/* Arrow (between steps) */}
            {i < steps.length - 1 && (
              <div style={{
                position: 'absolute',
                right: '-20px',
                top: '40px',
                color: step.color,
                fontSize: '24px',
                opacity: 0.5,
              }}>
                →
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        style={{
          textAlign: 'center',
          marginTop: '60px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <a
          href="/signup"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #00D4FF, #1E3A5F)',
            color: 'white',
            textDecoration: 'none',
            padding: '16px 50px',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '700',
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)',
            transition: 'all 0.3s',
          }}
        >
          🚀 Start Your Journey Now
        </a>
      </motion.div>

    </div>
  )
}

export default HowItWorks