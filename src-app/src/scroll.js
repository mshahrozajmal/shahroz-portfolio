// Smooth-scroll + scroll-driven motion layer. Lenis drives the page for a weighted,
// premium feel; GSAP ScrollTrigger reads Lenis's position for parallax. A single
// Lenis instance is shared so anchor navigation and the case-study modal can steer
// (scrollTo) and pause (stop/start) the same scroller. All of this is disabled under
// prefers-reduced-motion, falling back to native scrolling.
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis = null
export const getLenis = () => lenis

// Mount once (App). Wires Lenis into GSAP's ticker so both share one RAF loop.
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return
    const instance = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })
    lenis = instance
    instance.on('scroll', ScrollTrigger.update)
    const onTick = (time) => instance.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(onTick)
      instance.destroy()
      lenis = null
    }
  }, [])
}

// Smooth scroll to an element or #id. Uses Lenis when live, native otherwise.
export function scrollToTarget(target, { offset = -84 } = {}) {
  const el =
    typeof target === 'string'
      ? document.getElementById(target.replace(/^#/, ''))
      : target
  if (!el) return
  if (lenis && !prefersReduced()) {
    lenis.scrollTo(el, { offset })
  } else {
    el.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' })
  }
}

// Pause / resume the scroller (used when a modal locks the page).
export const stopScroll = () => lenis?.stop()
export const startScroll = () => lenis?.start()

// Scrubbed parallax: translates `el` on the Y axis as it moves through the viewport.
// `strength` is the total travel in px across the full scroll span. No-op when reduced.
export function applyParallax(el, { strength = 60 } = {}) {
  if (!el || prefersReduced()) return () => {}
  const tween = gsap.fromTo(
    el,
    { y: -strength / 2 },
    {
      y: strength / 2,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    }
  )
  return () => {
    tween.scrollTrigger?.kill()
    tween.kill()
  }
}
