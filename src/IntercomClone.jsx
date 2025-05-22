import React, { useState, useEffect } from 'react';
import './IntercomClone.css';
import menu from './assets/menu.png';
import botIcon from './assets/icon.png';
import flashlight from './assets/flashlight.png';
import bookmark from './assets/bookmark.png';
import emoji from './assets/emoji.png';
import sendIcon from './assets/send.png';
import arrowUpward from './assets/arrow_upward.png';
import chatIcon from './assets/chat.png';
import luis from './assets/luis.png';
import ivan from './assets/ivan.png';
import lead from './assets/lead.png';
import booking from './assets/booking.png';
import miracle from './assets/miracle.png';

const initialInboxItems = [
  { name: 'Luis · Github', message: 'Hey! I have a question...', time: '45m', active: true, avatar: luis},
  { name: 'Ivan · Nike', message: 'Hi there, I have a quest...', time: '3min', active: false, unread: true, avatar: ivan},
  { name: 'Lead from New York', message: 'Good morning, let me...', time: '40m', active: false, avatar: lead},
  { name: 'Booking API problems', message: 'Bug report', time: '45m', active: false, avatar: booking},
  { name: 'Miracle · Exemplary Bank', message: "Hey there, I'm here to...", time: '45m', active: false, avatar: miracle},
];

const initialMessages = [
  { from: 'Luis', text: "I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you'd be able to refund me, as it is un-opened.", time: '1min', self: false, avatar: luis},
  { from: 'You', text: 'Let me just look into this for you, Luis.', time: '1min', self: true },
];

export default function IntercomClone() {
  const [tab, setTab] = useState('Open');
  const [inbox, setInbox] = useState(initialInboxItems);
  const [activeIdx, setActiveIdx] = useState(0);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [copilotTab, setCopilotTab] = useState('AI Copilot');
  const [copilotInput, setCopilotInput] = useState('');
  
  // Check if we're on mobile/tablet screen
  const isMobileScreen = window.innerWidth <= 800;
  const isTabletScreen = window.innerWidth <= 1100 && window.innerWidth > 800;
  
  // Set initial visibility based on screen size
  const [isSidebarVisible, setIsSidebarVisible] = useState(!isMobileScreen);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(!isTabletScreen);

  // Add resize listener to update panel visibility
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 800;
      const isTablet = window.innerWidth <= 1100 && window.innerWidth > 800;
      
      if (isMobile) {
        setIsSidebarVisible(false);
        setIsRightPanelVisible(false);
      } else if (isTablet) {
        setIsSidebarVisible(true);
        setIsRightPanelVisible(false);
      } else {
        setIsSidebarVisible(true);
        setIsRightPanelVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sidebar tab switch
  const handleTab = (t) => setTab(t);

  // Inbox item select
  const handleInboxClick = (idx) => {
    setActiveIdx(idx);
    setInbox(inbox.map((item, i) => ({ ...item, active: i === idx })));
    // Optionally, load different messages per conversation
  };

  // Header button actions
  const handleHeaderBtn = (type) => {
    alert(type + ' button clicked!');
  };

  // Send message
  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: 'You', text: input, time: 'now', self: true }]);
      setInput('');
    }
  };

  // Input action buttons
  const handleInputAction = (type) => {
    alert(type + ' action clicked!');
  };

  // Copilot tab switch
  const handleCopilotTab = (t) => setCopilotTab(t);

  // Copilot suggested click
  const handleCopilotSuggest = () => {
    setCopilotInput('How do I get a refund?');
  };

  // Copilot input send
  const handleCopilotSend = () => {
    if (copilotInput.trim()) {
      alert('Copilot question: ' + copilotInput);
      setCopilotInput('');
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    // Close right panel when opening sidebar on mobile
    if (isMobileScreen && !isSidebarVisible) {
      setIsRightPanelVisible(false);
    }
  };

  // Toggle right panel visibility
  const toggleRightPanel = () => {
    setIsRightPanelVisible(!isRightPanelVisible);
    // Close sidebar when opening right panel on mobile
    if (isMobileScreen && !isRightPanelVisible) {
      setIsSidebarVisible(false);
    }
  };

  // Close panels when clicking overlay
  const handleOverlayClick = () => {
    if (isMobileScreen) {
      setIsSidebarVisible(false);
      setIsRightPanelVisible(false);
    }
  };

  return (
    <div className="ic-root">
      {/* Overlay */}
      <div 
        className={`ic-panel-overlay ${(isMobileScreen && (isSidebarVisible || isRightPanelVisible)) ? 'visible' : ''}`}
        onClick={handleOverlayClick}
      />

      {/* Sidebar Toggle Button */}
      {!isSidebarVisible && (
        <button className="ic-panel-toggle ic-sidebar-toggle" onClick={toggleSidebar}>
          <img src={menu} alt="Toggle Sidebar" className='left-toggle' />
        </button>
      )}

      {/* Sidebar */}
      <aside className={`ic-sidebar ${isSidebarVisible ? 'ic-sidebar-visible' : ''}`}>
        <div className="ic-sidebar-header">Your inbox</div>
        <div className="ic-sidebar-tabs">
          <span className={`ic-tab${tab === 'Open' ? ' ic-tab-active' : ''}`} onClick={() => handleTab('Open')}>5 Open</span>
          <span className={`ic-tab${tab === 'Waiting' ? ' ic-tab-active' : ''}`} onClick={() => handleTab('Waiting')}>Waiting longest</span>
        </div>
        <ul className="ic-inbox-list">
          {inbox.map((item, idx) => (
            <li key={idx} className={`ic-inbox-item${item.active ? ' ic-inbox-item-active' : ''}${item.unread ? ' ic-inbox-item-unread' : ''}`} onClick={() => handleInboxClick(idx)}>
              <div className="ic-inbox-title"><img src={item.avatar} alt="avatar" className='avatar'/>{item.name}</div>
              <div className="ic-inbox-message">{item.message}</div>
              <div className="ic-inbox-time">{item.time}</div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Chat Area */}
      <main className={`ic-main ${!isSidebarVisible ? 'ic-main-full' : ''} ${!isRightPanelVisible ? 'ic-main-full-right' : ''}`}>
        <div className="ic-main-header">
          <span className="ic-main-title">Luis Easton</span>
          <div className="ic-main-header-actions">
            <button className="ic-header-btn" onClick={toggleRightPanel}><img src={menu} alt="menu"/></button>
            <button className="ic-header-btn ic-header-btn-close" onClick={() => handleHeaderBtn('Close')}>Close</button>
          </div>
        </div>
        <div className="ic-chat-area">
          <img src={luis} alt="luis" className='main-luis'/>
          {messages.map((msg, idx) => (
            <div key={idx} className={`ic-message${msg.self ? ' ic-message-self' : ''}`}>
              <div className="ic-message-text">{msg.text}</div>
              <div className="ic-message-meta">{msg.self ? 'Seen · ' : ''}{msg.time}</div>
            </div>
          ))}
        </div>
        <div className="ic-input-area chat-composer">
          {/* Textarea and Send Button */}
          <div className='chat-input-container'>
            <p className='chat-title'>
              <img src={chatIcon} alt="Chat"/>
              Chat
            </p>
          </div>
          <div className="chat-input-row">
          <textarea
            className="chat-textarea"
            placeholder="Send a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            rows={2}
          />
          <button className="chat-send-btn" onClick={handleSend}>
              <img src={sendIcon} alt="Send"/>
            </button>
          </div>
          {/* Action buttons */}
          <div className="chat-actions">
            <button onClick={() => handleInputAction('Lightning')}><img src={flashlight} alt="flashlight" /></button>
            <button onClick={() => handleInputAction('Bookmark')}><img src={bookmark} alt="bookmark" /></button>
            <button onClick={() => handleInputAction('Emoji')}><img src={emoji} alt="emoji" /></button>
          </div>
        </div>
      </main>

      {/* Right Panel Toggle Button */}
      {!isRightPanelVisible && (
        <button className="ic-panel-toggle ic-right-panel-toggle" onClick={toggleRightPanel}>
          <img src={menu} alt="Toggle Right Panel" />
        </button>
      )}

      {/* Right Panel */}
      <aside className={`ic-right-panel ${isRightPanelVisible ? 'ic-right-panel-visible' : ''}`}>
        <div className="ic-right-tabs">
          <span className={`ic-right-tab${copilotTab === 'AI Copilot' ? ' ic-right-tab-active' : ''}`} onClick={() => handleCopilotTab('AI Copilot')}>AI Copilot</span>
          <span className={`ic-right-tab${copilotTab === 'Details' ? ' ic-right-tab-active' : ''}`} onClick={() => handleCopilotTab('Details')}>Details</span>
        </div>
        <div className="ic-copilot-content">
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
            <div className="ic-copilot-icon">
              <img src={botIcon} alt="Bot" style={{width: 40, height: 40}} />
            </div>
            <div className="ic-copilot-title">Hi, I'm Fin AI Copilot</div>
            <div className="ic-copilot-desc">Ask me anything about this conversation.</div>
          </div>
          <div className="ic-copilot-bottom">
            <div className="ic-copilot-suggested">
              <span style={{fontWeight: 700}}>Suggested</span>
              <span onClick={handleCopilotSuggest}>💸How do I get a refund?</span>
            </div>
            <div
              className="ic-copilot-input-row"
              onClick={e => e.stopPropagation()}
              onMouseDown={e => e.stopPropagation()}
              onTouchStart={e => e.stopPropagation()}
            >
              <input
                className="ic-copilot-input"
                placeholder="Ask a question..."
                value={copilotInput}
                onChange={e => setCopilotInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleCopilotSend(); }}
                onClick={e => e.stopPropagation()}
                onFocus={e => e.stopPropagation()}
                onMouseDown={e => e.stopPropagation()}
                onTouchStart={e => e.stopPropagation()}
              />
              <button className="ic-copilot-send-btn" onClick={handleCopilotSend} aria-label="Send">
                <span><img src={arrowUpward} alt="send"/></span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
} 
