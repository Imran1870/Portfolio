import { Suspense, lazy, useEffect, useRef, useState, Component } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
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
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const wasMobileRef = useRef(window.innerWidth < 768);
  const contentRef = useRef(null);
  const activeSection = useActiveSection(contentRef, loaderDone);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile !== wasMobileRef.current) {
        setSidebarOpen(!isMobile);
        wasMobileRef.current = isMobile;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        <div className="app-shell">
          {!sidebarOpen && (
            <button
              className="sidebar-toggle"
              type="button"
              aria-label="Open sidebar"
              title="Open sidebar"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={18} />
            </button>
          )}

          <ErrorBoundary>
            <Sidebar
              activeSection={activeSection}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </ErrorBoundary>

          <main
            ref={contentRef}
            id="content-area"
            className="content-area"
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
