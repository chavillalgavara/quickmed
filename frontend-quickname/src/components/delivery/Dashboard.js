// import React, { useState } from 'react';
// import LiveRouteTracker from './LiveRouteTracker';

// const Dashboard = ({ 
//   profileData, 
//   deliveryData, 
//   isOnline, 
//   toggleOnlineStatus, 
//   setSelectedTask, 
//   toggleNotifications, 
//   getUnreadCount, 
//   toggleAIChat,
//   setActivePage 
// }) => {
//   const [selectedStat, setSelectedStat] = useState(null);

//   const styles = {
//     mainContent: {
//       padding: '20px',
//       minHeight: '100vh',
//       backgroundColor: '#f8f9fa',
//       '@media (max-width: 768px)': {
//         padding: '16px'
//       },
//       '@media (max-width: 480px)': {
//         padding: '12px'
//       }
//     },
//     header: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'flex-start',
//       marginBottom: '24px',
//       flexWrap: 'wrap',
//       gap: '16px',
//       '@media (max-width: 768px)': {
//         flexDirection: 'column',
//         alignItems: 'stretch',
//         marginBottom: '20px'
//       }
//     },
//     headerActions: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px',
//       flexWrap: 'wrap',
//       '@media (max-width: 768px)': {
//         justifyContent: 'space-between',
//         width: '100%'
//       },
//       '@media (max-width: 480px)': {
//         gap: '8px'
//       }
//     },
//     actionButtons: {
//       display: 'flex',
//       gap: '8px',
//       '@media (max-width: 480px)': {
//         gap: '6px'
//       }
//     },
//     onlineStatus: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       backgroundColor: 'white',
//       padding: '8px 12px',
//       borderRadius: '8px',
//       border: '1px solid #e5e7eb',
//       '@media (max-width: 480px)': {
//         padding: '6px 10px'
//       }
//     },
//     statusDot: {
//       width: '8px',
//       height: '8px',
//       borderRadius: '50%',
//       display: 'inline-block'
//     },
//     statusText: {
//       fontSize: '14px',
//       fontWeight: '500',
//       color: '#374151',
//       '@media (max-width: 480px)': {
//         fontSize: '13px'
//       }
//     },
//     statusToggle: {
//       backgroundColor: 'transparent',
//       border: '1px solid #d1d5db',
//       padding: '4px 8px',
//       borderRadius: '4px',
//       fontSize: '12px',
//       cursor: 'pointer',
//       color: '#374151',
//       '@media (max-width: 480px)': {
//         fontSize: '11px',
//         padding: '3px 6px'
//       }
//     },
//     aiChatButton: {
//       backgroundColor: '#7C2A62',
//       color: 'white',
//       border: 'none',
//       borderRadius: '8px',
//       padding: '8px 16px',
//       cursor: 'pointer',
//       fontSize: '14px',
//       fontWeight: '500',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '6px',
//       '@media (max-width: 480px)': {
//         padding: '6px 12px',
//         fontSize: '13px'
//       }
//     },
//     notificationButton: {
//       backgroundColor: 'white',
//       border: '1px solid #e5e7eb',
//       borderRadius: '8px',
//       padding: '8px 12px',
//       cursor: 'pointer',
//       fontSize: '16px',
//       position: 'relative',
//       transition: 'all 0.3s ease',
//       '@media (max-width: 480px)': {
//         padding: '6px 10px',
//         fontSize: '14px'
//       }
//     },
//     notificationBadge: {
//       position: 'absolute',
//       top: '-4px',
//       right: '-4px',
//       backgroundColor: '#EF4444',
//       color: 'white',
//       borderRadius: '50%',
//       width: '16px',
//       height: '16px',
//       fontSize: '10px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontWeight: 'bold'
//     },
//     greeting: {
//       fontSize: '28px',
//       fontWeight: '700',
//       color: '#1f2937',
//       margin: '0 0 8px 0',
//       '@media (max-width: 768px)': {
//         fontSize: '24px'
//       },
//       '@media (max-width: 480px)': {
//         fontSize: '20px'
//       }
//     },
//     subtitle: {
//       fontSize: '16px',
//       color: '#6b7280',
//       margin: 0,
//       '@media (max-width: 480px)': {
//         fontSize: '14px'
//       }
//     },
//     dateDisplay: {
//       fontSize: '14px',
//       color: '#6b7280',
//       fontWeight: '500',
//       '@media (max-width: 768px)': {
//         display: 'none'
//       }
//     },
//     statsGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
//       gap: '16px',
//       marginBottom: '24px',
//       '@media (max-width: 480px)': {
//         gridTemplateColumns: 'repeat(2, 1fr)',
//         gap: '12px'
//       }
//     },
//     statCard: {
//       backgroundColor: 'white',
//       padding: '16px',
//       borderRadius: '12px',
//       boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       border: '2px solid transparent',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       minHeight: '100px',
//       '@media (max-width: 480px)': {
//         padding: '12px',
//         minHeight: '90px'
//       }
//     },
//     statCardActive: {
//       borderColor: '#7C2A62',
//       boxShadow: '0 4px 12px rgba(124, 42, 98, 0.2)',
//       transform: 'translateY(-2px)'
//     },
//     statIcon: {
//       fontSize: '20px',
//       marginBottom: '8px',
//       width: '40px',
//       height: '40px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       borderRadius: '10px',
//       '@media (max-width: 480px)': {
//         width: '36px',
//         height: '36px',
//         fontSize: '18px'
//       }
//     },
//     statContent: {
//       textAlign: 'center'
//     },
//     statNumber: {
//       fontSize: '20px',
//       fontWeight: '700',
//       color: '#1f2937',
//       margin: '0 0 4px 0',
//       '@media (max-width: 480px)': {
//         fontSize: '18px'
//       }
//     },
//     statLabel: {
//       fontSize: '12px',
//       color: '#6b7280',
//       margin: 0,
//       fontWeight: '500',
//       '@media (max-width: 480px)': {
//         fontSize: '11px'
//       }
//     },
//     contentGrid: {
//       display: 'grid',
//       gridTemplateColumns: '2fr 1fr',
//       gap: '24px',
//       '@media (max-width: 1024px)': {
//         gridTemplateColumns: '1fr'
//       }
//     },
//     section: {
//       backgroundColor: 'white',
//       borderRadius: '12px',
//       padding: '20px',
//       boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
//       border: '1px solid #e5e7eb',
//       '@media (max-width: 768px)': {
//         padding: '16px'
//       }
//     },
//     sidebarSection: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '20px'
//     },
//     sectionHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '16px',
//       '@media (max-width: 480px)': {
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//         gap: '8px'
//       }
//     },
//     sectionTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#1f2937',
//       margin: 0,
//       '@media (max-width: 480px)': {
//         fontSize: '16px'
//       }
//     },
//     viewAll: {
//       fontSize: '14px',
//       color: '#7C2A62',
//       fontWeight: '500',
//       cursor: 'pointer',
//       '@media (max-width: 480px)': {
//         fontSize: '13px'
//       }
//     },
//     tasksList: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '12px'
//     },
//     taskCard: {
//       padding: '16px',
//       border: '1px solid #e5e7eb',
//       borderRadius: '10px',
//       transition: 'all 0.3s ease',
//       '@media (max-width: 480px)': {
//         padding: '12px'
//       }
//     },
//     taskHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'flex-start',
//       marginBottom: '12px',
//       gap: '12px',
//       '@media (max-width: 480px)': {
//         flexDirection: 'column',
//         gap: '8px'
//       }
//     },
//     taskInfo: {
//       flex: 1
//     },
//     orderId: {
//       fontSize: '16px',
//       fontWeight: '600',
//       color: '#1f2937',
//       margin: '0 0 4px 0',
//       '@media (max-width: 480px)': {
//         fontSize: '15px'
//       }
//     },
//     customerName: {
//       fontSize: '14px',
//       color: '#6b7280',
//       margin: 0,
//       '@media (max-width: 480px)': {
//         fontSize: '13px'
//       }
//     },
//     taskStatus: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'flex-end',
//       gap: '4px',
//       '@media (max-width: 480px)': {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         width: '100%'
//       }
//     },
//     statusBadge: {
//       color: 'white',
//       padding: '4px 8px',
//       borderRadius: '12px',
//       fontSize: '12px',
//       fontWeight: '500',
//       '@media (max-width: 480px)': {
//         fontSize: '11px'
//       }
//     },
//     priorityBadge: {
//       fontSize: '12px',
//       fontWeight: '500',
//       '@media (max-width: 480px)': {
//         fontSize: '11px'
//       }
//     },
//     taskDetails: {
//       marginBottom: '12px'
//     },
//     locationRow: {
//       display: 'flex',
//       alignItems: 'flex-start',
//       marginBottom: '8px',
//       '@media (max-width: 480px)': {
//         flexDirection: 'column',
//         gap: '4px'
//       }
//     },
//     locationLabel: {
//       fontSize: '12px',
//       color: '#6b7280',
//       fontWeight: '500',
//       minWidth: '60px',
//       '@media (max-width: 480px)': {
//         minWidth: 'auto'
//       }
//     },
//     locationText: {
//       fontSize: '14px',
//       color: '#1f2937',
//       flex: 1,
//       '@media (max-width: 480px)': {
//         fontSize: '13px'
//       }
//     },
//     taskMeta: {
//       display: 'flex',
//       gap: '12px',
//       marginBottom: '16px',
//       flexWrap: 'wrap',
//       '@media (max-width: 480px)': {
//         gap: '8px'
//       }
//     },
//     metaItem: {
//       fontSize: '12px',
//       color: '#6b7280',
//       fontWeight: '500',
//       '@media (max-width: 480px)': {
//         fontSize: '11px'
//       }
//     },
//     taskActions: {
//       display: 'flex',
//       gap: '8px',
//       flexWrap: 'wrap',
//       '@media (max-width: 480px)': {
//         gap: '6px'
//       }
//     },
//     primaryButton: {
//       backgroundColor: '#7C2A62',
//       color: 'white',
//       border: 'none',
//       padding: '8px 12px',
//       borderRadius: '6px',
//       fontSize: '13px',
//       fontWeight: '500',
//       cursor: 'pointer',
//       transition: 'background-color 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '4px',
//       '@media (max-width: 480px)': {
//         padding: '6px 10px',
//         fontSize: '12px',
//         flex: '1 1 calc(50% - 6px)',
//         justifyContent: 'center'
//       }
//     },
//     secondaryButton: {
//       backgroundColor: 'transparent',
//       color: '#7C2A62',
//       border: '1px solid #7C2A62',
//       padding: '7px 11px',
//       borderRadius: '6px',
//       fontSize: '13px',
//       fontWeight: '500',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '4px',
//       '@media (max-width: 480px)': {
//         padding: '6px 10px',
//         fontSize: '12px',
//         flex: '1 1 calc(50% - 6px)',
//         justifyContent: 'center'
//       }
//     },
//     successButton: {
//       backgroundColor: '#10B981',
//       color: 'white',
//       border: 'none',
//       padding: '8px 12px',
//       borderRadius: '6px',
//       fontSize: '13px',
//       fontWeight: '500',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '4px',
//       '@media (max-width: 480px)': {
//         padding: '6px 10px',
//         fontSize: '12px',
//         flex: '1 1 calc(50% - 6px)',
//         justifyContent: 'center'
//       }
//     },
//     dangerButton: {
//       backgroundColor: '#EF4444',
//       color: 'white',
//       border: 'none',
//       padding: '8px 12px',
//       borderRadius: '6px',
//       fontSize: '13px',
//       fontWeight: '500',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '4px',
//       '@media (max-width: 480px)': {
//         padding: '6px 10px',
//         fontSize: '12px',
//         flex: '1 1 calc(50% - 6px)',
//         justifyContent: 'center'
//       }
//     },
//     acceptButton: {
//       backgroundColor: '#3B82F6',
//       color: 'white',
//       border: 'none',
//       padding: '8px 12px',
//       borderRadius: '6px',
//       fontSize: '13px',
//       fontWeight: '500',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '4px',
//       '@media (max-width: 480px)': {
//         padding: '6px 10px',
//         fontSize: '12px',
//         flex: '1 1 calc(50% - 6px)',
//         justifyContent: 'center'
//       }
//     },
//     statDetailPanel: {
//       backgroundColor: 'white',
//       borderRadius: '12px',
//       padding: '20px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//       border: '1px solid #e5e7eb',
//       marginBottom: '20px',
//       '@media (max-width: 768px)': {
//         padding: '16px'
//       }
//     },
//     statDetailHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '16px',
//       '@media (max-width: 480px)': {
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//         gap: '8px'
//       }
//     },
//     statDetailTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: '#1f2937',
//       margin: 0,
//       '@media (max-width: 480px)': {
//         fontSize: '16px'
//       }
//     },
//     closeButton: {
//       backgroundColor: 'transparent',
//       border: 'none',
//       fontSize: '20px',
//       cursor: 'pointer',
//       color: '#6b7280',
//       '@media (max-width: 480px)': {
//         alignSelf: 'flex-end',
//         marginTop: '-40px'
//       }
//     },
//     statDetailContent: {
//       fontSize: '14px',
//       color: '#6b7280',
//       lineHeight: '1.6',
//       '@media (max-width: 480px)': {
//         fontSize: '13px'
//       }
//     },
//     offlineMessage: {
//       backgroundColor: '#FEF3C7',
//       border: '1px solid #F59E0B',
//       borderRadius: '8px',
//       padding: '16px',
//       textAlign: 'center',
//       marginBottom: '20px',
//       '@media (max-width: 480px)': {
//         padding: '12px'
//       }
//     },
//     offlineText: {
//       color: '#92400E',
//       fontSize: '16px',
//       fontWeight: '500',
//       margin: 0,
//       '@media (max-width: 480px)': {
//         fontSize: '14px'
//       }
//     }
//   };

//   const formatIndianCurrency = (amount) => {
//     return `₹${amount.toLocaleString('en-IN')}`;
//   };

//   const getCurrentGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 18) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const getDisplayName = () => {
//     return profileData.fullName.split(' ')[0];
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'High': return '#EF4444';
//       case 'Medium': return '#F59E0B';
//       case 'Low': return '#10B981';
//       default: return '#6B7280';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'pending': return '#F59E0B';
//       case 'assigned': return '#F59E0B';
//       case 'in-progress': return '#3B82F6';
//       case 'delivered': return '#10B981';
//       case 'cancelled': return '#EF4444';
//       default: return '#6B7280';
//     }
//   };

//   const handleViewAllTasks = () => {
//     setActivePage('tasks');
//   };

//   const handleStatClick = (statKey) => {
//     if (selectedStat === statKey) {
//       setSelectedStat(null);
//     } else {
//       setSelectedStat(statKey);
//     }
//   };

//   const getStatDetails = (statKey) => {
//     const details = {
//       totalToday: {
//         title: 'Total Deliveries Today',
//         description: `You have ${deliveryData.stats.totalToday} deliveries scheduled for today.`,
//         breakdown: deliveryData.stats.breakdown?.totalToday || [
//           '3 deliveries in the morning',
//           '2 deliveries in the afternoon',
//           '1 delivery in the evening'
//         ]
//       },
//       pending: {
//         title: 'Pending Acceptance',
//         description: 'These deliveries are waiting for your acceptance.',
//         breakdown: deliveryData.stats.breakdown?.pending || [
//           '2 deliveries from Restaurant A',
//           '1 delivery from Restaurant B'
//         ]
//       },
//       inProgress: {
//         title: 'In Progress Deliveries',
//         description: 'Deliveries that are currently being processed.',
//         breakdown: deliveryData.stats.breakdown?.inProgress || [
//           '1 delivery to Customer X - 15 mins remaining',
//           '1 delivery to Customer Y - 25 mins remaining'
//         ]
//       },
//       completed: {
//         title: 'Delivered Today',
//         description: 'Successfully completed deliveries.',
//         breakdown: deliveryData.stats.breakdown?.completed || [
//           '3 deliveries completed successfully',
//           'All customers satisfied'
//         ]
//       },
//       todayEarnings: {
//         title: "Today's Earnings",
//         description: `Total earnings: ${formatIndianCurrency(deliveryData.stats.todayEarnings)}`,
//         breakdown: deliveryData.stats.breakdown?.todayEarnings || [
//           `Base delivery fees: ${formatIndianCurrency(deliveryData.stats.todayEarnings * 0.7)}`,
//           `Tips: ${formatIndianCurrency(deliveryData.stats.todayEarnings * 0.3)}`,
//           'Bonus: ₹0'
//         ]
//       },
//       cancelled: {
//         title: 'Cancelled Orders',
//         description: 'Orders that were cancelled today.',
//         breakdown: deliveryData.stats.breakdown?.cancelled || [
//           '1 order cancelled by customer',
//           '0 orders cancelled by you'
//         ]
//       }
//     };
//     return details[statKey] || { title: '', description: '', breakdown: [] };
//   };

//   const handleToggleOnline = () => {
//     if (isOnline) {
//       setSelectedStat(null);
//     }
//     toggleOnlineStatus();
//   };

//   return (
//     <div style={styles.mainContent}>
//       <div style={styles.header}>
//         <div>
//           <h1 style={styles.greeting}>{getCurrentGreeting()}, {getDisplayName()}</h1>
//           <p style={styles.subtitle}>Here's your delivery overview for today</p>
//         </div>
//         <div style={styles.headerActions}>
//           <div style={styles.onlineStatus}>
//             <span style={{
//               ...styles.statusDot,
//               backgroundColor: isOnline ? '#10B981' : '#6B7280'
//             }}></span>
//             <span style={styles.statusText}>
//               {isOnline ? 'Online' : 'Offline'}
//             </span>
//             <button
//               style={styles.statusToggle}
//               onClick={handleToggleOnline}
//             >
//               {isOnline ? 'Go Offline' : 'Go Online'}
//             </button>
//           </div>
//           <div style={styles.dateDisplay}>
//             {new Date().toLocaleDateString('en-US', {
//               weekday: 'long',
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric'
//             })}
//           </div>
//           <div style={styles.actionButtons}>
//             <button
//               style={styles.aiChatButton}
//               onClick={toggleAIChat}
//               title="AI Assistant"
//             >
//               💬
//             </button>
//             <button
//               style={styles.notificationButton}
//               onClick={toggleNotifications}
//             >
//               🔔
//               {getUnreadCount() > 0 && (
//                 <span style={styles.notificationBadge}>{getUnreadCount()}</span>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {!isOnline && (
//         <div style={styles.offlineMessage}>
//           <p style={styles.offlineText}>
//             You are currently offline. Go online to accept new deliveries and view data.
//           </p>
//         </div>
//       )}

//       {/* Real-time Stats Grid */}
//       <div style={styles.statsGrid}>
//         <div 
//           style={{
//             ...styles.statCard,
//             ...(selectedStat === 'totalToday' && styles.statCardActive)
//           }}
//           onClick={() => isOnline && handleStatClick('totalToday')}
//         >
//           <div style={{ ...styles.statIcon, backgroundColor: '#F7D9EB' }}>📦</div>
//           <div style={styles.statContent}>
//             <h3 style={styles.statNumber}>{deliveryData.stats.totalToday}</h3>
//             <p style={styles.statLabel}>Total Deliveries Today</p>
//           </div>
//         </div>

//         <div 
//           style={{
//             ...styles.statCard,
//             ...(selectedStat === 'pending' && styles.statCardActive)
//           }}
//           onClick={() => isOnline && handleStatClick('pending')}
//         >
//           <div style={{ ...styles.statIcon, backgroundColor: '#E8F4FD' }}>⏳</div>
//           <div style={styles.statContent}>
//             <h3 style={styles.statNumber}>{deliveryData.stats.pending}</h3>
//             <p style={styles.statLabel}>Pending Acceptance</p>
//           </div>
//         </div>

//         <div 
//           style={{
//             ...styles.statCard,
//             ...(selectedStat === 'inProgress' && styles.statCardActive)
//           }}
//           onClick={() => isOnline && handleStatClick('inProgress')}
//         >
//           <div style={{ ...styles.statIcon, backgroundColor: '#E8F4FD' }}>🚚</div>
//           <div style={styles.statContent}>
//             <h3 style={styles.statNumber}>{deliveryData.stats.inProgress}</h3>
//             <p style={styles.statLabel}>In Progress</p>
//           </div>
//         </div>

//         <div 
//           style={{
//             ...styles.statCard,
//             ...(selectedStat === 'completed' && styles.statCardActive)
//           }}
//           onClick={() => isOnline && handleStatClick('completed')}
//         >
//           <div style={{ ...styles.statIcon, backgroundColor: '#F0F7E8' }}>✅</div>
//           <div style={styles.statContent}>
//             <h3 style={styles.statNumber}>{deliveryData.stats.completed}</h3>
//             <p style={styles.statLabel}>Delivered</p>
//           </div>
//         </div>

//         <div 
//           style={{
//             ...styles.statCard,
//             ...(selectedStat === 'todayEarnings' && styles.statCardActive)
//           }}
//           onClick={() => isOnline && handleStatClick('todayEarnings')}
//         >
//           <div style={{ ...styles.statIcon, backgroundColor: '#FFF7ED' }}>💰</div>
//           <div style={styles.statContent}>
//             <h3 style={styles.statNumber}>{formatIndianCurrency(deliveryData.stats.todayEarnings)}</h3>
//             <p style={styles.statLabel}>Today's Earnings</p>
//           </div>
//         </div>

//         <div 
//           style={{
//             ...styles.statCard,
//             ...(selectedStat === 'cancelled' && styles.statCardActive)
//           }}
//           onClick={() => isOnline && handleStatClick('cancelled')}
//         >
//           <div style={{ ...styles.statIcon, backgroundColor: '#FEE2E2' }}>❌</div>
//           <div style={styles.statContent}>
//             <h3 style={styles.statNumber}>{deliveryData.stats.cancelled}</h3>
//             <p style={styles.statLabel}>Cancelled Orders</p>
//           </div>
//         </div>
//       </div>

//       {/* Stat Detail Panel */}
//       {isOnline && selectedStat && (
//         <div style={styles.statDetailPanel}>
//           <div style={styles.statDetailHeader}>
//             <h3 style={styles.statDetailTitle}>{getStatDetails(selectedStat).title}</h3>
//             <button 
//               style={styles.closeButton}
//               onClick={() => setSelectedStat(null)}
//             >
//               ✕
//             </button>
//           </div>
//           <div style={styles.statDetailContent}>
//             <p>{getStatDetails(selectedStat).description}</p>
//             <ul style={{ margin: '12px 0', paddingLeft: '20px' }}>
//               {getStatDetails(selectedStat).breakdown.map((item, index) => (
//                 <li key={index}>{item}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}

//       <div style={styles.contentGrid}>
//         <div style={styles.section}>
//           <div style={styles.sectionHeader}>
//             <h2 style={styles.sectionTitle}>
//               {isOnline ? 'Current Deliveries' : 'Delivery Overview'}
//             </h2>
//             {isOnline && (
//               <span
//                 style={styles.viewAll}
//                 onClick={handleViewAllTasks}
//               >
//                 View History
//               </span>
//             )}
//           </div>
//           <div style={styles.tasksList}>
//             {isOnline ? (
//               <>
//                 {/* Pending Tasks */}
//                 {deliveryData.pendingTasks.map(task => (
//                   <div key={task.id} style={styles.taskCard}>
//                     <div style={styles.taskHeader}>
//                       <div style={styles.taskInfo}>
//                         <h4 style={styles.orderId}>{task.orderId}</h4>
//                         <p style={styles.customerName}>{task.customerName}</p>
//                       </div>
//                       <div style={styles.taskStatus}>
//                         <span style={{
//                           ...styles.statusBadge,
//                           backgroundColor: getStatusColor(task.status)
//                         }}>
//                           {task.status}
//                         </span>
//                         <span style={{
//                           ...styles.priorityBadge,
//                           color: getPriorityColor(task.priority)
//                         }}>
//                           {task.priority}
//                         </span>
//                       </div>
//                     </div>

//                     <div style={styles.taskDetails}>
//                       <div style={styles.locationRow}>
//                         <span style={styles.locationLabel}>Pickup:</span>
//                         <span style={styles.locationText}>{task.pickupLocation}</span>
//                       </div>
//                       <div style={styles.locationRow}>
//                         <span style={styles.locationLabel}>Delivery:</span>
//                         <span style={styles.locationText}>{task.deliveryLocation}</span>
//                       </div>
//                     </div>

//                     <div style={styles.taskMeta}>
//                       <span style={styles.metaItem}>🕒 {task.estimatedTime}</span>
//                       <span style={styles.metaItem}>📏 {task.distance}</span>
//                       <span style={styles.metaItem}>💰 {formatIndianCurrency(task.amount)}</span>
//                     </div>

//                     <div style={styles.taskActions}>
//                       <button
//                         style={styles.acceptButton}
//                         onClick={() => setSelectedTask(task)}
//                       >
//                         ✅ Accept Delivery
//                       </button>
//                       <button
//                         style={styles.secondaryButton}
//                         onClick={() => setSelectedTask(task)}
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 ))}

//                 {/* Assigned Tasks */}
//                 {deliveryData.assignedTasks.map(task => (
//                   <div key={task.id} style={styles.taskCard}>
//                     <div style={styles.taskHeader}>
//                       <div style={styles.taskInfo}>
//                         <h4 style={styles.orderId}>{task.orderId}</h4>
//                         <p style={styles.customerName}>{task.customerName}</p>
//                       </div>
//                       <div style={styles.taskStatus}>
//                         <span style={{
//                           ...styles.statusBadge,
//                           backgroundColor: getStatusColor(task.status)
//                         }}>
//                           {task.status}
//                         </span>
//                         <span style={{
//                           ...styles.priorityBadge,
//                           color: getPriorityColor(task.priority)
//                         }}>
//                           {task.priority}
//                         </span>
//                       </div>
//                     </div>

//                     <div style={styles.taskDetails}>
//                       <div style={styles.locationRow}>
//                         <span style={styles.locationLabel}>Pickup:</span>
//                         <span style={styles.locationText}>{task.pickupLocation}</span>
//                       </div>
//                       <div style={styles.locationRow}>
//                         <span style={styles.locationLabel}>Delivery:</span>
//                         <span style={styles.locationText}>{task.deliveryLocation}</span>
//                       </div>
//                     </div>

//                     <div style={styles.taskMeta}>
//                       <span style={styles.metaItem}>🕒 {task.estimatedTime}</span>
//                       <span style={styles.metaItem}>📏 {task.distance}</span>
//                       <span style={styles.metaItem}>💰 {formatIndianCurrency(task.amount)}</span>
//                     </div>

//                     <div style={styles.taskActions}>
//                       {task.status === 'assigned' && (
//                         <button
//                           style={styles.primaryButton}
//                           onClick={() => setSelectedTask(task)}
//                         >
//                           Start Pickup
//                         </button>
//                       )}
//                       {task.status === 'in-progress' && (
//                         <button
//                           style={styles.successButton}
//                           onClick={() => setSelectedTask(task)}
//                         >
//                           Mark Delivered
//                         </button>
//                       )}
//                       <button
//                         style={styles.secondaryButton}
//                         onClick={() => setSelectedTask(task)}
//                       >
//                         View Details
//                       </button>
//                       <button
//                         style={styles.dangerButton}
//                         onClick={() => setSelectedTask(task)}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </>
//             ) : (
//               <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
//                 <p>Go online to view and accept delivery tasks.</p>
//               </div>
//             )}
//           </div>
//         </div>

//         <div style={styles.sidebarSection}>
//           <LiveRouteTracker deliveryData={deliveryData} isOnline={isOnline} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;







import React, { useState } from 'react';
import LiveRouteTracker from './LiveRouteTracker';

const Dashboard = ({ 
  profileData, 
  deliveryData, 
  isOnline, 
  toggleOnlineStatus, 
  setSelectedTask, 
  toggleNotifications, 
  getUnreadCount, 
  toggleAIChat,
  setActivePage 
}) => {
  const [selectedStat, setSelectedStat] = useState(null);

  const styles = {
    mainContent: {
      padding: '20px',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '24px',
      flexWrap: 'wrap',
      gap: '16px',
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap',
    },
    actionButtons: {
      display: 'flex',
      gap: '8px',
    },
    onlineStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: 'white',
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      minWidth: 'fit-content',
    },
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      display: 'inline-block'
    },
    statusText: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
    },
    statusToggle: {
      backgroundColor: 'transparent',
      border: '1px solid #d1d5db',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      cursor: 'pointer',
      color: '#374151',
      whiteSpace: 'nowrap',
    },
    aiChatButton: {
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 12px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      minWidth: 'fit-content',
    },
    notificationButton: {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '8px 12px',
      cursor: 'pointer',
      fontSize: '16px',
      position: 'relative',
      transition: 'all 0.3s ease',
      minWidth: 'fit-content',
    },
    notificationBadge: {
      position: 'absolute',
      top: '-4px',
      right: '-4px',
      backgroundColor: '#EF4444',
      color: 'white',
      borderRadius: '50%',
      width: '16px',
      height: '16px',
      fontSize: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    greeting: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1f2937',
      margin: '0 0 8px 0',
    },
    subtitle: {
      fontSize: '16px',
      color: '#6b7280',
      margin: 0,
    },
    dateDisplay: {
      fontSize: '14px',
      color: '#6b7280',
      fontWeight: '500',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '12px',
      marginBottom: '24px',
    },
    statCard: {
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid transparent',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      minHeight: '90px',
    },
    statCardActive: {
      borderColor: '#7C2A62',
      boxShadow: '0 4px 12px rgba(124, 42, 98, 0.2)',
      transform: 'translateY(-2px)'
    },
    statIcon: {
      fontSize: '18px',
      marginBottom: '8px',
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '10px',
    },
    statContent: {
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#1f2937',
      margin: '0 0 4px 0',
    },
    statLabel: {
      fontSize: '11px',
      color: '#6b7280',
      margin: 0,
      fontWeight: '500',
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '20px',
    },
    section: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      border: '1px solid #e5e7eb',
    },
    sidebarSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0,
    },
    viewAll: {
      fontSize: '14px',
      color: '#7C2A62',
      fontWeight: '500',
      cursor: 'pointer',
    },
    tasksList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    taskCard: {
      padding: '16px',
      border: '1px solid #e5e7eb',
      borderRadius: '10px',
      transition: 'all 0.3s ease',
    },
    taskHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px',
      gap: '12px',
    },
    taskInfo: {
      flex: 1
    },
    orderId: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 4px 0',
    },
    customerName: {
      fontSize: '14px',
      color: '#6b7280',
      margin: 0,
    },
    taskStatus: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '4px',
    },
    statusBadge: {
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '500',
    },
    priorityBadge: {
      fontSize: '11px',
      fontWeight: '500',
    },
    taskDetails: {
      marginBottom: '12px'
    },
    locationRow: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '8px',
    },
    locationLabel: {
      fontSize: '11px',
      color: '#6b7280',
      fontWeight: '500',
      minWidth: '60px',
    },
    locationText: {
      fontSize: '13px',
      color: '#1f2937',
      flex: 1,
    },
    taskMeta: {
      display: 'flex',
      gap: '12px',
      marginBottom: '16px',
      flexWrap: 'wrap',
    },
    metaItem: {
      fontSize: '11px',
      color: '#6b7280',
      fontWeight: '500',
    },
    taskActions: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
    },
    primaryButton: {
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      flex: '1 1 auto',
      minWidth: '120px',
      justifyContent: 'center',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '1px solid #7C2A62',
      padding: '7px 11px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      flex: '1 1 auto',
      minWidth: '100px',
      justifyContent: 'center',
    },
    successButton: {
      backgroundColor: '#10B981',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      flex: '1 1 auto',
      minWidth: '120px',
      justifyContent: 'center',
    },
    dangerButton: {
      backgroundColor: '#EF4444',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      flex: '1 1 auto',
      minWidth: '80px',
      justifyContent: 'center',
    },
    acceptButton: {
      backgroundColor: '#3B82F6',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      flex: '1 1 auto',
      minWidth: '140px',
      justifyContent: 'center',
    },
    statDetailPanel: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb',
      marginBottom: '20px',
    },
    statDetailHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
    },
    statDetailTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0,
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#6b7280',
    },
    statDetailContent: {
      fontSize: '14px',
      color: '#6b7280',
      lineHeight: '1.6',
    },
    offlineMessage: {
      backgroundColor: '#FEF3C7',
      border: '1px solid #F59E0B',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center',
      marginBottom: '20px',
    },
    offlineText: {
      color: '#92400E',
      fontSize: '16px',
      fontWeight: '500',
      margin: 0,
    }
  };

  // Mobile responsive styles
  const mobileStyles = {
    mainContent: {
      ...styles.mainContent,
      padding: '12px 10px',
    },
    header: {
      ...styles.header,
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '12px',
      marginBottom: '16px',
    },
    headerActions: {
      ...styles.headerActions,
      justifyContent: 'space-between',
      width: '100%',
      gap: '8px',
    },
    actionButtons: {
      ...styles.actionButtons,
      gap: '6px',
    },
    onlineStatus: {
      ...styles.onlineStatus,
      padding: '6px 10px',
      fontSize: '12px',
    },
    statusText: {
      ...styles.statusText,
      fontSize: '12px',
    },
    statusToggle: {
      ...styles.statusToggle,
      fontSize: '10px',
      padding: '3px 6px',
    },
    aiChatButton: {
      ...styles.aiChatButton,
      padding: '6px 10px',
      fontSize: '12px',
    },
    notificationButton: {
      ...styles.notificationButton,
      padding: '6px 10px',
      fontSize: '14px',
    },
    greeting: {
      ...styles.greeting,
      fontSize: '22px',
      textAlign: 'center',
    },
    subtitle: {
      ...styles.subtitle,
      fontSize: '14px',
      textAlign: 'center',
    },
    dateDisplay: {
      ...styles.dateDisplay,
      display: 'none',
    },
    statsGrid: {
      ...styles.statsGrid,
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '8px',
      marginBottom: '16px',
    },
    statCard: {
      ...styles.statCard,
      padding: '12px 8px',
      minHeight: '80px',
    },
    statIcon: {
      ...styles.statIcon,
      width: '32px',
      height: '32px',
      fontSize: '16px',
    },
    statNumber: {
      ...styles.statNumber,
      fontSize: '16px',
    },
    statLabel: {
      ...styles.statLabel,
      fontSize: '10px',
    },
    contentGrid: {
      ...styles.contentGrid,
      gridTemplateColumns: '1fr',
      gap: '16px',
    },
    section: {
      ...styles.section,
      padding: '16px',
    },
    sectionHeader: {
      ...styles.sectionHeader,
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '8px',
      marginBottom: '12px',
    },
    sectionTitle: {
      ...styles.sectionTitle,
      fontSize: '16px',
    },
    viewAll: {
      ...styles.viewAll,
      fontSize: '13px',
      alignSelf: 'flex-end',
    },
    taskCard: {
      ...styles.taskCard,
      padding: '12px',
    },
    taskHeader: {
      ...styles.taskHeader,
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '10px',
    },
    orderId: {
      ...styles.orderId,
      fontSize: '15px',
    },
    customerName: {
      ...styles.customerName,
      fontSize: '13px',
    },
    taskStatus: {
      ...styles.taskStatus,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    locationRow: {
      ...styles.locationRow,
      flexDirection: 'column',
      gap: '4px',
    },
    locationLabel: {
      ...styles.locationLabel,
      minWidth: 'auto',
    },
    locationText: {
      ...styles.locationText,
      fontSize: '12px',
    },
    taskMeta: {
      ...styles.taskMeta,
      gap: '8px',
      marginBottom: '12px',
    },
    metaItem: {
      ...styles.metaItem,
      fontSize: '10px',
    },
    taskActions: {
      ...styles.taskActions,
      gap: '6px',
    },
    primaryButton: {
      ...styles.primaryButton,
      fontSize: '11px',
      padding: '6px 8px',
      minWidth: '100px',
      flex: '1 1 calc(50% - 6px)',
    },
    secondaryButton: {
      ...styles.secondaryButton,
      fontSize: '11px',
      padding: '6px 8px',
      minWidth: '80px',
      flex: '1 1 calc(50% - 6px)',
    },
    successButton: {
      ...styles.successButton,
      fontSize: '11px',
      padding: '6px 8px',
      minWidth: '100px',
      flex: '1 1 calc(50% - 6px)',
    },
    dangerButton: {
      ...styles.dangerButton,
      fontSize: '11px',
      padding: '6px 8px',
      minWidth: '60px',
      flex: '1 1 calc(50% - 6px)',
    },
    acceptButton: {
      ...styles.acceptButton,
      fontSize: '11px',
      padding: '6px 8px',
      minWidth: '120px',
      flex: '1 1 100%',
    },
    statDetailPanel: {
      ...styles.statDetailPanel,
      padding: '16px',
    },
    statDetailHeader: {
      ...styles.statDetailHeader,
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '8px',
    },
    statDetailTitle: {
      ...styles.statDetailTitle,
      fontSize: '16px',
    },
    closeButton: {
      ...styles.closeButton,
      alignSelf: 'flex-end',
      marginTop: '-40px',
    },
    statDetailContent: {
      ...styles.statDetailContent,
      fontSize: '13px',
    },
    offlineMessage: {
      ...styles.offlineMessage,
      padding: '12px',
      marginBottom: '16px',
    },
    offlineText: {
      ...styles.offlineText,
      fontSize: '14px',
    }
  };

  const isMobile = window.innerWidth < 768;
  const currentStyles = isMobile ? mobileStyles : styles;

  const formatIndianCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getDisplayName = () => {
    return profileData.fullName.split(' ')[0];
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'assigned': return '#F59E0B';
      case 'in-progress': return '#3B82F6';
      case 'delivered': return '#10B981';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const handleViewAllTasks = () => {
    setActivePage('tasks');
  };

  const handleStatClick = (statKey) => {
    if (selectedStat === statKey) {
      setSelectedStat(null);
    } else {
      setSelectedStat(statKey);
    }
  };

  const getStatDetails = (statKey) => {
    const details = {
      totalToday: {
        title: 'Total Deliveries Today',
        description: `You have ${deliveryData.stats.totalToday} deliveries scheduled for today.`,
        breakdown: deliveryData.stats.breakdown?.totalToday || [
          '3 deliveries in the morning',
          '2 deliveries in the afternoon',
          '1 delivery in the evening'
        ]
      },
      pending: {
        title: 'Pending Acceptance',
        description: 'These deliveries are waiting for your acceptance.',
        breakdown: deliveryData.stats.breakdown?.pending || [
          '2 deliveries from Restaurant A',
          '1 delivery from Restaurant B'
        ]
      },
      inProgress: {
        title: 'In Progress Deliveries',
        description: 'Deliveries that are currently being processed.',
        breakdown: deliveryData.stats.breakdown?.inProgress || [
          '1 delivery to Customer X - 15 mins remaining',
          '1 delivery to Customer Y - 25 mins remaining'
        ]
      },
      completed: {
        title: 'Delivered Today',
        description: 'Successfully completed deliveries.',
        breakdown: deliveryData.stats.breakdown?.completed || [
          '3 deliveries completed successfully',
          'All customers satisfied'
        ]
      },
      todayEarnings: {
        title: "Today's Earnings",
        description: `Total earnings: ${formatIndianCurrency(deliveryData.stats.todayEarnings)}`,
        breakdown: deliveryData.stats.breakdown?.todayEarnings || [
          `Base delivery fees: ${formatIndianCurrency(deliveryData.stats.todayEarnings * 0.7)}`,
          `Tips: ${formatIndianCurrency(deliveryData.stats.todayEarnings * 0.3)}`,
          'Bonus: ₹0'
        ]
      },
      cancelled: {
        title: 'Cancelled Orders',
        description: 'Orders that were cancelled today.',
        breakdown: deliveryData.stats.breakdown?.cancelled || [
          '1 order cancelled by customer',
          '0 orders cancelled by you'
        ]
      }
    };
    return details[statKey] || { title: '', description: '', breakdown: [] };
  };

  const handleToggleOnline = () => {
    if (isOnline) {
      setSelectedStat(null);
    }
    toggleOnlineStatus();
  };

  return (
    <div style={currentStyles.mainContent}>
      <div style={currentStyles.header}>
        <div>
          <h1 style={currentStyles.greeting}>{getCurrentGreeting()}, {getDisplayName()}</h1>
          <p style={currentStyles.subtitle}>Here's your delivery overview for today</p>
        </div>
        <div style={currentStyles.headerActions}>
          <div style={currentStyles.onlineStatus}>
            <span style={{
              ...currentStyles.statusDot,
              backgroundColor: isOnline ? '#10B981' : '#6B7280'
            }}></span>
            <span style={currentStyles.statusText}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <button
              style={currentStyles.statusToggle}
              onClick={handleToggleOnline}
            >
              {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </div>
          {!isMobile && (
            <div style={currentStyles.dateDisplay}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          )}
          <div style={currentStyles.actionButtons}>
            <button
              style={currentStyles.aiChatButton}
              onClick={toggleAIChat}
              title="AI Assistant"
            >
              💬
            </button>
            <button
              style={currentStyles.notificationButton}
              onClick={toggleNotifications}
            >
              🔔
              {getUnreadCount() > 0 && (
                <span style={currentStyles.notificationBadge}>{getUnreadCount()}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {!isOnline && (
        <div style={currentStyles.offlineMessage}>
          <p style={currentStyles.offlineText}>
            You are currently offline. Go online to accept new deliveries and view data.
          </p>
        </div>
      )}

      {/* Real-time Stats Grid */}
      <div style={currentStyles.statsGrid}>
        <div 
          style={{
            ...currentStyles.statCard,
            ...(selectedStat === 'totalToday' && currentStyles.statCardActive)
          }}
          onClick={() => isOnline && handleStatClick('totalToday')}
        >
          <div style={{ ...currentStyles.statIcon, backgroundColor: '#F7D9EB' }}>📦</div>
          <div style={currentStyles.statContent}>
            <h3 style={currentStyles.statNumber}>{deliveryData.stats.totalToday}</h3>
            <p style={currentStyles.statLabel}>Total Deliveries Today</p>
          </div>
        </div>

        <div 
          style={{
            ...currentStyles.statCard,
            ...(selectedStat === 'pending' && currentStyles.statCardActive)
          }}
          onClick={() => isOnline && handleStatClick('pending')}
        >
          <div style={{ ...currentStyles.statIcon, backgroundColor: '#E8F4FD' }}>⏳</div>
          <div style={currentStyles.statContent}>
            <h3 style={currentStyles.statNumber}>{deliveryData.stats.pending}</h3>
            <p style={currentStyles.statLabel}>Pending Acceptance</p>
          </div>
        </div>

        <div 
          style={{
            ...currentStyles.statCard,
            ...(selectedStat === 'inProgress' && currentStyles.statCardActive)
          }}
          onClick={() => isOnline && handleStatClick('inProgress')}
        >
          <div style={{ ...currentStyles.statIcon, backgroundColor: '#E8F4FD' }}>🚚</div>
          <div style={currentStyles.statContent}>
            <h3 style={currentStyles.statNumber}>{deliveryData.stats.inProgress}</h3>
            <p style={currentStyles.statLabel}>In Progress</p>
          </div>
        </div>

        <div 
          style={{
            ...currentStyles.statCard,
            ...(selectedStat === 'completed' && currentStyles.statCardActive)
          }}
          onClick={() => isOnline && handleStatClick('completed')}
        >
          <div style={{ ...currentStyles.statIcon, backgroundColor: '#F0F7E8' }}>✅</div>
          <div style={currentStyles.statContent}>
            <h3 style={currentStyles.statNumber}>{deliveryData.stats.completed}</h3>
            <p style={currentStyles.statLabel}>Delivered</p>
          </div>
        </div>

        <div 
          style={{
            ...currentStyles.statCard,
            ...(selectedStat === 'todayEarnings' && currentStyles.statCardActive)
          }}
          onClick={() => isOnline && handleStatClick('todayEarnings')}
        >
          <div style={{ ...currentStyles.statIcon, backgroundColor: '#FFF7ED' }}>💰</div>
          <div style={currentStyles.statContent}>
            <h3 style={currentStyles.statNumber}>{formatIndianCurrency(deliveryData.stats.todayEarnings)}</h3>
            <p style={currentStyles.statLabel}>Today's Earnings</p>
          </div>
        </div>

        <div 
          style={{
            ...currentStyles.statCard,
            ...(selectedStat === 'cancelled' && currentStyles.statCardActive)
          }}
          onClick={() => isOnline && handleStatClick('cancelled')}
        >
          <div style={{ ...currentStyles.statIcon, backgroundColor: '#FEE2E2' }}>❌</div>
          <div style={currentStyles.statContent}>
            <h3 style={currentStyles.statNumber}>{deliveryData.stats.cancelled}</h3>
            <p style={currentStyles.statLabel}>Cancelled Orders</p>
          </div>
        </div>
      </div>

      {/* Stat Detail Panel */}
      {isOnline && selectedStat && (
        <div style={currentStyles.statDetailPanel}>
          <div style={currentStyles.statDetailHeader}>
            <h3 style={currentStyles.statDetailTitle}>{getStatDetails(selectedStat).title}</h3>
            <button 
              style={currentStyles.closeButton}
              onClick={() => setSelectedStat(null)}
            >
              ✕
            </button>
          </div>
          <div style={currentStyles.statDetailContent}>
            <p>{getStatDetails(selectedStat).description}</p>
            <ul style={{ margin: '12px 0', paddingLeft: '20px' }}>
              {getStatDetails(selectedStat).breakdown.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div style={currentStyles.contentGrid}>
        <div style={currentStyles.section}>
          <div style={currentStyles.sectionHeader}>
            <h2 style={currentStyles.sectionTitle}>
              {isOnline ? 'Current Deliveries' : 'Delivery Overview'}
            </h2>
            {isOnline && (
              <span
                style={currentStyles.viewAll}
                onClick={handleViewAllTasks}
              >
                View History
              </span>
            )}
          </div>
          <div style={currentStyles.tasksList}>
            {isOnline ? (
              <>
                {/* Pending Tasks */}
                {deliveryData.pendingTasks.map(task => (
                  <div key={task.id} style={currentStyles.taskCard}>
                    <div style={currentStyles.taskHeader}>
                      <div style={currentStyles.taskInfo}>
                        <h4 style={currentStyles.orderId}>{task.orderId}</h4>
                        <p style={currentStyles.customerName}>{task.customerName}</p>
                      </div>
                      <div style={currentStyles.taskStatus}>
                        <span style={{
                          ...currentStyles.statusBadge,
                          backgroundColor: getStatusColor(task.status)
                        }}>
                          {task.status}
                        </span>
                        <span style={{
                          ...currentStyles.priorityBadge,
                          color: getPriorityColor(task.priority)
                        }}>
                          {task.priority}
                        </span>
                      </div>
                    </div>

                    <div style={currentStyles.taskDetails}>
                      <div style={currentStyles.locationRow}>
                        <span style={currentStyles.locationLabel}>Pickup:</span>
                        <span style={currentStyles.locationText}>{task.pickupLocation}</span>
                      </div>
                      <div style={currentStyles.locationRow}>
                        <span style={currentStyles.locationLabel}>Delivery:</span>
                        <span style={currentStyles.locationText}>{task.deliveryLocation}</span>
                      </div>
                    </div>

                    <div style={currentStyles.taskMeta}>
                      <span style={currentStyles.metaItem}>🕒 {task.estimatedTime}</span>
                      <span style={currentStyles.metaItem}>📏 {task.distance}</span>
                      <span style={currentStyles.metaItem}>💰 {formatIndianCurrency(task.amount)}</span>
                    </div>

                    <div style={currentStyles.taskActions}>
                      <button
                        style={currentStyles.acceptButton}
                        onClick={() => setSelectedTask(task)}
                      >
                        ✅ Accept Delivery
                      </button>
                      <button
                        style={currentStyles.secondaryButton}
                        onClick={() => setSelectedTask(task)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}

                {/* Assigned Tasks */}
                {deliveryData.assignedTasks.map(task => (
                  <div key={task.id} style={currentStyles.taskCard}>
                    <div style={currentStyles.taskHeader}>
                      <div style={currentStyles.taskInfo}>
                        <h4 style={currentStyles.orderId}>{task.orderId}</h4>
                        <p style={currentStyles.customerName}>{task.customerName}</p>
                      </div>
                      <div style={currentStyles.taskStatus}>
                        <span style={{
                          ...currentStyles.statusBadge,
                          backgroundColor: getStatusColor(task.status)
                        }}>
                          {task.status}
                        </span>
                        <span style={{
                          ...currentStyles.priorityBadge,
                          color: getPriorityColor(task.priority)
                        }}>
                          {task.priority}
                        </span>
                      </div>
                    </div>

                    <div style={currentStyles.taskDetails}>
                      <div style={currentStyles.locationRow}>
                        <span style={currentStyles.locationLabel}>Pickup:</span>
                        <span style={currentStyles.locationText}>{task.pickupLocation}</span>
                      </div>
                      <div style={currentStyles.locationRow}>
                        <span style={currentStyles.locationLabel}>Delivery:</span>
                        <span style={currentStyles.locationText}>{task.deliveryLocation}</span>
                      </div>
                    </div>

                    <div style={currentStyles.taskMeta}>
                      <span style={currentStyles.metaItem}>🕒 {task.estimatedTime}</span>
                      <span style={currentStyles.metaItem}>📏 {task.distance}</span>
                      <span style={currentStyles.metaItem}>💰 {formatIndianCurrency(task.amount)}</span>
                    </div>

                    <div style={currentStyles.taskActions}>
                      {task.status === 'assigned' && (
                        <button
                          style={currentStyles.primaryButton}
                          onClick={() => setSelectedTask(task)}
                        >
                          Start Pickup
                        </button>
                      )}
                      {task.status === 'in-progress' && (
                        <button
                          style={currentStyles.successButton}
                          onClick={() => setSelectedTask(task)}
                        >
                          Mark Delivered
                        </button>
                      )}
                      <button
                        style={currentStyles.secondaryButton}
                        onClick={() => setSelectedTask(task)}
                      >
                        View Details
                      </button>
                      <button
                        style={currentStyles.dangerButton}
                        onClick={() => setSelectedTask(task)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                <p>Go online to view and accept delivery tasks.</p>
              </div>
            )}
          </div>
        </div>

        <div style={currentStyles.sidebarSection}>
          <LiveRouteTracker deliveryData={deliveryData} isOnline={isOnline} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;