import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import TargetCursor from '../TargetCursor';
import DotField from '../DotField';

const projects = [
  {
    num: '01',
    title: 'DevLink – Developer Hub',
    description:
      'A full-stack MERN platform for developers to share projects, follow each other, and collaborate. Features auth, real-time notifications, and a feed algorithm.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'JWT'],
    github: 'https://github.com/imran-ahmad/devlink',
    demo: 'https://devlink.vercel.app',
    accent: '#AFD2FA',
  },
  {
    num: '02',
    title: 'DSA Visualizer',
    description:
      'Interactive visualizer for 20+ data structures and algorithms. Step-by-step animations with speed control and code panel synced to each step.',
    tech: ['React', 'Framer Motion', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/imran-ahmad/dsa-viz',
    demo: 'https://dsa-viz.vercel.app',
    accent: '#B9915E',
  },
  {
    num: '03',
    title: 'RAG Chat – AI Document Q&A',
    description:
      'Upload any PDF and chat with it. Built using LangChain.js, OpenAI embeddings, and Pinecone vector DB. Deployed on Vercel with streaming responses.',
    tech: ['Next.js', 'LangChain.js', 'Pinecone', 'OpenAI', 'MongoDB'],
    github: 'https://github.com/imran-ahmad/rag-chat',
    demo: 'https://rag-chat.vercel.app',
    accent: '#AFD2FA',
  },
  {
    num: '04',
    title: 'CodeCollab – Real-time IDE',
    description:
      'Browser-based collaborative code editor with multi-user cursors, syntax highlighting for 15 languages, and shareable room links.',
    tech: ['React', 'Socket.io', 'CodeMirror', 'Express', 'Redis'],
    github: 'https://github.com/imran-ahmad/codecollab',
    demo: 'https://codecollab.vercel.app',
    accent: '#B9915E',
  },
  {
    num: '05',
    title: 'ExpenseAI – Smart Budgeting',
    description:
      'Track income and expenses with ML-powered category predictions. Auto-generates monthly reports and spending insights with Chart.js visualizations.',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'scikit-learn', 'Docker'],
    github: 'https://github.com/imran-ahmad/expense-ai',
    demo: 'https://expense-ai.vercel.app',
    accent: '#AFD2FA',
  },
  {
    num: '06',
    title: 'Placement Prep Portal',
    description:
      'A curated prep hub for PEC students with topic-wise DSA sheets, company-tagged problems, and progress tracking. Serves 200+ active users.',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind', 'Vercel'],
    github: 'https://github.com/imran-ahmad/prep-portal',
    demo: 'https://prep-portal.vercel.app',
    accent: '#B9915E',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
  viewport: { once: true, margin: '-100px' },
};

export default function Projects() {
  const [cursorActive, setCursorActive] = useState(false);

  return (
    <section
      id="projects"
      className="portfolio-section projects-section"
      style={{
        minHeight: '100vh',
        padding: '6rem 4rem',
        position: 'relative',
        overflow: 'hidden',
        /* Projects: mid-purple – lighter than skills to create rhythm */
        background: 'linear-gradient(180deg, rgba(20,14,38,0.95) 0%, rgba(13,10,26,0.98) 100%)',
      }}
      onMouseEnter={() => setCursorActive(true)}
      onMouseLeave={() => setCursorActive(false)}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.68,
          pointerEvents: 'none',
        }}
      >
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={500}
          cursorForce={0.1}
          bulgeOnly
          gradientFrom="rgba(175, 210, 250, 0.62)"
          gradientTo="rgba(185, 145, 94, 0.42)"
          glowColor="rgba(175, 210, 250, 0.28)"
        />
      </div>

      {/* Target Cursor — only active while mouse is inside Projects section */}
      {cursorActive && (
        <TargetCursor
          targetSelector=".cursor-target"
          spinDuration={2}
          hideDefaultCursor={false}
          parallaxOn
          hoverDuration={0.2}
        />
      )}

      {/* Ambient top-center glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: 'radial-gradient(ellipse 70% 35% at 50% 0%, rgba(175,210,250,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="section-inner" style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div {...fadeUp} style={{ marginBottom: '3rem' }}>
          <h2 className="section-title">Projects</h2>
        </motion.div>

        {/* Grid Container */}
        <motion.div
          className="projects-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.num}
              className="cursor-target"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 280, damping: 22 } }}
              style={{
                /* Odd cards slightly lighter, even slightly darker for visual variety */
                background: parseInt(project.num) % 2 === 1 
                  ? 'linear-gradient(145deg, #2e2148 0%, #221639 100%)'
                  : 'linear-gradient(145deg, #241b3c 0%, #1a1230 100%)',
                border: '1px solid rgba(175,210,250,0.15)',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'none',
                transition: 'box-shadow 0.25s ease',
                willChange: 'transform',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.4), 0 0 1px rgba(175,210,250,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Gradient top strip – alternates between blue and warm */}
              <div
                style={{
                  height: '2px',
                  background: project.accent === '#AFD2FA'
                    ? 'linear-gradient(90deg, #6da8d4 0%, #AFD2FA 50%, #6da8d4 100%)'
                    : 'linear-gradient(90deg, #B9915E 0%, #d4a96e 50%, #B9915E 100%)',
                }}
              />

              {/* Content Box */}
              <div
                style={{
                  padding: '1.25rem',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {/* Number + Title Row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 600,
                      fontSize: '1.02rem',
                      color: '#FEFAEF',
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {project.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '11px',
                      color: project.accent,
                      flexShrink: 0,
                      opacity: 0.8,
                    }}
                  >
                    {project.num}
                  </span>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    color: 'rgba(254,250,239,0.65)',
                    lineHeight: 1.65,
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: 'auto' }}>
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: 'rgba(14,10,26,0.7)',
                        color: '#8cafc8',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '10px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        border: '1px solid rgba(175,210,250,0.12)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links Row */}
                <div
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    paddingTop: '0.65rem',
                    borderTop: '1px solid rgba(175,210,250,0.1)',
                  }}
                >
                  {[
                    { href: project.github, Icon: FiGithub, label: 'Code' },
                    { href: project.demo, Icon: FiExternalLink, label: 'Live Demo' },
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        color: '#8cafc8',
                        fontSize: '13px',
                        fontFamily: 'Inter, sans-serif',
                        textDecoration: 'none',
                        transition: 'color 0.15s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#AFD2FA'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#8cafc8'; }}
                    >
                      <Icon size={13} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
