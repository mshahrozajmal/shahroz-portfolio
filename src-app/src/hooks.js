import { useState, useEffect, useRef, useCallback } from 'react'
import { scrollToTarget } from './scroll'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

// Adds the observed element to view once; returns [ref, inView].
export function useInView({ threshold = 0.18, rootMargin = '0px 0px -8% 0px', once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            if (once) io.unobserve(e.target)
          } else if (!once) {
            setInView(false)
          }
        })
      },
      { threshold, rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin, once])
  return [ref, inView]
}

// Counts up to target when active; jumps instantly under reduced motion.
export function useCountUp(target, active, { duration = 1300, reduced = false } = {}) {
  const [val, setVal] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (!active || started.current) return
    started.current = true
    if (reduced) { setVal(target); return }
    let raf
    const t0 = performance.now()
    const ease = (t) => 1 - Math.pow(1 - t, 3)
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      setVal(Math.round(ease(p) * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration, reduced])
  return val
}

// Tracks which section is in view for nav highlighting.
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

// Small helper for smooth in-page anchor scrolling that respects reduced motion.
export function useAnchorScroll() {
  return useCallback((e, href) => {
    if (!href?.startsWith('#')) return
    const el = document.getElementById(href.slice(1))
    if (!el) return
    e.preventDefault()
    scrollToTarget(el)
    history.replaceState(null, '', href)
  }, [])
}
