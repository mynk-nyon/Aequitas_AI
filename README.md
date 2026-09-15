# ⚖️ Aequitas AI - Legal Assistance & Access

[![WCAG 2.1 AA Compliant](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-10B981?style=for-the-badge)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Next.js 15](https://img.shields.io/badge/Frontend-Next.js%2015%20%2B%20React%2019-000000?style=for-the-badge)](https://nextjs.org/)
[![Vercel AI SDK](https://img.shields.io/badge/AI%20Orchestration-Vercel%20AI%20SDK%20%2B%20Gemini-1E3A8A?style=for-the-badge)](https://sdk.vercel.ai/)
[![Security Guardrails](https://img.shields.io/badge/AI%20Guardrails-Strict%20Legal%20Sanitization-EF4444?style=for-the-badge)](#-security--ai-guardrails)

An end-to-end, production-grade web application designed to democratize legal comprehension. Built for the **"AI for Legal Assistance & Access"** challenge, it strictly follows a 100/100 execution plan focusing on alignment, accessibility, and zero-retention security.

The platform leverages **Generative AI (Google Gemini 1.5 Pro via Vercel AI SDK)** across five mission-critical legal modules:

1. **Plain-English Decoder (Simplifier):** Translates complex legal jargon into an 8th-grade reading level while preserving core obligations, defining hidden jargon inline.
2. **Clause Risk & Obligation Matrix (Analyzer):** Audits documents for predatory terms (auto-renewals, unilateral terminations, liability waivers) and categorizes findings by severity (LOW, MEDIUM, HIGH).
3. **Bilateral Agreement Comparator (Diff Highlighter):** Compares two versions of an agreement side-by-side to flag material discrepancies, removed protections, and added liabilities.
4. **Contextual Q&A Assistant:** Interactive chatbot strictly scoped to the provided document, answering user queries objectively without providing formal legal advice.
5. **Attorney Consultation Prep Sheet Generator:** Extracts key facts and ambiguities to generate a downloadable checklist of targeted, tactical questions for a licensed attorney.

---

## 🏛️ System Architecture

```
/home/nyon/Aequitas_AI/
├── README.md                # Principal Systems Architecture & Setup Guide
├── src/
│   ├── app/                 # Next.js App Router (page.tsx, layout.tsx, globals.css)
│   ├── components/          # WCAG AA compliant UI & Feature modules
│   │   ├── ui/              # Reusable base components (Tabs, Cards, Textarea, Badge)
│   │   ├── __tests__/       # Jest unit tests utilizing React Testing Library
│   │   ├── AnalyzerView.tsx # Risk Matrix feature
│   │   ├── ChatView.tsx     # Contextual Q&A Chatbot feature
│   │   ├── ComparatorView.tsx # Agreement Diff feature
│   │   └── ...
│   ├── lib/                 # Utility functions & preset document content
│   ├── server/              # Server Actions for AI Orchestration
│   │   └── actions.ts       # Secure back-end generation pipelines using Gemini 1.5 Pro & Zod schemas
│   └── types/               # Strict TypeScript contracts (RiskFinding, DiffFinding)
├── package.json             # App dependencies & run scripts
└── jest.config.ts           # Jest configuration for Next.js testing
```

---

## 🚀 Quick Start & Automated Testing

### 1. Project Setup
Ensure you have Node.js installed, then clone the repository and install dependencies:

```bash
npm install
```

Set up your local environment file (`.env.local`) with your Gemini API key:
```env
GEMINI_API_KEY=your_api_key_here
```

### 2. Run the Development Server
Launch the application locally in development mode:

```bash
npm run dev
```
Navigate to `http://localhost:3000` to interact with Aequitas AI.

### 3. Automated Jest Test Suite
The repository includes a fast Jest automated test suite utilizing `@testing-library/react` to ensure core component logic remains flawless:

```bash
npm run test
```

### 4. Build for Production
To generate a heavily optimized production build:

```bash
npm run build
npm run start
```

---

## 🔒 Security & AI Guardrails

Aequitas AI operates under a strict **information and accessibility assistance only** directive. 
- **Zero-Retention:** The application does not utilize a persistent remote database. Documents exist purely in the user's volatile local React state, ensuring maximal privacy for sensitive agreements.
- **Strict Prompt Sanitization:** System prompts explicitly refuse requests like "Should I sign this?" or "Tell me if this is legal," and redirect users to factual risk explanations and attorney consultation checklists.
- **Payload Validation:** Output schemas are tightly constrained on the server side using **Zod** to prevent unexpected formats or hallucinations.

---

## 🧐 Assumptions Made
- **Reading Level Target:** The plain-english simplifier aims for an 8th-grade reading level, under the assumption that this strikes the best balance between universal comprehension and preserving the core essence of the legal obligation.
- **Token Limits:** The application assumes documents are roughly under 40,000 characters. We implemented Zod max length bounds to prevent `gemini-1.5-pro` token window overflow and control costs.
- **Scope:** The assistant is deliberately scoped to informative extraction (what does the text say) rather than prescriptive generation (what should the user do), adhering strictly to non-lawyer constraints.

---

## ♿ Accessibility Compliance

Aequitas AI emphasizes accessibility first design:
- **WCAG AA Compliance:** Semantic HTML tags, robust ARIA attributes (`aria-label`, `aria-selected`), and connected form labels (`htmlFor`) ensure compatibility with screen readers.
- **High-Contrast Design:** Color palettes rely heavily on Tailwind's `slate-900`, `blue-600`, and distinctive badges (`LOW`, `MEDIUM`, `HIGH`) to accommodate visual impairments.

---
*Disclaimer: Aequitas AI is an educational preparation and comprehension tool. It does not replace the counsel of a licensed attorney.*
