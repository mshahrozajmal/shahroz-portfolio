import { projects } from '../data'
import { Reveal, SectionHeading } from './ui'
import { MisWord } from '../qalab'
import { QaLabel } from '../qalab'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section id="work" className="relative py-[86px]">
      <QaLabel code="TC_CASE_06" label="Verify 5 case studies load" n={5} />
      <div className="shell">
        <SectionHeading
          eyebrow="Selected projects"
          title={<>Products I helped make <MisWord>reliable</MisWord></>}
          sub="A cross-section of real client products I owned QA for, across visa-tech, artist collaboration, community, and food delivery. Open any card for the full case study."
        />
        <div className="grid md:grid-cols-2 gap-[22px] mt-10">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 80} className={p.featured ? 'md:col-span-2' : ''}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate/60 opacity-0 md:opacity-100 transition-opacity duration-500">
        Scroll with mouse wheel or touchpad to view more projects
      </div>
    </section>
  )
}
