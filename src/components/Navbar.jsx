import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(10, 14, 23, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
      padding: '15px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>

      {/* LOGO */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00D4FF, #1E3A5F)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white',
            boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)',
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
      </Link>

      {/* DESKTOP MENU */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '30px',
      }} className="desktop-menu">
        {[
          { name: 'Home', path: '/' },
          { name: 'Models', path: '/models' },
          { name: 'About', path: '/about' },
          { name: 'FAQ', path: '/faq' },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.path}
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: '500',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.target.style.color = '#00D4FF'}
            onMouseLeave={e => e.target.style.color = '#ffffff'}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* BUTTONS */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Link to="/login" style={{
          color: '#00D4FF',
          textDecoration: 'none',
          fontSize: '15px',
          fontWeight: '500',
          padding: '8px 20px',
          border: '1px solid rgba(0, 212, 255, 0.4)',
          borderRadius: '8px',
          transition: 'all 0.3s',
        }}>
          Login
        </Link>

        <Link to="/signup" style={{
          background: 'linear-gradient(135deg, #00D4FF, #1E3A5F)',
          color: 'white',
          textDecoration: 'none',
          fontSize: '15px',
          fontWeight: '600',
          padding: '8px 20px',
          borderRadius: '8px',
          boxShadow: '0 0 15px rgba(0, 212, 255, 0.4)',
          transition: 'all 0.3s',
        }}>
          Get Funded 🚀
        </Link>
      </div>

      {/* MOBILE MENU BUTTON */}
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          cursor: 'pointer',
          color: 'white',
          fontSize: '24px',
        }}
        className="mobile-menu-btn"
      >
        {menuOpen ? '✕' : '☰'}
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '70px',
          left: 0,
          right: 0,
          background: '#0A0E17',
          borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}>
          {[
            { name: 'Home', path: '/' },
            { name: 'Models', path: '/models' },
            { name: 'About', path: '/about' },
            { name: 'FAQ', path: '/faq' },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '16px',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/login" style={{
            color: '#00D4FF',
            textDecoration: 'none',
            fontSize: '16px',
          }}>Login</Link>
          <Link to="/signup" style={{
            background: 'linear-gradient(135deg, #00D4FF, #1E3A5F)',
            color: 'white',
            textDecoration: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            textAlign: 'center',
          }}>Get Funded 🚀</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar