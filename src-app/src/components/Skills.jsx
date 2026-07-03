import { skillGroups, growingInto } from '../data'
import { Reveal, SectionHeading } from './ui'
import { QaLabel } from '../qalab'

// Bento spans keyed by index for a varied, engineered grid.
const spans = ['lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-3']

export default function Skills() {
  return (
    <section id="skills" className="relative py-[86px]">
      <QaLabel code="TC_SKILL_03" label="Verify skills matrix and Growing-Into list" n={2} />
      <div className="shell">
        <SectionHeading
          eyebrow="Core skills"
          title="A complete QA toolkit"
          sub="From test strategy and traceability to API checks and AI model validation. Here is what I use day to day."
        />

        <div className="grid lg:grid-cols-6 gap-[18px] mt-10">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 70} className={`${spans[i] || 'lg:col-span-2'}`}>
              <div className="glass card-lift rounded-xl2 p-[24px] h-full border border-line">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-9 h-9 rounded-[10px] grid place-items-center border border-line text-cyan text-sm font-mono">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-[16.5px] font-semibold">{g.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span key={it} className="chip text-[12.5px] py-[5px]">{it}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Growing Into: strictly learning, never claimed as a skill */}
        <Reveal delay={120}>
          <div className="glass rounded-xl2 p-[24px] mt-[18px] border border-dashed border-line">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="eyebrow" style={{ color: '#34D399', borderColor: 'rgba(52,211,153,.4)', background: 'rgba(52,211,153,.06)' }}>Growing into</span>
                </div>
                <p className="text-slate text-[14.5px] leading-relaxed">{growingInto.note}</p>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                {growingInto.items.map((it) => (
                  <span key={it} className="chip text-[12.5px] border-dashed" style={{ color: '#34D399' }}>{it}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
