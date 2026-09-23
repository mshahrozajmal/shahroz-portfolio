import { useEffect, useState, useRef } from 'react'
import { terminalLines } from '../data'
import { useReducedMotion } from '../hooks'

const colorFor = (kind) =>
  kind === 'cmd' ? 'text-cyan' : kind === 'pass' ? 'text-green' : 'text-ink'

export default function Terminal() {
  const reduced = useReducedMotion()
  const [typed, setTyped] = useState([]) // array of strings shown so far
  const [done, setDone] = useState(false)
  const timers = useRef([])

  useEffect(() => {
    // Reduced motion: render the whole log instantly.
    if (reduced) {
      setTyped(terminalLines.map((l) => l.text))
      setDone(true)
      return
    }
    let line = 0
    let char = 0
    const shown = terminalLines.map(() => '')
    const step = () => {
      if (line >= terminalLines.length) { setDone(true); return }
      const full = terminalLines[line].text
      char += 1
      shown[line] = full.slice(0, char)
      setTyped([...shown])
      if (char >= full.length) {
        line += 1
        char = 0
        timers.current.push(setTimeout(step, 260)) // pause between lines
      } else {
        timers.current.push(setTimeout(step, 26)) // per-character speed
      }
    }
    timers.current.push(setTimeout(step, 420))
    return () => timers.current.forEach(clearTimeout)
  }, [reduced])

  return (
    <div
      className="glass rounded-xl2 overflow-hidden shadow-[0_30px_80px_-40px_rgba(34,211,238,.5)]"
      style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
      role="img"
      aria-label="QA report terminal. defects found 500 plus. products tested 5. coverage plus 40 percent. post release defects minus 30 percent. status passed."
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-white/[.02]">
        <span className="w-3 h-3 rounded-full" style={{ background: '#F2616B' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#F5A524' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#34D399' }} />
        <span className="font-mono text-[11.5px] text-slate ml-2">qa-report.log</span>
      </div>
      <div className="font-mono text-[13.5px] leading-[1.9] p-5 min-h-[236px]" aria-hidden="true">
        {terminalLines.map((l, i) => {
          const content = typed[i] ?? ''
          const isLast = i === terminalLines.length - 1
          const active = content.length > 0 || (typed.length > i)
          return (
            <div key={i} className={active ? 'opacity-100' : 'opacity-0'}>
              <span className={colorFor(l.kind)}>{content}</span>
              {!done && content.length > 0 && content.length < l.text.length && (
                <span className="cursor" />
              )}
              {done && isLast && <span className="cursor" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
