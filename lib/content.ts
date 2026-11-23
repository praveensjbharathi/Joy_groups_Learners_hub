import type { Module, Product, Fact } from './types';
export const modules: Module[] = [
  {
    "id": "m01",
    "title": "The Joy Groups story",
    "group": "Foundation",
    "minutes": 20,
    "summary": "Connect our people, services and technology to one customer outcome.",
    "outcome": "Explain the group in 90 seconds and distinguish legal entities, brands and ambitions.",
    "lessons": [
      {
        "title": "One group, connected outcomes",
        "body": [
          "Joy Groups connects manpower, payroll, enterprise technology and workforce learning. Start with the customer’s operational problem: finding people, managing attendance, paying correctly or growing demand.",
          "Joy Manpower Service began in 2017; Joy Corporate Solutions Pvt. Ltd. was incorporated in 2024; Joymulti Technical Services LLC has a Dubai footprint from 2025. The handbook documents these milestones; confirm the contracting entity and licensed scope for each proposal.",
          "Joy People HR is a product brand. Joy Groups / Joy India is an umbrella identity. Joy Technical Solutions is proposed technology positioning, with its legal contracting identity needing confirmation. Joy Social Welfare Trust supports education and social impact."
        ]
      },
      {
        "title": "Vision with truthful language",
        "body": [
          "The handbook records a ₹600 crore 2032 stretch ambition. The later founder direction extends to ₹10,000 crore annual group revenue by 2040. Both are aspirations, not revenue forecasts or audited achievements.",
          "The 2040 direction includes employment, practical and future-ready education, overseas opportunities for Indians, foreign exchange earnings, global expansion, affordable smart-home technology and future energy generation. Stock-market-related and financial-service ideas require appropriate regulated structures before launch.",
          "Do not circulate historic turnover or headcount as current fact. Finance must confirm reporting period, consolidation basis and approved numbers. Lottery and gaming platform applications are excluded from this academy, product catalogue, examples and quotations."
        ]
      },
      {
        "title": "The 90-second introduction",
        "body": [
          "“Joy Groups helps businesses connect the right people with practical technology. Through our service businesses and Joy People HR, we work on workforce deployment, payroll processes and business software. We first understand your operating problem, then agree a demonstrable scope and measurable outcome.”",
          "Example: a staffing client struggles with salary disputes. Discover the reconciliation problem before proposing an attendance workflow; do not automatically bundle software into every staffing offer."
        ]
      }
    ],
    "practice": "Record a 90-second group introduction. Name the legal entity for a sample contract, one current service and one aspiration.",
    "quiz": [
      {
        "q": "What is Joy People HR in the group map?",
        "options": [
          "A product brand",
          "Every group company’s legal name",
          "A statutory regulator"
        ],
        "correct": 0,
        "why": "A product brand must be tied to the verified contracting entity."
      },
      {
        "q": "How should the 2040 revenue goal be described?",
        "options": [
          "Guaranteed turnover",
          "A founder aspiration",
          "A signed customer order"
        ],
        "correct": 1,
        "why": "Goals describe intended direction, not achieved financial results."
      },
      {
        "q": "A proposal needs current group turnover. What comes next?",
        "options": [
          "Use the highest historical figure",
          "Estimate from headcount",
          "Obtain Finance-approved figures and period"
        ],
        "correct": 2,
        "why": "The handbook contains planning snapshots; Finance confirms current external figures."
      }
    ]
  },
  {
    "id": "m02",
    "title": "Joy People HR, explained",
    "group": "Product mastery",
    "minutes": 35,
    "summary": "Understand the HRMS, its buyers, tiers and independent privilege categories.",
    "outcome": "Match a buyer’s need to a scoped product configuration.",
    "lessons": [
      {
        "title": "Sell the operating outcome",
        "body": [
          "Joy People HR is positioned as a connected HR and workforce platform. Its intended workflow connects employee records, attendance approval, payroll and decision-useful reports. A product description is not proof that every module is live.",
          "CEO: workforce risk and cost visibility. Plant head: required versus present strength. HR manager: shifts, absence and corrections. Payroll team: cutoffs, OT, deductions and payslips. Vendor: deployed versus confirmed headcount. IT: access, data flows and supported integrations."
        ]
      },
      {
        "title": "Three independent dimensions",
        "body": [
          "Functional tier: Starter, Premium or Enterprise. The 12 November commercial draft puts basic payroll in Starter, automated payroll and KYC workflow in Premium, with Enterprise adding proposed vendor purchasing and multi-entity capabilities. Every inclusion still needs release validation.",
          "Privilege category: Category 1 company-managed workers; Category 2 scoped vendor logins; Category 3 connected employee access and vendor logins. Category and tier are different decisions. Category 2 does not include a separate direct employee portal by default.",
          "Optional modules and usage: scheduled email MIS and WhatsApp report requests are paid add-ons in all categories in the draft. Category 3 includes employee app access; do not charge for it twice. GPS, tracking, LMS and bulk messaging are advanced add-ons in the draft. Category 1/2 limited app screens need explicit scope."
        ]
      },
      {
        "title": "Know the boundary before showing the screen",
        "body": [
          "All categories are designed for direct/vendor onboarding, vendor mapping and biometric/facial integrations. Confirm specific hardware models and authentication permissions in a test environment. “Designed for” does not mean every device is compatible.",
          "KYC / bank / other identity and criminal screening are requested under Premium, inherited by Enterprise, with checks charged by usage. Confirm provider, authorization, consent, coverage and actual release before offering.",
          "Before a demo, mark each capability as demonstrated release, customer-configured, pilot or planned. Use synthetic employee records and a written release checklist."
        ]
      }
    ],
    "practice": "Configure an illustrative 100-worker factory: choose one functional tier, one privilege category, add-ons and four items requiring technical confirmation.",
    "quiz": [
      {
        "q": "Which choice controls scoped vendor logins?",
        "options": [
          "Payment tenure alone",
          "Privilege category",
          "Logo colour"
        ],
        "correct": 1,
        "why": "Privilege categories define access; functional tiers define software capability."
      },
      {
        "q": "Category 3 already includes employee app access. Should it be billed again?",
        "options": [
          "Yes, always",
          "Only if invoice is annual",
          "No, avoid duplicate charging"
        ],
        "correct": 2,
        "why": "Count each entitlement once and separate usage costs."
      },
      {
        "q": "The draft lists a biometric integration. Can every reader be promised?",
        "options": [
          "Only after model and feed validation",
          "Yes, all readers are identical",
          "Yes, if Premium is selected"
        ],
        "correct": 0,
        "why": "Validate exact device model, feed, permissions and release."
      }
    ]
  },
  {
    "id": "m03",
    "title": "Attendance to payroll",
    "group": "Product mastery",
    "minutes": 30,
    "summary": "Interpret workforce events fairly and reconcile them before salary processing.",
    "outcome": "Explain event differences, shortages, approvals and safe reporting.",
    "lessons": [
      {
        "title": "Events are evidence, not a salary day",
        "body": [
          "A bus boarding event is transport evidence. A gate entry is arrival evidence. Department entry/exit supports work-area presence. Canteen entry shows a visit; counting meals requires meal-token/POS/vendor confirmation. None alone is a confirmed paid attendance day.",
          "Example: 26 scheduled riders, 24 boarded and 23 matched at the gate. Investigate two missing boarders and one unmatched arrival; consider missed scans, route changes and device delay. Do not infer misconduct from one event."
        ]
      },
      {
        "title": "Make the numbers actionable",
        "body": [
          "Required 200, active 185, confirmed present 177: vacancy gap = 15; active-but-not-present = 8; total daily shortage = 23. Define shift, date and denominator before comparing departments.",
          "Attendance approval should reconcile raw events, shift schedule, overnight shifts, missed punches, half-days, leave, weekly off and authorized OT. Freeze approved input before a payroll run and preserve correction history.",
          "Payroll inputs include approved attendance, wage structure, applicable statutory parameters, deductions and bank validation. Preview exceptions, maker/checker review, client approval, bank file validation and payslip release should be distinct steps."
        ]
      },
      {
        "title": "Reports, pay and billing",
        "body": [
          "WhatsApp request-based MIS sends scoped information to an authorized requester. Bulk WhatsApp sends approved outbound messages. These are different features, permissions and charges. Minimize personal data in messages.",
          "Illustration: 115 accepted pieces × ₹12 = ₹1,380 piece-rate earnings before applicable wage protections and other components. 5,800 client-approved billable pieces × ₹15 = ₹87,000 vendor billing before contractual adjustments and taxes. Employee pay and vendor revenue are not the same calculation.",
          "Employment rules and rates depend on the applicable establishment and period. Use approved configuration and current professional review; the academy does not supply a statutory rate table."
        ]
      }
    ],
    "practice": "Use synthetic data to reconcile bus→gate→department exceptions and show the approval required before payroll. Explain the 200/185/177 example.",
    "quiz": [
      {
        "q": "Required 200, active 185, present 177. Total daily shortage?",
        "options": [
          "8",
          "15",
          "23"
        ],
        "correct": 2,
        "why": "Required minus present is 23. Vacancy gap is 15; absence gap is 8."
      },
      {
        "q": "A canteen entry proves what?",
        "options": [
          "One meal was served",
          "A visit event, subject to validation",
          "A full paid workday"
        ],
        "correct": 1,
        "why": "A meal-served confirmation is separate from entry."
      },
      {
        "q": "When should bank payment output be released?",
        "options": [
          "After approved reconciliation and checks",
          "Immediately after the bus scan",
          "Before the salary review"
        ],
        "correct": 0,
        "why": "Use approved, reviewed payroll inputs and validate the output."
      }
    ]
  },
  {
    "id": "m04",
    "title": "SaaS & the software portfolio",
    "group": "Technology delivery",
    "minutes": 25,
    "summary": "Explain recurring software value, service obligations and project maturity.",
    "outcome": "Distinguish a SaaS subscription from custom delivery and an internal prototype.",
    "lessons": [
      {
        "title": "What customers buy in SaaS",
        "body": [
          "SaaS is software provided as a service, typically for a recurring subscription. Define seats, entities, modules, hosting, support, usage limits, data handling, renewals and export on exit. Customers buy a working process and service commitments, not simply a login.",
          "MRR is recurring monthly subscription revenue; ARR = 12 × MRR for a stable run-rate. Exclude one-time setup and variable usage from the basic run-rate. Churn measures losses over a defined period and population. Example: 10 customers at ₹5,000 gives ₹50,000 MRR and ₹6 lakh ARR run-rate, not guaranteed annual collections."
        ]
      },
      {
        "title": "Portfolio, with maturity labels",
        "body": [
          "Joy People HR is the core commercial product positioning, subject to module-by-module validation. Joy Payroll is an internal evolving platform covering salary cycles, recoveries, hostel deductions, payslips and bank formats; rollout requires confirmation.",
          "OJT Connect, expense/vendor recovery portal, Opportunity Intelligence CRM, workforce chat and adjacent vehicle/hostel workflows are project concepts or development items in the source handbook. Do not sell these as generally available products without owner evidence.",
          "The employment/job marketplace has a separate product context from the HRMS. Confirm name, app listing, country availability, employer verification and ownership before a customer demonstration."
        ]
      },
      {
        "title": "Lifecycle and handover",
        "body": [
          "Discovery → configuration → data preparation → pilot → UAT → rollout → adoption → renewal. Name an owner, success metric and acceptance evidence for every stage.",
          "Availability, backup frequency, restore tests, retention, data location and support response must be contractually confirmed. Do not invent a security certification or 99.9% SLA. A “lifetime” licence must define purchased release, seats and entity; hosting, maintenance and third-party fees can continue separately."
        ]
      }
    ],
    "practice": "Prepare a one-page SaaS scope with seats, support, data export, acceptance criteria and a renewal review. Label three portfolio items correctly.",
    "quiz": [
      {
        "q": "Which is usually excluded from basic MRR?",
        "options": [
          "Recurring subscription",
          "One-time implementation",
          "Recurring seats"
        ],
        "correct": 1,
        "why": "One-time setup is not recurring subscription revenue."
      },
      {
        "q": "OJT Connect is mentioned in an internal roadmap. What can you claim?",
        "options": [
          "Generally available worldwide",
          "A guaranteed release date",
          "A development item until release evidence is approved"
        ],
        "correct": 2,
        "why": "A roadmap is not proof of availability."
      },
      {
        "q": "Does a lifetime licence automatically cover unlimited hosting forever?",
        "options": [
          "Yes",
          "No; specify licence, hosting and renewals separately",
          "Only for small customers"
        ],
        "correct": 1,
        "why": "Licence rights and continuing hosted service costs need separate terms."
      }
    ]
  },
  {
    "id": "m05",
    "title": "Customized software discovery",
    "group": "Technology delivery",
    "minutes": 30,
    "summary": "Turn an Excel or approval problem into an implementable, testable scope.",
    "outcome": "Write requirements, acceptance criteria and a controlled change request.",
    "lessons": [
      {
        "title": "Discover before estimating",
        "body": [
          "Ask who starts the process, which data arrives, who approves, where exceptions occur, expected transaction volume and which systems must exchange data. Capture current and desired process using a real example.",
          "Target buyers: SME owners, operations heads, finance and IT managers. Useful cases include expense approvals, vendor ledgers, CRM, inventory workflows and manufacturing reporting. A custom product must solve an agreed gap that a standard configuration cannot."
        ]
      },
      {
        "title": "Make scope testable",
        "body": [
          "Write roles, forms, validations, reports, integrations, non-functional targets, migration, exclusions and acceptance criteria. Example: “Office Staff can approve an employee request; only approved entries enter the monthly deduction report; each change records actor and time.”",
          "Separate configuration, customization and integration. A small field addition differs from changing the payroll calculation engine. Inspect samples and external API documentation before committing to fixed effort.",
          "Delivery stages: discovery sign-off, design/prototype, implementation, test, UAT, production handover and support. A change request includes business reason, scope difference, cost, timeline and written approval."
        ]
      },
      {
        "title": "A responsible estimate",
        "body": [
          "Estimate discovery, design, development, testing, migration, deployment, training, support and contingency. Confirm hosting, integrations, intellectual property, source delivery and maintenance terms.",
          "Objection: “Build everything in two weeks.” Respond: “Let us identify the minimum accepted workflow, validate dependencies and phase the remaining scope.” Do not announce an unreviewed deadline."
        ]
      }
    ],
    "practice": "Draft five requirements for an expense portal with two roles, two acceptance tests, exclusions and a change-request example.",
    "quiz": [
      {
        "q": "What makes a requirement testable?",
        "options": [
          "A broad promise",
          "Specific role, action and expected result",
          "A low price"
        ],
        "correct": 1,
        "why": "Acceptance criteria specify observable behaviour."
      },
      {
        "q": "An API integration cost should be committed after…",
        "options": [
          "Reviewing actual interfaces and samples",
          "Seeing the API logo",
          "Sending the invoice"
        ],
        "correct": 0,
        "why": "Dependencies and samples determine integration effort."
      },
      {
        "q": "A new feature arrives after scope approval. What next?",
        "options": [
          "Quietly absorb it",
          "Ignore the customer",
          "Document impact and obtain change approval"
        ],
        "correct": 2,
        "why": "Written change control protects expectations and delivery quality."
      }
    ]
  },
  {
    "id": "m06",
    "title": "Websites that earn enquiries",
    "group": "Technology delivery",
    "minutes": 25,
    "summary": "Scope static sites, CMS sites and connected business portals.",
    "outcome": "Recommend the right site, demo its journey and define ownership.",
    "lessons": [
      {
        "title": "Match the type to the task",
        "body": [
          "Static website: largely fixed pages, fast delivery and lead capture. CMS website: customer-editable pages, posts and careers content. Web application: authenticated workflows and business logic. A CMS quote does not silently include an ERP.",
          "Target customers: manufacturers, service businesses, institutions, exporters and local firms needing a credible digital presence. Clarify buyer audience, language, geography, content owner and desired action."
        ]
      },
      {
        "title": "The customer journey",
        "body": [
          "A useful page has a clear buyer problem, service scope, approved proof, readable content and a visible next step. Test phone links, form validation, acknowledgement and lead handoff on mobile.",
          "Confirm pages, content writing, revisions, domain, hosting, business email, SSL, backups, form delivery, analytics, accessibility and ongoing support. The customer should understand domain ownership and export/transfer arrangements."
        ]
      },
      {
        "title": "Demo and handover",
        "body": [
          "Demo: open the mobile home page → find one service → explain proof → submit a synthetic enquiry → show receipt in the agreed destination → show how an approved CMS editor updates content.",
          "Before launch: approved content, responsive checks, links/forms, indexing settings, redirects for migrated URLs, analytics validation and account handover. Do not promise first-page Google rankings as a website feature."
        ]
      }
    ],
    "practice": "Produce a 5-page manufacturing website scope and test a contact-form journey. State which content and hosting items are excluded.",
    "quiz": [
      {
        "q": "A customer needs to edit news weekly. Best starting point?",
        "options": [
          "Fixed brochure pages only",
          "A scoped CMS website",
          "An unlimited custom ERP"
        ],
        "correct": 1,
        "why": "A CMS supports controlled content editing."
      },
      {
        "q": "Who should clearly own the domain and have exit arrangements?",
        "options": [
          "No one needs to know",
          "Only the developer forever",
          "The customer under agreed ownership and transfer terms"
        ],
        "correct": 2,
        "why": "Ownership and portability prevent future lock-in surprises."
      },
      {
        "q": "A complete lead-form demo includes…",
        "options": [
          "Submission and confirmed receipt",
          "Only a screenshot",
          "Only a colourful button"
        ],
        "correct": 0,
        "why": "The full enquiry journey must work, including receipt and handoff."
      }
    ]
  },
  {
    "id": "m07",
    "title": "SEO foundations",
    "group": "Demand generation",
    "minutes": 30,
    "summary": "Map search intent to useful pages and check discoverability.",
    "outcome": "Prepare a practical keyword map and a basic SEO audit.",
    "lessons": [
      {
        "title": "Begin with intent",
        "body": [
          "SEO helps search engines and people discover and understand useful content. It does not guarantee rankings. Informational searches seek explanations; commercial searches compare options; transactional searches indicate action.",
          "Example keyword map: “factory attendance software” → product solution page; “how to reduce payroll errors” → helpful guide; “payroll outsourcing Coimbatore” → truthful local service page. Use real service coverage and approved product facts."
        ]
      },
      {
        "title": "On-page and technical basics",
        "body": [
          "Write clear page titles, useful H1 headings, descriptive internal links and original content answering a buyer question. Meta descriptions help communicate relevance but do not guarantee the displayed snippet. Avoid keyword stuffing and copied location pages.",
          "Check crawlability, indexability, canonical URLs for duplicate content, sitemap inclusion, mobile usability, meaningful status codes and redirect mapping. Robots crawling controls are not the same as guaranteed removal from search.",
          "Use Search Console for search visibility and indexing evidence. Use analytics for on-site behaviour and key events. Use CRM for lead qualification and commercial outcomes. These answer different questions."
        ]
      },
      {
        "title": "Practical local SEO",
        "body": [
          "Keep genuine business name, address and phone consistent. Maintain eligible Google Business Profiles, accurate services, useful photos and genuine reviews. Do not create fake offices or fabricate customer testimonials.",
          "Assignment example: build an HRMS service page with a buyer problem, verified scope, implementation steps, honest FAQ and demo CTA. Review with Google Search Central’s SEO Starter Guide; recheck platform guidance during future refreshers."
        ]
      }
    ],
    "practice": "Map 15 search phrases into three pages. Audit title/H1, links, indexing, mobile usability and form receipt for one approved page.",
    "quiz": [
      {
        "q": "“Payroll outsourcing Coimbatore” most likely needs…",
        "options": [
          "A relevant local service page",
          "A random entertainment post",
          "A hidden page with repeated keywords"
        ],
        "correct": 0,
        "why": "Match buyer intent to truthful service coverage."
      },
      {
        "q": "Which source helps diagnose Google indexing?",
        "options": [
          "Bank statement",
          "Search Console",
          "Payroll register"
        ],
        "correct": 1,
        "why": "Search Console supports search visibility and indexing analysis."
      },
      {
        "q": "Can an SEO proposal guarantee rank 1?",
        "options": [
          "Yes, with enough keywords",
          "Yes, for annual customers",
          "No; define work and measurable reporting"
        ],
        "correct": 2,
        "why": "Ranking depends on many external factors; promise scoped work, not guaranteed placement."
      }
    ]
  },
  {
    "id": "m08",
    "title": "Digital marketing & measurement",
    "group": "Demand generation",
    "minutes": 30,
    "summary": "Connect campaigns, landing pages and qualified opportunities.",
    "outcome": "Build an ethical campaign brief and calculate funnel performance.",
    "lessons": [
      {
        "title": "Pick the buyer and the outcome",
        "body": [
          "Start with one buyer, geography, problem and action. Google Search can capture active intent; LinkedIn can reach professional audiences; short video can demonstrate a problem; permissioned email or WhatsApp can nurture. Channel fit needs evidence and tests.",
          "A campaign brief includes audience, honest claim, approved proof, creative variations, landing page, CTA, measurement event, budget owner and review date. Separate agency management fees, creative production, ad spend and third-party messaging costs."
        ]
      },
      {
        "title": "Measure beyond clicks",
        "body": [
          "GA4 events represent interactions; mark meaningful outcomes as key events. Google Ads conversions can be based on relevant Analytics key events where configured. Validate successful form submission and downstream qualification; a button click alone is not necessarily a lead.",
          "Use consistent campaign tags and CRM source fields. Review click → enquiry → qualified lead → meeting → proposal → won. Avoid sending employee identity or sensitive data in tracking URLs.",
          "Illustration: ₹30,000 spend, 1,000 clicks, 40 enquiries, 12 qualified leads, 6 meetings, 1 win. CPC ₹30; enquiry conversion 4%; CPL ₹750; cost per qualified lead ₹2,500. This is training arithmetic, not a performance forecast."
        ]
      },
      {
        "title": "Optimize the real constraint",
        "body": [
          "Many clicks and few leads: check audience intent, mobile speed, offer and form. Many leads and few meetings: check qualification and follow-up. Meetings without proposals: check fit, authority and scope.",
          "Review lead quality before increasing spend. Get consent and permissions for outreach, use accurate claims, avoid purchased spam lists and record opt-outs. Never promise fixed leads or sales without a specifically approved agreement."
        ]
      }
    ],
    "practice": "Write two factory HR ad hooks, one landing-page CTA and a tracking plan. Calculate CPL and qualified-lead cost from the worked example.",
    "quiz": [
      {
        "q": "₹30,000 spend and 40 leads gives CPL of…",
        "options": [
          "₹30",
          "₹750",
          "₹2,500"
        ],
        "correct": 1,
        "why": "30,000 / 40 = ₹750 per captured lead."
      },
      {
        "q": "What is stronger evidence than a CTA click?",
        "options": [
          "An impression",
          "A colour change",
          "Validated enquiry and qualified CRM outcome"
        ],
        "correct": 2,
        "why": "Measure the business outcome beyond the click."
      },
      {
        "q": "Should ad spend be hidden inside an unspecified service fee?",
        "options": [
          "No, separate the budget and management scope",
          "Yes, always",
          "Only on LinkedIn"
        ],
        "correct": 0,
        "why": "Customers need clear control over media budget and agency scope."
      }
    ]
  },
  {
    "id": "m09",
    "title": "Payroll service delivery",
    "group": "Services",
    "minutes": 30,
    "summary": "Sell a controlled monthly process with approvals and responsibilities.",
    "outcome": "Distinguish payroll outsourcing from payroll software and scope a payroll cycle.",
    "lessons": [
      {
        "title": "Service versus software",
        "body": [
          "Payroll software provides tools; outsourced payroll is an agreed operating service using approved inputs and controls. A customer may buy either or both, with clearly separate responsibilities.",
          "Target customers: factories, SMEs and multi-site employers with attendance complexity, multiple wage structures or deadline pressure. Discover employee count, entities, salary cycles, client attendance sources, existing payroll process and statutory scope."
        ]
      },
      {
        "title": "A repeatable monthly cycle",
        "body": [
          "1. Agree cutoff and input ownership. 2. Collect approved attendance, joiners, exits, wage changes, OT and deductions. 3. Validate exceptions and duplicate identifiers. 4. Draft payroll. 5. Maker/checker and client review. 6. Approve bank output and payslips. 7. Reconcile and archive evidence.",
          "Clarify who funds salaries, who authorizes bank uploads, who submits filings, what approvals are required and which statutory responsibilities remain with the employer. Confirm applicable PF/ESI/PT/LWF and other parameters for the establishment and period with the authorized compliance team.",
          "Use sample files to prove bank format compatibility; preserve actual employer/unit names, access boundaries and audit evidence. Prevent repeat bank runs using approved batch controls where the deployed product supports them."
        ]
      },
      {
        "title": "Scope and objection handling",
        "body": [
          "Quote employee band, number of entities, payroll frequency, input format, report scope, correction cycles, compliance deliverables and support window. Specify onboarding/data-cleanup charges and exclusions.",
          "“We already have an accountant.” Respond: “We can map the current responsibility split, identify reconciliation delays and agree only the support you need.” Never claim zero errors or transfer all employer liability through a sales statement."
        ]
      }
    ],
    "practice": "Draft a monthly payroll calendar with client inputs, checks, approvals, bank release and handover owners. Identify two cases requiring escalation.",
    "quiz": [
      {
        "q": "Payroll outsourcing means…",
        "options": [
          "Only buying a login",
          "An agreed operating service with responsibilities",
          "The employer has no legal obligations"
        ],
        "correct": 1,
        "why": "Define service deliverables, input duties and approvals."
      },
      {
        "q": "Who should approve salary inputs before release?",
        "options": [
          "A random vendor",
          "No one",
          "The designated client and payroll approvers"
        ],
        "correct": 2,
        "why": "The contract must name authorized approvers."
      },
      {
        "q": "Which item needs establishment-specific confirmation?",
        "options": [
          "Applicable statutory parameters",
          "The colour of the demo",
          "The team member’s nickname"
        ],
        "correct": 0,
        "why": "Rules and rates depend on scope, jurisdiction and period."
      }
    ]
  },
  {
    "id": "m10",
    "title": "Manpower services & mobilisation",
    "group": "Services",
    "minutes": 30,
    "summary": "Qualify demand, plan mobilisation and monitor deployment quality.",
    "outcome": "Prepare a realistic staffing requirement and commercial cost sheet.",
    "lessons": [
      {
        "title": "Understand the actual requirement",
        "body": [
          "Manpower services connect approved demand with sourcing, screening, onboarding, deployment and field support under the contract. They differ from simply licensing HR software.",
          "Typical buyers: plant HR, production, procurement and industrial management. Capture plant location, job role, skill/qualification, approved vacancies, shifts, wages, OT policy, transport, hostel, joining dates, supervisor and replacement expectations.",
          "Separate permanent recruitment, contract staffing, bulk mobilisation and apprenticeship/OJT arrangements. Do not promise apprenticeship benefits or overseas recruitment before approvals and programme eligibility are confirmed."
        ]
      },
      {
        "title": "Mobilise with evidence",
        "body": [
          "Validate demand and work conditions → source candidates → screen against job criteria → share accurate job terms → complete approved documents → coordinate joining → verify actual deployment → monitor attendance, retention and replacement needs.",
          "Use realistic mobilisation capacity and a staged plan. Confirm legal employer, approved wages and benefits, statutory responsibilities, safety induction, PPE, accommodation/transport and grievance escalation. Collect only necessary candidate data through approved channels."
        ]
      },
      {
        "title": "Commercial clarity",
        "body": [
          "A staffing cost sheet separates wages, applicable employer contributions, leave/bonus or other agreed provisions, transport/hostel, recruitment and supervision costs, service charge, taxes and payment terms. State headcount and attendance assumptions.",
          "A low service-charge percentage is not automatically profitable. Check fixed operating cost, payroll funding gap, credit period and contribution margin. Clarify replacement terms and demand changes in writing.",
          "“Can you supply 100 tomorrow?” Respond: “We will verify skill, shift, location and ready pool, then commit a mobilisation schedule with daily joining evidence.”"
        ]
      }
    ],
    "practice": "Build a 50-person staffing requirement with role, shift, site, wage assumptions, readiness plan, cost components and replacement policy questions.",
    "quiz": [
      {
        "q": "What should precede a mobilisation commitment?",
        "options": [
          "Approved role, location, terms and ready-pool check",
          "Only a verbal headcount",
          "A generic poster"
        ],
        "correct": 0,
        "why": "Operational feasibility depends on the actual requirement."
      },
      {
        "q": "A low staffing service charge guarantees profit.",
        "options": [
          "True",
          "Only for large factories",
          "False; assess all costs and funding"
        ],
        "correct": 2,
        "why": "Margin depends on full cost, cash flow and collections."
      },
      {
        "q": "Which claim is safe?",
        "options": [
          "Every candidate will stay for one year",
          "Mobilisation is subject to validated demand and capacity",
          "All overseas placements are automatically licensed"
        ],
        "correct": 1,
        "why": "Promise a verified plan and measurable execution, not guaranteed worker behaviour."
      }
    ]
  },
  {
    "id": "m11",
    "title": "Qualification & quotation workshop",
    "group": "Commercial skills",
    "minutes": 35,
    "summary": "Turn a prospect conversation into a costed and reviewable proposal.",
    "outcome": "Qualify need, authority, fit and timing, then prepare an accurate quote.",
    "lessons": [
      {
        "title": "Qualify with the customer",
        "body": [
          "Record company/unit, buyer role, current tools, measurable problem, workforce/users, budget process, decision-maker, timeline and implementation constraints. Ask who uses, approves, pays and signs.",
          "A qualified lead has a confirmed problem, plausible solution fit, a decision path and an agreed next action. Unknown budget is a discovery question; it is not permission to invent one. For poor fit, document why and avoid a forced proposal."
        ]
      },
      {
        "title": "Build the quote line by line",
        "body": [
          "Quote header: legal entity, customer, location, date, validity and version. Scope: product/service, units, term, deliverables, acceptance, support, assumptions and exclusions. Commercials: recurring fee, one-time implementation, optional extras, usage, third-party costs, taxes and payment milestones.",
          "People HR equation: tier base + category uplift + explicitly enabled add-ons + one-time setup + external usage/equipment + applicable taxes. Do not charge included Category 3 app access twice. Keep annual monthly-equivalent and annual total distinct.",
          "Training illustration from the draft: Premium 100 × ₹90 = ₹9,000/month; Category 2 100 × ₹10 = ₹1,000; app 100 × ₹10 = ₹1,000; email ₹999 + WhatsApp MIS ₹1,499. Total ₹13,498/month before tax. Draft one-time setup ₹17,999. These are unapproved teaching figures."
        ]
      },
      {
        "title": "Review before customer use",
        "body": [
          "Product approves capability and release; Delivery confirms scope, capacity and schedule; Finance approves rates, taxes and credit; authorized management signs. Resolve ambiguous source prices before quotation.",
          "Do not reuse draft lifetime, reward, KYC or installation prices as an approved rate card. If a feature is incomplete, exclude it or define a separately approved pilot. Attach a responsibility matrix and change-request process."
        ]
      }
    ],
    "practice": "Qualify a 100-worker factory and write an internal quote with separate recurring, setup and usage lines, plus scope assumptions and approval owners.",
    "quiz": [
      {
        "q": "A qualified opportunity should have…",
        "options": [
          "Only a phone number",
          "Confirmed need, fit, decision path and next action",
          "Only an ad click"
        ],
        "correct": 1,
        "why": "Qualification establishes a real buying process and solution fit."
      },
      {
        "q": "The source PDF is marked pricing draft. What should you do?",
        "options": [
          "Publish it as a final rate card",
          "Promise all discounts",
          "Obtain commercial approval before customer issue"
        ],
        "correct": 2,
        "why": "Draft teaching figures are not approved customer prices."
      },
      {
        "q": "100×90 + 100×10 + 100×10 + 999 + 1499 equals…",
        "options": [
          "₹13,498/month before tax",
          "₹17,999/month",
          "₹9,000 including everything"
        ],
        "correct": 0,
        "why": "Separate recurring ₹13,498 from one-time setup and variable usage."
      }
    ]
  },
  {
    "id": "m12",
    "title": "Demos, follow-up & handover",
    "group": "Commercial skills",
    "minutes": 30,
    "summary": "Run a coherent demo, handle objections and close each follow-up loop.",
    "outcome": "Demonstrate value and leave a documented customer next step.",
    "lessons": [
      {
        "title": "A 15-minute demo structure",
        "body": [
          "0–2 min: confirm buyer problem and desired outcome. 2–4 min: show relevant master data and role. 4–8 min: demonstrate one end-to-end workflow. 8–11 min: explain exceptions, approval and report. 11–13 min: connect the outcome to the buyer’s metric. 13–15 min: confirm scope, open questions and next step.",
          "For factory HR: define required 200 / active 185 / present 177 → investigate one synthetic exception → show approval boundary → show the scoped report. Demonstrate only approved working features; explain future items as future.",
          "Trainer rubric: discovery, workflow accuracy, value explanation, objection handling and next-step clarity; each 0–20 points. Working pass threshold is 80/100 plus accurate claims and confirmed demo release scope. This is internal readiness, not external accreditation."
        ]
      },
      {
        "title": "Handle objections honestly",
        "body": [
          "“Excel is enough.” Ask where duplicate entry or reconciliation consumes time; demonstrate one agreed improvement with sample data.",
          "“Competitor is cheaper.” Compare signed scope, seats, rollout, support and total cost. Do not invent competitor limitations. “Can you add this now?” Log the requirement, validate feasibility and return with approved scope.",
          "“Will you integrate our device?” Request model, format/API and a test feed. “Can you guarantee leads?” Explain campaign work, measurement and test assumptions; do not promise an unapproved result."
        ]
      },
      {
        "title": "A repeatable follow-up and review loop",
        "body": [
          "After discovery: send requested recap and agreed next step within the agreed window. After demo: document value, open questions, owners and dates. After quote: confirm receipt, decision process and planned review date. Send only authorized communications; this site stores workflow notes and does not send messages.",
          "Example cadence for agreement: day 0 recap, day 2 technical answers, day 5 proposal review, day 10 decision check; adapt to customer preference and record opt-outs. Every follow-up needs an owner, due date and outcome.",
          "On win: hand over signed scope, data templates, permissions, migration, UAT, training, support and success criteria. Weekly review: examine completion, latest assessment, product readiness and blockers; select only the top three actions. Refresher cycles preserve past evidence and restart the assigned learning plan."
        ]
      }
    ],
    "practice": "Run a 15-minute demo, answer three objections and document a next-step plan. Ask the trainer to record a rubric review with evidence.",
    "quiz": [
      {
        "q": "An unlaunched feature is requested during the demo. What next?",
        "options": [
          "Pretend it works",
          "Log and validate it, then return with approved scope",
          "Add it to the invoice immediately"
        ],
        "correct": 1,
        "why": "Accurate status and a documented next step build trust."
      },
      {
        "q": "What closes a follow-up loop?",
        "options": [
          "Repeated reminders forever",
          "A blank calendar",
          "An owner, due date and recorded outcome"
        ],
        "correct": 2,
        "why": "A workflow needs accountability and an explicit result."
      },
      {
        "q": "80/100 on the demo but inaccurate feature claims means…",
        "options": [
          "More coaching; accuracy is a required gate",
          "Fully ready",
          "Automatically trainer-certified"
        ],
        "correct": 0,
        "why": "A numerical score cannot compensate for inaccurate claims."
      }
    ]
  }
];
export const products: Product[] = [
  {
    "id": "people",
    "name": "Joy People HR",
    "tag": "Connected workforce",
    "description": "A workforce HRMS proposition connecting employee records, attendance approval, payroll and scoped reporting.",
    "buyer": "Factory HR heads, payroll teams, plant leaders, contractors and SME owners.",
    "trigger": "Attendance disputes, fragmented employee data, payroll cutoffs or unclear department strength.",
    "features": [
      "Employee lifecycle and role-scoped records",
      "Attendance reconciliation, shifts and exception review",
      "Payroll, payslips and approved reports",
      "Optional communications, LMS and connected-workforce modules — release validation required"
    ],
    "discovery": [
      "How many workers, units, shifts and vendors?",
      "Which biometric devices and current payroll tools?",
      "Who approves exceptions, and what proves success?"
    ],
    "demo": [
      "Confirm one factory HR problem and the approved release scope.",
      "Show synthetic employee and shift records.",
      "Compare required/active/present and investigate an exception.",
      "Show the approval boundary and relevant report.",
      "Recap the measurable outcome; agree a pilot or technical check."
    ],
    "objections": [
      [
        "“Our Excel is enough.”",
        "Ask how long reconciliation takes; show one approved workflow with the same sample inputs."
      ],
      [
        "“Does every biometric work?”",
        "Request model and sample feed, then validate compatibility."
      ],
      [
        "“Is WhatsApp free in Premium?”",
        "Separate tier, category, optional MIS and usage fees; confirm the approved quote."
      ]
    ],
    "scope": "Module list, hardware, integrations, access permissions, SLA and rate card require current owner approval.",
    "modules": [
      "m01",
      "m02",
      "m03",
      "m11",
      "m12"
    ]
  },
  {
    "id": "portfolio",
    "name": "Software product portfolio",
    "tag": "Know the maturity",
    "description": "The Joy software pipeline includes payroll, OJT, expenses, CRM and adjacent operational tools at different maturity stages.",
    "buyer": "Internal process owners, industrial SMEs, institutions and employer operations teams.",
    "trigger": "A repeated workflow that may fit a reusable product, subject to current release evidence.",
    "features": [
      "Joy Payroll: evolving internal payroll workflows",
      "OJT Connect: college–employer training workflow concept/development",
      "Expense and vendor recovery portal: internal project concept",
      "Opportunity Intelligence CRM and workforce communication: project/roadmap items"
    ],
    "discovery": [
      "Is there an approved deployable release?",
      "Who is the accountable product owner?",
      "What is standard, configured, custom or unfinished?"
    ],
    "demo": [
      "Select one product with approved release evidence.",
      "State its maturity and intended user.",
      "Demonstrate the validated end-to-end workflow.",
      "Show acceptance criteria and known gaps.",
      "Route unbuilt needs into a scoped discovery action."
    ],
    "objections": [
      [
        "“Can I buy all these today?”",
        "Confirm each product’s release, support and commercial approval separately."
      ],
      [
        "“Is the roadmap a commitment?”",
        "No. Offer a validated scope or an approved pilot with acceptance criteria."
      ]
    ],
    "scope": "Portfolio references are not a universal available-for-sale catalogue.",
    "modules": [
      "m01",
      "m04",
      "m05",
      "m12"
    ]
  },
  {
    "id": "saas",
    "name": "SaaS applications",
    "tag": "Recurring value",
    "description": "Hosted subscription software with defined access, configuration, support and renewal obligations.",
    "buyer": "SMEs and multi-location teams seeking repeatable digital workflows.",
    "trigger": "The customer wants a standard process and ongoing service without commissioning every component.",
    "features": [
      "Subscription seats, entities and modules",
      "Configuration and migration scope",
      "Support, monitoring and renewal review",
      "Data export, usage limits and exit terms"
    ],
    "discovery": [
      "Which standard workflow fits?",
      "What seat count and usage limits apply?",
      "Which service, security and exit commitments are required?"
    ],
    "demo": [
      "Start with a role and task.",
      "Demonstrate one repeatable standard workflow.",
      "Show configuration and scope boundaries.",
      "Explain subscription and implementation separately.",
      "Confirm onboarding and success metric."
    ],
    "objections": [
      [
        "“Why pay every month?”",
        "Explain the contracted hosted service, support and update scope with no invented SLA."
      ],
      [
        "“Lifetime means no more bills?”",
        "Distinguish licence rights from annual hosting, support, add-ons and external usage."
      ]
    ],
    "scope": "Hosting, security evidence, support windows, renewal and portability need a written agreement.",
    "modules": [
      "m04",
      "m11",
      "m12"
    ]
  },
  {
    "id": "custom",
    "name": "Customized software",
    "tag": "Built to a process",
    "description": "A scoped application or integration designed around the customer’s approved business workflow.",
    "buyer": "Operations, finance, IT managers and business owners.",
    "trigger": "Excel, messages or disconnected tools cannot support the agreed process and control requirements.",
    "features": [
      "Discovery and requirements",
      "UX, roles, data and integrations",
      "Development, testing and UAT",
      "Change control, training and support"
    ],
    "discovery": [
      "What starts and ends the workflow?",
      "Who approves and handles exceptions?",
      "Which systems, samples, volume and acceptance tests are available?"
    ],
    "demo": [
      "Recap the current workflow pain.",
      "Walk through a prototype or validated build.",
      "Show role permissions and an exception.",
      "Review acceptance criteria and phased scope.",
      "Agree dependencies, effort review and change process."
    ],
    "objections": [
      [
        "“Can everything be ready in two weeks?”",
        "Define the minimum accepted workflow and validate capacity before dates."
      ],
      [
        "“Include any future changes.”",
        "Separate included revisions from material change requests and maintenance."
      ]
    ],
    "scope": "Do not promise delivery dates, integrations or IP rights before technical and contractual review.",
    "modules": [
      "m04",
      "m05",
      "m11",
      "m12"
    ]
  },
  {
    "id": "web",
    "name": "Websites & business portals",
    "tag": "Presence to enquiry",
    "description": "Responsive brochure, CMS or connected web experiences with an agreed content and conversion journey.",
    "buyer": "Manufacturers, exporters, institutions, local firms and service businesses.",
    "trigger": "Weak digital credibility, outdated content, poor enquiry capture or a need for editable pages.",
    "features": [
      "Static pages or scoped CMS",
      "Mobile UX and tested enquiry forms",
      "Basic on-page SEO and measurement setup",
      "Domain, hosting and content handover"
    ],
    "discovery": [
      "Who visits and what should they do?",
      "Who provides content and edits pages?",
      "What pages, languages, integrations and maintenance are needed?"
    ],
    "demo": [
      "Open the site on a mobile viewport.",
      "Find the right service and approved proof.",
      "Submit a synthetic enquiry and verify receipt.",
      "Show agreed content-editing permissions.",
      "Review ownership, support and next step."
    ],
    "objections": [
      [
        "“A website includes free ongoing SEO, right?”",
        "Separate launch SEO setup from a scoped ongoing SEO retainer."
      ],
      [
        "“Can you guarantee first-page ranking?”",
        "No; define quality work and measurement instead."
      ]
    ],
    "scope": "Pages, content, revisions, hosting, domain ownership and maintenance must be explicit.",
    "modules": [
      "m06",
      "m07",
      "m11",
      "m12"
    ]
  },
  {
    "id": "digital",
    "name": "Digital marketing",
    "tag": "Demand with evidence",
    "description": "SEO, content, social and paid campaign services tied to qualified customer actions and transparent measurement.",
    "buyer": "B2B service providers, industrial companies, SMEs and growth teams.",
    "trigger": "Low discoverability, poor lead quality, no attribution or inconsistent content.",
    "features": [
      "SEO audit and intent-led content",
      "Scoped social creative and campaign plan",
      "Paid campaign management with separate ad budget",
      "Conversion tracking and CRM qualification"
    ],
    "discovery": [
      "Which customer and geography matter?",
      "What is the offer and available proof?",
      "What is budget, conversion event and lead-quality definition?"
    ],
    "demo": [
      "Show the buyer and keyword/creative hypothesis.",
      "Connect an ad or search to its landing page.",
      "Show successful form measurement.",
      "Follow the enquiry into qualification.",
      "Propose a test budget and review criteria."
    ],
    "objections": [
      [
        "“Guarantee 100 sales.”",
        "Agree a testable plan and measurable funnel; do not guarantee an unapproved outcome."
      ],
      [
        "“Clicks increased, so it worked.”",
        "Review qualified leads, meetings and opportunity value."
      ]
    ],
    "scope": "Creative quantity, channels, media spend, tools, reporting and response ownership must be scoped.",
    "modules": [
      "m07",
      "m08",
      "m11",
      "m12"
    ]
  },
  {
    "id": "payroll",
    "name": "Payroll services",
    "tag": "Controlled monthly delivery",
    "description": "An agreed operating service for payroll inputs, validation, processing, review and reporting.",
    "buyer": "HR and finance heads, SMEs and multi-unit employers.",
    "trigger": "Monthly reconciliation delays, wage errors, mixed attendance inputs or insufficient payroll capacity.",
    "features": [
      "Input calendar and exception checking",
      "Draft payroll and maker/checker review",
      "Approved bank output and payslips",
      "Contracted compliance coordination and reporting"
    ],
    "discovery": [
      "How many entities, employees and cycles?",
      "Who provides and approves attendance and wage changes?",
      "Who funds, authorizes bank payments and owns filings?"
    ],
    "demo": [
      "Agree the monthly calendar and owners.",
      "Validate synthetic attendance and wage inputs.",
      "Identify an exception and route for approval.",
      "Show reviewed payroll and approved output flow.",
      "Confirm handover, responsibilities and fees."
    ],
    "objections": [
      [
        "“We have an accountant.”",
        "Map responsibilities and identify only the gaps needing support."
      ],
      [
        "“Will all liability move to Joy?”",
        "Clarify employer responsibilities and contracted service scope; obtain professional review."
      ]
    ],
    "scope": "Confirm statutory parameters, approval responsibilities, funding and deliverables for each establishment.",
    "modules": [
      "m03",
      "m09",
      "m11",
      "m12"
    ]
  },
  {
    "id": "manpower",
    "name": "Manpower services",
    "tag": "Demand to deployment",
    "description": "Requirement-led sourcing, screening, mobilisation, deployment and field support under an agreed contract.",
    "buyer": "Plant HR, production, procurement and industrial management.",
    "trigger": "Vacancies, urgent shift gaps, bulk hiring demand or retention and mobilisation challenges.",
    "features": [
      "Validated job and site requirement",
      "Sourcing and role-based screening",
      "Joining coordination and deployment verification",
      "Field support and replacement follow-up"
    ],
    "discovery": [
      "What role, skill, plant, shift and approved headcount?",
      "What wages, benefits, transport and hostel terms?",
      "What is joining schedule, funding cycle and replacement expectation?"
    ],
    "demo": [
      "Document the approved requirement.",
      "Show the staged sourcing and mobilisation plan.",
      "Explain screening and truthful candidate communication.",
      "Show joining and deployment evidence.",
      "Review the full cost sheet and service responsibilities."
    ],
    "objections": [
      [
        "“100 workers tomorrow?”",
        "Check the ready pool and conditions; commit a realistic staged plan."
      ],
      [
        "“Reduce service charge without changing anything.”",
        "Review total costs, contribution and payment cycle with Finance."
      ]
    ],
    "scope": "Confirm legal employer, applicable rules, safety, programme approvals, commercial terms and capacity.",
    "modules": [
      "m01",
      "m10",
      "m11",
      "m12"
    ]
  }
];
export const initialFacts: Fact[] = [
  {
    "id": "f1",
    "title": "Group entity and brand distinction",
    "detail": "JMS and JCS service businesses, JMTS Dubai footprint, Joy People HR product and Joy Groups umbrella are distinct. Contract through the verified legal entity.",
    "status": "Verified",
    "source": "Training Handbook · November 2026",
    "owner": "Management",
    "reviewed": "2026-11-15",
    "evidence": "Document-backed training fact; not independent release testing."
  },
  {
    "id": "f2",
    "title": "Tier ≠ privilege category",
    "detail": "Starter / Premium / Enterprise are functional tiers; Categories 1 / 2 / 3 define workforce access. This configuration distinction is documented, not proof of implementation.",
    "status": "Verified",
    "source": "Commercial & Product Master Plan · 12 Nov 2026 · draft",
    "owner": "Product",
    "reviewed": "2026-11-15",
    "evidence": "Document-backed training fact; not independent release testing."
  },
  {
    "id": "f3",
    "title": "Category 2 vendor access",
    "detail": "The approved design direction uses scoped vendor logins; no separate direct employee portal is included by default. Validate exact screens at release.",
    "status": "Verified",
    "source": "Commercial & Product Master Plan · 12 Nov 2026 · draft",
    "owner": "Product",
    "reviewed": "2026-11-15",
    "evidence": "Document-backed training fact; not independent release testing."
  },
  {
    "id": "f4",
    "title": "Category 3 employee app",
    "detail": "Employee app access is included in the Category 3 configuration design. Do not charge the same entitlement twice.",
    "status": "Verified",
    "source": "Commercial & Product Master Plan · 12 Nov 2026 · draft",
    "owner": "Finance / Product",
    "reviewed": "2026-11-15",
    "evidence": "Document-backed training fact; not independent release testing."
  },
  {
    "id": "f5",
    "title": "Attendance events need reconciliation",
    "detail": "Bus, gate, department and canteen events serve different purposes. Approved work attendance and meal-served evidence require distinct validation.",
    "status": "Verified",
    "source": "Commercial & Product Master Plan · 12 Nov 2026 · draft",
    "owner": "Delivery",
    "reviewed": "2026-11-15",
    "evidence": "Document-backed training fact; not independent release testing."
  },
  {
    "id": "f6",
    "title": "Draft prices are not approved rates",
    "detail": "The master plan explicitly states internal pricing proposal. New rates and discounts require management approval before external use.",
    "status": "Verified",
    "source": "Commercial & Product Master Plan · 12 Nov 2026 · draft",
    "owner": "Finance",
    "reviewed": "2026-11-15",
    "evidence": "Document-backed training fact; not independent release testing."
  },
  {
    "id": "f7",
    "title": "Connected workforce extensions",
    "detail": "Bus boarding, department events, canteen analytics and field geofence/photo workflows are described in the proposed product plan. Exact release status is not verified.",
    "status": "Tentative",
    "source": "Commercial & Product Master Plan · 12 Nov 2026 · draft",
    "owner": "Product",
    "reviewed": "2026-11-15",
    "evidence": "Document-backed training fact; not independent release testing."
  },
  {
    "id": "f8",
    "title": "KYC and background checks",
    "detail": "Premium / Enterprise design includes verification workflows with usage fees. Provider agreements, lawful basis, consent, coverage and release evidence remain to be confirmed.",
    "status": "Tentative",
    "source": "Commercial & Product Master Plan · 12 Nov 2026 · draft",
    "owner": "Product / Compliance",
    "reviewed": "2026-11-15",
    "evidence": "Document-backed training fact; not independent release testing."
  },
  {
    "id": "f9",
    "title": "Lifetime and digital rewards",
    "detail": "Lifetime conventions, maintenance pricing and growth-reward bands are proposals requiring commercial and delivery validation.",
    "status": "Tentative",
    "source": "Commercial & Product Master Plan · 12 Nov 2026 · draft",
    "owner": "Finance",
    "reviewed": "2026-11-15",
    "evidence": "Document-backed training fact; not independent release testing."
  },
  {
    "id": "f10",
    "title": "Future portfolio",
    "detail": "OJT, expense recovery, CRM, chat and adjacent operational tools are concepts/development items, pending product-owner evidence for sale.",
    "status": "Tentative",
    "source": "Training Handbook · November 2026",
    "owner": "Product",
    "reviewed": "2026-11-15",
    "evidence": "Document-backed training fact; not independent release testing."
  },
  {
    "id": "f11",
    "title": "Release evidence pack",
    "detail": "Attach current working release, module list, test results, known defects, device compatibility and demo account evidence. No pack was supplied for this build.",
    "status": "Incomplete",
    "source": "Training Handbook · November 2026",
    "owner": "Engineering",
    "reviewed": "2026-11-15",
    "evidence": "Missing current release evidence; no runtime feature claim is approved here."
  },
  {
    "id": "f12",
    "title": "Customer proof library",
    "detail": "Obtain consented screenshots, accepted case-study metrics and approved testimonials before using them in external demos.",
    "status": "Incomplete",
    "source": "Training Handbook · November 2026",
    "owner": "Delivery",
    "reviewed": "2026-11-15",
    "evidence": "No customer proof assets attached."
  },
  {
    "id": "f13",
    "title": "Commercial approval record",
    "detail": "Record the approved rate card, discount authority, tax treatment and quotation validity. Source draft has unresolved price bands.",
    "status": "Incomplete",
    "source": "Commercial & Product Master Plan · 12 Nov 2026 · draft",
    "owner": "Finance",
    "reviewed": "2026-11-15",
    "evidence": "Approval record not supplied."
  },
  {
    "id": "f14",
    "title": "Contracting entity for technology brand",
    "detail": "Confirm legal contracting entity and status before selling under Joy Technical Solutions.",
    "status": "Needs confirmation",
    "source": "Training Handbook · November 2026",
    "owner": "Management / Legal",
    "reviewed": "2026-11-15",
    "evidence": "Document-backed training fact; not independent release testing."
  },
  {
    "id": "f15",
    "title": "Hardware, security and support commitments",
    "detail": "Confirm exact biometric models, backup/restore evidence, data location, SLA, support windows and export terms. Do not imply certification.",
    "status": "Needs confirmation",
    "source": "Training Handbook · November 2026",
    "owner": "Engineering / Delivery",
    "reviewed": "2026-11-15",
    "evidence": "Document-backed training fact; not independent release testing."
  },
  {
    "id": "f16",
    "title": "Current financial and workforce figures",
    "detail": "Finance must approve headcount, turnover, period and consolidation basis. Conflicting historical planning figures are not reused as current metrics.",
    "status": "Needs confirmation",
    "source": "Training Handbook · November 2026",
    "owner": "Finance",
    "reviewed": "2026-11-15",
    "evidence": "Document-backed training fact; not independent release testing."
  },
  {
    "id": "f17",
    "title": "2032 and 2040 aspirations",
    "detail": "₹600 crore by 2032 appears in the handbook; later founder direction extends to ₹10,000 crore annual group revenue by 2040. These remain aspirations.",
    "status": "Tentative",
    "source": "Handbook + founder direction supplied in conversation",
    "owner": "Management",
    "reviewed": "2026-11-15",
    "evidence": "Document-backed training fact; not independent release testing."
  },
  {
    "id": "f18",
    "title": "Ongoing academy operating criteria",
    "detail": "Working module pass: latest knowledge check ≥80% plus lesson read. Product-ready: all mapped learning complete and latest demo ≥80 with accuracy and release scope confirmed.",
    "status": "Needs confirmation",
    "source": "Academy working rubric adapted from handbook",
    "owner": "Training Manager",
    "reviewed": "2026-11-15",
    "evidence": "Management can approve or revise these internal criteria in a future content update."
  }
];
export const sources = [
  {
    "title": "Joy Groups Product Delivery Training Handbook",
    "date": "10 Nov 2026",
    "kind": "Internal source",
    "url": "https://chatgpt.com/library?file_id=libfile_2ee4a4178f2c819191792cb895055144&account_id=personal",
    "note": "Business map, learning curriculum, product positioning, maturity and trainer rubric."
  },
  {
    "title": "Joy People HR Commercial & Product Master Plan",
    "date": "12 Nov 2026",
    "kind": "Internal draft",
    "url": "https://chatgpt.com/library?file_id=libfile_00a95451772c8191914133ad129c9ba4&account_id=personal",
    "note": "Latest tier/category design and teaching quotation; all prices remain draft."
  },
  {
    "title": "Google SEO Starter Guide",
    "date": "Checked 15 Nov 2026",
    "kind": "Official guidance",
    "url": "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
    "note": "Intent-led content, discoverability, links and technical SEO foundations."
  },
  {
    "title": "Google Analytics: conversions vs. key events",
    "date": "Checked 15 Nov 2026",
    "kind": "Official guidance",
    "url": "https://support.google.com/analytics/answer/13965727",
    "note": "Analytics key events and Google Ads conversions are distinct measurement concepts."
  },
  {
    "title": "Joy Groups founder direction",
    "date": "Supplied conversation context",
    "kind": "Aspirational direction",
    "url": "",
    "note": "2040 ambition and future initiatives; management confirmation is required before external use."
  }
];
