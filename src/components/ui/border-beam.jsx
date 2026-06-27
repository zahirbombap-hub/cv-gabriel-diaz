import { motion } from 'framer-motion';
import { cn } from '../../lib/utils.js';

export function BorderBeam({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1,
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-[length:var(--border-beam-width)] border-transparent"
      style={
        {
          '--border-beam-width': `${borderWidth}px`,
          mask: 'linear-gradient(transparent,transparent),linear-gradient(#000,#000)',
          maskClip: 'padding-box,border-box',
          maskComposite: 'intersect',
        }
      }
    >
      <motion.div
        className={cn(
          'absolute aspect-square',
          className
        )}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          background: `linear-gradient(to left, var(--color-from), var(--color-to), transparent)`,
          ...style,
        }}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
}
