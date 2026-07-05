import { motion } from 'framer-motion'
import { useState } from 'react'

const stories = [
  {
    name: 'Rahul Sharma',
    country: '🇮🇳 India',
    image: '👨‍💼',
    earned: '$5,200',
    accountSize: '$50,000',
    model: '1 Step',
    modelColor: '#00D4FF',
    rating: 5,
    story: 'MyFundingHub changed my life! I passed the 1 step challenge in just 8 days and got my $50K account. Already made $5,200 in first month!',
    date: 'Dec 2024',
  },
  {
    name: 'Ahmed Al-Rashid',
    country: '🇦🇪 UAE',
    image: '👨‍💻',
    earned: '$12,400',
    accountSize: '$100,000',
    model: 'Instant',
    modelColor: '#FFD700',
    rating: 5,
    story: 'Best prop firm I have ever used! Got instant funding of $100K and payout was processed in less than 24 hours. Highly recommended!',
    date: 'Nov 2024',
  },
  {
    name: 'John Williams',
    country: '🇺🇸 USA',
    image: '👨‍🦱',
    earned: '$8,900',
    accountSize: '$200,000',
    model: '2 Step',
    modelColor: '#00FF88',
    rating: 5,
    story: 'The 2 step challenge was worth it! 90% profit split is amazing. Live tracking dashboard is super helpful to monitor my progress.',
    date: 'Jan 2025',
  },
  {
    name: 'Priya Patel',
    country: '🇮🇳 India',
    image: '👩‍💼',
    earned: '$3,600',
    accountSize: '$25,000',
    model: '1 Step',
    modelColor: '#00D4FF',
    rating: 5,
    story: 'As a female trader, I was skeptical at first. But MyFundingHub team was very supportive. Got funded and first payout within 2 weeks!',
    date: 'Jan 2025',
  },
  {
    name: 'Carlos Rodriguez',
    country: '🇲🇽 Mexico',
    image: '👨‍🦰',
    earned: '$15,800',
    accountSize: '$200,000',
    model: 'Instant',
    modelColor: '#FFD700',
    rating: 5,
    story: 'Instant funding is a game changer! No challenge stress. Just pure trading. Made $15,800 in 6 weeks. Payout always on time!',
    date: 'Dec 2024',
  },
  {
    name: 'Yuki Tanaka',
    country: '🇯🇵 Japan',
    image: '👨‍💼',
    earned: '$7,200',
    accountSize: '$50,000',
    model: '2 Step',
    modelColor: '#00FF88',
    rating: 5,
    story: 'Very transparent rules. No hidden conditions. The live MT5 tracking is excellent. I can see all my stats in real time on dashboard!',
    date: 'Feb 2025',
  },
]

// ===== STAR RATING =====
const StarRating = ({ rating, color }) => {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            color: star <= rating ? '#FFD700' : 'rgba(255,255,255,0.2)',
            fontSize: '16px',
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

// ===== STORY CARD =====
const StoryCard = ({ story, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        padding: '28px',
        flex: '1',
        minWidth: '280px',
        maxWidth: '360px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.border = `1px solid ${story.modelColor}44`
        e.currentTarget.style.boxShadow = `0 20px 40px ${story.modelColor}11`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Quote Icon */}
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '20px',
        fontSize: '60px',
        color: `${story.modelColor}15`,
        fontFamily: 'Georgia, serif',
        lineHeight: 1,
      }}>
        "
      </div>

      {/* Top Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '20px',
      }}>
        {/* Avatar */}
        <div style={{
          width: '55px',
          height: '55px',
          borderRadius: '50%',
          background: `${story.modelColor}22`,
          border: `2px solid ${story.modelColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '26px',
          flexShrink: 0,
        }}>
          {story.image}
        </div>

        {/* Name + Country */}
        <div>
          <div style={{
            color: 'white',
            fontWeight: '700',
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif',
          }}>
            {story.name}
          </div>
          <div style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '13px',
            marginTop: '2px',
          }}>
            {story.country}
          </div>
        </div>
      </div>

      {/* Star Rating */}
      <div style={{ marginBottom: '15px' }}>
        <StarRating rating={story.rating} />
      </div>

      {/* Story Text */}
      <p style={{
        color: 'rgba(255,255,255,0.65)',
        fontSize: '14px',
        lineHeight: '1.7',
        marginBottom: '20px',
        fontStyle: 'italic',
      }}>
        "{story.story}"
      </p>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: 'rgba(255,255,255,0.06)',
        marginBottom: '15px',
      }} />

      {/* Stats Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Earnings */}
        <div>
          <div style={{
            color: '#00FF88',
            fontWeight: '800',
            fontSize: '20px',
            fontFamily: 'Poppins, sans-serif',
          }}>
            {story.earned}
          </div>
          <div style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            Earned
          </div>
        </div>

        {/* Account Size */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            color: 'white',
            fontWeight: '700',
            fontSize: '16px',
          }}>
            {story.accountSize}
          </div>
          <div style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            Account
          </div>
        </div>

        {/* Model Badge */}
        <div style={{
          background: `${story.modelColor}22`,
          border: `1px solid ${story.modelColor}44`,
          color: story.modelColor,
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '700',
        }}>
          {story.model}
        </div>
      </div>

      {/* Date */}
      <div style={{
        color: 'rgba(255,255,255,0.25)',
        fontSize: '11px',
        marginTop: '12px',
        textAlign: 'right',
      }}>
        {story.date}
      </div>
    </motion.div>
  )
}

// ===== MAIN SUCCESS STORIES =====
const SuccessStories = () => {
  const [showAll, setShowAll] = useState(false)
  const visibleStories = showAll ? stories : stories.slice(0, 3)

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
          Success Stories
        </div>

        <h2 style={{
          fontSize: '42px',
          fontWeight: '800',
          color: 'white',
          fontFamily: 'Poppins, sans-serif',
          marginBottom: '15px',
        }}>
          Real Traders,{' '}
          <span style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Real Profits
          </span>
        </h2>

        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '16px',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          Join thousands of traders who are already making money with MyFundingHub
        </p>
      </motion.div>

      {/* Stories Grid */}
      <div style={{
        display: 'flex',
        gap: '25px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {visibleStories.map((story, i) => (
          <StoryCard key={i} story={story} index={i} />
        ))}
      </div>

      {/* Show More Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          textAlign: 'center',
          marginTop: '50px',
        }}
      >
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            background: 'transparent',
            border: '2px solid rgba(255,215,0,0.4)',
            color: '#FFD700',
            padding: '14px 40px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            e.target.style.background = 'rgba(255,215,0,0.1)'
            e.target.style.boxShadow = '0 0 20px rgba(255,215,0,0.3)'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'transparent'
            e.target.style.boxShadow = 'none'
          }}
        >
          {showAll ? '▲ Show Less' : '▼ Show More Stories'}
        </button>
      </motion.div>

    </div>
  )
}

export default SuccessStories