import { experience } from '../data'
import { Reveal, SectionHeading } from './ui'
import { useInView } from '../hooks'
import { QaLabel } from '../qalab'

function Item({ job }) {
  return (
    <div className="relative pb-10 last:pb-0">
      <span
        className={`absolute -left-[34px] top-1.5 w-4 h-4 rounded-full grid place-items-center ${job.active ? 'node-pulse' : ''}`}
        style={{ background: job.active ? '#22D3EE' : '#111826', border: '2px solid #22D3EE', boxShadow: '0 0 0 4px #06090F' }}
        aria-hidden="true"
      />
      <Reveal className="glass rounded-xl2 p-[24px] border border-line">
        <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
          <h3 className="font-display text-[18.5px] font-semibold">
            {job.role} <span className="text-cyan">at {job.company}</span>
          </h3>
          <span className="font-mono text-[12px] text-slate px-3 py-1 rounded-full border border-line whitespace-nowrap">{job.period}</span>
        </div>
        <div className="font-mono text-[12px] text-slate mb-4 flex items-center gap-2 flex-wrap">
          <span>{job.place}</span>
          {job.active && (
            <span className="text-cyan px-2 py-[2px] rounded-full border border-cyan/40" style={{ background: 'rgba(34,211,238,.06)' }}>current role</span>
          )}
        </div>
        <ul className="grid gap-2.5">
          {job.bullets.map((b, i) => (
            <li key={i} className="relative pl-6 text-[14.5px] text-slate leading-relaxed">
              <span className="absolute left-0 top-[9px] w-2 h-2 rounded-sm" style={{ background: '#22D3EE' }} aria-hidden="true" />
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
      <QaLabel code="TC_EXP_05" label="Verify experience order LeapSoft to Roche" n={4} />
      <div className="shell">
        <SectionHeading
          eyebrow="Experience"
          title="Where I have shipped quality"
          sub="Three years testing for international clients, from solo test cycles to running QA across four to five accounts at once."
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
