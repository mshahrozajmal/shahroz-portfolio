// Case-study content for the project detail views. One entry per project id.
// `variant` selects section 5 of the template: 'traceability' renders a
// requirements-to-test-case matrix (docs existed); 'reverse' renders the
// Reverse-Engineering sub-template (no formal docs existed).
//
// Figures here are representative samples structured to demonstrate the QA
// process for each real project, consistent with the canonical claims on the
// site. The detail view labels them as sample data.

// Shared status/priority vocab used by the table + charts.
export const STATUS = {
  Pass: { color: '#34D399' },
  Fail: { color: '#F2616B' },
  Blocked: { color: '#F5A524' },
  'Not Run': { color: '#8DA2BC' },
}

export const caseStudies = {
  // ==========================================================================
  // GOODNEST — traceability variant (required, full instance)
  // ==========================================================================
  goodnest: {
    id: 'goodnest',
    name: 'Goodnest',
    tagline: 'Community platform on Flutter, tested across mobile and API with full requirement traceability.',
    variant: 'traceability',
    accent: '#22D3EE',
    overview: {
      product:
        'Goodnest is a community platform built on Flutter for mobile. Members create and join communities, admins and moderators manage them, and members are brought in through three invite paths (QR, email, and URL). It runs ticket and inbox management and three paid membership tiers billed through Stripe.',
      role: 'QA Engineer, owning manual, API, and mobile testing end to end.',
      timeframe: 'One release cycle, roughly five weeks, at LeapSoft.',
      stack: ['Flutter', 'Node.js API', 'Stripe Billing', 'Postman', 'Trello', 'GitHub Issues'],
    },
    approach: [
      {
        title: 'Read the product before writing a single case',
        body: 'I started from the feature list and the client build notes, mapped the role model (member, moderator, admin), and walked every screen on a real device so my test cases matched how the app actually behaves, not how a spec imagined it.',
      },
      {
        title: 'Split platform testing from API testing',
        body: 'The mobile app and the backend fail in different ways, so I tested them as two surfaces. UI flows on device, then the same operations driven straight against the API in Postman to catch what the UI quietly hides.',
      },
      {
        title: 'Treat billing as the highest-risk area',
        body: 'Money moving through Stripe across three tiers meant upgrade, downgrade, failed-payment, and webhook states all needed coverage. I mapped each tier to its entitlements and verified access changed the moment a subscription did.',
      },
      {
        title: 'Trace every case back to a requirement',
        body: 'Each test case carried the requirement id it proved, so coverage was a fact I could point to rather than a feeling. Gaps in the matrix became the next cases to write.',
      },
    ],
    testPlan: {
      scope: [
        'Community creation, settings, and deletion',
        'Role and permission model: member, moderator, admin',
        'Three invite paths: QR code, email invite, shareable URL',
        'Ticket and inbox management',
        'Three Stripe membership tiers and their entitlements',
        'API testing on both the platform and the mobile app',
      ],
      outOfScope: [
        'Load and performance testing',
        'Native push-notification delivery infrastructure',
        'Third-party Stripe dashboard internals',
      ],
      strategy: [
        'Black-box functional testing on device for every user-facing flow',
        'API testing in Postman for auth, invites, tickets, and billing endpoints',
        'Role-based testing: every permission checked from each role',
        'Regression pass on invites and billing after each fix batch',
      ],
      environments: [
        'Android and iOS builds on physical devices',
        'Staging API with Stripe test-mode keys',
        'Postman collection with environment variables per role token',
      ],
      entryCriteria: [
        'Build installs and launches on target devices',
        'Staging API reachable and seeded with test accounts',
        'Stripe test mode configured with the three tier products',
      ],
      exitCriteria: [
        'All P1 and P2 test cases executed with no open critical defects',
        'Every requirement covered by at least one passing case',
        'Billing state transitions verified for all three tiers',
      ],
      risks: [
        { risk: 'Invite links reused or shared beyond intended recipient', mitigation: 'Test expiry, single-use, and role-on-accept for all three paths' },
        { risk: 'Entitlements lag behind a subscription change', mitigation: 'Verify access flips immediately on upgrade, downgrade, and cancel' },
        { risk: 'API accepts actions the UI blocks', mitigation: 'Drive privileged endpoints directly with lower-role tokens' },
      ],
    },
    testCases: [
      { id: 'TC_COMM_01', title: 'Admin creates a community', pre: 'Logged in as admin', steps: ['Open Create Community', 'Enter name, description, visibility', 'Submit'], expected: 'Community is created and admin lands in it as owner', priority: 'P1', status: 'Pass' },
      { id: 'TC_INV_04', title: 'Join via QR invite', pre: 'Valid QR invite for a community', steps: ['Scan QR from the invite screen', 'Confirm join'], expected: 'Member is added with the member role and sees community content', priority: 'P1', status: 'Pass' },
      { id: 'TC_INV_07', title: 'Expired email invite is rejected', pre: 'Email invite past its expiry window', steps: ['Open the expired email link', 'Attempt to accept'], expected: 'Join is refused with a clear expired-invite message', priority: 'P2', status: 'Fail' },
      { id: 'TC_ROLE_09', title: 'Moderator cannot delete community', pre: 'Logged in as moderator', steps: ['Open community settings', 'Look for delete action'], expected: 'Delete is hidden for moderators and blocked at the API', priority: 'P1', status: 'Pass' },
      { id: 'TC_BILL_12', title: 'Upgrade tier unlocks entitlements', pre: 'Member on the base tier', steps: ['Open membership', 'Upgrade to the top tier via Stripe test card', 'Return to app'], expected: 'Top-tier features unlock immediately after the webhook confirms', priority: 'P1', status: 'Pass' },
      { id: 'TC_BILL_15', title: 'Failed card leaves tier unchanged', pre: 'Member attempting an upgrade', steps: ['Use a Stripe decline test card', 'Submit payment'], expected: 'Upgrade is refused, member stays on current tier, error surfaced', priority: 'P2', status: 'Pass' },
      { id: 'TC_TICK_18', title: 'Ticket routes to community inbox', pre: 'Member with an open ticket', steps: ['Submit a support ticket', 'Check admin inbox'], expected: 'Ticket appears in the correct community inbox with status New', priority: 'P3', status: 'Blocked' },
    ],
    traceability: [
      { req: 'REQ-01', desc: 'Admins can create and configure a community', cases: ['TC_COMM_01'], coverage: 'Full' },
      { req: 'REQ-02', desc: 'Members join through QR, email, or URL invites', cases: ['TC_INV_04', 'TC_INV_07'], coverage: 'Full' },
      { req: 'REQ-03', desc: 'Roles gate destructive and admin actions', cases: ['TC_ROLE_09'], coverage: 'Full' },
      { req: 'REQ-04', desc: 'Three Stripe tiers control feature entitlements', cases: ['TC_BILL_12', 'TC_BILL_15'], coverage: 'Full' },
      { req: 'REQ-05', desc: 'Tickets are captured and managed in an inbox', cases: ['TC_TICK_18'], coverage: 'Partial' },
    ],
    execution: {
      summary:
        'Ran 74 test cases across two devices and the Postman collection over the cycle. Billing and invites got a second regression pass after fixes. One expired-invite defect and one inbox routing issue were the only items to carry into retest.',
      metrics: { total: 74, passed: 61, failed: 6, blocked: 4, notRun: 3 },
      coverage: 96,
      defects: { critical: 4, high: 11, medium: 22, low: 9, total: 46 },
      outcome:
        'Every membership tier and invite path shipped verified, with no payment-related defect reaching production. Mapping cases to requirements gave the client a coverage report they could read at a glance and cut post-release surprises on billing.',
    },
    github: {
      repo: 'leapsoft/goodnest-qa',
      commits: [
        { hash: 'a1f4c2e', msg: 'Add Postman collection for invite and billing endpoints', tag: 'automation' },
        { hash: '7b9d013', msg: 'Bug: expired email invite still accepted (P2)', tag: 'bug' },
        { hash: 'c3e88a1', msg: 'Test cases for three Stripe tier transitions', tag: 'test' },
        { hash: 'e02b7ff', msg: 'Regression notes: entitlements after downgrade', tag: 'test' },
        { hash: '5da61c9', msg: 'Bug: moderator delete blocked in UI but open on API (P1)', tag: 'bug' },
      ],
    },
    trello: {
      columns: [
        { name: 'Backlog', cards: [{ title: 'Draft invite-path test cases', label: 'test' }, { title: 'Map tiers to entitlements', label: 'billing' }] },
        { name: 'In Progress', cards: [{ title: 'API testing: tickets endpoint', label: 'api' }, { title: 'Device pass: iOS invites', label: 'mobile' }] },
        { name: 'In Review', cards: [{ title: 'Expired invite defect', label: 'P2' }, { title: 'Inbox routing issue', label: 'P3' }] },
        { name: 'Done', cards: [{ title: 'Tier upgrade entitlements', label: 'P1' }, { title: 'Moderator permission checks', label: 'P1' }, { title: 'Failed-card handling', label: 'P2' }] },
      ],
    },
  },

  // ==========================================================================
  // WXW DELIVERY DELIGHT — reverse-engineering variant (required, full instance)
  // ==========================================================================
  wxw: {
    id: 'wxw',
    name: 'WXW Delivery Delight',
    tagline: 'Food-truck delivery across three connected apps, tested with no documentation to start from.',
    variant: 'reverse',
    accent: '#F5A524',
    showReopenedThread: true,
    overview: {
      product:
        'WXW Delivery Delight is a food-truck delivery product spanning three connected apps: a customer app, a truck admin panel, and a super-admin panel. Orders flow from a customer, through a truck operator, up to platform oversight, with payments in between.',
      role: 'QA Engineer, running the full bug life cycle on GitHub with P1, P2, and P3 labels.',
      timeframe: 'Rolling release cycles at LeapSoft.',
      stack: ['Web + Mobile clients', 'REST API', 'Payments', 'GitHub Issues', 'Trello'],
    },
    approach: [
      {
        title: 'No spec, so the product became the spec',
        body: 'WXW shipped without formal documentation. Instead of waiting on requirements that did not exist, I explored all three apps, watched how an order actually moved between them, and reconstructed the intended behavior from what the product did.',
      },
      {
        title: 'Follow the order across app boundaries',
        body: 'The interesting failures live where the customer app, truck panel, and super-admin panel hand off to each other. I traced a single order end to end so a status that looked correct in one app could not quietly disagree with another.',
      },
      {
        title: 'Document the inferred requirements, then test them',
        body: 'Every inferred behavior got written down as a requirement with the evidence I based it on. Those reconstructed requirements became the source I wrote test cases against, so coverage still had something to trace back to.',
      },
      {
        title: 'Verify like a customer, not like a board',
        body: 'Resolved on a board is not the same as fixed for a user. I re-ran fixes the way a real customer would hit them, which is how a P1 that had been closed got reopened the same day.',
      },
    ],
    testPlan: {
      scope: [
        'Customer app: browse, order, pay, track status',
        'Truck admin panel: accept, prepare, and update orders',
        'Super-admin panel: oversight across trucks and orders',
        'Order status consistency across all three apps',
        'Payment success, failure, and refund paths',
        'Full defect life cycle on GitHub with priority labels',
      ],
      outOfScope: [
        'Real card-network settlement',
        'Third-party map and routing provider internals',
        'Load and stress testing',
      ],
      strategy: [
        'Exploratory testing to reconstruct behavior with no docs',
        'End-to-end order-flow testing across app boundaries',
        'Regression on payment and status transitions after each fix',
        'Priority-labeled bug life cycle: raise, verify, reopen if needed',
      ],
      environments: [
        'Staging builds of all three apps against one shared API',
        'Payment sandbox for success, decline, and refund cases',
        'GitHub project board with P1 / P2 / P3 labels',
      ],
      entryCriteria: [
        'All three apps deployed to staging against the same backend',
        'Test customer, truck, and super-admin accounts available',
        'Payment sandbox reachable',
      ],
      exitCriteria: [
        'No open P1 defects',
        'Order status verified consistent across all three apps',
        'Every reconstructed requirement covered by a case, reopened defects re-verified as a customer',
      ],
      risks: [
        { risk: 'No documentation means requirements are assumed, not stated', mitigation: 'Write inferred requirements down with evidence and confirm behavior with the team' },
        { risk: 'Status agrees in one app but not another', mitigation: 'Trace one order across all three apps for every status change' },
        { risk: 'A defect is closed on the board but still fails for users', mitigation: 'Re-run every fix from the real customer path before accepting it' },
      ],
    },
    testCases: [
      { id: 'TC_ORD_02', title: 'Customer places and pays for an order', pre: 'Customer signed in with a sandbox card', steps: ['Add items to cart', 'Checkout and pay', 'Confirm order'], expected: 'Order is created, payment captured, order shows Placed', priority: 'P1', status: 'Pass' },
      { id: 'TC_ORD_05', title: 'Status stays consistent across apps', pre: 'One active order', steps: ['Truck marks order Preparing', 'Check customer app', 'Check super-admin panel'], expected: 'All three apps show Preparing within the same cycle', priority: 'P1', status: 'Fail' },
      { id: 'TC_PAY_08', title: 'Declined payment blocks the order', pre: 'Customer at checkout', steps: ['Use a decline sandbox card', 'Submit payment'], expected: 'Order is not created and the customer sees a clear failure', priority: 'P1', status: 'Pass' },
      { id: 'TC_PAY_11', title: 'Refund returns funds and updates status', pre: 'Paid order eligible for refund', steps: ['Super-admin issues a refund', 'Check customer app'], expected: 'Payment is refunded and the order shows Refunded everywhere', priority: 'P2', status: 'Pass' },
      { id: 'TC_TRK_14', title: 'Truck cannot accept a cancelled order', pre: 'Order cancelled by customer', steps: ['Open the order in the truck panel', 'Attempt to accept'], expected: 'Accept is refused because the order is already cancelled', priority: 'P2', status: 'Pass' },
      { id: 'TC_REG_17', title: 'Reopened: resolved ticket still fails for customer', pre: 'Defect marked resolved by developer', steps: ['Re-run the exact customer flow on the live build', 'Observe result'], expected: 'Flow succeeds for a real customer', priority: 'P1', status: 'Fail' },
    ],
    reverse: {
      intro:
        'WXW arrived with no formal documentation, so requirements had to be reconstructed before anything could be traced. I worked in four moves: analyze the running product, infer what it was meant to do, write those inferences down as requirements with evidence, then derive test cases from that reconstructed documentation.',
      steps: [
        { title: '1. Analyze the running product', body: 'Explored all three apps and drove a real order through them, recording every state, transition, and role boundary I could observe. Screens, network calls, and status changes were the raw material.' },
        { title: '2. Infer the requirements', body: 'From observed behavior I inferred what each feature was intended to do, especially where apps had to agree. Ambiguous cases were flagged and confirmed with the team rather than assumed.' },
        { title: '3. Document the reconstruction', body: 'Each inferred requirement was written up with an id and the evidence it came from, giving the project a lightweight requirements baseline it never had.' },
        { title: '4. Derive test cases', body: 'Test cases were written against the reconstructed requirements, so even a doc-less product had traceable coverage and a paper trail for change control.' },
      ],
      inferredReqs: [
        { id: 'INF-REQ-01', source: 'Observed: order created only after payment capture', desc: 'An order must not exist until payment is successfully captured' },
        { id: 'INF-REQ-02', source: 'Observed: same order, three apps', desc: 'Order status must stay consistent across customer, truck, and super-admin apps' },
        { id: 'INF-REQ-03', source: 'Observed: refund action in super-admin', desc: 'A refund must return funds and move the order to Refunded everywhere' },
        { id: 'INF-REQ-04', source: 'Observed: cancelled orders in truck panel', desc: 'A cancelled order cannot be accepted or progressed by a truck' },
      ],
    },
    execution: {
      summary:
        'Ran the reconstructed suite across all three apps with a regression focus on order status and payments. The cross-app status defect and one reopened P1 drove the story of the cycle: a fix that passed on the board still failed from the customer path until it was actually corrected.',
      metrics: { total: 58, passed: 44, failed: 8, blocked: 3, notRun: 3 },
      coverage: 92,
      defects: { critical: 6, high: 14, medium: 19, low: 7, total: 46 },
      outcome:
        'A product with zero documentation ended the cycle with a reconstructed requirements baseline, traceable test cases, and a disciplined GitHub bug life cycle. The reopened P1 is the point: verification from the real user path, not board status, is what kept a broken flow from shipping as fixed.',
    },
    github: {
      repo: 'leapsoft/wxw-delivery-delight',
      commits: [
        { hash: 'f21a9c4', msg: 'Reconstruct inferred requirements from order flow', tag: 'test' },
        { hash: '9c7e2b0', msg: 'Bug: order status disagrees across apps (P1)', tag: 'bug' },
        { hash: 'b44d18e', msg: 'Reopened: resolved ticket still fails for customer (P1)', tag: 'bug' },
        { hash: '3ac6f77', msg: 'Regression suite for payment and refund paths', tag: 'test' },
        { hash: 'd8102aa', msg: 'Bug: truck can accept a cancelled order (P2)', tag: 'bug' },
      ],
    },
    trello: {
      columns: [
        { name: 'Backlog', cards: [{ title: 'Explore all three apps', label: 'exploratory' }, { title: 'Reconstruct order-flow requirements', label: 'reverse-eng' }] },
        { name: 'In Progress', cards: [{ title: 'Cross-app status regression', label: 'P1' }, { title: 'Payment + refund cases', label: 'payments' }] },
        { name: 'In Review', cards: [{ title: 'Reopened P1: resolved but failing', label: 'P1' }, { title: 'Cancelled-order accept bug', label: 'P2' }] },
        { name: 'Done', cards: [{ title: 'Declined payment blocks order', label: 'P1' }, { title: 'Refund updates all apps', label: 'P2' }] },
      ],
    },
  },

  // ==========================================================================
  // JESY — traceability variant (has an SRS)
  // ==========================================================================
  jesy: {
    id: 'jesy',
    name: 'Jesy',
    tagline: 'Artist collaboration platform tested with full SRS traceability and hard focus on escrow payments.',
    variant: 'traceability',
    accent: '#22D3EE',
    overview: {
      product:
        'Jesy is a collaboration platform for artists, venues, and brands. It shipped with documentation, so testing ran with full requirement traceability: dashboard, user and profile management, bulk invites, audit logs, support tickets, and an escrow payment system.',
      role: 'QA Engineer, mapping every test case to its SRS section and owning the escrow test suite.',
      timeframe: 'Multi-sprint engagement at LeapSoft.',
      stack: ['Web platform', 'REST API', 'Escrow payments', 'Postman', 'Jira / Zephyr', 'GitHub Issues'],
    },
    approach: [
      { title: 'Trace to the SRS from the start', body: 'Because an SRS existed, every test case was written against a specific requirement section, so coverage was provable and gaps were visible in the matrix.' },
      { title: 'Make escrow the centre of gravity', body: 'Escrow is where money and trust meet. I built a dedicated suite around held, released, refunded, disputed, and failed states plus role-gated release and double-refund prevention.' },
      { title: 'Cover the admin surface too', body: 'Audit logs, bulk invites, and support tickets are where quiet permission and data bugs hide, so they got the same rigor as the headline features.' },
    ],
    testPlan: {
      scope: ['Dashboard and navigation', 'User and profile management', 'Bulk invites', 'Audit logs', 'Support tickets', 'Escrow: held, released, refunded, disputed, failed'],
      outOfScope: ['Load and performance testing', 'Payment-processor internals'],
      strategy: ['Requirement-traced functional testing against the SRS', 'State-based testing of the escrow lifecycle', 'Regression on escrow and roles after each fix', 'API testing for invites, tickets, and payment endpoints'],
      environments: ['Staging web build', 'Payment sandbox for escrow states', 'Postman collection per role'],
      entryCriteria: ['SRS available and baselined', 'Staging reachable with seeded roles', 'Escrow sandbox configured'],
      exitCriteria: ['All escrow states verified', 'Every SRS requirement covered by a case', 'No open critical defects on payments or roles'],
      risks: [
        { risk: 'Double refund on a disputed escrow', mitigation: 'Explicit cases for double-refund prevention and role-gated release' },
        { risk: 'Escrow state stuck between transitions', mitigation: 'Test every transition in and out of held, released, refunded, disputed, failed' },
      ],
    },
    testCases: [
      { id: 'TC_ESC_03', title: 'Funds held on agreement start', pre: 'Buyer and artist agreement created', steps: ['Fund the escrow', 'Check escrow state'], expected: 'Escrow moves to Held and neither party can withdraw', priority: 'P1', status: 'Pass' },
      { id: 'TC_ESC_06', title: 'Role-gated release', pre: 'Escrow in Held', steps: ['Attempt release as an unauthorized role', 'Attempt release as the authorized role'], expected: 'Only the authorized role can release; others are blocked', priority: 'P1', status: 'Pass' },
      { id: 'TC_ESC_09', title: 'Double refund is prevented', pre: 'Escrow already refunded', steps: ['Attempt a second refund on the same escrow'], expected: 'Second refund is refused and funds are not moved twice', priority: 'P1', status: 'Pass' },
      { id: 'TC_INV_12', title: 'Bulk invite handles a bad row', pre: 'Admin on the invites screen', steps: ['Upload an invite list with one invalid email', 'Submit'], expected: 'Valid invites send, the bad row is reported, nothing silently fails', priority: 'P2', status: 'Fail' },
      { id: 'TC_AUD_15', title: 'Audit log records a release', pre: 'An escrow release just happened', steps: ['Open audit logs', 'Find the release event'], expected: 'Release is logged with actor, time, and amount', priority: 'P3', status: 'Pass' },
    ],
    traceability: [
      { req: 'SRS-4.1', desc: 'Escrow supports held, released, refunded, disputed, failed', cases: ['TC_ESC_03', 'TC_ESC_06', 'TC_ESC_09'], coverage: 'Full' },
      { req: 'SRS-4.2', desc: 'Release is restricted by role', cases: ['TC_ESC_06'], coverage: 'Full' },
      { req: 'SRS-5.3', desc: 'Bulk invites validate and report per row', cases: ['TC_INV_12'], coverage: 'Partial' },
      { req: 'SRS-6.1', desc: 'Sensitive actions are written to the audit log', cases: ['TC_AUD_15'], coverage: 'Full' },
    ],
    execution: {
      summary: '99 defects logged across the dashboard, user and profile management, bulk invites, audit logs, and support tickets, with the escrow suite carrying the heaviest coverage.',
      metrics: { total: 120, passed: 97, failed: 14, blocked: 5, notRun: 4 },
      coverage: 97,
      defects: { critical: 20, high: 40, medium: 39, low: 0, total: 99 },
      outcome: 'Every escrow state shipped verified with double-refund prevention and role-gated release proven, and full SRS traceability gave the client a coverage map they could audit.',
    },
    github: {
      repo: 'leapsoft/jesy-qa',
      commits: [
        { hash: '4e1c8a2', msg: 'Escrow state-transition test suite', tag: 'test' },
        { hash: 'aa73f10', msg: 'Bug: double refund possible on disputed escrow (P1)', tag: 'bug' },
        { hash: '2f9b6d4', msg: 'RTM: map cases to SRS 4.x escrow section', tag: 'test' },
        { hash: 'c7d0e55', msg: 'Bug: bulk invite silently drops invalid row (P2)', tag: 'bug' },
      ],
    },
    trello: {
      columns: [
        { name: 'Backlog', cards: [{ title: 'Escrow state matrix', label: 'escrow' }, { title: 'RTM to SRS sections', label: 'rtm' }] },
        { name: 'In Progress', cards: [{ title: 'Role-gated release cases', label: 'P1' }, { title: 'Bulk invite validation', label: 'P2' }] },
        { name: 'In Review', cards: [{ title: 'Double refund defect', label: 'P1' }] },
        { name: 'Done', cards: [{ title: 'Held / released transitions', label: 'P1' }, { title: 'Audit log coverage', label: 'P3' }] },
      ],
    },
  },

  // ==========================================================================
  // VISALAY — reverse-engineering variant (shipped with no docs)
  // ==========================================================================
  visalay: {
    id: 'visalay',
    name: 'Visalay',
    tagline: 'Visa-processing platform with OCR and AI scoring, reverse-engineered into a full test suite.',
    variant: 'reverse',
    accent: '#34D399',
    overview: {
      product:
        'Visalay is an in-house visa-processing platform: autofill and OCR for 10+ countries, AI readiness scoring, payments, and a super-admin visa builder. It shipped with no documentation, so the test suite was built by exploration.',
      role: 'QA Engineer, reverse-engineering the product and building a 12-field test-case suite from scratch.',
      timeframe: 'In-house product cycle at LeapSoft.',
      stack: ['Web platform', 'OCR pipeline', 'AI scoring', 'Payments', 'Postman'],
    },
    approach: [
      { title: 'Explore, infer, document, test', body: 'With no spec, I explored the product, inferred what each feature was meant to do, documented those inferences, and only then wrote test cases. The suite followed a strict 12-field template so every case was complete.' },
      { title: 'Pressure-test OCR and autofill', body: 'OCR across 10+ countries means many document formats and edge cases, so I fed it clean, messy, and wrong inputs to see where autofill quietly guessed.' },
      { title: 'Guard the login and payment gates', body: 'A single blocked login or failed payment stops everything, so those gates got early, hard coverage. TC_LG_12 caught a Google OAuth 505 on login.' },
    ],
    testPlan: {
      scope: ['Login and OAuth', 'OCR and autofill across 10+ countries', 'AI readiness scoring', 'Payments', 'Super-admin visa builder'],
      outOfScope: ['OCR engine internals', 'Load testing'],
      strategy: ['Exploratory testing to reconstruct behavior', '12-field structured test-case template', 'Boundary testing on OCR inputs', 'Regression on login and payments'],
      environments: ['Staging web build', 'Payment sandbox', 'Sample document set across countries'],
      entryCriteria: ['Staging reachable', 'Sample documents available', 'Test accounts provisioned'],
      exitCriteria: ['Login and payment paths verified', 'OCR covered across representative countries', 'No open critical defects'],
      risks: [
        { risk: 'OAuth failure blocks all login', mitigation: 'Early, explicit coverage of every login path including OAuth' },
        { risk: 'Autofill silently mis-reads a document', mitigation: 'Boundary and negative OCR inputs per country format' },
      ],
    },
    testCases: [
      { id: 'TC_LG_12', title: 'Google OAuth login succeeds', pre: 'User with a valid Google account', steps: ['Choose Sign in with Google', 'Complete OAuth', 'Return to app'], expected: 'User is logged in and lands on the dashboard', priority: 'P1', status: 'Fail' },
      { id: 'TC_OCR_04', title: 'OCR autofills from a clean passport', pre: 'Clear passport scan for a supported country', steps: ['Upload the scan', 'Run OCR', 'Review autofilled fields'], expected: 'Fields autofill accurately and are editable', priority: 'P1', status: 'Pass' },
      { id: 'TC_OCR_07', title: 'Blurry scan degrades gracefully', pre: 'Low-quality document scan', steps: ['Upload the blurry scan', 'Run OCR'], expected: 'Low-confidence fields are flagged, not silently wrong', priority: 'P2', status: 'Pass' },
      { id: 'TC_AI_10', title: 'Readiness score reflects missing data', pre: 'Application with gaps', steps: ['Open AI readiness scoring', 'Review the score and reasons'], expected: 'Score drops and the missing items are named', priority: 'P2', status: 'Pass' },
      { id: 'TC_PAY_13', title: 'Payment gate blocks on decline', pre: 'Applicant at payment', steps: ['Use a decline sandbox card', 'Submit'], expected: 'Application does not proceed and the failure is clear', priority: 'P1', status: 'Pass' },
    ],
    reverse: {
      intro:
        'Visalay had no documentation, so requirements were reconstructed before testing. The suite followed a repeatable loop: explore the product, infer intent, document it, then derive cases against that reconstruction.',
      steps: [
        { title: '1. Explore', body: 'Walked every flow: login, OCR autofill per country, AI scoring, payments, and the super-admin visa builder, capturing observed behavior.' },
        { title: '2. Infer', body: 'Turned observed behavior into intended requirements, flagging anything ambiguous for confirmation.' },
        { title: '3. Document', body: 'Wrote each inferred requirement into a 12-field test-case template so nothing was left implicit.' },
        { title: '4. Derive', body: 'Built the full test suite from the documented reconstruction, giving the in-house product traceable coverage.' },
      ],
      inferredReqs: [
        { id: 'INF-REQ-01', source: 'Observed: OAuth and email login options', desc: 'Every offered login method must succeed for a valid user' },
        { id: 'INF-REQ-02', source: 'Observed: OCR autofill on upload', desc: 'OCR must autofill supported documents and flag low confidence' },
        { id: 'INF-REQ-03', source: 'Observed: readiness score on applications', desc: 'AI scoring must reflect completeness and name gaps' },
        { id: 'INF-REQ-04', source: 'Observed: payment before submission', desc: 'A failed payment must block application submission' },
      ],
    },
    execution: {
      summary: 'Built and ran the reverse-engineered suite with early focus on the login and payment gates. TC_LG_12 surfaced a Google OAuth 505 that would have blocked real users at the door.',
      metrics: { total: 66, passed: 52, failed: 7, blocked: 4, notRun: 3 },
      coverage: 90,
      defects: { critical: 5, high: 12, medium: 18, low: 6, total: 41 },
      outcome: 'A doc-less in-house product gained a complete, traceable 12-field test suite, and a login-blocking OAuth failure was caught before it could cost users.',
    },
    github: {
      repo: 'leapsoft/visalay-qa',
      commits: [
        { hash: '1b7f3e9', msg: 'Reverse-engineered requirements from login and OCR flows', tag: 'test' },
        { hash: '6e2a04c', msg: 'Bug: Google OAuth returns 505 on login, TC_LG_12 (P1)', tag: 'bug' },
        { hash: 'ab99d21', msg: '12-field test-case template applied to OCR suite', tag: 'test' },
        { hash: 'f3c5107', msg: 'Bug: blurry-scan autofill not flagged low confidence (P2)', tag: 'bug' },
      ],
    },
    trello: {
      columns: [
        { name: 'Backlog', cards: [{ title: 'Reconstruct requirements from flows', label: 'reverse-eng' }, { title: 'OCR country matrix', label: 'ocr' }] },
        { name: 'In Progress', cards: [{ title: 'Login + OAuth cases', label: 'P1' }, { title: 'AI readiness scoring', label: 'P2' }] },
        { name: 'In Review', cards: [{ title: 'OAuth 505 defect (TC_LG_12)', label: 'P1' }] },
        { name: 'Done', cards: [{ title: 'Payment gate on decline', label: 'P1' }, { title: 'OCR low-confidence flagging', label: 'P2' }] },
      ],
    },
  },

  // ==========================================================================
  // PAKISTAN WRESTLEMANIA — traceability variant (self-authored requirements)
  // ==========================================================================
  wrestlemania: {
    id: 'wrestlemania',
    name: 'Pakistan Wrestlemania',
    tagline: 'A personal full-stack MERN build. Shipping the bugs myself made the testing sharper.',
    variant: 'traceability',
    accent: '#22D3EE',
    overview: {
      product:
        'Pakistan Wrestlemania is a personal full-stack project built on the MERN stack: MongoDB, Express, React, and Node. Built solo from the ground up, it doubles as a place to test my own work against the requirements I set for it.',
      role: 'Developer and tester, owning the build and its self-authored test coverage.',
      timeframe: 'Personal project, ongoing.',
      stack: ['MongoDB', 'Express', 'React', 'Node.js'],
    },
    approach: [
      { title: 'Set my own requirements, then hold the build to them', body: 'As the builder I defined the intended behavior up front, then wrote test cases against those self-authored requirements so I was testing to a target, not to a mood.' },
      { title: 'Test the seams I built', body: 'Knowing exactly where the API and UI meet let me aim tests at the risky joins: auth, data validation, and state that crosses the client-server boundary.' },
      { title: 'Let building sharpen testing', body: 'Having shipped the bug myself, I write clearer reports and reason about root causes faster. This project is where that loop is tightest.' },
    ],
    testPlan: {
      scope: ['Authentication', 'Core CRUD flows', 'API validation', 'Client-side routing and state'],
      outOfScope: ['Scale and load testing', 'Third-party service internals'],
      strategy: ['Requirement-traced functional testing against self-authored requirements', 'API testing for validation and error handling', 'Regression on auth and core flows'],
      environments: ['Local dev build', 'Local MongoDB instance', 'Postman for API checks'],
      entryCriteria: ['App builds and runs locally', 'Database seeded', 'Requirements written down'],
      exitCriteria: ['Core flows covered by cases', 'No open critical defects', 'Auth and validation verified'],
      risks: [
        { risk: 'Self-review blind spots as sole author', mitigation: 'Write explicit requirements first and test against them, not from memory' },
        { risk: 'Validation gaps at the API', mitigation: 'Negative and boundary cases on every input' },
      ],
    },
    testCases: [
      { id: 'TC_AUTH_01', title: 'Sign up rejects a duplicate email', pre: 'Email already registered', steps: ['Submit sign-up with the existing email'], expected: 'Sign-up is refused with a clear message', priority: 'P1', status: 'Pass' },
      { id: 'TC_AUTH_04', title: 'Protected route requires auth', pre: 'Logged-out user', steps: ['Navigate directly to a protected route'], expected: 'User is redirected to login, not shown the page', priority: 'P1', status: 'Pass' },
      { id: 'TC_API_07', title: 'API rejects invalid payload', pre: 'Authenticated client', steps: ['POST a record with a missing required field'], expected: 'API returns a 400 with a useful validation error', priority: 'P2', status: 'Pass' },
      { id: 'TC_UI_10', title: 'State survives a route change', pre: 'Data loaded in the client', steps: ['Navigate away and back'], expected: 'State is preserved or cleanly refetched, no crash', priority: 'P3', status: 'Pass' },
    ],
    traceability: [
      { req: 'REQ-01', desc: 'Auth prevents duplicate accounts', cases: ['TC_AUTH_01'], coverage: 'Full' },
      { req: 'REQ-02', desc: 'Protected routes are gated', cases: ['TC_AUTH_04'], coverage: 'Full' },
      { req: 'REQ-03', desc: 'API validates input and errors clearly', cases: ['TC_API_07'], coverage: 'Full' },
      { req: 'REQ-04', desc: 'Client state is stable across navigation', cases: ['TC_UI_10'], coverage: 'Partial' },
    ],
    execution: {
      summary: 'Ran the self-authored suite against the local build with a focus on auth and validation, the two areas most likely to bite a solo project.',
      metrics: { total: 32, passed: 28, failed: 2, blocked: 1, notRun: 1 },
      coverage: 88,
      defects: { critical: 1, high: 3, medium: 6, low: 4, total: 14 },
      outcome: 'Building and testing the same product tightened the loop between writing a bug and finding one. It is the clearest example of why I test the way a product is made.',
    },
    github: {
      repo: 'mshahrozajmal/pakistan-wrestlemania',
      commits: [
        { hash: '0af13c7', msg: 'Auth: block duplicate email on sign-up', tag: 'bug' },
        { hash: '77be2d1', msg: 'Add protected-route redirect test', tag: 'test' },
        { hash: 'c19a8e0', msg: 'API validation on create endpoints', tag: 'test' },
        { hash: 'e5d7420', msg: 'Fix: preserve client state across navigation', tag: 'bug' },
      ],
    },
    trello: {
      columns: [
        { name: 'Backlog', cards: [{ title: 'Write requirements for core flows', label: 'planning' }, { title: 'Auth test cases', label: 'auth' }] },
        { name: 'In Progress', cards: [{ title: 'API validation cases', label: 'api' }] },
        { name: 'In Review', cards: [{ title: 'State-across-navigation check', label: 'P3' }] },
        { name: 'Done', cards: [{ title: 'Duplicate-email guard', label: 'P1' }, { title: 'Protected-route redirect', label: 'P1' }] },
      ],
    },
  },
}

export const getCaseStudy = (id) => caseStudies[id] || null
