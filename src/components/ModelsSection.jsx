import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const models = [
  {
    id: 'instant',
    name: 'Instant Funding',
    icon: '⚡',
    badge: 'Most Popular',
    badgeColor: '#FFD700',
    color: '#FFD700',
    description: 'Skip the challenge! Get funded instantly and start trading right away.',
    price: '$99',
    accountSizes: ['$5,000', '$10,000', '$25,000', '$50,000', '$100,000', '$200,000'],
    features: [
      { text: 'No Challenge Required', icon: '✅' },
      { text: 'Instant MT5 Account', icon: '✅' },
      { text: 'Daily Drawdown: 5%', icon: '✅' },
      { text: 'Max Drawdown: 10%', icon: '✅' },
      { text: 'Profit Split: 80%', icon: '✅' },
      { text: 'Weekend Holding', icon: '✅' },
      { text: 'News Trading', icon: '✅' },
      { text: 'No Time Limit', icon: '✅' },
    ],
  },
  {
    id: '1-step',
    name: '1 Step Challenge',
    icon: '🎯',
    badge: 'Best Value',
    badgeColor: '#00D4FF',
    color: '#00D4FF',
    description: 'Pass 1 phase and get funded. Simple and straightforward.',
    price: '$49',
    accountSizes: ['$10,000', '$25,000', '$50,000', '$100,000', '$200,000'],
    features: [
      { text: 'Phase 1: Profit Target 8%', icon: '✅' },
      { text: 'Daily Drawdown: 5%', icon: '✅' },
      { text: 'Max Drawdown: 10%', icon: '✅' },
      { text: 'Min Trading Days: 5', icon: '✅' },
      { text: 'Profit Split: 85%', icon: '✅' },
      { text: 'Weekend Holding', icon: '✅' },
      { text: 'News Trading', icon: '✅' },
      { text: 'Leverage: 1:100', icon: '✅' },
    ],
  },
  {
    id: '2-step',
    name: '2 Step Challenge',
    icon: '🏆',
    badge: 'Highest Split',
    badgeColor: '#00FF88',
    color: '#00FF88',
    description: 'Two phase challenge with highest profit split for serious traders.',
    price: '$29',
    accountSizes: ['$10,000', '$25,000', '$50,000', '$100,000', '$200,000'],
    features: [
      { text: 'Phase 1: Profit Target 8%', icon: '✅' },
      { text: 'Phase 2: Profit Target 5%', icon: '✅' },
      { text: 'Daily Drawdown: 5%', icon: '✅' },
      { text: 'Max Drawdown: 10%', icon: '✅' },
      { text: 'Min Trading Days: 5', icon: '✅' },
      { text: 'Profit Split: 90%', icon: '✅' },
      { text: 'Weekend Holding', icon: '✅' },
      { text: 'News Trading', icon: '✅' },
    ],
  },
]

// ===== MODEL CARD =====
const ModelCard = ({ model, index }) => {
  const isMiddle = index === 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -15 }}
      style={{
        background: isMiddle
          ? `linear-gradient(135deg, rgba(0,212,255,0.1), rgba(30,58,95,0.3))`
          : 'rgba(255,255,255,0.03)',
        border: `2px solid ${isMiddle ? model.color : model.color + '44'}`,
        borderRadius: '24px',
        padding: '35px 30px',
        flex: '1',
        minWidth: '300px',
        maxWidth: '380px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isMiddle ? `0 0 40px ${model.color}22` : 'none',
      }}
    >
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${model.color}15, transparent)`,
        zIndex: 0,
      }} />

      {/* Badge */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: model.badgeColor,
        color: '#000',
        fontSize: '11px',
        fontWeight: '700',
        padding: '4px 12px',
        borderRadius: '20px',
        letterSpacing: '0.5px',
      }}>
        {model.badge}
      </div>

      {/* Icon */}
      <div style={{
        fontSize: '50px',
        marginBottom: '15px',
        position: 'relative',
        zIndex: 1,
      }}>
        {model.icon}
      </div>

      {/* Name */}
      <h3 style={{
        fontSize: '24px',
        fontWeight: '800',
        color: model.color,
        fontFamily: 'Poppins, sans-serif',
        marginBottom: '10px',
        position: 'relative',
        zIndex: 1,
      }}>
        {model.name}
      </h3>

      {/* Description */}
      <p style={{
        color: 'rgba(255,255,255,0.6)',
        fontSize: '14px',
        lineHeight: '1.6',
        marginBottom: '20px',
        position: 'relative',
        zIndex: 1,
      }}>
        {model.description}
      </p>

      {/* Starting Price */}
      <div style={{
        marginBottom: '20px',
        position: 'relative',
        zIndex: 1,
      }}>
        <span style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '13px',
        }}>Starting from </span>
        <span style={{
          color: model.color,
          fontSize: '28px',
          fontWeight: '800',
          fontFamily: 'Poppins, sans-serif',
        }}>
          {model.price}
        </span>
      </div>

      {/* Account Sizes */}
      <div style={{
        marginBottom: '25px',
        position: 'relative',
        zIndex: 1,
      }}>
        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '12px',
          marginBottom: '10px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}>
          Account Sizes:
        </p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          {model.accountSizes.map((size, i) => (
            <span key={i} style={{
              background: `${model.color}15`,
              border: `1px solid ${model.color}44`,
              color: model.color,
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
            }}>
              {size}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${model.color}44, transparent)`,
        marginBottom: '20px',
        position: 'relative',
        zIndex: 1,
      }} />

      {/* Features */}
      <div style={{
        marginBottom: '30px',
        position: 'relative',
        zIndex: 1,
      }}>
        {model.features.map((feature, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '10px',
          }}>
            <span style={{ fontSize: '14px' }}>{feature.icon}</span>
            <span style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '14px',
            }}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <Link
        to="/signup"
        style={{
          display: 'block',
          textAlign: 'center',
          background: isMiddle
            ? `linear-gradient(135deg, ${model.color}, #1E3A5F)`
            : 'transparent',
          border: `2px solid ${model.color}`,
          color: isMiddle ? 'white' : model.color,
          textDecoration: 'none',
          padding: '14px',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '700',
          transition: 'all 0.3s',
          position: 'relative',
          zIndex: 1,
          boxShadow: isMiddle ? `0 0 20px ${model.color}44` : 'none',
        }}
      >
        Get Started {model.icon}
      </Link>
    </motion.div>
  )
}

// ===== MAIN MODELS SECTION =====
const ModelsSection = () => {
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
          background: 'rgba(255, 215, 0, 0.1)',
          border: '1px solid rgba(255, 215, 0, 0.3)',
          borderRadius: '50px',
          padding: '6px 20px',
          color: '#FFD700',
          fontSize: '13px',
          fontWeight: '600',
          marginBottom: '15px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          Choose Your Path
        </div>

        <h2 style={{
          fontSize: '42px',
          fontWeight: '800',
          color: 'white',
          fontFamily: 'Poppins, sans-serif',
          marginBottom: '15px',
        }}>
          3 Ways To Get{' '}
          <span style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Funded
          </span>
        </h2>

        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '16px',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          Pick the model that suits your trading style.
          All models include real MT5 account with live tracking.
        </p>
      </motion.div>

      {/* Model Cards */}
      <div style={{
        display: 'flex',
        gap: '25px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {models.map((model, i) => (
          <ModelCard key={model.id} model={model} index={i} />
        ))}
      </div>

    </div>
  )
}

export default ModelsSection