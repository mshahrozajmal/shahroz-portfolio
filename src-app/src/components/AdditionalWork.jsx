import { additionalWork } from '../data'
import { Reveal, SectionHeading } from './ui'
import { QaLabel } from '../qalab'

function Card({ item }) {
  return (
    <Reveal className="glass card-lift rounded-xl2 p-[26px] border border-line h-full">
      <div className="flex items-start justify-between gap-3 mb-1">
        <h3 className="font-display text-[18.5px] font-semibold">{item.title}</h3>
        <span
          className="font-mono text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full border border-cyan/40 text-cyan shrink-0"
          style={{ background: 'rgba(34, 211, 238, .06)' }}
        >
          {item.kind}
        </span>
      </div>
      <div className="grid gap-3 mt-3">
        {item.paras.map((p, i) => (
          <p key={i} className="text-slate text-[14.5px] leading-relaxed">{p}</p>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5 mt-5">
        {item.items.map((chip) => (
          <span key={chip} className="chip text-[12px] py-[4px]">{chip}</span>
        ))}
      </div>
    </Reveal>
  )
}

export default function AdditionalWork() {
  return (
    <section id="additional-work" className="relative py-[86px]">
      <QaLabel code="TC_FREELANCE_07" label="Verify additional work section renders" n={6} />
      <div className="shell">
        <SectionHeading
          eyebrow="Additional work"
          title="Requirement engineering and design, on freelance gigs"
          sub="Work I take on alongside QA: defining what a product must do before anyone builds it, and designing how it should feel to use."
        />

        <div className="grid md:grid-cols-2 gap-[22px] mt-10 items-start">
          {additionalWork.map((item) => <Card key={item.title} item={item} />)}
        </div>

        <Reveal delay={140} className="mt-6">
          <p className="font-mono text-[12.5px] text-slate">
            Freelance and contract work, run alongside my QA roles. Not a full-time job, just the other half of how I look at a product.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
