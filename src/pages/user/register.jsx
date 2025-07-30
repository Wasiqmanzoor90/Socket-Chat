import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

// Styles for enhanced look and feel
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden'
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
    background: `
      radial-gradient(circle at 25% 25%, #6366f1 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)
    `
  },
  wrapper: {
    maxWidth: '440px',
    width: '100%',
    padding: '40px',
    borderRadius: '24px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    position: 'relative',
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #1a1a2e 0%, #4e54c8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textAlign: 'center',
    marginBottom: '8px',
    letterSpacing: '-0.02em'
  },
  subtitle: {
    color: '#64748b',
    textAlign: 'center',
    marginBottom: '32px',
    fontSize: '1rem',
    fontWeight: 500
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%', // Ensure it takes full width within the form
    marginBottom: '20px',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '8px',
    transition: 'color 0.2s ease'
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '1rem',
    background: '#ffffff',
    transition: 'all 0.3s ease',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  inputFocus: {
    borderColor: '#6366f1',
    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)'
  },
  submitBtn: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 700,
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '8px',
    boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    position: 'relative',
    overflow: 'hidden'
  },
  submitBtnHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 15px 35px rgba(99, 102, 241, 0.4)'
  },
  link: {
    marginTop: "24px",
    color: '#64748b',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '0.95rem',
    display: 'inline-block',
    textAlign: 'center',
    width: '100%',
    transition: 'color 0.2s ease',
  },
  linkTextHighlight: {
    color: '#6366f1',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
  },
  error: {
    color: '#dc2626',
    background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
    border: '1px solid #fecaca',
    borderRadius: '12px',
    padding: '12px 16px',
    marginBottom: '20px',
    fontSize: '0.9rem',
    fontWeight: 500,
    textAlign: 'center',
    width: '100%', // Full width for messages
    animation: 'slideIn 0.3s ease-out',
  },
  success: {
    color: '#16a34a',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    border: '1px solid #bbf7d0',
    borderRadius: '12px',
    padding: '12px 16px',
    marginBottom: '20px',
    fontSize: '0.9rem',
    fontWeight: 500,
    textAlign: 'center',
    width: '100%', // Full width for messages
    animation: 'slideIn 0.3s ease-out',
  },
};

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [focusedInput, setFocusedInput] = useState('');
  const [hoveredButton, setHoveredButton] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // For animation
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true); // Trigger fade-in animation on mount
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear messages when user starts typing
    if (errorMsg) setErrorMsg("");
    if (successMsg) setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post("https://socket-io-87f1.onrender.com/api/auth/register",
        
        form
      );

      if (res.data.success) {
        setSuccessMsg("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/"), 2000); // Redirect after short delay
      } else {
        setErrorMsg(
          res.data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.msg ||
        error.response?.data?.message ||
        "Registration failed. Please try again. Network error or server issue."
      );
    }
  };

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
        }
        
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 30px white inset !important;
          -webkit-text-fill-color: #374151 !important;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div style={styles.container}>
        <div style={styles.backgroundPattern}></div>
        
        <div style={{
          ...styles.wrapper,
          transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}>
          <h1 style={styles.title}>Create Account</h1>
          <p style={styles.subtitle}>Join us and start your journey!</p>

          {errorMsg && <div style={styles.error}>{errorMsg}</div>}
          {successMsg && <div style={styles.success}>{successMsg}</div>}

          <form onSubmit={handleSubmit} style={{ width: "100%", display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={styles.inputGroup}>
              <label htmlFor="name" style={styles.label}>
                Name
              </label>
              <input
                id="name"
                style={{
                  ...styles.input,
                  ...(focusedInput === 'name' ? styles.inputFocus : {}),
                }}
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput('')}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>
                Email Address
              </label>
              <input
                id="email"
                style={{
                  ...styles.input,
                  ...(focusedInput === 'email' ? styles.inputFocus : {}),
                }}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput('')}
                placeholder="Enter your email"
                required
                autoComplete="username"
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <input
                id="password"
                style={{
                  ...styles.input,
                  ...(focusedInput === 'password' ? styles.inputFocus : {}),
                }}
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput('')}
                placeholder="Create a password"
                required
                autoComplete="new-password"
              />
            </div>
            <button
              type="submit"
              style={{
                ...styles.submitBtn,
                ...(hoveredButton ? styles.submitBtnHover : {})
              }}
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
            >
              Register
            </button>
          </form>
          {/* Use navigate for the "Sign In" link */}
          <span
            style={{ ...styles.link, ...styles.linkTextHighlight }}
            onClick={() => navigate("/login")}
          >
            Already have an account? Sign In
          </span>
        </div>
      </div>
    </>
  );
}

export default Register;