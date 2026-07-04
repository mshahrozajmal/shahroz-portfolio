import { motion } from 'framer-motion'
import { fadeUp, inViewOnce } from '../motion'
import { useInView, useCountUp } from '../hooks'

// Fade-up reveal, spring/tween-driven by Framer Motion. Same API as before
// (delay in ms, `as` tag, className) so every existing section upgrades for free.
// The entrance animation always plays so the site reads as "alive" regardless of
// the OS reduce-motion / battery-saver setting; only continuous looping motion
// (marquee, ambient drift, pulses) is calmed under reduced motion, via CSS.
export function Reveal({ children, delay = 0, as = 'div', className = '', ...rest }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      custom={delay / 1000}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export function SectionHeading({ eyebrow, title, sub }) {
  return (
    <div className="max-w-2xl">
      <Reveal><span className="eyebrow">{eyebrow}</span></Reveal>
      <Reveal delay={70} as="h2" className="font-display font-bold tracking-tight text-[clamp(26px,4vw,40px)] leading-[1.12] mt-5">
        {title}
      </Reveal>
      {sub && (
        <Reveal delay={130} as="p" className="text-slate text-[15.5px] leading-relaxed mt-4">
          {sub}
        </Reveal>
      )}
    </div>
  )
}

// Counts up when scrolled into view. reduced -> shows final value immediately.
export function Counter({ value, suffix = '', reduced = false, className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.5 })
  const shown = useCountUp(value, inView, { reduced })
  return (
    <span ref={ref} className={className}>
      {shown}{suffix}
    </span>
  )
}
