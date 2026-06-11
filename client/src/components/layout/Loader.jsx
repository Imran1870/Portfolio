import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Inject shimmer keyframe once ── */
const shimmerStyle = typeof document !== 'undefined' && (() => {
  if (document.getElementById('loader-shimmer-style')) return;
  const s = document.createElement('style');
  s.id = 'loader-shimmer-style';
  s.textContent = `
    @keyframes loaderShimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes loaderGlow {
      0%, 100% { opacity: 0.5; transform: scaleX(0.8); }
      50%       { opacity: 1;   transform: scaleX(1); }
    }
  `;
  document.head.appendChild(s);
})();

const TYPING_TEXT = '> initializing portfolio...';
const TYPING_SPEED = 50;

// Total time ~3 seconds:
// 400ms  — cursor blink
// ~1350ms — typing (27 chars × 50ms)
// 150ms  — pause after typing
// 800ms  — loading bar fills
// 400ms  — name visible after bar
// ≈ 3.1 seconds

/* ── SplitText letter animation ── */
function SplitText({ text }) {
  return (
    <div style={{ display: 'inline-flex', overflow: 'hidden' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

/* ── Aurora background (no Lanyard — clean & fast) ── */
function LoaderBackground() {
  return (
    <>
      {/* Hard dark base — no white flash ever */}
      <div style={{ position: 'absolute', inset: 0, background: '#050210', zIndex: 0 }} />

      {/* Deep purple gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 120% 80% at 50% 110%, #1a0a3a 0%, #0d0618 55%, #050210 100%)',
      }} />

      {/* Drifting aurora orbs */}
      {[
        { x: '15%', y: '25%', color: 'rgba(82,39,255,0.22)', size: '55vw', dur: 8 },
        { x: '80%', y: '55%', color: 'rgba(175,210,250,0.13)', size: '45vw', dur: 11 },
        { x: '50%', y: '15%', color: 'rgba(185,145,94,0.10)', size: '38vw', dur: 13 },
        { x: '8%',  y: '75%', color: 'rgba(167,139,250,0.15)', size: '40vw', dur: 9  },
        { x: '88%', y: '20%', color: 'rgba(82,39,255,0.10)', size: '30vw', dur: 15 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute', left: orb.x, top: orb.y,
            width: orb.size, height: orb.size,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            pointerEvents: 'none', zIndex: 2,
          }}
          animate={{ x: [0, 25, -18, 0], y: [0, -20, 12, 0], scale: [1, 1.1, 0.96, 1] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 1.4 }}
        />
      ))}

      {/* Subtle dot grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        backgroundImage: 'radial-gradient(rgba(175,210,250,0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Center radial bloom */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4,
        background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(82,39,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
    </>
  );
}

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState('cursor'); // cursor | typing | loading | name | done
  const [typedText, setTypedText] = useState('');
  const [barProgress, setBarProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setPhase('typing'), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== 'typing') return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedText(TYPING_TEXT.slice(0, i));
      if (i >= TYPING_TEXT.length) {
        clearInterval(interval);
        setTimeout(() => setPhase('loading'), 150);
      }
    }, TYPING_SPEED);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'loading') return;
    setPhase('name');
    const start = performance.now();
    const duration = 800; // fast bar fill
    const raf = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setBarProgress(p * 100);
      if (p < 1) requestAnimationFrame(raf);
      else setTimeout(() => setPhase('done'), 400);
    };
    requestAnimationFrame(raf);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'done') return;
    const t = setTimeout(() => onComplete(), 400);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  const showName = phase === 'name' || phase === 'done';
  const isExiting = phase === 'done';

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            background: '#050210', // kills white flash at root level
          }}
        >
          <LoaderBackground />

          {/* Main content — centered */}
          <div style={{
            position: 'relative', zIndex: 10,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '1.4rem',
            pointerEvents: 'none',
          }}>
            {/* Terminal line */}
            <div style={{ minHeight: '1.4rem', textAlign: 'center' }}>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.9rem',
                color: '#AFD2FA',
                letterSpacing: '0.05em',
                textShadow: '0 0 14px rgba(175,210,250,0.5)',
              }}>
                {typedText}
                {(phase === 'cursor' || phase === 'typing') && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.85 }}
                    style={{ color: '#AFD2FA' }}
                  >|</motion.span>
                )}
              </span>
            </div>

            {/* Name — Aesthetic Split Design */}
            <AnimatePresence>
              {showName && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ textAlign: 'center', position: 'relative' }}
                >
                  {/* First name — large, italic, warm shimmer */}
                  <div style={{ overflow: 'hidden', lineHeight: 1 }}>
                    <motion.div
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                      style={{
                        fontFamily: "'Bangers', system-ui",
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: 'clamp(4rem, 11vw, 7.5rem)',
                        letterSpacing: '0.06em',
                        lineHeight: 1,
                        background: 'linear-gradient(120deg, #f5d98b 0%, #e8b96a 20%, #FEFAEF 45%, #d4a96e 70%, #c8993f 100%)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        animation: 'loaderShimmer 3s linear infinite',
                        display: 'block',
                        filter: 'drop-shadow(0 0 20px rgba(212,169,110,0.4))',
                      }}
                    >
                      Imran
                    </motion.div>
                  </div>

                  {/* Decorative thin line between names */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                    style={{
                      width: '100%',
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent 0%, rgba(175,210,250,0.4) 30%, rgba(212,169,110,0.6) 50%, rgba(175,210,250,0.4) 70%, transparent 100%)',
                      margin: '0.2rem 0',
                      transformOrigin: 'center',
                      animation: 'loaderGlow 2.5s ease-in-out infinite 0.8s',
                    }}
                  />

                  {/* Last name — outlined / cool gradient */}
                  <div style={{ overflow: 'hidden', lineHeight: 1 }}>
                    <motion.div
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 200,
                        fontStyle: 'italic',
                        fontSize: 'clamp(2.6rem, 7.5vw, 5rem)',
                        letterSpacing: '0.22em',
                        lineHeight: 1,
                        background: 'linear-gradient(135deg, #afd2fa 0%, #c4deff 40%, #e8eeff 60%, #afd2fa 100%)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        animation: 'loaderShimmer 4s linear infinite 0.5s',
                        display: 'block',
                        filter: 'drop-shadow(0 0 18px rgba(175,210,250,0.35))',
                        textTransform: 'uppercase',
                      }}
                    >
                      Ahmad
                    </motion.div>
                  </div>

                  {/* Subtitle */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.45 }}
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.78rem',
                      color: 'rgba(175,210,250,0.65)',
                      marginTop: '0.6rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                    }}
                  >
                    CSE &apos;28 &nbsp;·&nbsp; PEC
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading bar */}
            {(phase === 'name' || phase === 'loading' || phase === 'done') && (
              <div style={{
                width: '260px', height: '2px',
                background: 'rgba(255,255,255,0.07)',
                borderRadius: '2px', overflow: 'hidden',
              }}>
                <motion.div style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #5227FF 0%, #AFD2FA 50%, #B9915E 100%)',
                  boxShadow: '0 0 12px rgba(82,39,255,0.7)',
                  borderRadius: '2px',
                  width: `${barProgress}%`,
                }} />
              </div>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
