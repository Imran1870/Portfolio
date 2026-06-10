import { Suspense, lazy, useRef, useState, Component } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Sidebar from './components/Sidebar';
import { useActiveSection } from './hooks/useActiveSection';

const Hero        = lazy(() => import('./components/sections/Hero'));
const AboutMe     = lazy(() => import('./components/sections/AboutMe'));
const Skills      = lazy(() => import('./components/sections/Skills'));
const Projects    = lazy(() => import('./components/sections/Projects'));
const Achievement = lazy(() => import('./components/sections/Achievement'));
const Contact     = lazy(() => import('./components/sections/Contact'));

const hasSeenLoader = () => sessionStorage.getItem('loader-seen') === 'true';

/* ── Error Boundary so errors surface visibly ── */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center',
          justifyContent: 'center', flexDirection: 'column', gap: '1rem',
          background: '#100d1a', color: '#f87171',
          fontFamily: 'JetBrains Mono, monospace', padding: '2rem',
        }}>
          <div style={{ fontSize: '1.2rem' }}>⚠ Runtime Error</div>
          <pre style={{ fontSize: '12px', color: '#AFD2FA', whiteSpace: 'pre-wrap', maxWidth: '700px' }}>
            {this.state.error?.toString()}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function SectionFallback() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#100d1a',
    }}>
      <span style={{ color: '#AFD2FA', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px' }}>
        loading...
      </span>
    </div>
  );
}

function Divider() {
  return <div className="section-divider" />;
}

export default function App() {
  const [loaderDone, setLoaderDone] = useState(hasSeenLoader());
  const contentRef = useRef(null);
  const activeSection = useActiveSection(contentRef);

  const handleLoaderComplete = () => {
    sessionStorage.setItem('loader-seen', 'true');
    setLoaderDone(true);
  };

  return (
    <ErrorBoundary>
      <AnimatePresence>
        {!loaderDone && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      {loaderDone && (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
          <ErrorBoundary>
            <Sidebar activeSection={activeSection} contentRef={contentRef} />
          </ErrorBoundary>

          <main
            ref={contentRef}
            id="content-area"
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              scrollBehavior: 'smooth',
              background: 'linear-gradient(180deg, #201834 0%, #180f2c 30%, #130b22 60%, #0f0918 100%)',
            }}
          >
            <ErrorBoundary><Suspense fallback={<SectionFallback />}><Hero /></Suspense></ErrorBoundary>
            <Divider />
            <ErrorBoundary><Suspense fallback={<SectionFallback />}><AboutMe /></Suspense></ErrorBoundary>
            <Divider />
            <ErrorBoundary><Suspense fallback={<SectionFallback />}><Skills /></Suspense></ErrorBoundary>
            <Divider />
            <ErrorBoundary><Suspense fallback={<SectionFallback />}><Projects /></Suspense></ErrorBoundary>
            <Divider />
            <ErrorBoundary><Suspense fallback={<SectionFallback />}><Achievement /></Suspense></ErrorBoundary>
            <Divider />
            <ErrorBoundary><Suspense fallback={<SectionFallback />}><Contact /></Suspense></ErrorBoundary>
          </main>
        </div>
      )}
    </ErrorBoundary>
  );
}
