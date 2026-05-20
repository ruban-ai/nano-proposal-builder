// Tab 1: Nano Composer — Light Theme

// ── Design tokens ──
const C = {
  bg: '#ffffff',
  bgSubtle: '#f9fafb',
  bgMuted: '#f3f4f6',
  border: '#e5e7eb',
  borderStrong: '#d1d5db',
  accent: '#7C3AED',
  accentHover: '#6D28D9',
  accentBg: '#f5f3ff',
  accentBorder: '#ddd6fe',
  accentText: '#7C3AED',
  text: '#111827',
  textSec: '#6B7280',
  textMuted: '#9CA3AF',
  teal: '#0D9488',
  tealBg: '#f0fdfa',
  tealBorder: '#99f6e4',
  green: '#16a34a',
  greenBg: '#f0fdf4',
  greenBorder: '#bbf7d0',
  red: '#dc2626',
  redBg: '#fef2f2',
  orange: '#d97706',
  orangeBg: '#fffbeb',
  orangeBorder: '#fde68a',
};

const BADGE_MAP = {
  ai:       { label: '⚡ AI Generated', bg: C.accentBg,   color: C.accent,  border: `1px solid ${C.accentBorder}` },
  video:    { label: '▶ Video',         bg: C.redBg,      color: C.red,     border: '1px solid #fecaca' },
  free:     { label: '🎓 Free Course',  bg: C.tealBg,     color: C.teal,    border: `1px solid ${C.tealBorder}` },
  cert:     { label: '🏅 Platform Cert',bg: C.orangeBg,   color: C.orange,  border: `1px solid ${C.orangeBorder}` },
  nano:     { label: '✦ Nano Original', bg: C.accentBg,   color: C.accent,  border: `1px solid ${C.accentBorder}` },
  imported: { label: '📄 Imported',     bg: C.bgMuted,    color: C.textSec, border: `1px solid ${C.border}` },
  roleplay: { label: '🤖 Roleplay',     bg: C.accentBg,   color: C.accent,  border: `1px solid ${C.accentBorder}` },
};

const SourceBadge = ({ type }) => {
  const s = BADGE_MAP[type] || BADGE_MAP.ai;
  return (
    <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: s.bg, color: s.color, border: s.border, fontWeight: 600, whiteSpace: 'nowrap' }}>
      {s.label}
    </span>
  );
};

const ModuleCard = ({ emoji, title, duration, badges, onPreview }) => (
  <div style={{ background: C.bgSubtle, border: `1px solid ${C.border}`, borderRadius: 10, padding: '10px 12px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
    <div style={{ fontSize: 22, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bgMuted, borderRadius: 8, flexShrink: 0 }}>{emoji}</div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontWeight: 600, fontSize: 13, color: C.text, marginBottom: 3 }}>{title}</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: C.textMuted }}>⏱ {duration}</span>
        {badges.map((b, i) => <SourceBadge key={i} type={b} />)}
      </div>
    </div>
    <button onClick={onPreview} style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}`, color: C.accent, borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: 'Inter,sans-serif', fontWeight: 600, transition: 'background 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.background = C.accentBorder}
      onMouseLeave={e => e.currentTarget.style.background = C.accentBg}
    >Preview</button>
  </div>
);

const NanoAvatar = () => (
  <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: `linear-gradient(135deg, ${C.accent}, ${C.teal})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff', boxShadow: `0 0 10px ${C.accent}44` }}>N</div>
);

const INITIAL_MESSAGES = [
  { id: 1, role: 'user', text: "I need to onboard 30 new CS reps. They need product basics, handling angry customers, and GDPR compliance. Under 2 hours." },
  { id: 2, role: 'nano', text: "Got it! I've designed a 3-module onboarding path for your CS team — under 2 hours, mixing AI content, video lessons, and a verified free course. Here's what I put together:",
    modules: [
      { emoji: '📦', title: 'Product Basics', duration: '30 min', badges: ['ai'] },
      { emoji: '🎬', title: 'Handling Difficult Customers', duration: '35 min', badges: ['video', 'roleplay'] },
      { emoji: '🔒', title: 'GDPR Compliance', duration: '20 min', badges: ['free'] },
    ],
    summary: '1hr 25min · 3 modules · Certificate'
  }
];

const QUICK_PROMPTS = ['Onboard new sales reps', 'GDPR compliance training', 'Leadership for first-time managers'];

// RIGHT: Course Preview
const CoursePreviewPanel = ({ modules }) => {
  const [title, setTitle] = React.useState('CS Rep Onboarding Program');
  const [editing, setEditing] = React.useState(false);
  const [cert, setCert] = React.useState(true);
  const [expanded, setExpanded] = React.useState({});
  const accentColors = [C.accent, C.teal, C.orange];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '20px 24px', overflowY: 'auto', background: C.bgSubtle }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Course Preview</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: C.green, background: C.greenBg, padding: '2px 8px', borderRadius: 999, border: `1px solid ${C.greenBorder}`, fontWeight: 600 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, display: 'inline-block' }} /> Live
        </span>
      </div>

      <div style={{ marginBottom: 20 }}>
        {editing ? (
          <input autoFocus value={title} onChange={e => setTitle(e.target.value)} onBlur={() => setEditing(false)} onKeyDown={e => e.key === 'Enter' && setEditing(false)}
            style={{ background: '#fff', border: `1px solid ${C.accent}`, borderRadius: 8, color: C.text, padding: '8px 12px', fontSize: 14, fontWeight: 700, width: '100%', outline: 'none', fontFamily: 'Inter,sans-serif' }} />
        ) : (
          <div onClick={() => setEditing(true)} title="Click to edit"
            style={{ fontSize: 14, fontWeight: 700, color: C.text, cursor: 'text', padding: '8px 12px', borderRadius: 8, border: `1px dashed ${C.border}`, transition: 'border-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
          >✎ {title}</div>
        )}
      </div>

      <div style={{ flex: 1 }}>
        {modules.map((mod, i) => (
          <div key={i} style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 12, overflow: 'hidden', borderTop: `3px solid ${accentColors[i % accentColors.length]}`, transition: 'box-shadow 0.2s', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,0,0,0.08)`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            onClick={() => setExpanded(x => ({ ...x, [i]: !x[i] }))}
          >
            <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ background: `${accentColors[i % accentColors.length]}15`, color: accentColors[i % accentColors.length], border: `1px solid ${accentColors[i % accentColors.length]}33`, borderRadius: 999, padding: '2px 8px', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 3 }}>{mod.title}</div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, color: C.textMuted }}>⏱ {mod.duration}</span>
                  {mod.badges.map((b, j) => <SourceBadge key={j} type={b} />)}
                </div>
              </div>
              <span style={{ color: C.textMuted, fontSize: 12, transform: expanded[i] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
            </div>
            <div style={{ height: 3, background: C.bgMuted, margin: '0 14px 12px', borderRadius: 2 }} />
            {expanded[i] && (
              <div style={{ padding: '0 14px 12px', fontSize: 12, color: C.textSec, borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>
                Content is ready. Click preview to review before publishing.
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, marginBottom: 14 }}>
        <div onClick={() => setCert(c => !c)} style={{ width: 36, height: 20, borderRadius: 999, background: cert ? C.teal : C.bgMuted, border: `1px solid ${C.border}`, cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: cert ? 18 : 2, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
        </div>
        <span style={{ fontSize: 13, color: cert ? C.teal : C.textMuted, fontWeight: cert ? 600 : 400 }}>🏅 Certificate of Completion</span>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, color: C.text, marginBottom: 3 }}>⏱ Total: <b>1hr 25min</b></div>
        <div style={{ fontSize: 11, color: C.textMuted }}>Estimated build time: ~4 minutes</div>
      </div>

      <button style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg, ${C.accent}, ${C.accentHover})`, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'box-shadow 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 20px ${C.accent}55`}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
      >Publish Course →</button>
    </div>
  );
};

// MAIN COMPOSER TAB
const ComposerTab = () => {
  const [messages, setMessages] = React.useState(INITIAL_MESSAGES);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const chatEndRef = React.useRef(null);

  const modules = React.useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].modules) return messages[i].modules;
    }
    return [];
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { id: Date.now(), role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { id: Date.now() + 1, role: 'nano', text: "I've updated the course based on your feedback. Looking great — here's the revised structure:" }]);
    }, 1800);
  };

  React.useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* LEFT: Chat */}
      <div style={{ flex: '0 0 60%', display: 'flex', flexDirection: 'column', borderRight: `1px solid ${C.border}`, height: '100%' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, background: '#fff' }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Nano Composer</span>
          <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 999, background: C.accentBg, color: C.accent, border: `1px solid ${C.accentBorder}`, fontWeight: 600 }}>AI-Powered</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 16, background: C.bgSubtle }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', gap: 10, alignItems: 'flex-end' }}>
              {msg.role === 'nano' && <NanoAvatar />}
              <div style={{ maxWidth: '80%' }}>
                <div style={{ background: msg.role === 'user' ? C.accent : '#fff', color: msg.role === 'user' ? '#fff' : C.text, padding: '12px 14px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', fontSize: 13, lineHeight: 1.6, border: msg.role === 'user' ? 'none' : `1px solid ${C.border}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  {msg.text}
                  {msg.modules && (
                    <div style={{ marginTop: 12 }}>
                      {msg.modules.map((m, i) => <ModuleCard key={i} {...m} onPreview={() => {}} />)}
                      <div style={{ fontSize: 11, color: C.teal, margin: '4px 0 12px', fontWeight: 600 }}>⏱ Total: {msg.summary}</div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button style={{ flex: 1, background: '#fff', border: `1px solid ${C.border}`, color: C.textSec, borderRadius: 8, padding: '8px', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'border-color 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; }}
                        >Adjust in Chat</button>
                        <button style={{ flex: 1, background: `linear-gradient(135deg, ${C.accent}, ${C.accentHover})`, border: 'none', color: '#fff', borderRadius: 8, padding: '8px', fontSize: 12, cursor: 'pointer', fontWeight: 600, fontFamily: 'Inter,sans-serif' }}>Publish to LMS</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {typing && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
              <NanoAvatar />
              <div style={{ background: '#fff', padding: '12px 16px', borderRadius: '18px 18px 18px 4px', display: 'flex', gap: 4, alignItems: 'center', border: `1px solid ${C.border}` }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: C.accent, animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div style={{ padding: '8px 20px 0', flexShrink: 0, display: 'flex', gap: 8, flexWrap: 'wrap', background: '#fff', borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>
          {QUICK_PROMPTS.map((p, i) => (
            <button key={i} onClick={() => setInput(p)} style={{ background: C.bgSubtle, border: `1px solid ${C.border}`, color: C.textSec, borderRadius: 999, padding: '5px 12px', fontSize: 11, cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; e.currentTarget.style.background = C.accentBg; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; e.currentTarget.style.background = C.bgSubtle; }}
            >{p}</button>
          ))}
        </div>

        <div style={{ padding: '10px 20px 16px', flexShrink: 0, background: '#fff' }}>
          <div style={{ background: C.bgSubtle, border: `1px solid ${C.border}`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', transition: 'border-color 0.2s' }}
            onFocusCapture={e => e.currentTarget.style.borderColor = C.accent}
            onBlurCapture={e => e.currentTarget.style.borderColor = C.border}
          >
            <span style={{ color: C.textMuted, fontSize: 16, cursor: 'pointer' }}>📎</span>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Describe what your team needs to learn..."
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: C.text, fontSize: 13, fontFamily: 'Inter,sans-serif' }} />
            <button onClick={() => sendMessage(input)} style={{ width: 32, height: 32, borderRadius: '50%', background: C.accent, border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0, transition: 'background 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = C.accentHover; e.currentTarget.style.boxShadow = `0 2px 10px ${C.accent}55`; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.boxShadow = 'none'; }}
            >→</button>
          </div>
        </div>
      </div>

      {/* RIGHT: Preview */}
      <div style={{ flex: '0 0 40%', height: '100%', overflowY: 'auto' }}>
        <CoursePreviewPanel modules={modules} />
      </div>
    </div>
  );
};

Object.assign(window, { ComposerTab });
