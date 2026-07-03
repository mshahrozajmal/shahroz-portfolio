// The reusable QA case-study template. One component renders every project's
// detail view from a case-study object. Section 5 switches on `cs.variant`:
// 'traceability' -> requirements-to-test-case matrix; 'reverse' -> the
// Reverse-Engineering sub-template for products that shipped with no docs.
import { motion } from 'framer-motion'
import { staggerParent, staggerChild } from '../motion'
import { STATUS } from '../caseStudies'
import { WxwThread } from '../qalab'

const PRIORITY = {
  P1: '#F2616B',
  P2: '#F5A524',
  P3: '#22D3EE',
}

// ---- small shared bits -----------------------------------------------------

function Section({ n, eyebrow, title, accent = '#22D3EE', children }) {
  return (
    <motion.section variants={staggerChild} className="cs-section">
      <div className="flex items-center gap-3 mb-4">
        <span className="cs-sec-num" style={{ color: accent, borderColor: `${accent}55` }}>
          {String(n).padStart(2, '0')}
        </span>
        <div>
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: accent }}>{eyebrow}</div>
          <h3 className="font-display text-[19px] sm:text-[21px] font-bold leading-tight mt-0.5">{title}</h3>
        </div>
      </div>
      {children}
    </motion.section>
  )
}

function Pill({ children, color }) {
  return <span className="chip text-[12px] py-[4px]" style={color ? { color, borderColor: `${color}66` } : undefined}>{children}</span>
}

function PriorityTag({ p }) {
  const c = PRIORITY[p] || '#8DA2BC'
  return <span className="cs-tag" style={{ color: c, borderColor: `${c}66`, background: `${c}14` }}>{p}</span>
}

function StatusTag({ s }) {
  const c = (STATUS[s] || {}).color || '#8DA2BC'
  return (
    <span className="cs-tag inline-flex items-center gap-1.5" style={{ color: c, borderColor: `${c}66`, background: `${c}14` }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
      {s}
    </span>
  )
}

// ---- section 1: overview ---------------------------------------------------

function Overview({ overview, accent }) {
  const rows = [
    ['Product', overview.product],
    ['My role', overview.role],
    ['Timeframe', overview.timeframe],
  ]
  return (
    <Section n={1} eyebrow="Project overview" title="What it is and what I owned" accent={accent}>
      <div className="grid gap-3">
        {rows.map(([k, v]) => (
          <div key={k} className="cs-kv">
            <div className="cs-kv-key">{k}</div>
            <div className="cs-kv-val">{v}</div>
          </div>
        ))}
        <div className="cs-kv">
          <div className="cs-kv-key">Stack</div>
          <div className="cs-kv-val flex flex-wrap gap-1.5">
            {overview.stack.map((s) => <Pill key={s}>{s}</Pill>)}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ---- section 2: approach ---------------------------------------------------

function Approach({ approach, accent }) {
  return (
    <Section n={2} eyebrow="How I approached the project" title="The QA effort, end to end" accent={accent}>
      <div className="grid sm:grid-cols-2 gap-3">
        {approach.map((step, i) => (
          <div key={i} className="glass rounded-[14px] border border-line p-[18px]">
            <div className="font-mono text-[12px] mb-2" style={{ color: accent }}>0{i + 1}</div>
            <h4 className="font-display text-[15px] font-semibold mb-1.5">{step.title}</h4>
            <p className="text-slate text-[13.5px] leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

// ---- section 3: test plan --------------------------------------------------

function ListBlock({ title, items, accent, dashed }) {
  return (
    <div className="glass rounded-[14px] border border-line p-[18px]" style={dashed ? { borderStyle: 'dashed' } : undefined}>
      <div className="font-mono text-[11px] tracking-[0.12em] uppercase mb-3" style={{ color: accent }}>{title}</div>
      <ul className="grid gap-2">
        {items.map((it, i) => (
          <li key={i} className="relative pl-5 text-[13.5px] text-slate leading-relaxed">
            <span className="absolute left-0 top-[8px] w-1.5 h-1.5 rounded-sm" style={{ background: accent }} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}

function TestPlan({ plan, accent }) {
  return (
    <Section n={3} eyebrow="Test planning and test plan" title="Scope, strategy, and the guardrails" accent={accent}>
      <div className="grid md:grid-cols-2 gap-3">
        <ListBlock title="In scope" items={plan.scope} accent={accent} />
        <ListBlock title="Out of scope" items={plan.outOfScope} accent="#8DA2BC" dashed />
        <ListBlock title="Strategy" items={plan.strategy} accent={accent} />
        <ListBlock title="Environments" items={plan.environments} accent={accent} />
        <ListBlock title="Entry criteria" items={plan.entryCriteria} accent="#34D399" />
        <ListBlock title="Exit criteria" items={plan.exitCriteria} accent="#34D399" />
      </div>

      <div className="mt-3 glass rounded-[14px] border border-line overflow-hidden">
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase px-[18px] pt-4 pb-2" style={{ color: '#F2616B' }}>Risks and mitigations</div>
        <div className="cs-scroll">
          <table className="cs-table">
            <thead>
              <tr><th style={{ width: '42%' }}>Risk</th><th>Mitigation</th></tr>
            </thead>
            <tbody>
              {plan.risks.map((r, i) => (
                <tr key={i}>
                  <td className="text-ink/90">{r.risk}</td>
                  <td className="text-slate">{r.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  )
}

// ---- section 4: test case design table -------------------------------------

function TestCases({ cases, accent }) {
  return (
    <Section n={4} eyebrow="Test case design template" title="Structured, repeatable test cases" accent={accent}>
      <div className="glass rounded-[14px] border border-line overflow-hidden">
        <div className="cs-scroll">
          <table className="cs-table cs-table-cases">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Preconditions</th>
                <th>Steps</th>
                <th>Expected result</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((tc) => (
                <tr key={tc.id}>
                  <td className="font-mono text-[12px] whitespace-nowrap" style={{ color: accent }}>{tc.id}</td>
                  <td className="text-ink/90 min-w-[150px]">{tc.title}</td>
                  <td className="text-slate min-w-[140px]">{tc.pre}</td>
                  <td className="text-slate min-w-[200px]">
                    <ol className="cs-steps">
                      {tc.steps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                  </td>
                  <td className="text-slate min-w-[190px]">{tc.expected}</td>
                  <td><PriorityTag p={tc.priority} /></td>
                  <td><StatusTag s={tc.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="font-mono text-[11.5px] text-slate/70 mt-2">Each case follows a fixed template so coverage is consistent and reviewable.</p>
    </Section>
  )
}

// ---- section 5a: traceability matrix ---------------------------------------

function Traceability({ matrix, accent }) {
  return (
    <Section n={5} eyebrow="Requirements-to-test-case mapping" title="Traceability matrix" accent={accent}>
      <div className="glass rounded-[14px] border border-line overflow-hidden">
        <div className="cs-scroll">
          <table className="cs-table">
            <thead>
              <tr>
                <th>Requirement</th>
                <th>Description</th>
                <th>Mapped test cases</th>
                <th>Coverage</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row) => (
                <tr key={row.req}>
                  <td className="font-mono text-[12px] whitespace-nowrap" style={{ color: accent }}>{row.req}</td>
                  <td className="text-ink/90 min-w-[180px]">{row.desc}</td>
                  <td className="min-w-[160px]">
                    <div className="flex flex-wrap gap-1.5">
                      {row.cases.map((c) => <span key={c} className="cs-tag font-mono" style={{ color: '#8DA2BC', borderColor: '#26374D' }}>{c}</span>)}
                    </div>
                  </td>
                  <td>
                    <span className="cs-tag" style={row.coverage === 'Full'
                      ? { color: '#34D399', borderColor: '#34D39966', background: '#34D39914' }
                      : { color: '#F5A524', borderColor: '#F5A52466', background: '#F5A52414' }}>
                      {row.coverage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="font-mono text-[11.5px] text-slate/70 mt-2">Every requirement maps to at least one case, so coverage gaps are visible, not assumed.</p>
    </Section>
  )
}

// ---- section 5b: reverse engineering ---------------------------------------

function ReverseEngineering({ reverse, accent }) {
  return (
    <Section n={5} eyebrow="Reverse engineering the requirements" title="No docs, so the product became the spec" accent={accent}>
      <div className="glass rounded-[14px] border border-line p-[18px] mb-3" style={{ borderStyle: 'dashed' }}>
        <p className="text-slate text-[14px] leading-relaxed">{reverse.intro}</p>
      </div>

      <div className="cs-flow">
        {reverse.steps.map((step, i) => (
          <div key={i} className="cs-flow-step glass rounded-[14px] border border-line p-[16px]">
            <div className="font-display text-[15px] font-semibold mb-1.5" style={{ color: accent }}>{step.title}</div>
            <p className="text-slate text-[13px] leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 glass rounded-[14px] border border-line overflow-hidden">
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase px-[18px] pt-4 pb-2" style={{ color: accent }}>Reconstructed (inferred) requirements</div>
        <div className="cs-scroll">
          <table className="cs-table">
            <thead>
              <tr><th>Inferred ID</th><th>Evidence it came from</th><th>Requirement</th></tr>
            </thead>
            <tbody>
              {reverse.inferredReqs.map((r) => (
                <tr key={r.id}>
                  <td className="font-mono text-[12px] whitespace-nowrap" style={{ color: accent }}>{r.id}</td>
                  <td className="text-slate min-w-[180px]">{r.source}</td>
                  <td className="text-ink/90 min-w-[190px]">{r.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  )
}

// ---- section 6: execution & results ----------------------------------------

function ExecutionResults({ execution, accent, showThread }) {
  const m = execution.metrics
  const passRate = m.total ? Math.round((m.passed / m.total) * 100) : 0
  const segs = [
    { k: 'passed', label: 'Passed', v: m.passed, c: '#34D399' },
    { k: 'failed', label: 'Failed', v: m.failed, c: '#F2616B' },
    { k: 'blocked', label: 'Blocked', v: m.blocked, c: '#F5A524' },
    { k: 'notRun', label: 'Not run', v: m.notRun, c: '#8DA2BC' },
  ]
  const d = execution.defects
  const defs = [
    { label: 'Critical', v: d.critical, c: '#F2616B' },
    { label: 'High', v: d.high, c: '#F5A524' },
    { label: 'Medium', v: d.medium, c: '#22D3EE' },
    { label: 'Low', v: d.low, c: '#8DA2BC' },
  ]
  const maxDef = Math.max(...defs.map((x) => x.v), 1)

  return (
    <Section n={6} eyebrow="Execution and results" title="What the testing produced" accent={accent}>
      <p className="text-slate text-[14px] leading-relaxed mb-4">{execution.summary}</p>

      <div className="grid md:grid-cols-2 gap-3">
        {/* pass / fail */}
        <div className="glass rounded-[14px] border border-line p-[18px]">
          <div className="flex items-baseline justify-between mb-3">
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-slate">Execution summary</div>
            <div className="font-display font-bold text-[26px] grad-text leading-none">{passRate}%</div>
          </div>
          <div className="cs-meter" aria-hidden="true">
            {segs.map((s) => s.v > 0 && (
              <span key={s.k} style={{ width: `${(s.v / m.total) * 100}%`, background: s.c }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
            {segs.map((s) => (
              <span key={s.k} className="inline-flex items-center gap-1.5 font-mono text-[12px] text-slate">
                <span className="w-2 h-2 rounded-sm" style={{ background: s.c }} />
                {s.label} <b className="text-ink font-semibold">{s.v}</b>
              </span>
            ))}
          </div>
          <div className="font-mono text-[12px] text-slate mt-3">Total cases <b className="text-ink">{m.total}</b> · Coverage <b className="text-ink">{execution.coverage}%</b></div>
        </div>

        {/* defects */}
        <div className="glass rounded-[14px] border border-line p-[18px]">
          <div className="flex items-baseline justify-between mb-3">
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-slate">Defect summary</div>
            <div className="font-display font-bold text-[26px] grad-text leading-none">{d.total}</div>
          </div>
          <div className="grid gap-2.5">
            {defs.map((x) => (
              <div key={x.label} className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-slate w-14 shrink-0">{x.label}</span>
                <span className="cs-defbar"><span style={{ width: `${(x.v / maxDef) * 100}%`, background: x.c }} /></span>
                <span className="font-mono text-[12px] w-6 text-right" style={{ color: x.c }}>{x.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* outcome / impact */}
      <div className="mt-3 rounded-[14px] border p-[18px]" style={{ borderColor: `${accent}44`, background: `${accent}0d` }}>
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase mb-2" style={{ color: accent }}>Outcome and impact</div>
        <p className="text-ink/90 text-[14px] leading-relaxed">{execution.outcome}</p>
      </div>

      {showThread && (
        <div className="mt-4">
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase mb-1 text-slate">The reopened bug, playable</div>
          <WxwThread />
        </div>
      )}
    </Section>
  )
}

// ---- section 7: github activity --------------------------------------------

const GH_TAG = {
  test: { label: 'test', c: '#22D3EE' },
  bug: { label: 'bug', c: '#F2616B' },
  automation: { label: 'automation', c: '#34D399' },
}

function GithubActivity({ github, accent }) {
  return (
    <Section n={7} eyebrow="GitHub activity" title="Test artifacts and bug reports" accent={accent}>
      <div className="glass rounded-[14px] border border-line overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-white/[.02] font-mono text-[12.5px]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-slate"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.39.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>
          <span className="text-slate">{github.repo}</span>
        </div>
        <ul>
          {github.commits.map((c) => {
            const t = GH_TAG[c.tag] || GH_TAG.test
            return (
              <li key={c.hash} className="cs-commit">
                <span className="font-mono text-[12px] text-slate/80 shrink-0">{c.hash}</span>
                <span className="text-[13.5px] text-ink/90 flex-1 min-w-0">{c.msg}</span>
                <span className="cs-tag shrink-0" style={{ color: t.c, borderColor: `${t.c}66`, background: `${t.c}14` }}>{t.label}</span>
              </li>
            )
          })}
        </ul>
      </div>
      <p className="font-mono text-[11.5px] text-slate/70 mt-2">Representative commits tied to test scripts, bug reports, and automation.</p>
    </Section>
  )
}

// ---- section 8: trello board -----------------------------------------------

const LABEL_C = {
  P1: '#F2616B', P2: '#F5A524', P3: '#22D3EE',
  test: '#22D3EE', bug: '#F2616B', automation: '#34D399', api: '#7de9f6',
  mobile: '#34D399', billing: '#F5A524', payments: '#F5A524', escrow: '#22D3EE',
  rtm: '#34D399', 'reverse-eng': '#c082f5', exploratory: '#c082f5', ocr: '#7de9f6',
  planning: '#8DA2BC', auth: '#22D3EE', roles: '#34D399',
}

function TrelloBoard({ trello, accent }) {
  return (
    <Section n={8} eyebrow="Trello board management" title="How test cycles and bugs were tracked" accent={accent}>
      <div className="cs-scroll">
        <div className="kanban">
          {trello.columns.map((col) => (
            <div key={col.name} className="kanban-col">
              <div className="kanban-head">
                <span>{col.name}</span>
                <span className="kanban-count">{col.cards.length}</span>
              </div>
              <div className="grid gap-2">
                {col.cards.map((card, i) => (
                  <div key={i} className="kanban-card">
                    <span className="kanban-strip" style={{ background: LABEL_C[card.label] || '#8DA2BC' }} />
                    <div className="text-[13px] text-ink/90 leading-snug">{card.title}</div>
                    <span className="cs-tag mt-2 inline-block" style={{ color: LABEL_C[card.label] || '#8DA2BC', borderColor: `${LABEL_C[card.label] || '#8DA2BC'}55`, background: `${LABEL_C[card.label] || '#8DA2BC'}12` }}>{card.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ---- the template ----------------------------------------------------------

export default function CaseStudyTemplate({ cs, onClose }) {
  const accent = cs.accent || '#22D3EE'
  return (
    <div className="cs-inner">
      {/* header */}
      <div className="cs-header" style={{ '--accent': accent }}>
        <div className="min-w-0">
          <div className="font-mono text-[12px] tracking-[0.12em] uppercase mb-1.5" style={{ color: accent }}>Case study</div>
          <h2 className="font-display text-[24px] sm:text-[30px] font-extrabold tracking-tight leading-tight">{cs.name}</h2>
          <p className="text-slate text-[14px] leading-relaxed mt-2 max-w-2xl">{cs.tagline}</p>
        </div>
        <button type="button" className="cs-close" onClick={onClose} aria-label="Close case study">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>

      <motion.div
        className="cs-body"
        variants={staggerParent(0.05)}
        initial="hidden"
        animate="show"
      >
        <Overview overview={cs.overview} accent={accent} />
        <Approach approach={cs.approach} accent={accent} />
        <TestPlan plan={cs.testPlan} accent={accent} />
        <TestCases cases={cs.testCases} accent={accent} />
        {cs.variant === 'reverse'
          ? <ReverseEngineering reverse={cs.reverse} accent={accent} />
          : <Traceability matrix={cs.traceability} accent={accent} />}
        <ExecutionResults execution={cs.execution} accent={accent} showThread={cs.showReopenedThread} />
        <GithubActivity github={cs.github} accent={accent} />
        <TrelloBoard trello={cs.trello} accent={accent} />

        <motion.p variants={staggerChild} className="font-mono text-[11px] text-slate/60 text-center pt-2 pb-1">
          Case-study figures are representative samples that document the QA process for this project.
        </motion.p>
      </motion.div>
    </div>
  )
}
