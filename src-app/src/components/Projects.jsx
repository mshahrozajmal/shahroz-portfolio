import { projects } from '../data'
import { Reveal, SectionHeading } from './ui'
import { useInView } from '../hooks'
import { QaLabel, MisWord, WxwThread } from '../qalab'

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

function Card({ p }) {
  return (
    <article
      tabIndex={0}
      className={`glass card-lift rounded-xl2 p-[28px] h-full border border-line relative overflow-hidden ${p.featured ? 'md:col-span-2' : ''}`}
    >
      {p.featured && (
        <span className="absolute top-5 right-5 font-mono text-[10.5px] tracking-wide uppercase px-[10px] py-[4px] rounded-full border border-cyan/40 text-cyan" style={{ background: 'rgba(34,211,238,.06)' }}>
          Featured
        </span>
      )}
      <div className={p.featured ? 'grid lg:grid-cols-[1.25fr_1fr] gap-7 items-center' : ''}>
        <div>
          <div className="font-mono text-[12px] text-cyan">{p.category}</div>
          <h3 className="font-display text-[22px] font-bold tracking-tight mt-1 mb-1">{p.name}</h3>
          <div className="font-mono text-[12px] text-slate mb-4">{p.role}</div>
          <p className="text-slate text-[14.5px] leading-relaxed mb-5">{p.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => <span key={t} className="chip text-[12px] py-[4px]">{t}</span>)}
          </div>
          {p.id === 'wxw' && <WxwThread />}
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
    </article>
  )
}

export default function Projects() {
  return (
    <section id="work" className="relative py-[86px]">
      <QaLabel code="TC_CASE_06" label="Verify 5 case studies load" n={5} />
      <div className="shell">
        <SectionHeading
          eyebrow="Selected projects"
          title={<>Products I helped make <MisWord>reliable</MisWord></>}
          sub="A cross-section of real client products I owned QA for, across visa-tech, artist collaboration, community, and food delivery."
        />
        <div className="grid md:grid-cols-2 gap-[22px] mt-10">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 80} className={p.featured ? 'md:col-span-2' : ''}>
              <Card p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
