import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheck, FiX } from 'react-icons/fi';
import axios from 'axios';
import ShapeGrid from '../ShapeGrid';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
  viewport: { once: true, margin: '-100px' },
};

// Reusable micro-component for rendering form field validation errors
function FieldError({ msg }) {
  return (
    <span
      style={{
        color: '#f87171',
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        marginTop: '4px',
        display: 'block',
      }}
    >
      {msg}
    </span>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Invalid email';
    }
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('loading');
    
    try {
      await axios.post(`${API_URL}/api/contact`, form);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) {
      setErrors((p) => ({ ...p, [name]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      style={{
        minHeight: '100vh',
        padding: '6rem 4rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(8,5,18,0.92) 0%, rgba(4,2,10,0.96) 100%)',
      }}
    >
      {/* ── ShapeGrid Background ── */}
      <ShapeGrid
        direction="diagonal"
        speed={0.4}
        squareSize={44}
        shape="square"
        borderColor="rgba(110,80,180,0.35)"
        hoverFillColor="rgba(130,90,210,0.22)"
        hoverTrailAmount={6}
      />

      {/* Blue left-side glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: 'radial-gradient(ellipse 45% 55% at 5% 50%, rgba(110,159,212,0.09) 0%, transparent 70%)',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Heading */}
        <motion.div {...fadeUp} style={{ marginBottom: '3rem' }}>
          <h2 className="section-title">Get In Touch</h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* — LEFT – Info — */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}
          >
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: 'rgba(254,250,239,0.7)',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              Have a project in mind, an opportunity, or just want to say hi?
              I'm always up for a good conversation – let's build something great together.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { Icon: FiMail, label: 'imran.ahmad@pecchd.ac.in', href: 'mailto:imran.ahmad@pecchd.ac.in' },
                { Icon: FiGithub, label: 'github.com/imran-ahmad', href: 'https://github.com/imran-ahmad' },
                { Icon: FiLinkedin, label: 'linkedin.com/in/imran-ahmad', href: 'https://linkedin.com/in/imran-ahmad' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textDecoration: 'none',
                    color: 'rgba(254,250,239,0.75)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.92rem',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#FEFAEF'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(254,250,239,0.75)'; }}
                >
                  <span
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background: 'rgba(185,145,94,0.12)',
                      border: '1px solid rgba(185,145,94,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} style={{ color: '#B9915E' }} />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* — RIGHT – Form — */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(145deg, #1e1530 0%, #170f28 100%)',
              border: '1px solid rgba(175,210,250,0.18)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-input"
                  style={{ borderColor: errors.name ? '#f87171' : undefined }}
                />
                {errors.name && <FieldError msg={errors.name} />}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                  style={{ borderColor: errors.email ? '#f87171' : undefined }}
                />
                {errors.email && <FieldError msg={errors.email} />}
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  id="contact-message"
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="form-input"
                  style={{
                    resize: 'vertical',
                    borderColor: errors.message ? '#f87171' : undefined,
                  }}
                />
                {errors.message && <FieldError msg={errors.message} />}
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="contact-submit"
                disabled={status === 'loading'}
                className="btn-cta"
                style={{ alignSelf: 'flex-start', opacity: status === 'loading' ? 0.7 : 1 }}
              >
                {status === 'loading' ? (
                  <>Sending...</>
                ) : status === 'success' ? (
                  <><FiCheck size={16} /> Sent!</>
                ) : status === 'error' ? (
                  <><FiX size={16} /> Failed – try again</>
                ) : (
                  <><FiSend size={16} /> Send Message</>
                )}
              </button>

              {/* Toast Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: 'rgba(74,222,128,0.1)',
                    border: '1px solid rgba(74,222,128,0.3)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: '#4ade80',
                  }}
                >
                  ✓ Message received! I'll get back to you soon.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: 'rgba(248,113,113,0.1)',
                    border: '1px solid rgba(248,113,113,0.3)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: '#f87171',
                  }}
                >
                  ✕ Something went wrong. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
