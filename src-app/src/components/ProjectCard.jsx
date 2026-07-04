// Reactive project card. Base state shows the project summary; on hover (or
// keyboard focus) a full-card overlay reveals the outcome preview and a call to
// open the case study. Pointer tilt adds depth. The whole card is a button that
// opens the detail modal. All motion degrades gracefully under reduced motion.
import { motion } from 'framer-motion'
import { useTilt } from '../motion'
import { useInView } from '../hooks'
import { useCaseStudy } from './CaseStudyModal'

const SEV = [
  { key: 'critical', label: 'Critical', color: '#F2616B' },
  { key: 'high', label: 'High', color: '#F5A524' },
  { key: 'medium', label: 'Medium', color: '#22D3EE' },
]

function SeverityBars({ severity }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const max = Math.max(...SEV.map((s) => severity[s.key]))
  return (
    <div ref={ref} className="grid gap-2.5 mt-1">
      {SEV.map((s) => (
        <div key={s.key} className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-slate w-14 shrink-0">{s.label}</span>
          <span className={`sevbar ${inView ? 'in' : ''} relative h-2 flex-1 rounded-full overflow-hidden`} style={{ background: 'rgba(255,255,255,.05)' }}>
            <span style={{ background: s.color, '--w': severity[s.key] / max }} />
          </span>
          <span className="font-mono text-[12px] w-6 text-right" style={{ color: s.color }}>{severity[s.key]}</span>
        </div>
      ))}
    </div>
  )
}

function Arrow() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
}

export default function ProjectCard({ p }) {
  const { open } = useCaseStudy()
  const { rotateX, rotateY, onPointerMove, reset } = useTilt({ max: 6 })

  const activate = () => open(p.id)
  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate() }
  }

  const tiltStyle = { rotateX, rotateY, transformPerspective: 900 }

  return (
    <motion.article
      role="button"
      tabIndex={0}
      aria-label={`${p.name}. ${p.category}. Open case study.`}
      onClick={activate}
      onKeyDown={onKeyDown}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      style={tiltStyle}
      className={`project-card glass rounded-xl2 p-[28px] h-full border border-line relative overflow-hidden cursor-pointer ${p.featured ? 'md:col-span-2' : ''}`}
    >
      {p.featured && (
        <span className="absolute top-5 right-5 z-[2] font-mono text-[10.5px] tracking-wide uppercase px-[10px] py-[4px] rounded-full border border-cyan/40 text-cyan" style={{ background: 'rgba(34,211,238,.06)' }}>
          Featured
        </span>
      )}

      {/* base content */}
      <div className={p.featured ? 'grid lg:grid-cols-[1.25fr_1fr] gap-7 items-center' : ''}>
        <div>
          <div className="font-mono text-[12px] text-cyan">{p.category}</div>
          <h3 className="font-display text-[22px] font-bold tracking-tight mt-1 mb-1">{p.name}</h3>
          <div className="font-mono text-[12px] text-slate mb-4">{p.role}</div>
          <p className="text-slate text-[14.5px] leading-relaxed mb-5">{p.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => <span key={t} className="chip text-[12px] py-[4px]">{t}</span>)}
          </div>
        </div>

        <div className={p.featured ? '' : 'mt-6'}>
          {p.severity && <SeverityBars severity={p.severity} />}
          <div className={`grid grid-cols-3 gap-3 ${p.severity ? 'mt-5' : ''}`}>
            {p.stats.map((s) => (
              <div key={s.k} className="rounded-[13px] border border-line p-3" style={{ background: 'rgba(255,255,255,.015)' }}>
                <div className="font-display font-bold text-[17px] grad-text whitespace-nowrap">{s.v}</div>
                <div className="text-slate text-[11px] mt-1 leading-tight">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* persistent affordance */}
      <span className="pc-hint">
        Case study <Arrow />
      </span>

      {/* hover / focus reveal: outcome preview */}
      <div className="card-reveal" aria-hidden="true">
        <div className="card-reveal-body">
          <span className="pc-outcome-eyebrow">Outcome</span>
          <p className="pc-outcome">{p.outcome}</p>
          <div className="pc-outcome-foot">
            {p.outcomeStat && (
              <span className="pc-outcome-stat"><b className="grad-text">{p.outcomeStat.v}</b> {p.outcomeStat.k}</span>
            )}
            <span className="pc-cta">Open case study <Arrow /></span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
