// Case-study overlay: a context provider that any card can call to open a project
// detail view, plus the animated modal shell that renders the template. Handles
// scroll lock (pauses the Lenis scroller + the page), Escape, overlay-click close,
// and a basic focus trap. Enter/exit is animated with Framer Motion AnimatePresence.
import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { getCaseStudy } from '../caseStudies'
import { stopScroll, startScroll } from '../scroll'
import CaseStudyTemplate from './CaseStudy'

const Ctx = createContext(null)
export const useCaseStudy = () => useContext(Ctx)

export function CaseStudyProvider({ children }) {
  const [activeId, setActiveId] = useState(null)
  const open = useCallback((id) => setActiveId(id), [])
  const close = useCallback(() => setActiveId(null), [])
  return (
    <Ctx.Provider value={{ activeId, open, close }}>
      {children}
      <CaseStudyModal activeId={activeId} onClose={close} />
    </Ctx.Provider>
  )
}

function CaseStudyModal({ activeId, onClose }) {
  const reduced = useReducedMotion()
  const cs = activeId ? getCaseStudy(activeId) : null
  const panelRef = useRef(null)
  const lastFocused = useRef(null)

  useEffect(() => {
    if (!cs) return

    // Remember what had focus so we can restore it on close.
    lastFocused.current = document.activeElement

    // Lock scrolling: pause Lenis and freeze the body.
    stopScroll()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Move focus into the panel.
    const panel = panelRef.current
    const focusables = () =>
      panel ? panel.querySelectorAll('a[href],button:not([disabled]),input,textarea,[tabindex]:not([tabindex="-1"])') : []
    requestAnimationFrame(() => {
      const first = focusables()[0]
      ;(first || panel)?.focus()
    })

    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'Tab') {
        const items = focusables()
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      startScroll()
      // Restore focus to the trigger.
      if (lastFocused.current && lastFocused.current.focus) lastFocused.current.focus()
    }
  }, [cs, onClose])

  const overlayMotion = reduced
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.25 } }

  const panelMotion = reduced
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 40, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 24, scale: 0.985 },
        transition: { type: 'spring', stiffness: 220, damping: 26 },
      }

  return (
    <AnimatePresence>
      {cs && (
        <motion.div className="cs-overlay" onClick={onClose} {...overlayMotion}>
          <motion.div
            className="cs-panel"
            role="dialog"
            aria-modal="true"
            aria-label={`${cs.name} case study`}
            tabIndex={-1}
            ref={panelRef}
            onClick={(e) => e.stopPropagation()}
            {...panelMotion}
          >
            <CaseStudyTemplate cs={cs} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
