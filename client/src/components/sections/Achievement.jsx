import { motion } from 'framer-motion';
import StarsBackground from '../StarsBackground';

const achievements = [
  {
    year: '2024',
    title: 'Smart India Hackathon — Finalist',
    description:
      'Selected among top 50 teams nationally for SIH 2024. Built an AI-powered grievance redressal system for government departments.',
    tag: 'Hackathon',
  },
  {
    year: '2024',
    title: "Dean's List — Academic Excellence",
    description:
      'Awarded for maintaining a top-5% CGPA in the CSE department at Punjab Engineering College.',
    tag: 'Academic',
  },
  {
    year: '2023',
    title: 'Open Source Contributor — GSSoC',
    description:
      'Contributed 12 merged PRs to open-source projects during GirlScript Summer of Code 2023, earning the Gold badge.',
    tag: 'Open Source',
  },
  {
    year: '2023',
    title: 'Codeforces — Specialist (1400+)',
    description:
      'Reached Specialist rating on Codeforces after solving 400+ problems across topics including graphs, DP, and segment trees.',
    tag: 'Competitive Programming',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
  viewport: { once: true, margin: '-100px' },
};

export default function Achievement() {
  return (
    <section
      id="achievement"
      className="portfolio-section achievement-section"
      style={{
        minHeight: '100vh',
        padding: '6rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Stars Background ── */}
      <StarsBackground
        starColor="rgba(175,210,250,0.9)"
        speed={60}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background:
            'radial-gradient(ellipse 100% 80% at 50% 100%, #1a0e3a 0%, #0d0820 50%, #080614 100%)',
        }}
      />

      {/* Warm bottom-left glow for the timeline dot colour */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          background:
            'radial-gradient(ellipse 55% 45% at 15% 75%, rgba(185,145,94,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Top vignette to blend with section above */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '180px',
          background:
            'linear-gradient(180deg, #0f0918 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      {/* Bottom vignette to blend with section below */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background:
            'linear-gradient(0deg, #0f0918 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <div className="section-inner achievement-inner" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 3 }}>
        {/* Heading */}
        <motion.div {...fadeUp} style={{ marginBottom: '3.5rem' }}>
          <h2 className="section-title">Achievements</h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Central line – gradient so it fades at top & bottom */}
            <div
              className="achievement-line"
              style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: 0,
              bottom: 0,
              width: '1px',
              background:
                'linear-gradient(180deg, transparent 0%, rgba(175,210,250,0.25) 10%, rgba(175,210,250,0.25) 90%, transparent 100%)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {achievements.map((item, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={i}
                  className="achievement-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    gap: '1rem',
                  }}
                >
                  {/* Left card or spacer */}
                  {isLeft ? (
                    <motion.div
                      className="achievement-card"
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(42,31,66,0.85) 0%, rgba(31,22,53,0.85) 100%)',
                        border: '1px solid rgba(175,210,250,0.18)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        textAlign: 'right',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                      }}
                    >
                      <AchievementContent item={item} align="right" />
                    </motion.div>
                  ) : (
                    <div />
                  )}

                  {/* Center dot */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <motion.div
                      className="achievement-card"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.4, ease: 'backOut', delay: i * 0.1 }}
                      viewport={{ once: true }}
                      style={{
                        width: '13px',
                        height: '13px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, #d4a96e 0%, #B9915E 60%)',
                        boxShadow: '0 0 16px rgba(185,145,94,0.55)',
                        flexShrink: 0,
                        border: '2px solid rgba(185,145,94,0.3)',
                      }}
                    />
                  </div>

                  {/* Right card or spacer */}
                  {!isLeft ? (
                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(32,21,53,0.85) 0%, rgba(24,15,40,0.85) 100%)',
                        border: '1px solid rgba(175,210,250,0.14)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.45)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                      }}
                    >
                      <AchievementContent item={item} align="left" />
                    </motion.div>
                  ) : (
                    <div />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function AchievementContent({ item, align }) {
  return (
    <div
      className="achievement-content"
      data-align={align}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        alignItems: align === 'right' ? 'flex-end' : 'flex-start',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          flexWrap: 'wrap',
          flexDirection: align === 'right' ? 'row-reverse' : 'row',
        }}
      >
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            color: '#AFD2FA',
          }}
        >
          {item.year}
        </span>
        <span
          style={{
            background: 'rgba(14,10,26,0.8)',
            color: '#8cafc8',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            padding: '2px 8px',
            borderRadius: '4px',
            border: '1px solid rgba(175,210,250,0.15)',
          }}
        >
          {item.tag}
        </span>
      </div>

      <h3
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600,
          fontSize: '0.98rem',
          color: '#FEFAEF',
          margin: 0,
          lineHeight: 1.35,
          textAlign: align,
        }}
      >
        {item.title}
      </h3>

      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.85rem',
          color: 'rgba(254,250,239,0.6)',
          margin: 0,
          lineHeight: 1.65,
          textAlign: align,
        }}
      >
        {item.description}
      </p>
    </div>
  );
}
