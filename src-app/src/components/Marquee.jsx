import { marquee } from '../data'

export default function Marquee() {
  const items = [...marquee, ...marquee] // duplicated for a continuous loop
  return (
    <div
      className="relative overflow-hidden border-y border-line py-[16px] my-2"
      style={{ maskImage: 'linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)', WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)' }}
      aria-hidden="true"
    >
      <div className="marquee-track font-mono text-[13px] text-slate">
        {items.map((label, i) => (
          <span key={i} className="flex items-center whitespace-nowrap px-6">
            {label}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan/60 ml-6" />
          </span>
        ))}
      </div>
    </div>
  )
}
