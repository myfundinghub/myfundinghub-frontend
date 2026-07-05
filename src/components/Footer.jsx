import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#060A12',
      borderTop: '1px solid rgba(0,212,255,0.15)',
      padding: '60px 40px 30px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 70%)',
        zIndex: 0,
      }} />

      {/* Main Footer Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Top Row */}
        <div style={{
          display: 'flex',
          gap: '40px',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginBottom: '50px',
        }}>

          {/* Brand Column */}
          <div style={{ maxWidth: '300px' }}>
            {/* Logo */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00D4FF, #1E3A5F)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                boxShadow: '0 0 15px rgba(0,212,255,0.4)',
              }}>
                M
              </div>
              <span style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
              }}>
                My<span style={{ color: '#00D4FF' }}>Funding</span>Hub
              </span>
            </div>

            <p style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '14px',
              lineHeight: '1.8',
              marginBottom: '25px',
            }}>
              The world's most trusted prop trading firm.
              Trade with our capital, keep up to 90% profits.
              Zero personal investment required.
            </p>

            {/* Social Links */}
            <div style={{
              display: 'flex',
              gap: '12px',
            }}>
              {[
                { icon: '📘', label: 'Facebook', color: '#1877F2' },
                { icon: '📷', label: 'Instagram', color: '#E4405F' },
                { icon: '🐦', label: 'Twitter', color: '#1DA1F2' },
                { icon: '📺', label: 'YouTube', color: '#FF0000' },
                { icon: '💬', label: 'Telegram', color: '#0088CC' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, scale: 1.1 }}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              color: '#00D4FF',
              fontSize: '15px',
              fontWeight: '700',
              marginBottom: '20px',
              fontFamily: 'Poppins, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              Quick Links
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              {[
                { name: 'Home', path: '/' },
                { name: 'Funding Models', path: '/models' },
                { name: 'How It Works', path: '/#how-it-works' },
                { name: 'Success Stories', path: '/#stories' },
                { name: 'FAQ', path: '/#faq' },
              ].map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={e => e.target.style.color = '#00D4FF'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
                >
                  <span style={{ color: '#00D4FF', fontSize: '10px' }}>▶</span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Models */}
          <div>
            <h4 style={{
              color: '#FFD700',
              fontSize: '15px',
              fontWeight: '700',
              marginBottom: '20px',
              fontFamily: 'Poppins, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              Funding Models
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              {[
                { name: '⚡ Instant Funding', path: '/models' },
                { name: '🎯 1 Step Challenge', path: '/models' },
                { name: '🏆 2 Step Challenge', path: '/models' },
              ].map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => e.target.style.color = '#FFD700'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{
              color: '#A855F7',
              fontSize: '15px',
              fontWeight: '700',
              marginBottom: '20px',
              fontFamily: 'Poppins, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              Legal
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              {[
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Refund Policy', path: '/refund' },
                { name: 'Risk Disclaimer', path: '/risk' },
              ].map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => e.target.style.color = '#A855F7'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              color: '#00FF88',
              fontSize: '15px',
              fontWeight: '700',
              marginBottom: '20px',
              fontFamily: 'Poppins, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              Contact
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}>
              {[
                { icon: '📧', text: 'support@myfundinghub.com' },
                { icon: '💬', text: 'Live Chat Support' },
                { icon: '📱', text: 'Telegram: @myfundinghub' },
                { icon: '⏰', text: '24/7 Support' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '14px',
                }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)',
          marginBottom: '30px',
        }} />

        {/* Bottom Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
        }}>
          {/* Copyright */}
          <p style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: '13px',
          }}>
            © 2025 MyFundingHub. All Rights Reserved.
          </p>

          {/* Disclaimer */}
          <p style={{
            color: 'rgba(255,255,255,0.2)',
            fontSize: '11px',
            maxWidth: '500px',
            textAlign: 'center',
            lineHeight: '1.5',
          }}>
            ⚠️ Trading involves risk. Past performance is not indicative of future results.
            Please trade responsibly.
          </p>

          {/* Made with */}
          <p style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: '13px',
          }}>
            Made with ❤️ for Traders
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer