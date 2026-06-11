import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiReact } from 'react-icons/si';
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc';
import { FiX } from 'react-icons/fi';
import { useSidebarResize } from '../../hooks/useSidebarResize';
import StarsBackground from '../effects/StarsBackground';

const FILES = [
  { id: 'main', label: 'main.jsx', section: 'main' },
  { id: 'aboutme', label: 'aboutme.jsx', section: 'aboutme' },
  { id: 'skills', label: 'skills.jsx', section: 'skills' },
  { id: 'projects', label: 'projects.jsx', section: 'projects' },
  { id: 'achievement', label: 'achievement.jsx', section: 'achievement' },
  { id: 'contact', label: 'contact.jsx', section: 'contact' },
];

const SECTION_ALIASES = {
  main: 'main',
  home: 'main',
  hero: 'main',
  about: 'aboutme',
  aboutme: 'aboutme',
  me: 'aboutme',
  skill: 'skills',
  skills: 'skills',
  stack: 'skills',
  project: 'projects',
  projects: 'projects',
  work: 'projects',
  achievement: 'achievement',
  achievements: 'achievement',
  awards: 'achievement',
  contact: 'contact',
  mail: 'contact',
};

const INITIAL_TERMINAL_LOG = [
  { type: 'output', text: 'try help to know all working command' },
];

const SB = {
  bg: '#000000',
  hover: 'rgba(255,255,255,0.05)',
  active: 'rgba(100,80,180,0.22)',
  activeBorder: '#7c6fcd',
  header: 'rgba(255,255,255,0.34)',
  folder: '#a09cc8',
  fileName: '#737099',
  fileActive: '#f2eeff',
  border: 'rgba(150,130,220,0.15)',
};

function ReactIcon() {
  return <SiReact size={14} style={{ color: '#61DAFB', flexShrink: 0 }} />;
}

export default function Sidebar({ activeSection, isOpen, onClose }) {
  const { width, isResizing, handleMouseDown } = useSidebarResize();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [filesOpen, setFilesOpen] = useState(true);
  const [terminalLog, setTerminalLog] = useState(INITIAL_TERMINAL_LOG);
  const [command, setCommand] = useState('');
  const terminalBodyRef = useRef(null);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    terminalBodyRef.current?.scrollTo({
      top: terminalBodyRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [terminalLog]);

  const scrollTo = (sectionId, shouldClose = isMobile) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (shouldClose) window.setTimeout(() => onClose?.(), 250);
  };

  const pushTerminal = (lines) => {
    setTerminalLog((prev) => [...prev, ...lines]);
  };

  const getCurrentSection = () => {
    const root = document.getElementById('content-area');
    if (!root) return activeSection;

    const rootRect = root.getBoundingClientRect();
    const probeLine = root.scrollTop + root.clientHeight * 0.38;
    let current = FILES[0].section;

    for (const file of FILES) {
      const el = document.getElementById(file.section);
      if (!el) continue;
      const sectionTop = el.getBoundingClientRect().top - rootRect.top + root.scrollTop;
      if (sectionTop <= probeLine) current = file.section;
    }

    const nearBottom = root.scrollTop + root.clientHeight >= root.scrollHeight - 24;
    return nearBottom ? FILES[FILES.length - 1].section : current;
  };

  const runCommand = (rawCommand) => {
    const input = rawCommand.trim();
    if (!input) return;

    const normalized = input.toLowerCase();
    const [cmd, arg] = normalized.split(/\s+/);

    if (cmd === 'clear') {
      setTerminalLog(INITIAL_TERMINAL_LOG);
      setCommand('');
      return;
    }

    const nextLines = [{ type: 'command', text: `$ ${input}` }];

    if (cmd === 'ls') {
      nextLines.push({ type: 'output', text: FILES.map((file) => file.section).join('  ') });
    } else if (cmd === 'pwd') {
      nextLines.push({ type: 'output', text: `/portfolio/${getCurrentSection()}` });
    } else if (cmd === 'help') {
      nextLines.push({ type: 'output', text: 'commands: ls, pwd, cd <section>, clear, whoami, open github, exit' });
    } else if (cmd === 'whoami') {
      nextLines.push({ type: 'output', text: 'Imran Ahmad - full-stack developer' });
    } else if (cmd === 'exit') {
      nextLines.push({ type: 'output', text: 'closing sidebar...' });
      window.setTimeout(() => onClose?.(), 250);
    } else if (cmd === 'open' && arg === 'github') {
      nextLines.push({ type: 'output', text: 'opening github profile...' });
      window.open('https://github.com/imran-ahmad', '_blank', 'noopener,noreferrer');
    } else if (cmd === 'cd') {
      const sectionId = SECTION_ALIASES[arg];
      if (!arg) {
        nextLines.push({ type: 'error', text: 'usage: cd <section>' });
      } else if (!sectionId) {
        nextLines.push({ type: 'error', text: `section not found: ${arg}. run ls` });
      } else {
        nextLines.push({ type: 'output', text: `moving to /portfolio/${sectionId}` });
        scrollTo(sectionId, isMobile);
      }
    } else if (cmd === 'rm' || cmd === 'rmdir' || cmd === 'del') {
      nextLines.push({ type: 'error', text: "You can't do that. The portfolio would be very sad." });
    } else {
      nextLines.push({ type: 'error', text: `command not found: ${cmd}. try help` });
    }

    pushTerminal(nextLines);
    setCommand('');
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    runCommand(command);
  };

  if (!isOpen) return null;

  return (
    <>
      {isMobile && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
        />
      )}

      <aside
        className={`portfolio-sidebar ${isMobile ? 'is-mobile' : ''}`}
        style={{
          width: isMobile ? 'min(82vw, 300px)' : `${width}px`,
          flexShrink: 0,
          background: SB.bg,
          borderRight: `1px solid ${SB.border}`,
          display: 'flex',
          flexDirection: 'column',
          position: isMobile ? 'fixed' : 'relative',
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

        <div
          style={{
            padding: '14px 12px 8px 14px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            color: SB.header,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <span>Explorer</span>
          <button
            type="button"
            className="sidebar-close"
            aria-label="Close sidebar"
            title="Close sidebar"
            onClick={onClose}
          >
            <FiX size={15} />
          </button>
        </div>

        <div style={{ padding: '0 8px 4px', flexShrink: 0 }}>
          <button
            type="button"
            aria-expanded={filesOpen}
            aria-label={filesOpen ? 'Hide portfolio files' : 'Show portfolio files'}
            onClick={() => setFilesOpen((open) => !open)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              width: '100%',
              padding: '4px 6px',
              cursor: 'pointer',
              borderRadius: '4px',
              border: 'none',
              background: 'transparent',
              textAlign: 'left',
            }}
          >
            {filesOpen ? (
              <VscChevronDown size={14} style={{ color: SB.fileName, flexShrink: 0 }} />
            ) : (
              <VscChevronRight size={14} style={{ color: SB.fileName, flexShrink: 0 }} />
            )}
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px',
                color: SB.folder,
                fontWeight: 600,
                letterSpacing: '0.05em',
              }}
            >
              PORTFOLIO
            </span>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {filesOpen && (
            <motion.nav
              key="portfolio-files"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{ padding: '2px 0', flex: '0 1 auto', overflowY: 'auto', overflowX: 'hidden' }}
            >
              {FILES.map((file) => {
                const isActive = activeSection === file.section;

                return (
                <motion.button
                  key={file.id}
                  type="button"
                  onClick={() => scrollTo(file.section)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    paddingTop: '7px',
                    paddingBottom: '7px',
                    paddingLeft: isActive ? '23px' : '26px',
                    paddingRight: '8px',
                    background: 'transparent',
                    borderLeft: isActive ? `3px solid ${SB.activeBorder}` : '3px solid transparent',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderBottom: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                  whileHover={{ backgroundColor: SB.hover }}
                  animate={{
                    backgroundColor: isActive ? SB.active : 'rgba(0,0,0,0)',
                  }}
                  transition={{ duration: 0.15 }}
                >
                  <ReactIcon />
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '13px',
                      color: isActive ? SB.fileActive : SB.fileName,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      transition: 'color 0.15s',
                    }}
                  >
                    {file.label}
                  </span>
                </motion.button>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>

        <div className="sidebar-terminal">
          <div className="sidebar-terminal-title">Reach section and explore by commands</div>
          <div className="sidebar-terminal-window">
            <div className="sidebar-terminal-chrome" aria-hidden="true">
              <span style={{ background: '#ff5f57' }} />
              <span style={{ background: '#ffbd2e' }} />
              <span style={{ background: '#27c93f' }} />
            </div>
            <div className="sidebar-terminal-body" ref={terminalBodyRef}>
              {terminalLog.map((line, index) => (
                <div key={`${line.text}-${index}`} className={`terminal-line terminal-${line.type}`}>
                  {line.text}
                </div>
              ))}
            </div>
            <form className="sidebar-terminal-form" onSubmit={handleTerminalSubmit}>
              <span className="terminal-prompt">$</span>
              <input
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="cd skills"
                spellCheck={false}
                autoComplete="off"
                aria-label="Sidebar terminal command"
              />
            </form>
          </div>
        </div>

        {!isMobile && (
          <div
            onMouseDown={handleMouseDown}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '4px',
              height: '100%',
              cursor: 'col-resize',
              zIndex: 200,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(175,210,250,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          />
        )}
      </aside>
    </>
  );
}
