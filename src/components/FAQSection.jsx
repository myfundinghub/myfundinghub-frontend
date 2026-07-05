import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const faqs = [
  {
    question: 'What is MyFundingHub?',
    answer: 'MyFundingHub is a proprietary trading firm that provides traders with funded accounts up to $200,000. You trade with our capital and keep up to 90% of the profits. Zero personal investment required.',
    icon: '🏢',
  },
  {
    question: 'How do I get funded?',
    answer: 'Simply sign up, choose your funding model (Instant, 1 Step, or 2 Step), pay the challenge fee, and start trading. Once you meet the targets, you get a real MT5 funded account.',
    icon: '💰',
  },
  {
    question: 'How does payout work?',
    answer: 'You can request a payout anytime after your first profitable period. Payouts are processed within 24 hours via bank transfer, crypto, or other supported methods.',
    icon: '💳',
  },
  {
    question: 'What trading platforms do you support?',
    answer: 'We support MetaTrader 5 (MT5). You will receive your MT5 account credentials after purchase. You can track all your trades live on your dashboard.',
    icon: '📊',
  },
  {
    question: 'Can I hold trades over the weekend?',
    answer: 'Yes! Weekend holding is allowed on all our funding models. You can also trade during news events. No restrictions on trading style.',
    icon: '📅',
  },
  {
    question: 'What is the daily drawdown limit?',
    answer: 'The daily drawdown limit is 5% and maximum drawdown is 10% on all models. These are calculated from your highest equity point of the day.',
    icon: '📉',
  },
  {
    question: 'Can I use Expert Advisors (EA/Bots)?',
    answer: 'Yes! Automated trading with EAs and bots is fully allowed. You can use any trading strategy as long as you follow our drawdown rules.',
    icon: '🤖',
  },
  {
    question: 'Is there a referral program?',
    answer: 'Yes! You get a unique referral link after signup. For every person who purchases through your link, you earn commission. Check your dashboard for referral earnings.',
    icon: '🔗',
  },
  {
    question: 'Do you offer promo codes?',
    answer: 'Yes! We regularly offer promo codes for discounts on challenge fees. Follow our social media or check your email for exclusive promo codes.',
    icon: '🎫',
  },
  {
    question: 'What happens if I fail the challenge?',
    answer: 'If you fail the challenge, you can purchase a new one. We also offer free retakes during special promotions. Your failure data helps you improve your trading.',
    icon: '🔄',
  },
]

// ===== FAQ ITEM =====
const FAQItem = ({ faq, index, isOpen, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      style={{
        background: isOpen
          ? 'rgba(0, 212, 255, 0.05)'
          : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isOpen
          ? 'rgba(0, 212, 255, 0.3)'
          : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '16px',
        marginBottom: '12px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Question */}
      <button
        onClick={onClick}
        style={{
          width: '100%',
          padding: '20px 25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '15px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
        }}>
          {/* Icon */}
          <span style={{
            fontSize: '22px',
            flexShrink: 0,
          }}>
            {faq.icon}
          </span>

          {/* Question Text */}
          <span style={{
            color: isOpen ? '#00D4FF' : 'white',
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: 'Poppins, sans-serif',
            transition: 'color 0.3s',
          }}>
            {faq.question}
          </span>
        </div>

        {/* Arrow */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            color: isOpen ? '#00D4FF' : 'rgba(255,255,255,0.4)',
            fontSize: '20px',
            flexShrink: 0,
          }}
        >
          ▼
        </motion.span>
      </button>

      {/* Answer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{
              padding: '0 25px 20px 62px',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '15px',
              lineHeight: '1.7',
            }}>
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ===== MAIN FAQ SECTION =====
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div style={{
      backgroundColor: '#0D1B2A',
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
          Got Questions?
        </div>

        <h2 style={{
          fontSize: '42px',
          fontWeight: '800',
          color: 'white',
          fontFamily: 'Poppins, sans-serif',
          marginBottom: '15px',
        }}>
          Frequently Asked{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00D4FF, #A855F7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Questions
          </span>
        </h2>

        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '16px',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          Everything you need to know about MyFundingHub
        </p>
      </motion.div>

      {/* FAQ List */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        {faqs.map((faq, i) => (
          <FAQItem
            key={i}
            faq={faq}
            index={i}
            isOpen={openIndex === i}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          textAlign: 'center',
          marginTop: '50px',
          padding: '30px',
          background: 'rgba(0,212,255,0.05)',
          border: '1px solid rgba(0,212,255,0.15)',
          borderRadius: '20px',
          maxWidth: '600px',
          margin: '50px auto 0',
        }}
      >
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '16px',
          marginBottom: '20px',
        }}>
          Still have questions? We are here to help! 🙋
        </p>
        <a
          href="mailto:support@myfundinghub.com"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #00D4FF, #1E3A5F)',
            color: 'white',
            textDecoration: 'none',
            padding: '12px 35px',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: '700',
            boxShadow: '0 0 20px rgba(0,212,255,0.3)',
          }}
        >
          📧 Contact Support
        </a>
      </motion.div>

    </div>
  )
}

export default FAQSection