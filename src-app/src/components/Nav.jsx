import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, profile } from '../data'
import { useActiveSection, useAnchorScroll } from '../hooks'
import { QaModeToggle } from '../qalab'

const ids = nav.map((n) => n.href.slice(1))

export default function Nav() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)
  const onAnchor = useAnchorScroll()

  const go = (e, href) => {
    onAnchor(e, href)
    setOpen(false)
  }

  return (
    <header className="fixed top-0 inset-x-0 z-[100]">
      <div className="shell">
        <nav className="glass my-3.5 flex items-center justify-between rounded-full pl-[18px] pr-3 py-2.5">
          <a href="#top" onClick={(e) => go(e, '#top')} className="flex items-center gap-3 font-display font-bold">
            <span className="grid place-items-center w-[38px] h-[38px] rounded-[11px] text-[15px] tracking-tight"
              style={{ background: 'linear-gradient(180deg,#22D3EE,#12b9d6)', color: '#06121a' }}>
              SA
            </span>
            <span className="hidden sm:flex flex-col leading-[1.15]">
              <span className="text-[14.5px]">Muhammad Shahroz Ajmal</span>
              <span className="text-[11px] font-mono text-slate">QA Engineer</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)}
                className={`navlink ${active === n.href.slice(1) ? 'active' : ''}`}>
                {n.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <QaModeToggle className="hidden lg:inline-flex" />
            <a href="#contact" onClick={(e) => go(e, '#contact')} className="btn btn-primary hidden lg:inline-flex text-[14px] py-2.5">
              Get in touch
            </a>
            <button
              className="lg:hidden grid place-items-center w-[42px] h-[42px] rounded-full border border-line text-ink"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <><path d="M3 7h18" /><path d="M3 12h18" /><path d="M3 17h18" /></>}
              </svg>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              className="lg:hidden glass absolute left-6 right-6 top-[72px] flex flex-col gap-1 p-3.5 rounded-[20px] origin-top"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)}
                  className="px-4 py-3 rounded-xl text-[15px] text-ink hover:bg-white/[.04]">
                  {n.label}
                </a>
              ))}
              <a href="#contact" onClick={(e) => go(e, '#contact')} className="btn btn-primary justify-center mt-1">
                Get in touch
              </a>
              <QaModeToggle className="justify-center mt-1" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
