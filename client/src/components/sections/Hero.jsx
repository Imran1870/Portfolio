import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiExternalLink, FiDownload } from 'react-icons/fi';
import RippleGrid from '../effects/RippleGrid';
import BorderGlow from '../effects/BorderGlow';
import heroPhoto from '../../assets/photo.png';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
  viewport: { once: true, margin: '-100px' },
};

const stagger = {
  initial: {},
  whileInView: {},
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
};

export default function Hero() {
  return (
    <section
      id="main"
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 4rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      {/* ─── RippleGrid WebGL background ─── */}
      <RippleGrid
        enableRainbow={false}
        gridColor="#6f58d9"
        rippleIntensity={0.13}
        idleRippleIntensity={0.07}
        animationSpeed={1.2}
        gridSize={22}
        gridThickness={30}
        mouseInteraction
        mouseInteractionRadius={1.9}
        opacity={1}
        fadeDistance={1.45}
        vignetteStrength={1.85}
        glowIntensity={0.86}
        gridRotation={0}
      />

      {/* Subtle radial highlight top-left — sits above WebGL */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          background: 'radial-gradient(ellipse 60% 50% at 20% 30%, rgba(175,210,250,0.06) 0%, transparent 70%)',
        }}
      />

      <div
        className="hero-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '3rem',
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* — LEFT COLUMN — */}
        <motion.div {...stagger} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
          {/* Eyebrow */}
         

          {/* Name */}
          <motion.h1
            {...fadeUp}
           style={{
  fontFamily: '"Science Gothic", system-ui, sans-serif',
  fontWeight: 400,
  fontSize: 'clamp(3rem, 7vw, 5.5rem)',
  background: 'linear-gradient(135deg, #FEFAEF 0%, #d4c9ff 60%, #AFD2FA 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  
  // Adjusted line-height slightly since Bangers is vertically dense
  lineHeight: 1.1, 
  
  // Optional: Makes the punchy text edges look razor sharp
  letterSpacing: '0.03em', 
}}         >
            Imran Ahmad

          </motion.h1>

          {/* Typewriter */}
          <motion.div {...fadeUp} style={{ height: '2rem', display: 'flex', alignItems: 'center' }}>
            <TypeAnimation
              sequence={[
                'Full-Stack Developer', 2000,
                'DSA Enthusiast', 2000,
                'GEN-AI Explorer', 2000,
                "PEC · CSE '28", 2000,
              ]}
              wrapper="span"
              speed={60}
              repeat={Infinity}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.2rem',
                color: '#AFD2FA',
                letterSpacing: '0.03em',
              }}
            />
          </motion.div>

          {/* Body copy */}
          <motion.p
            {...fadeUp}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              color: 'rgba(254,250,239,0.72)',
              lineHeight: 1.75,
              maxWidth: '480px',
              margin: 0,
            }}
          >
            Building systems that scale. Learning things that matter.
            Currently cracking DSA and making Gen AI projects.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div {...fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="#projects"
              className="btn-cta"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <FiExternalLink size={16} />
              View Projects
            </a>
            <a href="/resume.pdf" download className="btn-secondary">
              <FiDownload size={16} />
              Download CV
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div {...fadeUp} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {[
              { Icon: FiGithub,   href: 'https://github.com/Imran1870',     label: 'GitHub' },
              { Icon: FiLinkedin, href: 'https://www.linkedin.com/in/imran-ahmad-6931b6311/', label: 'LinkedIn' },
              { Icon: FiMail,     href: 'mailto:imran.ahmad@pecchd.ac.in', label: 'Email' },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ color: '#8cafc8', display: 'flex' }}
                whileHover={{ color: '#FEFAEF', scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Icon size={22} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* — RIGHT COLUMN – Avatar Card with BorderGlow — */}
        <motion.div
          className="hero-card-wrap"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
        >
          <BorderGlow
            edgeSensitivity={30}
            glowColor="240 80 80"
            backgroundColor="#1a1230"
            borderRadius={16}
            glowRadius={36}
            glowIntensity={1}
            coneSpread={25}
            animated={false}
            colors={['#AFD2FA', '#B9915E', '#a78bfa']}
          >
            <div
              style={{
                padding: '2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.1rem',
                minWidth: '240px',
                maxWidth: '300px',
              }}
            >
              {/* Avatar Photo */}
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  border: '2.5px solid rgba(175,210,250,0.45)',
                  boxShadow: '0 0 28px rgba(110,159,212,0.3)',
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: '#1a1230',
                }}
              >
                <img
                  src={heroPhoto}
                  alt="Imran Ahmad"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
              </div>
              

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 400, fontSize: '1.4rem', color: '#FEFAEF', letterSpacing: '0.05em' }}>
                  Imran Ahmad
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#AFD2FA', marginTop: '5px' }}>
                  CSE 3rd Year | PEC
                </div>
              </div>

              {/* Stat Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {['5+ Projects', 'DSA: Intermediate'].map((label) => (
                  <span key={label} className="pill" style={{ fontSize: '11px' }}>
                    {label}
                  </span>
                ))}
              </div>

              {/* Online dot */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#4ade80',
                    boxShadow: '0 0 8px #4ade80',
                    display: 'inline-block',
                    animation: 'pulse 2s infinite',
                  }}
                />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#AFD2FA' }}>
                  Available for opportunities
                </span>
              </div>
            </div>
          </BorderGlow>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          opacity: 0.5,
          cursor: 'pointer',
          zIndex: 2,
        }}
        onClick={() => document.getElementById('aboutme')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <svg width="22" height="36" viewBox="0 0 24 38" fill="none">
          <rect x="1" y="1" width="22" height="36" rx="11" stroke="#AFD2FA" strokeWidth="1.5" />
          <motion.rect
            x="10.5" y="7" width="3" height="8" rx="1.5" fill="#AFD2FA"
            animate={{ y: [0, 6, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          />
        </svg>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#AFD2FA', letterSpacing: '1.5px' }}>
          SCROLL
        </span>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </section>
  );
}
