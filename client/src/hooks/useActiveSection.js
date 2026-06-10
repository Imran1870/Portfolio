import { useState, useEffect, useRef } from 'react';
const SECTIONS = ['main', 'aboutme', 'skills', 'projects', 'achievement', 'contact'];
export function useActiveSection(contentRef) {
  const [activeSection, setActiveSection] = useState('main');
  const observerRef = useRef(null);
  useEffect(() => {
    const options = {
      root: contentRef?.current || null,
      rootMargin: '-10% 0px -60% 0px',
      threshold: 0,
    };
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);
    const elements = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
    elements.forEach((el) => observerRef.current.observe(el));
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [contentRef]);
  return activeSection;
}
