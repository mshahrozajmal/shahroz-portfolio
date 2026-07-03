import { useInView, useCountUp } from '../hooks'

// Fade-up reveal; stagger via `delay` (ms). Honors reduced motion through CSS.
export function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
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
