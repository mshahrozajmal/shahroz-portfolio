// ============================================================
// QA INTERACTIVE LAYER (Job 4)
// The portfolio does not just say "QA engineer" -it turns the visitor into one.
// Four features, all vanilla React + CSS, no external libraries:
//   4.1 QA Mode toggle    -overlays live test annotations on the page
//   4.2 Bug Hunt          -3 planted, harmless bugs with a scoreboard
//   4.3 Reopened bug      -a playable GitHub-style issue thread (in the WXW case study)
//   4.4 CI status footer  -a pipeline-style readout above the footer
// Nothing fires automatically; nothing blocks a recruiter who just wants to skim.
// ============================================================
import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { useReducedMotion } from './hooks'
import { scrollToTarget } from './scroll'

const BUG_IDS = ['align', 'label', 'link404']

const QaLabContext = createContext(null)
export const useQaLab = () => useContext(QaLabContext)

export function QaLabProvider({ children }) {
  const [qaMode, setQaMode] = useState(false)
  const [found, setFound] = useState({})           // { align: true, ... }
  const [modalOpen, setModalOpen] = useState(false)

  const toggleQaMode = useCallback(() => setQaMode((v) => !v), [])
  const findBug = useCallback((id) => {
    setFound((f) => (f[id] ? f : { ...f, [id]: true }))
  }, [])

  const foundCount = BUG_IDS.filter((id) => found[id]).length
  const allFound = foundCount === BUG_IDS.length

  // Reflect QA Mode on <body> so section outlines are a single CSS rule.
  useEffect(() => {
    document.body.classList.toggle('qa-on', qaMode)
    return () => document.body.classList.remove('qa-on')
  }, [qaMode])

  const value = {
    qaMode, toggleQaMode,
    found, findBug, foundCount, total: BUG_IDS.length, allFound,
    modalOpen, setModalOpen,
  }
  return <QaLabContext.Provider value={value}>{children}</QaLabContext.Provider>
}

// Smooth in-page scroll via the shared Lenis scroller (falls back to native).
function scrollToId(id) {
  if (!document.getElementById(id)) return
  scrollToTarget(id)
  history.replaceState(null, '', `#${id}`)
}

// ------------------------------------------------------------
// 4.1 QA Mode toggle (nav) + per-section annotation tag
// ------------------------------------------------------------
export function QaModeToggle({ className = '' }) {
  const { qaMode, toggleQaMode } = useQaLab()
  return (
    <button
      type="button"
      onClick={toggleQaMode}
      aria-pressed={qaMode}
      className={`qa-toggle ${qaMode ? 'on' : ''} ${className}`}
      title="QA Mode: overlay live test annotations on the page"
    >
      <span className="qa-toggle-dot" aria-hidden="true" />
      QA Mode
      <span className="qa-toggle-state">{qaMode ? 'ON' : 'OFF'}</span>
    </button>
  )
}

export function QaLabel({ code, label, n = 0 }) {
  const { qaMode } = useQaLab()
  if (!qaMode) return null
  return (
    <div className="qa-tag" style={{ '--n': n }} aria-hidden="true">
      <span className="qa-tag-code">{code}</span>
      <span className="qa-tag-desc">{label}</span>
      <span className="qa-tag-pass">PASSED</span>
    </div>
  )
}

// ------------------------------------------------------------
// 4.2 Bug Hunt
// ------------------------------------------------------------

// Bug 1: a word in a heading sits ~3px too high; click (or Enter/Space) snaps it back.
export function MisWord({ children }) {
  const { findBug } = useQaLab()
  const [fixed, setFixed] = useState(false)
  const fix = () => {
    if (fixed) return
    setFixed(true)
    findBug('align')
  }
  return (
    <span
      className={`misword ${fixed ? 'fixed' : ''}`}
      role={fixed ? undefined : 'button'}
      tabIndex={fixed ? undefined : 0}
      onClick={fix}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fix() }
      }}
      title={fixed ? undefined : 'This word looks a little off. Click to align it.'}
      aria-label={fixed ? undefined : 'Misaligned heading word, activate to align it'}
    >
      {children}
    </span>
  )
}

// Bug 2: a button shows a subtle typo on hover/focus and corrects itself on first click.
export function BugLabelButton({ href, real, typo, className = '', icon = null }) {
  const { findBug } = useQaLab()
  const [corrected, setCorrected] = useState(false)
  const [peek, setPeek] = useState(false)
  const label = !corrected && peek ? typo : real
  const onClick = (e) => {
    if (!corrected) { setCorrected(true); findBug('label') }
    e.preventDefault()
    scrollToId(href.replace('#', ''))
  }
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setPeek(true)}
      onMouseLeave={() => setPeek(false)}
      onFocus={() => setPeek(true)}
      onBlur={() => setPeek(false)}
      className={className}
    >
      {icon}{label}
    </a>
  )
}

// The corner scoreboard. Appears once the first bug is found so it never nags a skimmer.
export function BugChip() {
  const { foundCount, total, allFound } = useQaLab()
  if (foundCount === 0) return null
  return (
    <div className={`bug-chip ${allFound ? 'done' : ''}`} role="status" aria-live="polite">
      {allFound ? (
        <>
          <span>3/3. You test like a QA engineer. Let&rsquo;s talk.</span>
          <button type="button" className="bug-chip-cta" onClick={() => scrollToId('contact')}>
            Contact me
          </button>
        </>
      ) : (
        <span>Bugs found: {foundCount}/{total}</span>
      )}
    </div>
  )
}

// Bug 3: a footer link "404"s; instead of navigating, it opens a bug report of itself.
export function BugModal() {
  const { modalOpen, setModalOpen } = useQaLab()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!modalOpen) return
    closeRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') setModalOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [modalOpen, setModalOpen])

  if (!modalOpen) return null
  return (
    <div className="bug-modal-overlay" onClick={() => setModalOpen(false)}>
      <div
        className="bug-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bugmodal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bug-modal-head">
          <span id="bugmodal-title" className="text-cyan text-[13px]">BUG-404 · Broken footer link</span>
          <button ref={closeRef} type="button" className="bug-x" aria-label="Close bug report" onClick={() => setModalOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <div className="bug-modal-body">
          <dl>
            <dt>Summary</dt>
            <dd>Footer link resolves to a page that does not exist and returns a 404.</dd>
            <dt>Steps to reproduce</dt>
            <dd>
              1. Scroll to the footer.<br />
              2. Click the broken footer link.<br />
              3. Observe the response.
            </dd>
            <dt>Expected</dt>
            <dd>The link opens a valid destination.</dd>
            <dt>Actual</dt>
            <dd>The link points nowhere and would 404. Nice catch. That is exactly the reflex the job needs.</dd>
            <dt>Classification</dt>
            <dd className="flex flex-wrap items-center gap-2 mt-1">
              <span className="badge-sev" style={{ color: '#22D3EE', borderColor: 'rgba(34,211,238,.5)', background: 'rgba(34,211,238,.08)' }}>Severity: Low</span>
              <span className="badge-sev" style={{ color: '#F5A524', borderColor: 'rgba(245,165,36,.5)', background: 'rgba(245,165,36,.08)' }}>Status: Known Issue</span>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  )
}

// The footer link that triggers Bug 3.
export function BugFooterLink({ className = '' }) {
  const { findBug, setModalOpen } = useQaLab()
  return (
    <a
      href="#changelog-404"
      className={className}
      onClick={(e) => { e.preventDefault(); findBug('link404'); setModalOpen(true) }}
    >
      Changelog
    </a>
  )
}

// ------------------------------------------------------------
// 4.3 The reopened bug, playable (inside the WXW case study)
// ------------------------------------------------------------
const REOPEN_TEXT =
  'Reopened. Verified on the live build: resolved tickets still fail for real customers. Reproduction steps attached.'

export function WxwThread() {
  const reduced = useReducedMotion()
  const [reopened, setReopened] = useState(false)
  const [typed, setTyped] = useState('')
  const timers = useRef([])

  const verify = () => {
    if (reopened) return
    setReopened(true)
    if (reduced) { setTyped(REOPEN_TEXT); return }
    let i = 0
    const tick = () => {
      i += 1
      setTyped(REOPEN_TEXT.slice(0, i))
      if (i < REOPEN_TEXT.length) timers.current.push(setTimeout(tick, 18))
    }
    timers.current.push(setTimeout(tick, 260))
  }
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  return (
    <div className="gh-thread" role="group" aria-label="GitHub issue thread: resolved tickets still fail">
      <div className="gh-head">
        <div className="flex items-start gap-2.5">
          <span className="font-mono text-[11px] mt-[3px] px-2 py-[2px] rounded-full border border-crit/50 text-crit shrink-0" style={{ background: 'rgba(242,97,107,.1)' }}>
            P1
          </span>
          <h4 className="font-display text-[15px] font-semibold leading-snug">
            Resolved tickets still return errors for customers
          </h4>
        </div>
        <span className={`gh-status ${reopened ? 'reopened' : 'closed'}`}>
          <span className="w-2 h-2 rounded-full" style={{ background: 'currentColor' }} aria-hidden="true" />
          {reopened ? 'Reopened' : 'Closed'}
        </span>
      </div>

      <div className="gh-sep" />

      <div className="gh-comment">
        <span className="gh-avatar" style={{ background: 'rgba(141,162,188,.16)', color: 'var(--slate)' }} aria-hidden="true">D</span>
        <div>
          <div className="font-mono text-[12px] text-slate mb-1">
            <b className="text-ink font-semibold">developer</b> commented
          </div>
          <p className="text-[14px] text-slate leading-relaxed">Fixed in latest build. Closing.</p>
        </div>
      </div>

      {!reopened && (
        <>
          <div className="gh-sep" />
          <div className="p-4">
            <button type="button" className="gh-verify" onClick={verify}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>
              Verify the fix
            </button>
            <p className="font-mono text-[11.5px] text-slate mt-2">Run the check the way a customer would.</p>
          </div>
        </>
      )}

      {reopened && (
        <>
          <div className="gh-sep" />
          <div className="gh-comment">
            <span className="gh-avatar" style={{ background: 'linear-gradient(180deg,#22D3EE,#12b9d6)', color: '#06121a' }} aria-hidden="true">SA</span>
            <div>
              <div className="font-mono text-[12px] text-slate mb-1">
                <b className="text-cyan font-semibold">shahroz</b> reopened this
              </div>
              <p className="text-[14px] text-ink leading-relaxed">
                {typed}
                {typed.length < REOPEN_TEXT.length && <span className="cursor" />}
              </p>
              <p className="font-mono text-[11.5px] text-slate mt-3">
                This is the actual story. Verification is the job.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ------------------------------------------------------------
// 4.4 CI status footer bar
// ------------------------------------------------------------
export function CiStatusBar() {
  return (
    <div className="ci-bar" role="status" aria-label="Continuous integration status: build passing, 500 plus defects logged, 5 of 5 products shipped, uptime since 2023">
      <span className="ci-seg"><span className="ci-dot" aria-hidden="true" />build: <b>passing</b></span>
      <span className="ci-sep" aria-hidden="true">|</span>
      <span className="ci-seg">defects logged: <b>500+</b></span>
      <span className="ci-sep" aria-hidden="true">|</span>
      <span className="ci-seg">products shipped: <b>5/5</b></span>
      <span className="ci-sep" aria-hidden="true">|</span>
      <span className="ci-seg">uptime: <b>since 2023</b></span>
    </div>
  )
}
