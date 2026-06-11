import { motion } from 'framer-motion';
import {
  SiPython, SiJavascript, SiTypescript, SiCplusplus, SiC,
  SiReact, SiHtml5, SiCss, SiTailwindcss, SiBootstrap,
  SiNodedotjs, SiExpress, SiFastapi, SiFlask, SiDjango,
  SiMongodb, SiMysql, SiPostgresql, SiRedis, SiFirebase,
  SiDocker, SiLinux, SiGnubash,
  SiGit, SiGithub, SiVscodium, SiFigma, SiPostman,
  SiJupyter, SiVercel,
} from 'react-icons/si';
import { FaAws, FaWindows } from 'react-icons/fa';
import SoftAurora from '../SoftAurora';
const skillGroups = [
  {
    label: 'Languages',
    skills: [
      { name: 'Python', Icon: SiPython, color: '#3776AB' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
      { name: 'C', Icon: SiC, color: '#A8B9CC' },
      { name: 'C++', Icon: SiCplusplus, color: '#00599C' },
    ],
  },
  {
    label: 'Frontend',
    skills: [
      { name: 'React', Icon: SiReact, color: '#61DAFB' },
      { name: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', Icon: SiCss, color: '#1572B6' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Bootstrap', Icon: SiBootstrap, color: '#7952B3' },
    ],
  },
  {
    label: 'Backend & Runtime',
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
      { name: 'Express', Icon: SiExpress, color: '#FEFAEF' },
      { name: 'FastAPI', Icon: SiFastapi, color: '#009688' },
      { name: 'Flask', Icon: SiFlask, color: '#FEFAEF' },
      { name: 'Django', Icon: SiDjango, color: '#092E20' },
    ],
  },
  {
    label: 'Databases',
    skills: [
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
      { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#336791' },
      { name: 'Redis', Icon: SiRedis, color: '#DC382D' },
      { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
    ],
  },
  {
    label: 'DevOps & Cloud',
    skills: [
      { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
      { name: 'AWS', Icon: FaAws, color: '#FF9900' },
      { name: 'Azure', Icon: FaWindows, color: '#0078D4' },
      { name: 'Linux', Icon: SiLinux, color: '#FCC624' },
      { name: 'Bash', Icon: SiGnubash, color: '#4EAA25' },
    ],
  },
  {
    label: 'Tools',
    skills: [
      { name: 'Git', Icon: SiGit, color: '#F05032' },
      { name: 'GitHub', Icon: SiGithub, color: '#FEFAEF' },
      { name: 'VS Code', Icon: SiVscodium, color: '#007ACC' },
      { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
      { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
      { name: 'Jupyter', Icon: SiJupyter, color: '#F37626' },
      { name: 'Vercel', Icon: SiVercel, color: '#FEFAEF' },
    ],
  },
];
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
  viewport: { once: true, margin: '-100px' },
};
export default function Skills() {
  return (
    <section
      id="skills"
      className="portfolio-section skills-section"
      style={{
        minHeight: '100vh',
        padding: '6rem 4rem',
        position: 'relative',
        overflow: 'hidden',
        /* Skills: darkest content section — aurora pops against the deep bg */
        background: 'linear-gradient(180deg, rgba(5,3,13,0.98) 0%, rgba(9,5,18,0.98) 100%)',
      }}
    >
         {/* Aurora Background — cool blue tones over the dark bg */}
      <SoftAurora
       
        speed={0.25}
        scale={1.6}
        brightness={0.68}
        color1="#8ec7f3"
        color2="#4d3a86"
        noiseFrequency={2.2}
        noiseAmplitude={0.75}
        bandHeight={0.45}
        bandSpread={0.9}
        octaveDecay={0.12}
        layerOffset={0.6}
        colorSpeed={0.4}
        enableMouseInteraction={false}
        mouseInfluence={0}
      />
      <div className="section-inner" style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
        {/* Heading */}
        <motion.div {...fadeUp} style={{ marginBottom: '3rem' }}>
          <h2 className="section-title">Skills</h2>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: gi * 0.08 }}
              viewport={{ once: true, margin: '-60px' }}
            >
              {/* Group Label */}
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                color: '#AFD2FA',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}>
                {group.label}
              </div>
              {/* Skill Pills */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '0.6rem',
              }}>
                {group.skills.map(({ name, Icon, color }) => (
                  <motion.div
                    key={name}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                       background: 'rgba(20,14,35,0.82)',
                      border: '1px solid rgba(175,210,250,0.18)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      cursor: 'default',
                       backdropFilter: 'blur(8px)',
                      transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
                      willChange: 'transform',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#AFD2FA';
                        e.currentTarget.style.background = 'rgba(42,31,66,0.9)';
                      e.currentTarget.style.boxShadow = '0 0 14px rgba(175,210,250,0.18)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(175,210,250,0.18)';
                      e.currentTarget.style.background = 'rgba(20,14,35,0.82)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Icon size={20} style={{ color, flexShrink: 0 }} />
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '12px',
                      color: '#FEFAEF',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
