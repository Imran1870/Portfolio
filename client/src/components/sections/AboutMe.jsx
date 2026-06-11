import { useState } from 'react';
import { motion } from 'framer-motion';
import LightRays from '../effects/LightRays';

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
  { prompt: null,            value: "3rd Year " },
  { prompt: '> currently',   value: null },
  { prompt: null,            value: 'Practicing DSA for placements' },
  { prompt: null,            value: 'Building MERN + Gen AI projects' },
  { prompt: null,            value: 'Learning LangChain, RAG, AI Agents' },
  { prompt: '> interests',   value: null },
  { prompt: null,            value: 'Full-Stack Dev · GEN-AI · System Design' },
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
      className="portfolio-section about-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        position: 'relative',
        padding: '6rem 4rem',
        overflow: 'hidden',
        /* AboutMe: slightly cooler / darker – transitioning away from hero */
        background: 'rgb(19, 13, 32)',
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

      <div className="section-inner" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Heading */}
        <motion.div {...fadeUp} style={{ marginBottom: '3rem' }}>
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <div
          className="about-grid"
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
              background: 'rgb(19,13,32)',
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
                background: 'linear-gradient(135deg, rgb(76 91 146) -8%, rgb(40, 25, 62) 100%)',
                
                borderRadius: '12px',
                border: '1.2px solid #f6f6a6',
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
                  marginBottom: '0.85rem',
                }}
              >
                Identity
              </div>
              <p
                style={{
                  fontFamily: 'medium-content-sans-serif-font, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.98rem',
                  color: 'rgba(254,250,239,0.76)',
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                I'm Imran Ahmad, a CSE student at PEC building full-stack web apps and exploring AI tools.
                I care about writing code that actually ships - clean, scalable, and worth using.
              </p>
            </motion.div>

            {/* Currently Focused – lighter card variant */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                background: 'linear-gradient(135deg, rgb(76 91 146) -8%, rgb(40, 25, 62) 100%)',

                borderRadius: '12px',
                border: '1.2px solid  #f6f6a6',

                padding: '1.5rem',
               
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
                  marginBottom: '0.85rem',
                }}
              >
                Drive
              </div>
              <p
                style={{
                  fontFamily: 'medium-content-sans-serif-font, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.98rem',
                  color: 'rgba(254,250,239,0.75)',
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                I'm deep in DSA for placements, sharpening my MERN backend, and exploring the Gen AI
                space through LangChain and RAG pipelines. I learn by building and deploying.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
