import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function LandingPage() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [touchedButton, setTouchedButton] = useState(false);
  const [touchedCards, setTouchedCards] = useState({});

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#1a1a2e',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      margin: 0,
      padding: '20px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      paddingTop: 'max(20px, env(safe-area-inset-top))',
      paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
    },
    heroSection: {
      transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
      opacity: isLoaded ? 1 : 0,
      transition: 'all 0.8s ease-out',
      marginBottom: '2rem',
      width: '100%',
    },
    mainTitle: {
      fontSize: 'clamp(2.5rem, 12vw, 6rem)',
      fontWeight: 'bold',
      margin: '0 0 0.5rem 0',
      color: '#ffffff',
      lineHeight: 1.1,
    },
    subtitle: {
      fontSize: 'clamp(2rem, 10vw, 4rem)',
      fontWeight: 'bold',
      margin: '0 0 1rem 0',
      color: '#6366f1',
      lineHeight: 1.1,
    },
    description: {
      transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
      opacity: isLoaded ? 1 : 0,
      transition: 'all 0.8s ease-out 0.2s',
      marginBottom: '2rem',
      width: '100%',
      maxWidth: '600px',
    },
    mainDescription: {
      fontSize: 'clamp(1.1rem, 4vw, 1.25rem)',
      color: '#cccccc',
      marginBottom: '0.75rem',
      lineHeight: 1.5,
    },
    subDescription: {
      fontSize: 'clamp(0.9rem, 3vw, 1rem)',
      color: '#999999',
      marginBottom: '0',
      lineHeight: 1.4,
    },
    ctaSection: {
      transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
      opacity: isLoaded ? 1 : 0,
      transition: 'all 0.8s ease-out 0.4s',
      marginBottom: '3rem',
    },
    ctaButton: {
      padding: '14px 32px',
      fontSize: 'clamp(1rem, 4vw, 1.125rem)',
      fontWeight: '600',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      background: '#6366f1',
      transition: 'all 0.2s ease',
      boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3)',
      minWidth: '140px',
      minHeight: '48px',
      touchAction: 'manipulation',
      WebkitTapHighlightColor: 'transparent',
    },
    featuresGrid: {
      transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
      opacity: isLoaded ? 1 : 0,
      transition: 'all 0.8s ease-out 0.6s',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      maxWidth: '900px',
      width: '100%',
    },
    featureCard: {
      padding: '1.5rem',
      borderRadius: '12px',
      background: '#2d2d44',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      minHeight: '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      touchAction: 'manipulation',
      WebkitTapHighlightColor: 'transparent',
    },
    featureTitle: {
      fontSize: 'clamp(1rem, 4vw, 1.125rem)',
      fontWeight: '600',
      color: 'white',
      marginBottom: '0.5rem',
      lineHeight: 1.3,
    },
    featureDescription: {
      color: '#cccccc',
      fontSize: 'clamp(0.8rem, 3vw, 0.875rem)',
      lineHeight: 1.4,
      margin: 0,
    }
  };

  const features = [
    { title: "Lightning Fast", desc: "Instant messaging with zero lag and real-time updates" },
    { title: "Secure & Private", desc: "End-to-end encrypted conversations for complete privacy" },
    { title: "Beautiful Design", desc: "Stunning interface that adapts to your preferences" }
  ];

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body {
          margin: 0;
          padding: 0;
          background: #1a1a2e;
          overflow-x: hidden;
        }
        
        /* Mobile specific styles */
        @media (max-width: 768px) {
          .hero-section {
            margin-bottom: 1.5rem !important;
          }
          
          .description {
            margin-bottom: 1.5rem !important;
          }
          
          .cta-section {
            margin-bottom: 2rem !important;
          }
          
          .features-grid {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
          
          .feature-card {
            padding: 1.25rem !important;
            min-height: 100px !important;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 16px !important;
          }
          
          .main-title {
            margin-bottom: 0.25rem !important;
          }
          
          .subtitle {
            margin-bottom: 0.75rem !important;
          }
          
          .main-description {
            margin-bottom: 0.5rem !important;
          }
          
          .cta-button {
            padding: 12px 28px !important;
            min-width: 120px !important;
            min-height: 44px !important;
          }
          
          .feature-card {
            padding: 1rem !important;
            min-height: 90px !important;
          }
        }
        
        /* Touch improvements */
        button:active {
          transform: scale(0.98) !important;
        }
        
        .feature-card:active {
          transform: scale(0.98) !important;
        }
        
        /* Prevent text selection on touch */
        .no-select {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        /* Safe area support */
        @supports (padding: max(0px)) {
          .container {
            padding-top: max(20px, env(safe-area-inset-top)) !important;
            padding-bottom: max(20px, env(safe-area-inset-bottom)) !important;
          }
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Focus styles for accessibility */
        button:focus-visible {
          outline: 2px solid #6366f1;
          outline-offset: 2px;
        }
      `}</style>

      <div style={styles.container} className="container">
        {/* Hero section */}
        <div style={styles.heroSection} className="hero-section">
          <h1 style={styles.mainTitle} className="main-title no-select">Let's Chat</h1>
          <h2 style={styles.subtitle} className="subtitle no-select">Together</h2>
        </div>

        {/* Description */}
        <div style={styles.description} className="description">
          <p style={styles.mainDescription} className="main-description">
            Connect, communicate, and collaborate in real-time
          </p>
          <p style={styles.subDescription}>
            Experience seamless conversations with beautiful design
          </p>
        </div>

        {/* CTA Button */}
        <div style={styles.ctaSection} className="cta-section">
          <button
            style={{
              ...styles.ctaButton,
              transform: touchedButton ? 'scale(0.95)' : 'scale(1)',
              boxShadow: touchedButton 
                ? '0 4px 15px rgba(99, 102, 241, 0.4)' 
                : '0 6px 20px rgba(99, 102, 241, 0.3)'
            }}
            className="cta-button"
            onTouchStart={() => setTouchedButton(true)}
            onTouchEnd={() => setTouchedButton(false)}
            onMouseDown={() => setTouchedButton(true)}
            onMouseUp={() => setTouchedButton(false)}
            onMouseLeave={() => setTouchedButton(false)}
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>

        {/* Features */}
        <div style={styles.featuresGrid} className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                ...styles.featureCard,
                transform: touchedCards[index] ? 'scale(0.98)' : 'scale(1)',
                background: touchedCards[index] ? '#3d3d5c' : '#2d2d44'
              }}
              className="feature-card"
              onTouchStart={() => setTouchedCards(prev => ({ ...prev, [index]: true }))}
              onTouchEnd={() => setTouchedCards(prev => ({ ...prev, [index]: false }))}
              onMouseDown={() => setTouchedCards(prev => ({ ...prev, [index]: true }))}
              onMouseUp={() => setTouchedCards(prev => ({ ...prev, [index]: false }))}
              onMouseLeave={() => setTouchedCards(prev => ({ ...prev, [index]: false }))}
            >
              <h3 style={styles.featureTitle} className="no-select">{feature.title}</h3>
              <p style={styles.featureDescription} className="no-select">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default LandingPage;