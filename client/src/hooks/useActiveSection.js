import { useState, useEffect } from 'react';
const SECTIONS = ['main', 'aboutme', 'skills', 'projects', 'achievement', 'contact'];

export function useActiveSection(contentRef, enabled = true) {
  const [activeSection, setActiveSection] = useState('main');

  useEffect(() => {
    const root = contentRef?.current;
    if (!enabled || !root) return;

    let frame = null;

    const updateActiveSection = () => {
      const elements = SECTIONS
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      if (!elements.length) return;

      const rootRect = root.getBoundingClientRect();
      const probeLine = root.scrollTop + root.clientHeight * 0.38;
      let current = elements[0].id;

      for (const el of elements) {
        const sectionTop = el.getBoundingClientRect().top - rootRect.top + root.scrollTop;
        if (sectionTop <= probeLine) {
          current = el.id;
        }
      }

      const nearBottom = root.scrollTop + root.clientHeight >= root.scrollHeight - 24;
      setActiveSection(nearBottom ? elements[elements.length - 1].id : current);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        updateActiveSection();
      });
    };

    updateActiveSection();
    root.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    const observer = new MutationObserver(requestUpdate);
    observer.observe(root, { childList: true, subtree: true });
    const delayedUpdate = window.setTimeout(requestUpdate, 250);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(delayedUpdate);
      observer.disconnect();
      root.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [contentRef, enabled]);

  return activeSection;
}
