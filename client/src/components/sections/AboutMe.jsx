import { useState } from 'react';
import { motion } from 'framer-motion';
import LightRays from '../LightRays';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
  viewport: { once: true, margin: '-100px' },
};

const terminalLines = [
  { prompt: '> whoami',      value: null },
  { prompt: null,            value: 'Imran Ahmad' },
  { prompt: '> education',   value: null },
  { prompt: null,            value: 'B.Tech CSE – PEC (Punjab Engineering College)' },
  { prompt: null,            value: "3rd Year | Expected 2026" },
  { prompt: '> currently',   value: null },
  { prompt: null,            value: 'Cracking DSA for campus placements' },
  { prompt: null,            value: 'Building MERN + Gen AI projects' },
  { prompt: null,            value: 'Learning LangChain.js, RAG, AI Agents' },
  { prompt: '> interests',   value: null },
  { prompt: null,            value: 'Full-Stack Dev · AI/ML · System Design' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const lineVariant = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

export default function AboutMe() {
  const [activePrompt, setActivePrompt] = useState(null);
  const isCurrentlyActive = activePrompt === '> currently';

  return (
    <section
      id="aboutme"
      style={{
        minHeight: '100vh',
        display: 'flex',
        position: 'relative',
        padding: '6rem 4rem',
        overflow: 'hidden',
        /* AboutMe: slightly cooler / darker – transitioning away from hero */
        background: 'linear-gradient(180deg, rgba(18,12,34,0.35) 0%, rgba(9,7,18,0.78) 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.42,
          mixBlendMode: 'screen',
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#AFD2FA"
          raysSpeed={0.65}
          lightSpread={0.55}
          rayLength={2.8}
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.04}
          distortion={0.08}
          className="about-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={0.9}
        />
      </div>

      {/* Subtle right-side glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: 'radial-gradient(ellipse 50% 60% at 85% 50%, rgba(185,145,94,0.06) 0%, transparent 70%)',
        }}
      />

      <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Heading */}
        <motion.div {...fadeUp} style={{ marginBottom: '3rem' }}>
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            alignItems: 'start',
          }}
        >
          {/* — LEFT – Terminal Card — */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            style={{
              background: '#130d20', /* Darker card variant for terminal – feels like a real terminal */
              borderRadius: '12px',
              border: '1px solid rgba(175,210,250,0.18)',
              padding: '1.5rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '13px',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
            }}
          >
            {/* Mac-style dots */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                marginBottom: '1.25rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid rgba(175,210,250,0.1)',
              }}
            >
              {['#ff5f57', '#ffbd2e', '#27c93f'].map((c) => (
                <span
                  key={c}
                  style={{
                    width: '11px',
                    height: '11px',
                    borderRadius: '50%',
                    background: c,
                    display: 'block',
                  }}
                />
              ))}
              <span
                style={{
                  marginLeft: '8px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  color: 'rgba(175,210,250,0.4)',
                }}
              >
                bash ~ portfolio
              </span>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  variants={lineVariant}
                  onMouseEnter={() => line.prompt === '> currently' && setActivePrompt(line.prompt)}
                  onMouseLeave={() => line.prompt === '> currently' && setActivePrompt(null)}
                  style={{
                    marginBottom: '4px',
                    cursor: line.prompt === '> currently' ? 'default' : 'auto',
                  }}
                >
                  {line.prompt ? (
                    <span
                      style={{
                        color: line.prompt === '> currently' && isCurrentlyActive ? '#FEFAEF' : '#AFD2FA',
                        textShadow: line.prompt === '> currently' && isCurrentlyActive
                          ? '0 0 14px rgba(175,210,250,0.45)'
                          : 'none',
                        transition: 'color 0.2s ease, text-shadow 0.2s ease',
                      }}
                    >
                      {line.prompt}
                    </span>
                  ) : (
                    <span style={{ color: 'rgba(254,250,239,0.68)', paddingLeft: '14px' }}>
                      {line.value}
                    </span>
                  )}
                </motion.div>
              ))}

              {/* Blinking cursor */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                style={{ color: '#AFD2FA' }}
              >
                ▎
              </motion.span>
            </motion.div>
          </motion.div>

          {/* — RIGHT – Info Cards — */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Education Card – standard card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              viewport={{ once: true }}
              style={{
                background: 'linear-gradient(135deg, #2a1f42 0%, #221839 100%)',
                borderRadius: '12px',
                border: '1px solid rgba(175,210,250,0.2)',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '15px',
                  color: '#AFD2FA',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                 Education
              </div>
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 500,
                  fontSize: '1rem',
                  color: '#FEFAEF',
                  marginBottom: '0.4rem',
                }}
              >
                Punjab Engineering College
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.88rem',
                  color: 'rgba(254,250,239,0.65)',
                  lineHeight: 1.7,
                }}
              >
                <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}>
                  B.Tech in Computer Science & Engineering
                </span><br />
                <span style={{ color: '#AFD2FA', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}>
                  CGPA: 8.4 / 10
                </span>
              </div>
            </motion.div>

            {/* Currently Focused – lighter card variant */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                background: 'linear-gradient(135deg, #32255a 0%, #28193e 100%)',
                borderRadius: '12px',
                border: isCurrentlyActive
                  ? '1px solid rgba(175,210,250,0.55)'
                  : '1px solid rgba(175,210,250,0.25)',
                padding: '1.5rem',
                boxShadow: isCurrentlyActive
                  ? '0 8px 32px rgba(0,0,0,0.28), 0 0 26px rgba(175,210,250,0.16)'
                  : '0 4px 20px rgba(0,0,0,0.25)',
                transform: isCurrentlyActive ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
              }}
            >
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '15px',
                  color: '#AFD2FA',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                Currently Focused On
              </div>
              <ul
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.88rem',
                  color: 'rgba(254,250,239,0.75)',
                  lineHeight: 1.9,
                  paddingLeft: 0,
                  listStyle: 'none',
                }}
              >
                {[
                  'DSA prep for campus placements',
                  'Deepening MERN stack expertise',
                  'Gen AI with LangChain.js & RAG',
                  'System Design fundamentals',
                  'Building AI-powered web apps',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span
                      style={{
                        color: '#B9915E',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '11px',
                        marginTop: '4px',
                      }}
                    >
                      ‣
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
