import { useRef, useEffect } from 'react'
import { profile, heroStats, img } from '../data'
import { Reveal, Counter } from './ui'
import Terminal from './Terminal'
import { useReducedMotion, useAnchorScroll } from '../hooks'
import { applyParallax } from '../scroll'
import { QaLabel, BugLabelButton } from '../qalab'

function MailIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg> }
function PinIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg> }
function InIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.5 8.5h3.9V21H3.5V8.5Zm6.2 0h3.7v1.7h.05c.5-.9 1.8-1.9 3.6-1.9 3.9 0 4.6 2.5 4.6 5.8V21h-3.9v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9.7V8.5Z" /></svg> }

export default function Hero() {
  const reduced = useReducedMotion()
  const onAnchor = useAnchorScroll()
  const portraitRef = useRef(null)

  // Scrubbed parallax on the portrait. The inner layer is oversized (scale 1.15)
  // so the vertical travel never exposes an edge. No-op under reduced motion.
  useEffect(() => applyParallax(portraitRef.current, { strength: 46 }), [])

  return (
    <section id="top" className="relative pt-[132px] pb-[72px]">
      <QaLabel code="TC_HERO_01" label="Verify identity and hero tagline render" n={0} />
      <div className="shell relative z-[1]">
        <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-[46px] items-center">
          {/* Left: copy */}
          <div>
            <Reveal>
              <span className="eyebrow inline-flex items-center gap-2">
                <span className="livedot relative inline-block w-2 h-2 rounded-full" style={{ background: '#34D399' }} />
                Available for QA roles and freelance work
              </span>
            </Reveal>

            <Reveal delay={120} as="h1" className="font-display font-extrabold tracking-tight leading-[1.04] text-[clamp(38px,6vw,66px)] mt-6">
              {profile.name}
            </Reveal>

            <Reveal delay={240} as="p" className="font-mono text-[12.5px] sm:text-[13px] text-slate leading-relaxed mt-5 max-w-xl">
              {profile.headline}
            </Reveal>

            <Reveal delay={320} as="p" className="font-display text-[19px] sm:text-[21px] font-semibold mt-5">
              <span className="grad-text">Different products.</span>{' '}
              <span className="text-ink">Different approach.</span>
            </Reveal>

            <Reveal delay={420} as="p" className="text-slate text-[15.5px] leading-relaxed mt-5 max-w-xl">
              {profile.intro}
            </Reveal>

            <Reveal delay={520}>
              <div className="flex flex-wrap gap-3 mt-7">
                <BugLabelButton href="#work" real="View my work" typo="View my wrok" className="btn btn-primary" />
                <a href="#contact" onClick={(e) => onAnchor(e, '#contact')} className="btn btn-ghost">Get in touch</a>
              </div>
            </Reveal>

            <Reveal delay={600}>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 font-mono text-[12.5px] text-slate">
                <a className="inline-flex items-center gap-2 hover:text-cyan transition-colors" href={`mailto:${profile.email}`}><MailIcon />{profile.email}</a>
                <a className="inline-flex items-center gap-2 hover:text-cyan transition-colors" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><InIcon />{profile.linkedinLabel}</a>
                <span className="inline-flex items-center gap-2"><PinIcon />{profile.location}</span>
              </div>
            </Reveal>
          </div>

          {/* Right: portrait + signature terminal */}
          <div className="relative order-first lg:order-none">
            <Reveal delay={220} className="relative rounded-xl2 overflow-hidden border border-line max-w-[440px] mx-auto lg:mx-0 lg:ml-auto aspect-[4/5]">
              <div ref={portraitRef} className="absolute inset-0 will-change-transform">
                <img
                  src={img('portrait-main.jpg')}
                  width="880" height="1040"
                  alt={`${profile.name}, Quality Assurance Engineer`}
                  className="w-full h-full object-cover scale-[1.15]"
                  fetchpriority="high"
                />
              </div>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(6,9,15,.72))' }} />
            </Reveal>

            <Reveal delay={340} className="mt-5 lg:mt-0 lg:absolute lg:bottom-[-34px] lg:left-[-18px] lg:w-[350px] max-w-[440px] mx-auto lg:mx-0">
              <Terminal />
            </Reveal>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-[66px] lg:mt-[92px]">
          {heroStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <div className="glass card-lift rounded-xl2 p-[22px] h-full border border-line">
                <div className="font-display font-bold leading-none text-[clamp(26px,3.4vw,38px)] grad-text whitespace-nowrap">
                  <Counter value={s.value} suffix={s.suffix} reduced={reduced} />
                </div>
                <div className="text-slate text-[13.5px] mt-3">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
