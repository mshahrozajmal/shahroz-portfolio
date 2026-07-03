import { contact, profile, img } from '../data'
import { Reveal } from './ui'
import { QaLabel } from '../qalab'

function Mail() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg> }
function Phone() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5c0 8 7 15 15 15l2-3-4-2-2 2a13 13 0 0 1-6-6l2-2-2-4Z" /></svg> }
function In() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.5 8.5h3.9V21H3.5V8.5Zm6.2 0h3.7v1.7h.05c.5-.9 1.8-1.9 3.6-1.9 3.9 0 4.6 2.5 4.6 5.8V21h-3.9v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9.7V8.5Z" /></svg> }

export default function Contact() {
  return (
    <section id="contact" className="relative py-[86px]">
      <QaLabel code="TC_LINK_08" label="Verify contact links respond" n={7} />
      <div className="shell">
        <Reveal>
          <div className="glass rounded-[28px] overflow-hidden grid lg:grid-cols-[.82fr_1.18fr] border border-line">
            <div className="relative min-h-[280px] lg:min-h-full">
              <img
                src={img('portrait-editorial.jpg')}
                width="900" height="1100" loading="lazy"
                alt={`${profile.name}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(6,9,15,.65))' }} />
              <span className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[12px] text-ink glass">
                <span className="livedot relative inline-block w-2 h-2 rounded-full" style={{ background: '#34D399' }} />
                {contact.locationPill}
              </span>
            </div>

            <div className="relative p-8 sm:p-12 text-left">
              <span className="eyebrow">Let us connect</span>
              <h2 className="font-display font-bold tracking-tight text-[clamp(24px,3.4vw,34px)] leading-[1.14] mt-5">
                {contact.heading}
              </h2>
              <p className="text-slate text-[15.5px] leading-relaxed mt-4 max-w-lg">{contact.body}</p>

              <div className="flex flex-wrap gap-3 mt-7">
                <a href={`mailto:${profile.email}`} className="btn btn-primary"><Mail /> Email me</a>
                <a href={`tel:${profile.phoneHref}`} className="btn btn-ghost"><Phone /> {profile.phone}</a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><In /> LinkedIn</a>
              </div>

              <p className="font-mono text-[12.5px] text-slate mt-6">{profile.email}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
