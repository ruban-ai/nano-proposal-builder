// Tab 3: Import to LMS — Light Theme

const IC = {
  bg: '#ffffff', bgSubtle: '#f9fafb', bgMuted: '#f3f4f6',
  border: '#e5e7eb', borderStrong: '#d1d5db',
  accent: '#7C3AED', accentHover: '#6D28D9', accentBg: '#f5f3ff', accentBorder: '#ddd6fe',
  text: '#111827', textSec: '#6B7280', textMuted: '#9CA3AF',
  teal: '#0D9488', tealBg: '#f0fdfa', tealBorder: '#99f6e4',
  green: '#16a34a', greenBg: '#f0fdf4', greenBorder: '#bbf7d0',
  orange: '#d97706', orangeBg: '#fffbeb', orangeBorder: '#fde68a',
  red: '#dc2626', redBg: '#fef2f2', redBorder: '#fecaca',
};

const IMPORT_METHODS = [
  { id: 'url', label: '🔗 Paste URL' },
  { id: 'file', label: '📁 Upload File' },
  { id: 'library', label: '✦ From Library' },
  { id: 'scorm', label: '🎓 SCORM/xAPI' },
];

const ACCEPTED_SOURCES = ['YouTube', 'Coursera', 'edX', 'Alison', 'HubSpot', 'Any URL'];

const PROCESS_STEPS = [
  { icon: '🤖', title: 'Nano reads & analyses the content', sub: 'AI extracts structure, topics, and learning intent' },
  { icon: '✍️', title: 'Generates objectives, quiz & key takeaways', sub: 'Auto-built from content — editable before publishing' },
  { icon: '🎨', title: 'Applies Nano visual wrapper & branding', sub: 'Your brand colors, fonts, and style applied instantly' },
  { icon: '🚀', title: 'Course goes live in your LMS', sub: 'Assignable immediately — track completions in real-time' },
];

const RECENT_IMPORTS = [
  { id: 1, icon: '▶', title: 'Handling Difficult Customers', url: 'youtube.com/watch?v=abc123...', status: 'live', statusLabel: '✓ Live', statusColor: '#16a34a', statusBg: '#f0fdf4', borderColor: '#16a34a' },
  { id: 2, icon: '🎓', title: 'GDPR Compliance 2024', url: 'alison.com/course/gdpr-compliance...', status: 'live', statusLabel: '✓ Live', statusColor: '#16a34a', statusBg: '#f0fdf4', borderColor: '#16a34a' },
  { id: 3, icon: '📄', title: 'Q1 Sales Playbook', url: 'Q1_Sales_Playbook_2026.pdf', status: 'processing', statusLabel: '⚙ Processing', statusColor: '#d97706', statusBg: '#fffbeb', borderColor: '#d97706' },
  { id: 4, icon: '🌐', title: 'AI for Business Teams', url: 'google.com/garage/...', status: 'changed', statusLabel: '⚠ Source changed', statusColor: '#dc2626', statusBg: '#fef2f2', borderColor: '#dc2626' },
];

const SUPPORTED_FORMATS = ['YouTube','Coursera','edX','Alison','HubSpot','Google','AWS','Microsoft Learn','Salesforce','SCORM','xAPI','PDF','PPTX','DOCX','MP4','Any URL'];

const ImportTab = () => {
  const [activeMethod, setActiveMethod] = React.useState('url');
  const [url, setUrl] = React.useState('');
  const [dragOver, setDragOver] = React.useState(false);
  const [detecting, setDetecting] = React.useState(false);
  const [detected, setDetected] = React.useState(false);

  const handleDetect = () => {
    if (!url.trim()) return;
    setDetecting(true);
    setTimeout(() => { setDetecting(false); setDetected(true); }, 1800);
  };

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* LEFT */}
      <div style={{ flex: '0 0 55%', overflowY: 'auto', padding: '28px 32px', borderRight: `1px solid ${IC.border}`, background: '#fff' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: IC.text, marginBottom: 4 }}>Import Any Content to Nano LMS</div>
        <div style={{ fontSize: 13, color: IC.textSec, marginBottom: 22 }}>Paste a URL, upload a file, or import from the Nano Library. We handle the rest.</div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
          {IMPORT_METHODS.map(m => (
            <button key={m.id} onClick={() => setActiveMethod(m.id)} style={{ background: activeMethod === m.id ? IC.accentBg : IC.bgSubtle, border: `1px solid ${activeMethod === m.id ? IC.accentBorder : IC.border}`, color: activeMethod === m.id ? IC.accent : IC.textSec, borderRadius: 999, padding: '7px 14px', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.2s', fontWeight: activeMethod === m.id ? 600 : 400 }}>{m.label}</button>
          ))}
        </div>

        {activeMethod === 'url' && (
          <div>
            <div style={{ background: IC.bgSubtle, border: `1px solid ${detected ? IC.green : IC.border}`, borderRadius: 12, padding: '14px 16px', marginBottom: 10, transition: 'border-color 0.3s' }}>
              <input value={url} onChange={e => { setUrl(e.target.value); setDetected(false); }} placeholder="Paste a YouTube URL, course link, article, or any webpage..."
                style={{ width: '100%', background: 'none', border: 'none', outline: 'none', color: IC.text, fontSize: 13, fontFamily: 'Inter,sans-serif' }} />
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              {ACCEPTED_SOURCES.map((s, i) => (
                <span key={i} onClick={() => setUrl(`https://${s.toLowerCase()}.com/`)} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: IC.bgMuted, color: IC.textSec, border: `1px solid ${IC.border}`, cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = IC.accent; e.currentTarget.style.color = IC.accent; e.currentTarget.style.background = IC.accentBg; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = IC.border; e.currentTarget.style.color = IC.textSec; e.currentTarget.style.background = IC.bgMuted; }}
                >{s}</span>
              ))}
            </div>

            {detected && (
              <div style={{ background: IC.greenBg, border: `1px solid ${IC.greenBorder}`, borderRadius: 10, padding: '12px 16px', marginBottom: 14, fontSize: 13, color: IC.green, fontWeight: 600 }}>
                ✓ Source detected — ready to import.
              </div>
            )}

            <button onClick={handleDetect} disabled={detecting} style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', background: detecting ? `${IC.accent}88` : `linear-gradient(135deg, ${IC.accent}, ${IC.accentHover})`, color: '#fff', fontWeight: 700, fontSize: 14, cursor: detecting ? 'default' : 'pointer', fontFamily: 'Inter,sans-serif', transition: 'box-shadow 0.2s', marginBottom: 18 }}
              onMouseEnter={e => { if (!detecting) e.currentTarget.style.boxShadow = `0 4px 20px ${IC.accent}44`; }}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >{detecting ? '⏳ Detecting source...' : detected ? '🚀 Build Course from URL' : '🔍 Detect & Import'}</button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ flex: 1, height: 1, background: IC.border }} />
              <span style={{ fontSize: 12, color: IC.textMuted }}>or</span>
              <div style={{ flex: 1, height: 1, background: IC.border }} />
            </div>

            <div onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={e => { e.preventDefault(); setDragOver(false); }}
              style={{ border: `2px dashed ${dragOver ? IC.accent : IC.borderStrong}`, borderRadius: 12, padding: '32px 20px', textAlign: 'center', cursor: 'pointer', background: dragOver ? IC.accentBg : IC.bgSubtle, transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = IC.accent}
              onMouseLeave={e => { if (!dragOver) e.currentTarget.style.borderColor = IC.borderStrong; }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>☁️</div>
              <div style={{ fontSize: 13, color: IC.textSec, marginBottom: 6 }}>Drop files here or <span style={{ color: IC.accent, cursor: 'pointer', fontWeight: 600 }}>browse</span></div>
              <div style={{ fontSize: 11, color: IC.textMuted }}>PDF · PPTX · DOCX · MP4 · ZIP</div>
            </div>
          </div>
        )}

        {activeMethod !== 'url' && (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: IC.textMuted, background: IC.bgSubtle, borderRadius: 12, border: `1px solid ${IC.border}` }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{activeMethod === 'file' ? '📁' : activeMethod === 'library' ? '✦' : '🎓'}</div>
            <div style={{ fontSize: 14, color: IC.textSec, marginBottom: 8 }}>{activeMethod === 'file' ? 'Upload any file format' : activeMethod === 'library' ? 'Browse the Nano Library' : 'Import SCORM or xAPI packages'}</div>
            <div style={{ fontSize: 12 }}>Switch to Paste URL to see the full interface</div>
          </div>
        )}

        {/* Process steps */}
        <div style={{ marginTop: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: IC.text, marginBottom: 16 }}>What Happens After Import</div>
          {PROCESS_STEPS.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 20, position: 'relative' }}>
              {i < PROCESS_STEPS.length - 1 && <div style={{ position: 'absolute', left: 18, top: 36, width: 2, height: 'calc(100% + 4px)', background: `linear-gradient(${IC.accentBorder}, transparent)` }} />}
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: IC.accentBg, border: `1px solid ${IC.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, zIndex: 1 }}>{step.icon}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: IC.accent, background: IC.accentBg, border: `1px solid ${IC.accentBorder}`, borderRadius: 999, padding: '1px 7px' }}>0{i + 1}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: IC.text }}>{step.title}</span>
                </div>
                <div style={{ fontSize: 12, color: IC.textSec }}>{step.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ flex: '0 0 45%', overflowY: 'auto', padding: '28px 24px', background: IC.bgSubtle }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: IC.text }}>Recently Imported</span>
          <span style={{ fontSize: 12, color: IC.textSec, background: '#fff', border: `1px solid ${IC.border}`, borderRadius: 999, padding: '2px 8px' }}>4 courses</span>
        </div>

        {RECENT_IMPORTS.map(item => (
          <div key={item.id} style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', marginBottom: 12, border: `1px solid ${IC.border}`, borderLeft: `3px solid ${item.borderColor}`, transition: 'box-shadow 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,0,0,0.07)`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: IC.bgMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{item.icon}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: IC.text, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: IC.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.url}</div>
                </div>
              </div>
              <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 999, background: item.statusBg, color: item.statusColor, border: `1px solid ${item.borderColor}22`, fontWeight: 600, flexShrink: 0, marginLeft: 10 }}>{item.statusLabel}</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ background: 'none', border: 'none', color: IC.accent, fontSize: 12, cursor: 'pointer', padding: 0, fontFamily: 'Inter,sans-serif', fontWeight: 600 }}
                onMouseEnter={e => e.currentTarget.style.color = IC.accentHover}
                onMouseLeave={e => e.currentTarget.style.color = IC.accent}
              >View in LMS →</button>
              <button style={{ background: IC.accentBg, border: `1px solid ${IC.accentBorder}`, color: IC.accent, borderRadius: 6, padding: '4px 12px', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter,sans-serif', fontWeight: 600, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = IC.accentBorder; }}
                onMouseLeave={e => { e.currentTarget.style.background = IC.accentBg; }}
              >Assign</button>
            </div>
          </div>
        ))}

        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: IC.textMuted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Supported Formats</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {SUPPORTED_FORMATS.map((f, i) => (
              <span key={i} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: '#fff', color: IC.textSec, border: `1px solid ${IC.border}` }}>{f}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ImportTab });
