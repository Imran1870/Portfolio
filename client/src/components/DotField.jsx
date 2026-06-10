import { useEffect, useRef, memo } from 'react';
import './DotField.css';

const TWO_PI = Math.PI * 2;

const DotField = memo(({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = 'rgba(168, 85, 247, 0.35)',
  gradientTo = 'rgba(180, 151, 207, 0.25)',
  glowColor = '#120F17',
  ...rest
}) => {
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const rafRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const glowOpacity = useRef(0);
  const engagement = useRef(0);
  const propsRef = useRef({});
  propsRef.current = {
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  };
  const rebuildRef = useRef(null);
  const glowIdRef = useRef(`dot-field-glow-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glowElement = glowRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d', { alpha: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let resizeTimer;

    function buildDots(width, height) {
      const settings = propsRef.current;
      const step = settings.dotRadius + settings.dotSpacing;
      const columns = Math.floor(width / step);
      const rows = Math.floor(height / step);
      const padX = (width % step) / 2;
      const padY = (height % step) / 2;
      const dots = new Array(rows * columns);
      let index = 0;

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const ax = padX + column * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[index++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        }
      }

      dotsRef.current = dots;
    }

    function doResize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = {
        w: width,
        h: height,
        offsetX: rect.left,
        offsetY: rect.top,
      };

      buildDots(width, height);
    }

    function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 100);
    }

    function onMouseMove(event) {
      const size = sizeRef.current;
      mouseRef.current.x = event.clientX - size.offsetX;
      mouseRef.current.y = event.clientY - size.offsetY;
    }

    function updateMouseSpeed() {
      const mouse = mouseRef.current;
      const dx = mouse.prevX - mouse.x;
      const dy = mouse.prevY - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      mouse.speed += (distance - mouse.speed) * 0.5;
      if (mouse.speed < 0.001) mouse.speed = 0;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    }

    const speedInterval = setInterval(updateMouseSpeed, 20);
    let frameCount = 0;

    function tick() {
      frameCount++;
      const dots = dotsRef.current;
      const mouse = mouseRef.current;
      const { w, h } = sizeRef.current;
      const settings = propsRef.current;
      const time = frameCount * 0.02;

      const isInside = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= w && mouse.y <= h;
      const targetEngagement = isInside ? Math.max(Math.min(mouse.speed / 5, 1), 0.45) : 0;
      engagement.current += (targetEngagement - engagement.current) * 0.06;
      if (engagement.current < 0.001) engagement.current = 0;

      glowOpacity.current += (engagement.current - glowOpacity.current) * 0.08;

      if (glowElement) {
        glowElement.setAttribute('cx', mouse.x);
        glowElement.setAttribute('cy', mouse.y);
        glowElement.style.opacity = glowOpacity.current;
      }

      context.clearRect(0, 0, w, h);

      const gradient = context.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, settings.gradientFrom);
      gradient.addColorStop(1, settings.gradientTo);
      context.fillStyle = gradient;

      const cursorRadiusSq = settings.cursorRadius * settings.cursorRadius;
      const radius = settings.dotRadius / 2;
      context.beginPath();

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = mouse.x - dot.ax;
        const dy = mouse.y - dot.ay;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq < cursorRadiusSq && engagement.current > 0.01) {
          const distance = Math.sqrt(distanceSq);
          if (settings.bulgeOnly) {
            const proximity = 1 - distance / settings.cursorRadius;
            const push = proximity * proximity * settings.bulgeStrength * engagement.current;
            const angle = Math.atan2(dy, dx);
            dot.sx += (dot.ax - Math.cos(angle) * push - dot.sx) * 0.15;
            dot.sy += (dot.ay - Math.sin(angle) * push - dot.sy) * 0.15;
          } else {
            const angle = Math.atan2(dy, dx);
            const move = (500 / distance) * (mouse.speed * settings.cursorForce);
            dot.vx += Math.cos(angle) * -move;
            dot.vy += Math.sin(angle) * -move;
          }
        } else if (settings.bulgeOnly) {
          dot.sx += (dot.ax - dot.sx) * 0.1;
          dot.sy += (dot.ay - dot.sy) * 0.1;
        }

        if (!settings.bulgeOnly) {
          dot.vx *= 0.9;
          dot.vy *= 0.9;
          dot.x = dot.ax + dot.vx;
          dot.y = dot.ay + dot.vy;
          dot.sx += (dot.x - dot.sx) * 0.1;
          dot.sy += (dot.y - dot.sy) * 0.1;
        }

        let drawX = dot.sx;
        let drawY = dot.sy;
        if (settings.waveAmplitude > 0) {
          drawY += Math.sin(dot.ax * 0.03 + time) * settings.waveAmplitude;
          drawX += Math.cos(dot.ay * 0.03 + time * 0.7) * settings.waveAmplitude * 0.5;
        }

        if (settings.sparkle) {
          const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
          const sparkleRadius = hash % 100 < 3 ? radius * 1.8 : radius;
          context.moveTo(drawX + sparkleRadius, drawY);
          context.arc(drawX, drawY, sparkleRadius, 0, TWO_PI);
        } else {
          context.moveTo(drawX + radius, drawY);
          context.arc(drawX, drawY, radius, 0, TWO_PI);
        }
      }

      context.fill();
      rafRef.current = requestAnimationFrame(tick);
    }

    doResize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    rebuildRef.current = () => {
      const { w, h } = sizeRef.current;
      if (w > 0 && h > 0) buildDots(w, h);
    };

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(speedInterval);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useEffect(() => {
    rebuildRef.current?.();
  }, [dotRadius, dotSpacing]);

  return (
    <div className="dot-field-container" {...rest}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <radialGradient id={glowIdRef.current}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowIdRef.current})`}
          style={{ opacity: 0, willChange: 'opacity' }}
        />
      </svg>
    </div>
  );
});

DotField.displayName = 'DotField';

export default DotField;
