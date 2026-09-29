import { experience } from '../data'
import { Reveal, SectionHeading } from './ui'
import { useInView } from '../hooks'
import { QaLabel } from '../qalab'

function Item({ job }) {
  const f = job.featured
  return (
    <div className="relative pb-10 last:pb-0">
      <span
        className={`absolute -left-[34px] top-1.5 w-4 h-4 rounded-full grid place-items-center ${job.active ? 'node-pulse' : ''} ${f ? 'scale-125' : ''}`}
        style={{ background: job.active ? 'var(--cyan)' : 'var(--card)', border: '2px solid var(--cyan)', boxShadow: '0 0 0 4px var(--bg2)' }}
        aria-hidden="true"
      />
      <Reveal
        className={`glass card-lift rounded-xl2 border ${f ? 'p-7 lg:p-9 border-cyan/45' : 'p-[24px] border-line'}`}
        style={f ? { boxShadow: '0 30px 60px -34px rgba(34,211,238,.6)' } : undefined}
      >
        <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
          <h3 className={`font-display font-semibold ${f ? 'text-[21px] lg:text-[24px] leading-tight' : 'text-[18.5px]'}`}>
            {job.role} <span className="text-cyan">at {job.company}</span>
          </h3>
          <span
            className={`font-mono rounded-full border whitespace-nowrap ${
              f
                ? 'text-[13px] text-cyan border-cyan/40 px-4 py-1.5'
                : 'text-[12px] text-slate px-3 py-1 border-line'
            }`}
          >
            {job.period}
          </span>
        </div>
        <div className={`font-mono text-slate mb-4 flex items-center gap-2 flex-wrap ${f ? 'text-[13px]' : 'text-[12px]'}`}>
          <span>{job.place}</span>
          {job.active && (
            <span
              className={`text-cyan rounded-full border border-cyan/40 ${f ? 'px-3 py-[3px] text-[12.5px]' : 'px-2 py-[2px]'}`}
              style={{ background: 'rgba(34,211,238,.06)' }}
            >
              current role
            </span>
          )}
        </div>
        <ul className={`grid ${f ? 'gap-3' : 'gap-2.5'}`}>
          {job.bullets.map((b, i) => (
            <li
              key={i}
              className={`relative pl-6 text-slate leading-relaxed ${f ? 'text-[15.5px]' : 'text-[14.5px]'}`}
            >
              <span
                className={`absolute left-0 rounded-sm ${f ? 'top-[10px] w-2.5 h-2.5' : 'top-[9px] w-2 h-2'}`}
                style={{ background: 'var(--cyan)' }}
                aria-hidden="true"
              />
              {b}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}

export default function Experience() {
  const [lineRef, lineIn] = useInView({ threshold: 0.05, rootMargin: '0px 0px -20% 0px' })
  return (
    <section id="experience" className="relative py-[86px]">
      <QaLabel code="TC_EXP_05" label="Verify experience order Code19 to Roche" n={4} />
      <div className="shell">
        <SectionHeading
          eyebrow="Experience"
          title="Where I have shipped quality"
          sub="Two years testing for international clients, from solo test cycles to running QA across four to five accounts at once."
        />

        <div ref={lineRef} className="relative pl-[34px] mt-12">
          <span
            className={`timeline-line ${lineIn ? 'in' : ''} absolute left-[8px] top-2 bottom-2 w-0.5 rounded`}
            style={{ background: 'linear-gradient(#22D3EE, #34D399, transparent)' }}
            aria-hidden="true"
          />
          {experience.map((job) => <Item key={job.company} job={job} />)}
        </div>
      </div>
    </section>
  )
}
