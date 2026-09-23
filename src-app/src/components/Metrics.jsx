import { metrics } from '../data'
import { Reveal, SectionHeading, Counter } from './ui'
import { useReducedMotion } from '../hooks'
import { QaLabel } from '../qalab'

export default function Metrics() {
  const reduced = useReducedMotion()
  return (
    <section id="impact" className="relative py-[86px]">
      <QaLabel code="TC_STAT_04" label="Verify counters match canonical data" n={3} />
      <div className="shell">
        <SectionHeading
          eyebrow="Measurable impact"
          title="The numbers behind the work"
          sub="Good QA protects releases, deadlines, and reputations. Here is what the testing changed."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[18px] mt-10">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 70}>
              <div className="glass card-lift rounded-xl2 p-[26px] h-full border border-line">
                <div className="font-display font-bold leading-none text-[clamp(30px,4vw,46px)] grad-text whitespace-nowrap">
                  <Counter value={m.value} suffix={m.suffix} reduced={reduced} />
                </div>
                <div className="font-display text-[15px] font-semibold mt-3">{m.label}</div>
                <p className="text-slate text-[13px] leading-relaxed mt-2">{m.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
