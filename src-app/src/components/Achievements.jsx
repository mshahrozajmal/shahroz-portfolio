import { achievements, education } from '../data'
import { Reveal, SectionHeading } from './ui'
import { QaLabel } from '../qalab'

function CheckMarkFree({ i }) {
  // A numbered token, not a check mark, to keep prose symbol-free.
  return (
    <span className="w-[42px] h-[42px] rounded-[12px] grid place-items-center shrink-0 font-mono text-[13px] font-semibold"
      style={{ background: 'rgba(34,211,238,.08)', border: '1px solid #26374D', color: '#22D3EE' }}>
      {String(i + 1).padStart(2, '0')}
    </span>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-[86px]">
      <QaLabel code="TC_WIN_07" label="Verify achievements and education" n={6} />
      <div className="shell">
        <SectionHeading
          eyebrow="Key achievements"
          title="Recognized for speed and rigor"
        />

        <div className="grid md:grid-cols-2 gap-[18px] mt-10">
          {achievements.map((a, i) => (
            <Reveal key={i} delay={(i % 2) * 70}>
              <div className="glass card-lift rounded-xl2 p-[24px] flex gap-4 items-start h-full border border-line">
                <CheckMarkFree i={i} />
                <p className="text-[14.5px] leading-relaxed text-ink/90">{a}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Education: one entry, no GPA */}
        <Reveal delay={120}>
          <div className="mt-[18px]">
            <div className="eyebrow inline-flex mb-4">Academic</div>
            <div className="glass rounded-xl2 p-[24px] border border-line flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-display text-[18px] font-semibold">{education.degree}</div>
                <div className="text-slate text-[14px] mt-1">{education.place}</div>
              </div>
              <span className="font-mono text-[12px] text-slate px-3 py-1 rounded-full border border-line">{education.period}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
