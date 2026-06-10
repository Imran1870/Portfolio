import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiReact } from 'react-icons/si';
import { VscChevronDown } from 'react-icons/vsc';
import { useSidebarResize } from '../hooks/useSidebarResize';
import StarsBackground from './StarsBackground';
const FILES = [
  { id: 'main',        label: 'main.jsx',        section: 'main' },
  { id: 'aboutme',     label: 'aboutme.jsx',     section: 'aboutme' },
  { id: 'skills',      label: 'skills.jsx',      section: 'skills' },
  { id: 'projects',    label: 'projects.jsx',    section: 'projects' },
  { id: 'achievement', label: 'achievement.jsx', section: 'achievement' },
  { id: 'contact',     label: 'contact.jsx',     section: 'contact' },
];
/* ── Sidebar colour tokens ────────────────────────────
   Sidebar is blackish-gray — intentionally darker & more neutral
   than the main purple content area so they feel distinct.          */
const SB = {
  bg:          '#0f0e12',   // near-black with a whisper of warm gray
  hover:       'rgba(255,255,255,0.05)',
  active:      '#1c1826',   // very dark lavender — active file bg
  activeBorder:'#AFD2FA',
  statusBar:   '#0a090d',   // even darker strip at the bottom
  header:      'rgba(255,255,255,0.28)',  // EXPLORER label
  folder:      'rgba(255,255,255,0.75)',  // PORTFOLIO folder name
  fileName:    '#8cafc8',                // idle file names — muted blue
  fileActive:  '#FEFAEF',                // active file name — bright
  border:      'rgba(255,255,255,0.06)', // right-edge separator
};
function ReactIcon() {
 
  return <SiReact size={14} style={{ color: '#61DAFB', flexShrink: 0 }} />;
}

function MobileIcon({ file, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      title={file.label}
      style={{
        width: '100%',
        padding: '10px 0',
        background: isActive ? SB.active : 'transparent',
        border: 'none',
                borderLeft: isActive ? `3px solid ${SB.activeBorder}` : '3px solid transparent',
       transition: 'background 0.15s',

        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ReactIcon />
    </button>
  );
}
export default function Sidebar({ activeSection, contentRef }) {
  const { width, isResizing, handleMouseDown } = useSidebarResize();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // Listen to resize
  useState(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  });
  const scrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
     if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  if (isMobile) {
    return (
      <aside style={{
       width: '48px', flexShrink: 0,
        background: SB.bg,
        borderRight: `1px solid ${SB.border}`,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        overflowY: 'auto', overflowX: 'hidden', position: 'relative', zIndex: 100,
      }}>
        <StarsBackground
          factor={0.015}
          speed={85}
          starColor="rgba(175, 210, 250, 0.75)"
          pointerEvents={false}
          style={{ opacity: 0.18, pointerEvents: 'none' }}
        />
        {FILES.map((file) => (
          <MobileIcon
           key={file.id} file={file}
            isActive={activeSection === file.section}
            onClick={() => scrollTo(file.section)}
          />
        ))}
      </aside>
    );
  }
  return (
    <aside
      style={{
         width: `${width}px`, flexShrink: 0,
        background: SB.bg,
        borderRight: `1px solid ${SB.border}`,
        display: 'flex', flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        userSelect: isResizing ? 'none' : 'auto',
        zIndex: 100,
      }}
    >
      <StarsBackground
        factor={0.015}
        speed={85}
        starColor="rgba(175, 210, 250, 0.75)"
        pointerEvents={false}
        style={{ opacity: 0.16, pointerEvents: 'none' }}
      />
      {/* ── EXPLORER label ── */}
      <div style={{
        padding: '16px 14px 6px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '10px',
        color: SB.header,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        flexShrink: 0,
      }}>
        Explorer
      </div>
       {/* ── PORTFOLIO folder ── */}
      <div style={{ padding: '0 8px 4px', flexShrink: 0 }}>
        <div style={{
         display: 'flex', alignItems: 'center', gap: '4px',
          padding: '4px 6px', cursor: 'default',
          borderRadius: '4px',
        }}>
          <VscChevronDown size={14} style={{ color: SB.fileName, flexShrink: 0 }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12px', color: SB.folder,
            fontWeight: 600, letterSpacing: '0.05em',
          }}>PORTFOLIO</span>
        </div>
      </div>
    {/* ── File List ── */}
      <nav style={{ padding: '2px 0', flex: 1, overflowY: 'auto' }}>
        {FILES.map((file) => {
          const isActive = activeSection === file.section;
          return (
            <AnimatePresence key={file.id}>
              <motion.button
                onClick={() => scrollTo(file.section)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                   paddingTop: '5px', paddingBottom: '5px',
                  paddingLeft: isActive ? '23px' : '26px',
                  paddingRight: '8px',
                  background: 'transparent',
                  borderLeft: isActive
                    ? `3px solid ${SB.activeBorder}`
                    : '3px solid transparent',
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                }}
                whileHover={{ backgroundColor: SB.hover }}
                animate={{
                  backgroundColor: isActive ? SB.active : 'rgba(0,0,0,0)',
                }}
                transition={{ duration: 0.15 }}
              >
                <ReactIcon />
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '13px',
                 color: isActive ? SB.fileActive : SB.fileName,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  transition: 'color 0.15s',
                }}>
                  {file.label}
                </span>
              </motion.button>
            </AnimatePresence>
          );
        })}
      </nav>
      {/* ── Status Bar ── */}
     
      {/* ── Resize Handle ── */}
      <div
        onMouseDown={handleMouseDown}
        style={{
         position: 'absolute', top: 0, right: 0,
          width: '4px', height: '100%',
          cursor: 'col-resize', zIndex: 200, transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(175,210,250,0.5)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
      />
    </aside>
  );
}
