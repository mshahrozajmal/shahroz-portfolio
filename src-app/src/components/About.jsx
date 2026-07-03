import { about, img, profile } from '../data'
import { Reveal } from './ui'
import { QaLabel } from '../qalab'

export default function About() {
  return (
    <section id="about" className="relative py-[86px]">
      <QaLabel code="TC_ABOUT_02" label="Verify background summary renders" n={1} />
      <div className="shell">
        <div className="grid lg:grid-cols-[.92fr_1.08fr] gap-12 items-center">
          {/* Portrait with badge */}
          <div className="relative order-last lg:order-none">
            <Reveal className="relative rounded-xl2 overflow-hidden border border-line max-w-[420px]">
              <img
                src={img('portrait-street.jpg')}
                width="900" height="900" loading="lazy"
                alt={`${profile.name} outdoors`}
                className="w-full h-full object-cover aspect-square"
              />
            </Reveal>
            <Reveal delay={120} className="glass absolute -bottom-5 right-3 sm:right-6 rounded-2xl px-4 py-3 flex items-center gap-3">
              <span className="grid place-items-center w-11 h-11 rounded-xl border border-line text-cyan" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 5h16v11H4z" /><path d="M2 20h20" /><path d="M8 9h5M8 12h8" /></svg>
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-display">{about.badge.title}</span>
                <span className="text-[11px] font-mono text-slate">{about.badge.sub}</span>
              </span>
            </Reveal>
          </div>

          {/* Copy */}
          <div>
            <Reveal><span className="eyebrow">About me</span></Reveal>
            <Reveal delay={70} as="h2" className="font-display font-bold tracking-tight leading-[1.14] text-[clamp(24px,3.4vw,34px)] mt-5 mb-5">
              {about.heading}
            </Reveal>
            {about.paras.map((p, i) => (
              <Reveal key={i} delay={120 + i * 60} as="p" className="text-slate text-[15.5px] leading-relaxed mb-4">
                {p}
              </Reveal>
            ))}
            <Reveal delay={340}>
              <div className="flex flex-wrap gap-2.5 mt-6">
                {about.chips.map((c) => <span key={c} className="chip">{c}</span>)}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
