import { profile, nav } from '../data'
import { useAnchorScroll } from '../hooks'
import { BugFooterLink } from '../qalab'

export default function Footer() {
  const onAnchor = useAnchorScroll()
  return (
    <footer className="relative border-t border-line py-9 mt-6">
      <div className="shell flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-display font-semibold text-[15px]">{profile.name}</span>
          <span className="font-mono text-[12.5px] text-slate">Quality Assurance Engineer. {profile.positioning}</span>
        </div>
        <div className="flex flex-wrap gap-5 font-mono text-[13px]">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={(e) => onAnchor(e, n.href)} className="text-slate hover:text-cyan transition-colors py-1">
              {n.label}
            </a>
          ))}
          <BugFooterLink className="text-slate hover:text-cyan transition-colors py-1" />
        </div>
      </div>
      <div className="shell mt-6 flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[11.5px] text-slate/70">
          This site contains 3 intentional bugs. Report them by clicking.
        </p>
        <p className="font-mono text-[11.5px] text-slate/70">Built and tested by {profile.name}.</p>
      </div>
    </footer>
  )
}
