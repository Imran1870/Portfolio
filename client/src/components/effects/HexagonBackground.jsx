import { useCallback, useEffect, useRef, useState } from 'react';
import './BackgroundEffects.css';

export default function HexagonBackground({
  className = '',
  children,
  hexagonProps = {},
  hexagonSize = 75,
  hexagonMargin = 3,
  ...props
}) {
  const containerRef = useRef(null);
  const hexagonWidth = hexagonSize;
  const hexagonHeight = hexagonSize * 1.1;
  const rowSpacing = hexagonSize * 0.8;
  const baseMarginTop = -36 - 0.275 * (hexagonSize - 100);
  const computedMarginTop = baseMarginTop + hexagonMargin;
  const oddRowMarginLeft = -(hexagonSize / 2);
  const evenRowMarginLeft = hexagonMargin / 2;
  const [activeCell, setActiveCell] = useState(null);
  const [gridDimensions, setGridDimensions] = useState({ rows: 0, columns: 0 });

  const updateGridDimensions = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    const width = rect?.width || window.innerWidth;
    const height = rect?.height || window.innerHeight;
    const rows = Math.ceil(height / rowSpacing) + 2;
    const columns = Math.ceil(width / hexagonWidth) + 2;
    setGridDimensions({ rows, columns });
  }, [rowSpacing, hexagonWidth]);

  useEffect(() => {
    updateGridDimensions();
    window.addEventListener('resize', updateGridDimensions);
    return () => window.removeEventListener('resize', updateGridDimensions);
  }, [updateGridDimensions]);

  return (
    <div
      ref={containerRef}
      data-slot="hexagon-background"
      className={`hexagon-background ${className}`.trim()}
      style={{ '--hexagon-margin': `${hexagonMargin}px` }}
      aria-hidden="true"
      {...props}
    >
      <div className="hexagon-grid">
        {Array.from({ length: gridDimensions.rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="hexagon-row"
            style={{
              marginTop: computedMarginTop,
              marginLeft:
                ((rowIndex + 1) % 2 === 0 ? evenRowMarginLeft : oddRowMarginLeft) - 10,
            }}
          >
            {Array.from({ length: gridDimensions.columns }).map((__, columnIndex) => (
              <div
                key={`hexagon-${rowIndex}-${columnIndex}`}
                {...hexagonProps}
                onMouseEnter={() => setActiveCell(`${rowIndex}-${columnIndex}`)}
                onMouseLeave={() => setActiveCell(null)}
                className={[
                  'hexagon-cell',
                  activeCell === `${rowIndex}-${columnIndex}` ? 'hexagon-cell-active' : '',
                  hexagonProps.className || '',
                ].filter(Boolean).join(' ')}
                style={{
                  width: hexagonWidth,
                  height: hexagonHeight,
                  marginLeft: hexagonMargin,
                  ...hexagonProps.style,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}
