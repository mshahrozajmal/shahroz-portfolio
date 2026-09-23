// Shared Framer Motion primitives. One easing, a small set of variants, and a
// pointer-tilt hook. Every animated surface pulls from here so the motion reads
// as one system. Transform/opacity only, GPU-friendly. Reduced motion is honored
// at the component level (see ui.jsx Reveal and each consumer).
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

// Matches the CSS --ease token so JS and CSS motion feel identical.
export const EASE = [0.22, 1, 0.36, 1]

export const springSoft = { type: 'spring', stiffness: 120, damping: 20, mass: 0.9 }
export const tween = (d = 0.6, delay = 0) => ({ duration: d, ease: EASE, delay })

// Entrance variants. `custom` carries a per-item delay (seconds) for staggering.
export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: tween(0.62, delay) }),
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({ opacity: 1, transition: tween(0.6, delay) }),
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  show: (delay = 0) => ({ opacity: 1, scale: 1, y: 0, transition: { ...springSoft, delay } }),
}

// Parent that staggers its motion children. Pair with `staggerChild`.
export const staggerParent = (stagger = 0.07, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
})

export const staggerChild = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: tween(0.55) },
}

// Standard whileInView props for one-shot reveals.
export const inViewOnce = { once: true, margin: '0px 0px -8% 0px' }

// Pointer-driven 3D tilt. Returns spring-smoothed rotation motion values plus the
// handlers to wire onto the tilting element. Neutral (0,0) when the pointer leaves.
export function useTilt({ max = 7, stiffness = 150, damping: d = 16 } = {}) {
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness, damping: d })
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness, damping: d })

  const onPointerMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => { px.set(0); py.set(0) }

  return { rotateX, rotateY, onPointerMove, reset }
}
