import { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from './chat.js';
import styles from './Chatbot.module.css';

function formatMarkdown(text) {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/(^|\n)• /g, '$1\n• ')
    .replace(/\n/g, '<br/>');
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm Whofy's assistant. Ask me anything about jobs or upload your resume for a match." }
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;
    setMessages(m => [...m, { from: 'user', text }]);
    setInput('');
    setSending(true);
    try {
      const { reply } = await sendChatMessage(text, messages);
      setMessages(m => [...m, { from: 'bot', text: reply }]);
    } catch (e) {
      setMessages(m => [...m, { from: 'bot', text: "Sorry, I couldn't reach the server. Try again in a moment." }]);
    } finally {
      setSending(false);
    }
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {open && (
        <div className={styles.panel} role="dialog" aria-label="Whofy assistant">
          <div className={styles.header}>
            <div className={styles.hInfo}>
              <div className={styles.avatar}>W</div>
              <div>
                <div className={styles.hName}>Whofy Assistant</div>
                <div className={styles.hStatus}><span className={styles.dot}></span>Online</div>
              </div>
            </div>
          </div>
          <div className={styles.body} ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.msg} ${styles[m.from]}`}>
                <div className={styles.bubble} dangerouslySetInnerHTML={{ __html: formatMarkdown(m.text) }} />
              </div>
            ))}
            {sending && (
              <div className={`${styles.msg} ${styles.bot}`}>
                <div className={styles.bubble}><span className={styles.typing}><span></span><span></span><span></span></span></div>
              </div>
            )}
          </div>
          <div className={styles.inputRow}>
            <input
              type="text"
              placeholder="Ask about jobs, companies, skills..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              disabled={sending}
            />
            <button onClick={send} disabled={!input.trim() || sending} aria-label="Send">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </button>
          </div>
        </div>
      )}
      <button
        className={styles.bubble_btn}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chatbot' : 'Open chatbot'}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        )}
      </button>
    </>
  );
}
