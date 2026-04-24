// Tweaks panel — floats bottom-right when the host enables edit mode.
// Keys mirror EDITMODE-BEGIN block in index.html.

function TweaksPanel({ edits, onChange }) {
  const TOKENS = window.TOKENS, FONT = window.FONT;
  const [visible, setVisible] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    const handler = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode')   setVisible(true);
      if (e.data.type === '__deactivate_edit_mode') setVisible(false);
    };
    window.addEventListener('message', handler);
    try {
      window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    } catch (err) {}
    return () => window.removeEventListener('message', handler);
  }, []);

  if (!visible) return null;

  const update = (key, value) => {
    onChange({ ...edits, [key]: value });
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*');
    } catch (err) {}
  };

  const Section = ({ label, children }) => (
    <div style={{ padding: '12px 16px', borderBottom: `1px solid ${TOKENS.lineSoft}` }}>
      <div style={{
        fontFamily: FONT.ui, fontSize: 10, letterSpacing: 1.4,
        textTransform: 'uppercase', color: TOKENS.sage, fontWeight: 600,
        marginBottom: 8,
      }}>{label}</div>
      {children}
    </div>
  );

  const Segmented = ({ value, options, onSelect }) => (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      {options.map(o => (
        <button
          key={o.value}
          onClick={() => onSelect(o.value)}
          style={{
            fontFamily: FONT.ui, fontSize: 12, fontWeight: 500,
            padding: '6px 10px', borderRadius: 4,
            border: `1px solid ${value === o.value ? TOKENS.teal : TOKENS.line}`,
            background: value === o.value ? TOKENS.teal : '#FFFFFF',
            color: value === o.value ? TOKENS.ivory : TOKENS.ink,
            cursor: 'pointer',
          }}>{o.label}</button>
      ))}
    </div>
  );

  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20,
      width: open ? 280 : 150,
      background: TOKENS.ivory,
      border: `1px solid ${TOKENS.line}`,
      borderRadius: 6,
      boxShadow: '0 12px 40px rgba(26,26,46,0.14)',
      fontFamily: FONT.ui,
      zIndex: 10000, overflow: 'hidden',
    }}>
      <div style={{
        padding: '10px 14px',
        background: TOKENS.teal, color: TOKENS.ivory,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        cursor: 'pointer',
      }} onClick={() => setOpen(v => !v)}>
        <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: 0.3 }}>Tweaks</span>
        <span style={{ fontSize: 12, opacity: 0.8 }}>{open ? '—' : '+'}</span>
      </div>

      {open && (
        <>
          <Section label="Default language">
            <Segmented
              value={edits.defaultLang}
              options={[{ value: 'ta', label: 'தமிழ்' }, { value: 'en', label: 'English' }]}
              onSelect={v => update('defaultLang', v)} />
          </Section>

          <Section label="Visual direction">
            <Segmented
              value={edits.variant}
              options={[{ value: 'A', label: 'Editorial' }, { value: 'B', label: 'Bolder' }]}
              onSelect={v => update('variant', v)} />
          </Section>

          <Section label="Font scale">
            <Segmented
              value={String(edits.fontScale)}
              options={[{ value: '0.95', label: 'S' }, { value: '1', label: 'M' }, { value: '1.08', label: 'L' }]}
              onSelect={v => update('fontScale', parseFloat(v))} />
          </Section>

          <Section label="Competition cards">
            <Segmented
              value={edits.cardStyle}
              options={[{ value: 'bar', label: 'Color bar' }, { value: 'flat', label: 'Flat' }]}
              onSelect={v => update('cardStyle', v)} />
          </Section>

          <div style={{
            padding: '10px 16px',
            fontSize: 11, color: TOKENS.muted,
          }}>
            {lang === 'ta' ? '' : ''}
            Changes persist to disk.
          </div>
        </>
      )}
    </div>
  );
}

window.TweaksPanel = TweaksPanel;
