// App shell — holds lang + route state, renders a page inside a frame.
// Route scheme:
//   home
//   competitions | dates | about | start
//   comp:<id>        - competition detail
//   flow:<role>:<i>  - guided flow (variant A)
//   dash:<role>      - dashboard flow (variant B)

function App({ device, variant, initialRoute }) {
  const { TopBar, Home, Competitions, CompetitionDetail, KeyDates, StartHere, About,
          GuidedFlow, RoleDashboard, TOKENS } = window;
  const initialLang = (window.__TWEAKS && window.__TWEAKS.defaultLang) || 'ta';
  const [lang, setLang] = React.useState(initialLang);
  const [route, setRoute] = React.useState(initialRoute || 'home');

  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [route]);

  let content = null;
  if (route === 'home') content = <Home lang={lang} setRoute={setRoute} device={device} variant={variant} />;
  else if (route === 'competitions') content = <Competitions lang={lang} setRoute={setRoute} device={device} route={route} />;
  else if (route === 'dates') content = <KeyDates lang={lang} setRoute={setRoute} device={device} route={route} />;
  else if (route === 'about') content = <About lang={lang} setRoute={setRoute} device={device} route={route} />;
  else if (route.startsWith('comp:')) content = <CompetitionDetail lang={lang} setRoute={setRoute} device={device} compId={route.split(':')[1]} route={route} />;
  else if (route.startsWith('flow:')) {
    const [, role, idxStr] = route.split(':');
    content = <GuidedFlow lang={lang} setRoute={setRoute} device={device} role={role} stepIdx={parseInt(idxStr, 10) || 0} />;
  }
  else if (route.startsWith('dash:')) {
    const role = route.split(':')[1];
    content = <RoleDashboard lang={lang} setRoute={setRoute} device={device} role={role} />;
  }
  else content = <Home lang={lang} setRoute={setRoute} device={device} variant={variant} />;

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: TOKENS.ivory,
    }}>
      <TopBar lang={lang} setLang={setLang} route={route} setRoute={setRoute} variant={variant} device={device} />
      <div ref={scrollRef} data-app-scroll style={{ flex: 1, overflow: 'auto', overflowX: 'hidden' }}>
        {content}
      </div>
    </div>
  );
}

window.App = App;
