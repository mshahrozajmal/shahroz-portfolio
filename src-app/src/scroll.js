// Smooth-scroll + scroll-driven motion layer. Lenis drives the page for a weighted,
// premium feel; GSAP ScrollTrigger reads Lenis's position for parallax. A single
// Lenis instance is shared so anchor navigation and the case-study modal can steer
// (scrollTo) and pause (stop/start) the same scroller. All of this is disabled under
// prefers-reduced-motion, falling back to native scrolling.
// Cross-device: Added resize listener for mobile orientation changes.
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

// Mount Lenis once. The smooth layer is an enhancement only: it is created
// inside a guard so any device where Lenis cannot run (old browser, odd
// viewport, reduced motion) keeps native scrolling instead of breaking.
// Resize and orientation changes re-measure ScrollTrigger so parallax and
// pinned positions stay correct on every device, not just the one we build on.
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return

    let instance
    try {
      instance = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        autoResize: true,
      })
    } catch {
      return
    }
    lenis = instance
    instance.on('scroll', ScrollTrigger.update)

    let refreshTimer
    const handleResize = () => {
      ScrollTrigger.update()
      clearTimeout(refreshTimer)
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 180)
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    const onTick = (time) => instance.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)
    ScrollTrigger.refresh()

    return () => {
      clearTimeout(refreshTimer)
      gsap.ticker.remove(onTick)
      instance.destroy()
      lenis = null
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
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
// `strength` is the total travel in px across the full scroll span. Plays on native
// scroll too, so it is not tied to the smooth-scroll (Lenis) layer being active.
export function applyParallax(el, { strength = 60 } = {}) {
  if (!el) return () => {}
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
