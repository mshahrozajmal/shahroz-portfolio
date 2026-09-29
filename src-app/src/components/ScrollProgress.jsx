import { useEffect, useRef } from 'react'

// Thin reading-progress bar pinned to the very top of the viewport. It rides
// over the fixed nav pill, so it doubles as a "there is more below" cue.
// Driven by native scroll events: Lenis scrolls the real window, so this works
// in smooth mode, native mode and reduced-motion mode alike.
export default function ScrollProgress() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0

    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const y = window.scrollY || doc.scrollTop || 0
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
      el.style.width = `${(p * 100).toFixed(2)}%`
    }
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return <div className="scroll-progress" ref={ref} aria-hidden="true" />
}
