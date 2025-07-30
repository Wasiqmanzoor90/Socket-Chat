import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// Enhanced styles object with mobile-first responsive design
const styles = {
  wrapper: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflow: "hidden",
    position: "relative",
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(255,255,255,0.08) 0%, transparent 50%)
    `,
    pointerEvents: "none",
  },
  header: {
    background: "rgba(255,255,255,0.98)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    padding: "32px 16px 20px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.3)",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(102,126,234,0.15)",
    position: "relative",
    zIndex: 10,
    '@media (min-width: 768px)': {
      padding: "40px 0 24px 0",
    }
  },
  headerTitle: {
    fontSize: "2.2rem",
    fontWeight: 800,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    margin: 0,
    letterSpacing: "-0.02em",
    textShadow: "none",
    position: "relative",
    '@media (min-width: 768px)': {
      fontSize: "3.2rem",
    }
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "#6b7280",
    margin: "8px 0 0 0",
    fontWeight: 500,
    letterSpacing: "0.02em",
    '@media (min-width: 768px)': {
      fontSize: "1.1rem",
      margin: "12px 0 0 0",
    }
  },
  content: {
    flex: 1,
    background: "rgba(248,250,252,0.95)",
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    zIndex: 5,
  },
  searchBar: {
    padding: "16px 12px",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(229,231,235,0.5)",
    display: "flex",
    justifyContent: "center",
    position: "relative",
    '@media (min-width: 768px)': {
      padding: "24px 20px",
    }
  },
  searchInputContainer: {
    position: 'relative', 
    width: '100%', 
    maxWidth: '100%',
    '@media (min-width: 768px)': {
      maxWidth: '500px',
    }
  },
  searchInput: {
    width: "100%",
    padding: "14px 20px 14px 48px",
    border: "2px solid transparent",
    borderRadius: "25px",
    fontSize: "1rem",
    outline: "none",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxSizing: "border-box",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    position: "relative",
    '@media (min-width: 768px)': {
      padding: "16px 24px 16px 56px",
      borderRadius: "50px",
      fontSize: "1.1rem",
    }
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
    fontSize: "1.1rem",
    zIndex: 10,
    '@media (min-width: 768px)': {
      left: "20px",
      fontSize: "1.2rem",
    }
  },
  userList: {
    listStyle: "none",
    padding: "0 8px",
    margin: 0,
    flex: 1,
    background: "transparent",
    overflowY: "auto",
    scrollBehavior: "smooth",
    '@media (min-width: 768px)': {
      padding: "0 16px",
    }
  },
  userItem: {
    display: "flex",
    alignItems: "center",
    padding: "16px 16px",
    marginBottom: "8px",
    borderRadius: "16px",
    cursor: "pointer",
    position: "relative",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.3)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    // Touch-friendly minimum height
    minHeight: "72px",
    '@media (min-width: 768px)': {
      padding: "20px 24px",
      marginBottom: "12px",
      borderRadius: "20px",
      minHeight: "auto",
    }
  },
  userItemHover: {
    background: "rgba(255,255,255,0.98)",
    boxShadow: "0 12px 40px rgba(102,126,234,0.15)",
    transform: "translateY(-1px) scale(1.005)",
    borderColor: "rgba(102,126,234,0.3)",
    '@media (min-width: 768px)': {
      transform: "translateY(-2px) scale(1.01)",
    }
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    marginRight: "16px",
    objectFit: "cover",
    border: "2px solid rgba(255,255,255,0.8)",
    boxShadow: "0 4px 16px rgba(102,126,234,0.2)",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    transition: "all 0.3s ease",
    flexShrink: 0,
    '@media (min-width: 768px)': {
      width: "60px",
      height: "60px",
      borderRadius: "18px",
      marginRight: "20px",
      border: "3px solid rgba(255,255,255,0.8)",
      boxShadow: "0 6px 20px rgba(102,126,234,0.2)",
    }
  },
  avatarHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 20px rgba(102,126,234,0.3)",
    '@media (min-width: 768px)': {
      boxShadow: "0 8px 25px rgba(102,126,234,0.3)",
    }
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
  },
  userName: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#1f2937",
    marginBottom: "4px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    letterSpacing: "-0.01em",
    '@media (min-width: 768px)': {
      fontSize: "1.3rem",
      marginBottom: "6px",
    }
  },
  userStatus: {
    fontSize: "0.9rem",
    color: "#6b7280",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontWeight: 500,
    flexWrap: "wrap",
    '@media (min-width: 768px)': {
      fontSize: "1rem",
      gap: "8px",
      flexWrap: "nowrap",
    }
  },
  messageTime: {
    fontSize: "0.8rem",
    color: "#ffffff",
    marginLeft: "auto",
    fontWeight: 600,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "10px",
    padding: "3px 8px",
    alignSelf: "flex-start",
    boxShadow: "0 2px 8px rgba(102,126,234,0.3)",
    flexShrink: 0,
    '@media (min-width: 768px)': {
      fontSize: "0.9rem",
      borderRadius: "12px",
      padding: "4px 12px",
      marginLeft: "8px",
      marginTop: "2px",
    }
  },
  error: {
    color: "#ef4444",
    textAlign: "center",
    margin: "16px 12px",
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(10px)",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "0.9rem",
    fontWeight: 500,
    border: "1px solid rgba(239,68,68,0.2)",
    boxShadow: "0 4px 20px rgba(239,68,68,0.1)",
    '@media (min-width: 768px)': {
      margin: "20px",
      padding: "20px",
      borderRadius: "16px",
      fontSize: "1rem",
    }
  },
  loading: {
    color: "#6b7280",
    textAlign: "center",
    margin: "40px 20px",
    fontSize: "1.1rem",
    fontWeight: 600,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    '@media (min-width: 768px)': {
      margin: "60px 20px",
      fontSize: "1.2rem",
      gap: "16px",
    }
  },
  loadingSpinner: {
    width: "28px",
    height: "28px",
    border: "3px solid rgba(102,126,234,0.2)",
    borderTop: "3px solid #667eea",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    '@media (min-width: 768px)': {
      width: "32px",
      height: "32px",
    }
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 16px",
    color: "#6b7280",
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    margin: "16px 8px",
    border: "1px solid rgba(255,255,255,0.3)",
    '@media (min-width: 768px)': {
      padding: "60px 20px",
      borderRadius: "20px",
      margin: "20px",
    }
  },
  emptyIcon: {
    fontSize: "3rem",
    marginBottom: "16px",
    opacity: 0.6,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    '@media (min-width: 768px)': {
      fontSize: "4rem",
      marginBottom: "20px",
    }
  },
  emptyText: {
    fontSize: "1.1rem",
    fontWeight: 700,
    marginBottom: "8px",
    color: "#374151",
    '@media (min-width: 768px)': {
      fontSize: "1.3rem",
      marginBottom: "12px",
    }
  },
  emptySubtext: {
    fontSize: "0.9rem",
    color: "#9ca3af",
    fontWeight: 500,
    '@media (min-width: 768px)': {
      fontSize: "1rem",
    }
  },
  recentBadge: {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    fontSize: "0.7rem",
    fontWeight: 600,
    padding: "3px 6px",
    borderRadius: "6px",
    boxShadow: "0 2px 8px rgba(16,185,129,0.3)",
    '@media (min-width: 768px)': {
      top: "12px",
      right: "12px",
      fontSize: "0.75rem",
      padding: "4px 8px",
      borderRadius: "8px",
    }
  },
  onlineIndicator: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    border: "2px solid white",
    boxShadow: "0 0 6px rgba(16,185,129,0.4)",
    flexShrink: 0,
    '@media (min-width: 768px)': {
      width: "12px",
      height: "12px",
      boxShadow: "0 0 8px rgba(16,185,129,0.4)",
    }
  },
};

// Helper function to apply responsive styles
const getResponsiveStyle = (baseStyle) => {
  const mediaQueries = baseStyle['@media (min-width: 768px)'];
  if (mediaQueries && window.innerWidth >= 768) {
    return { ...baseStyle, ...mediaQueries };
  }
  return baseStyle;
};

function formatDate(dateStr) {
  // Accepts ISO string, returns "YYYY-MM-DD HH:mm" or "MM-DD HH:mm" on mobile
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  
  // Show shorter format on mobile
  if (window.innerWidth < 768) {
    return `${m}-${d} ${h}:${min}`;
  }
  return `${y}-${m}-${d} ${h}:${min}`;
}

export default function AllUser() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [recentUserIds, setRecentUserIds] = useState([]);
  const [recentUserTimes, setRecentUserTimes] = useState({});
  const [err, setErr] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredUser, setHoveredUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!token || !userId) {
      navigate("/");
      return;
    }
    const fetchUsers = async () => {
      setLoading(true);
      setErr("");
      try {
        
        const res = await axios.get(`https://socket-io-87f1.onrender.com/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = res.data.users || res.data;
        setUsers(userData);
        setFilteredUsers(userData);
        // Get recent message info
        const latest = await axios.get(
          `https://socket-io-87f1.onrender.com/api/message/latest/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Extract user IDs and message times from recent messages
        const latestIds = [];
        const latestTimes = {};
        latest.data.forEach((msg) => {
          const otherUserId =
            msg.lastMessage.sender === userId
              ? msg.lastMessage.receiver
              : msg.lastMessage.sender;
          latestIds.push(otherUserId);
          if (msg.lastMessage.date) {
            latestTimes[otherUserId] = formatDate(msg.lastMessage.date);
          }
        });
        setRecentUserIds(latestIds);
        setRecentUserTimes(latestTimes);
      } catch (error) {
        setErr("Unable to load users. Please check your connection.");
        setTimeout(() => navigate("/"), 2000);
      }
      setLoading(false);
    };
    fetchUsers();
  }, [token, navigate, userId]);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const goToChat = (user) => {
    navigate(`/chat/${user._id}`, { state: { user } });
  };

  // Sort users: recent first
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aIsRecent = recentUserIds.includes(a._id);
    const bIsRecent = recentUserIds.includes(b._id);
    if (aIsRecent && !bIsRecent) return -1;
    if (!aIsRecent && bIsRecent) return 1;
    return 0;
  });

  return (
    <div style={getResponsiveStyle(styles.wrapper)}>
      <div style={styles.backgroundPattern}></div>
      <header style={getResponsiveStyle(styles.header)}>
        <h1 style={getResponsiveStyle(styles.headerTitle)}>Your Chats</h1>
        <div style={getResponsiveStyle(styles.subtitle)}>
          {users.length} contacts &middot; Let's get chatting! ✨
        </div>
      </header>
      <div style={styles.content}>
        <div style={getResponsiveStyle(styles.searchBar)}>
          <div style={getResponsiveStyle(styles.searchInputContainer)}>
            <div style={getResponsiveStyle(styles.searchIcon)}>🔍</div>
            <input
              type="text"
              placeholder={isMobile ? "Search..." : "Search contacts..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                ...getResponsiveStyle(styles.searchInput),
                borderColor: searchTerm ? "rgba(102,126,234,0.4)" : "transparent",
                background: searchTerm ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.9)",
                boxShadow: searchTerm 
                  ? "0 8px 30px rgba(102,126,234,0.15)" 
                  : "0 4px 20px rgba(0,0,0,0.08)",
              }}
            />
          </div>
        </div>
        {err && <div style={getResponsiveStyle(styles.error)}>❌ {err}</div>}
        {loading ? (
          <div style={getResponsiveStyle(styles.loading)}>
            <div style={getResponsiveStyle(styles.loadingSpinner)}></div>
            Loading conversations...
          </div>
        ) : (
          <ul style={getResponsiveStyle(styles.userList)}>
            {sortedUsers.length === 0 ? (
              <div style={getResponsiveStyle(styles.emptyState)}>
                <div style={getResponsiveStyle(styles.emptyIcon)}>👥</div>
                <div style={getResponsiveStyle(styles.emptyText)}>
                  {searchTerm ? "No matches found" : "No users available"}
                </div>
                <div style={getResponsiveStyle(styles.emptySubtext)}>
                  {searchTerm
                    ? "Try a different search term"
                    : "Check back later for new contacts"}
                </div>
              </div>
            ) : (
              sortedUsers.map((user) => {
                const hasRecentMessages = recentUserIds.includes(user._id);
                const messageTime = recentUserTimes[user._id];
                const isHovered = hoveredUser === user._id;
                return (
                  <li
                    key={user._id}
                    style={{
                      ...getResponsiveStyle(styles.userItem),
                      ...(isHovered && !isMobile ? getResponsiveStyle(styles.userItemHover) : {}),
                    }}
                    onClick={() => goToChat(user)}
                    onMouseEnter={() => !isMobile && setHoveredUser(user._id)}
                    onMouseLeave={() => !isMobile && setHoveredUser(null)}
                    // Touch events for mobile
                    onTouchStart={() => isMobile && setHoveredUser(user._id)}
                    onTouchEnd={() => isMobile && setHoveredUser(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Start chat with ${user.name}`}
                  >
                    {hasRecentMessages && (
                      <div style={getResponsiveStyle(styles.recentBadge)}>Recent</div>
                    )}
                    <img
                      src={
                        user.avatar ||
                        `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=667eea,764ba2`
                      }
                      alt={`${user.name}'s avatar`}
                      style={{
                        ...getResponsiveStyle(styles.avatar),
                        ...(isHovered ? getResponsiveStyle(styles.avatarHover) : {}),
                      }}
                      loading="lazy"
                    />
                    <div style={styles.userInfo}>
                      <div
                        style={{
                          ...getResponsiveStyle(styles.userName),
                          fontWeight: hasRecentMessages ? 800 : 700,
                        }}
                      >
                        {user.name}
                      </div>

                      <div style={getResponsiveStyle(styles.userStatus)}>
                        <div style={getResponsiveStyle(styles.onlineIndicator)}></div>
                        <span style={{ 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis',
                          whiteSpace: isMobile ? 'nowrap' : 'normal',
                          flex: 1,
                          minWidth: 0
                        }}>
                          {user.email || "Available for chat"}
                        </span>
                        {recentUserTimes[user._id] && (
                          <span style={getResponsiveStyle(styles.messageTime)}>
                            {recentUserTimes[user._id]}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
      {/* Enhanced global styles with mobile optimizations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        ::-webkit-scrollbar { 
          width: 4px !important; 
          background: transparent !important;
        }
        
        @media (min-width: 768px) {
          ::-webkit-scrollbar { 
            width: 6px !important; 
          }
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1) !important;
          border-radius: 10px !important;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(102,126,234,0.3) !important;
          border-radius: 10px !important;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(102,126,234,0.5) !important;
        }
        
        html { 
          scrollbar-width: thin !important; 
          scrollbar-color: rgba(102,126,234,0.3) transparent !important; 
        }
        body { 
          -ms-overflow-style: none !important;
          -webkit-overflow-scrolling: touch !important;
        }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Touch-friendly improvements */
        @media (max-width: 767px) {
          input {
            font-size: 16px !important; /* Prevents zoom on iOS */
          }
          
          /* Improve touch targets */
          button, [role="button"], input {
            min-height: 44px;
            touch-action: manipulation;
          }
        }
        
        /* Safe area padding for notched devices */
        @supports (padding: max(0px)) {
          .wrapper {
            padding-left: max(0px, env(safe-area-inset-left));
            padding-right: max(0px, env(safe-area-inset-right));
          }
        }
      `}</style>
    </div>
  );
}