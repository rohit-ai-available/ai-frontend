import React, { useState } from 'react';

const FlexPrintingLanding = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeNav, setActiveNav] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  const services = [
    { icon: '🖨️', title: 'Digital Printing', desc: 'High-quality color prints' },
    { icon: '📋', title: 'Flex Banners', desc: 'Durable flex printing' },
    { icon: '🎨', title: 'Custom Design', desc: 'Creative solutions' },
  ];

  return (
    <div style={{ fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', overflowX: 'hidden' }}>
      {/* Navigation */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ color: '#ff1493', margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>
          FlexPrint
        </h2>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Home', 'Services', 'Contact'].map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveNav(idx)}
              style={{
                background: 'none',
                border: 'none',
                color: activeNav === idx ? '#ff1493' : '#fff',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: activeNav === idx ? '600' : '400',
                transition: 'color 0.3s',
                borderBottom: activeNav === idx ? '2px solid #ff1493' : '2px solid transparent',
                paddingBottom: '0.25rem',
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(20, 20, 60, 0.6) 100%)',
          /* FIXED: The URL must be a string */
          backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(20, 20, 60, 0.6) 100%), url("https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?q=80&w=2000")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          paddingTop: '80px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '700px', padding: '2rem', zIndex: 10 }}>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
              fontWeight: '800',
              color: '#fff',
              marginBottom: '1.5rem',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
            }}
          >
            Transform Your Ideas Into Reality
          </h1>

          <p
            style={{
              fontSize: '1.2rem',
              color: '#d0d0d0',
              marginBottom: '2.5rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
              lineHeight: '1.7',
            }}
          >
            Professional flex printing services with cutting-edge technology and expert craftsmanship
          </p>

          {/* CTA Form */}
          <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxWidth: '450px', margin: '0 auto' }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: '1 1 250px',
                  padding: '0.8rem 1rem',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  flex: '1 1 120px',
                  padding: '0.8rem 2rem',
                  backgroundColor: '#ff1493',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontSize: '1rem',
                }}
              >
                Get Quote
              </button>
            </div>
            {submitted && (
              <p style={{ color: '#4ade80', marginTop: '1rem', fontSize: '0.9rem', fontWeight: '600' }}>
                ✓ Thanks! We'll be in touch soon.
              </p>
            )}
          </form>

          {/* Feature Badges */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['⚡ Fast Turnaround', '🎯 High Quality', '💰 Best Price'].map((badge, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 20, 147, 0.2)',
                  border: '1px solid rgba(255, 20, 147, 0.5)',
                  color: '#ffd4e5',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="bounce-animation" style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ color: '#fff', fontSize: '2rem', opacity: 0.7 }}>↓</div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '5rem 2rem', background: '#0a0a1e', color: '#fff' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', fontWeight: '700' }}>
          Our Services
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
          {services.map((service, idx) => (
            <div
              key={idx}
              className="service-card"
              style={{
                backgroundColor: 'rgba(255, 20, 147, 0.05)',
                border: '1px solid rgba(255, 20, 147, 0.2)',
                padding: '2.5rem 2rem',
                borderRadius: '16px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{service.icon}</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: '600' }}>
                {service.title}
              </h3>
              <p style={{ color: '#b0b0b0', fontSize: '1rem', lineHeight: '1.6' }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#050505', color: '#888', textAlign: 'center', padding: '3rem 2rem', borderTop: '1px solid rgba(255, 20, 147, 0.2)' }}>
        <p style={{ margin: '0.5rem 0' }}>© 2024 FlexPrint. All rights reserved.</p>
        <p style={{ margin: '0.5rem 0', color: '#ff1493', fontWeight: '600' }}>Premium Printing Solutions</p>
      </footer>

      {/* Global CSS for Animations and Hover */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(10px); opacity: 1; }
        }
        .bounce-animation {
          animation: bounce 2s infinite ease-in-out;
        }
        .service-card:hover {
          background-color: rgba(255, 20, 147, 0.15) !important;
          transform: translateY(-10px);
          border-color: rgba(255, 20, 147, 0.6) !important;
          box-shadow: 0 10px 30px rgba(255, 20, 147, 0.1);
        }
        button:hover {
          filter: brightness(1.2);
        }
      `}</style>
    </div>
  );
};

export default FlexPrintingLanding;