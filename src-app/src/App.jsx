import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Metrics from './components/Metrics'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { QaLabProvider, BugChip, BugModal, CiStatusBar } from './qalab'

export default function App() {
  return (
    <QaLabProvider>
      <a href="#top" className="skip-link">Skip to content</a>
      <div className="ambient" aria-hidden="true" />
      <div className="relative z-[1]">
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Skills />
          <Metrics />
          <Experience />
          <Projects />
          <Achievements />
          <Contact />
        </main>
        <CiStatusBar />
        <Footer />
      </div>
      <BugChip />
      <BugModal />
    </QaLabProvider>
  )
}
