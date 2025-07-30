import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const chatStyles = {
  wrapper: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden",
  },
  header: {
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(20px)",
    padding: "16px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.3)",
    boxShadow: "0 2px 20px rgba(102,126,234,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexShrink: 0,
  },
  headerAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    objectFit: "cover",
    border: "2px solid rgba(255,255,255,0.8)",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  headerInfo: {
    flex: 1,
    minWidth: 0,
  },
  headerTitle: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#374151",
    margin: 0,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  headerSubtitle: {
    fontSize: "0.85rem",
    color: "#6b7280",
    fontWeight: 500,
    marginTop: "2px",
  },
  chatContainer: {
    flex: 1,
    background: "rgba(248,250,252,0.95)",
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  },
  messagesContainer: {
    flex: 1,
    padding: '16px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    minHeight: 0,
  },
  messageRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  messageRowSelf: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    padding: '12px 16px',
    borderRadius: '18px',
    background: 'rgba(255,255,255,0.9)',
    color: '#374151',
    fontSize: '1rem',
    maxWidth: '85%',
    wordBreak: 'break-word',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid rgba(255,255,255,0.3)',
    lineHeight: 1.4,
  },
  messageBubbleSelf: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    fontWeight: 500,
  },
  messageMeta: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    marginTop: '4px',
    marginLeft: '8px',
  },
  messageMetaSelf: {
    marginLeft: '0',
    marginRight: '8px',
  },
  inputSection: {
    padding: "12px 16px",
    background: "rgba(255,255,255,0.9)",
    borderTop: "1px solid rgba(229,231,235,0.5)",
    flexShrink: 0,
    paddingBottom: "calc(12px + env(safe-area-inset-bottom))",
  },
  inputRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-end',
    background: 'rgba(255,255,255,0.9)',
    borderRadius: '24px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    padding: '8px',
    border: '2px solid transparent',
    transition: 'border-color 0.2s ease',
  },
  inputRowFocused: {
    borderColor: 'rgba(102,126,234,0.4)',
  },
  input: {
    flex: 1,
    fontSize: '1rem',
    padding: '10px 12px',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: '#374151',
    resize: 'none',
    minHeight: '20px',
    maxHeight: '100px',
    lineHeight: 1.4,
  },
  sendBtn: {
    padding: '10px 16px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    borderRadius: '18px',
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    minWidth: '60px',
    alignSelf: 'flex-end',
  },
  sendBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    background: '#9ca3af',
  },
  empty: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#6b7280",
    background: "rgba(255,255,255,0.8)",
    borderRadius: "16px",
    margin: "20px",
  },
  emptyIcon: {
    fontSize: "3rem",
    marginBottom: "16px",
    opacity: 0.6,
  },
  emptyText: {
    fontSize: "1.2rem",
    fontWeight: 600,
    marginBottom: "8px",
    color: "#374151",
  },
  emptySubtext: {
    fontSize: "1rem",
    color: "#9ca3af",
  },
  error: {
    color: "#ef4444",
    textAlign: "center",
    margin: "12px 16px",
    background: "rgba(255,255,255,0.9)",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "0.9rem",
    border: "1px solid rgba(239,68,68,0.2)",
  },
  userNotFound: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#6b7280",
    background: "rgba(255,255,255,0.8)",
    borderRadius: "16px",
    margin: "20px",
  },
  userNotFoundIcon: {
    fontSize: "4rem",
    marginBottom: "20px",
    opacity: 0.5,
  },
  userNotFoundTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    marginBottom: "12px",
    color: "#374151",
  },
  userNotFoundText: {
    fontSize: "1rem",
    color: "#9ca3af",
    marginBottom: "24px",
  },
  loginBtn: {
    padding: '12px 24px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    borderRadius: '24px',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  
  return date.toLocaleDateString();
}

function getAvatar(user) {
  return user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || "U"}&backgroundColor=667eea,764ba2`;
}

export default function Chat() {
  const { id: receiverId } = useParams();
  const location = useLocation();
  const user = location.state?.user;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  
  const senderId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const room = [senderId, receiverId].sort().join('_');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!user || !token || !senderId) {
      navigate("/");
      return;
    }

    const fetchMessages = async () => {
      setErr('');
      try {
        const res = await axios.get(`https://socket-io-87f1.onrender.com/api/message/${room}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        setErr("Failed to fetch messages. Please try again.");
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [room, user, token, senderId, navigate]);

  const sendMessage = async () => {
    if (!newMessage.trim() || sending) return;
    setSending(true);
    setErr('');
    try {
      const res = await axios.post(
        'https://socket-io-87f1.onrender.com/api/message',
        {
          senderId,
          room,
          content: newMessage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(prev => [...prev, res.data]);
      setNewMessage('');
      inputRef.current?.focus();
    } catch (err) {
      setErr('Failed to send message. Please try again.');
    }
    setSending(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!user) {
    return (
      <div style={chatStyles.wrapper}>
        <div style={chatStyles.userNotFound}>
          <div style={chatStyles.userNotFoundIcon}>⚠️</div>
          <div style={chatStyles.userNotFoundTitle}>Session Expired</div>
          <div style={chatStyles.userNotFoundText}>
            Please go back and select a user.
          </div>
          <button
            style={chatStyles.loginBtn}
            onClick={() => navigate('/')}
            onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onTouchEnd={(e) => e.currentTarget.style.transform = 'none'}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={chatStyles.wrapper}>
      <header style={chatStyles.header}>
        <img
          src={getAvatar(user)}
          alt={user.name}
          style={chatStyles.headerAvatar}
          onError={(e) => e.target.src = getAvatar(user)}
        />
        <div style={chatStyles.headerInfo}>
          <h1 style={chatStyles.headerTitle}>{user.name}</h1>
          <div style={chatStyles.headerSubtitle}>Active now</div>
        </div>
      </header>

      <div style={chatStyles.chatContainer}>
        <div style={chatStyles.messagesContainer}>
          {messages.length === 0 && (
            <div style={chatStyles.empty}>
              <div style={chatStyles.emptyIcon}>💬</div>
              <div style={chatStyles.emptyText}>Start chatting!</div>
              <div style={chatStyles.emptySubtext}>
                Send your first message to {user.name}
              </div>
            </div>
          )}
          
          {messages.map((msg, idx) => {
            const isSelf = msg.sender._id === senderId;
            return (
              <div
                key={idx}
                style={{
                  ...chatStyles.messageRow,
                  ...(isSelf ? chatStyles.messageRowSelf : {}),
                }}
              >
                <div
                  style={{
                    ...chatStyles.messageBubble,
                    ...(isSelf ? chatStyles.messageBubbleSelf : {}),
                  }}
                >
                  {msg.content}
                </div>
                <div
                  style={{
                    ...chatStyles.messageMeta,
                    ...(isSelf ? chatStyles.messageMetaSelf : {})
                  }}
                >
                  {formatDate(msg.date)}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef}></div>
        </div>

        <div style={chatStyles.inputSection}>
          <div
            style={{
              ...chatStyles.inputRow,
              ...(inputFocused ? chatStyles.inputRowFocused : {})
            }}
          >
            <textarea
              ref={inputRef}
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder={`Message ${user.name}...`}
              style={chatStyles.input}
              disabled={sending}
              rows={1}
            />
            <button
              onClick={sendMessage}
              style={{
                ...chatStyles.sendBtn,
                ...(sending || !newMessage.trim() ? chatStyles.sendBtnDisabled : {})
              }}
              disabled={sending || !newMessage.trim()}
              onTouchStart={(e) => !e.currentTarget.disabled && (e.currentTarget.style.transform = 'scale(0.95)')}
              onTouchEnd={(e) => e.currentTarget.style.transform = 'none'}
            >
              {sending ? '...' : 'Send'}
            </button>
          </div>
        </div>

        {err && <div style={chatStyles.error}>❌ {err}</div>}
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
        }
        
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        
        /* Mobile-friendly scrollbar */
        ::-webkit-scrollbar { 
          width: 4px;
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(102,126,234,0.3);
          border-radius: 2px;
        }
        
        /* Auto-growing textarea */
        textarea {
          font-family: inherit;
        }
        
        /* Touch improvements */
        button {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        
        /* Safe area handling for mobile */
        @supports (padding: max(0px)) {
          .input-section {
            padding-bottom: max(12px, env(safe-area-inset-bottom));
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 480px) {
          .message-bubble {
            max-width: 90% !important;
          }
          
          .header-title {
            font-size: 1.1rem !important;
          }
          
          .messages-container {
            padding: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}