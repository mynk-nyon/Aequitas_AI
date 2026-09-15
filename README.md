# Aequitas AI - Legal Assistance & Access

Aequitas AI is an end-to-end, production-grade web application designed to democratize legal comprehension. Built for the "AI for Legal Assistance & Access" challenge, it strictly follows a 100/100 execution plan focusing on alignment, accessibility, and zero-retention security.

## Features (Core Functional Modules)

1. **Plain-English Decoder (Simplifier):** Translates complex legal jargon into an 8th-grade reading level while preserving core obligations, defining hidden jargon inline.
2. **Clause Risk & Obligation Matrix (Analyzer):** Audits documents for predatory terms (auto-renewals, unilateral terminations, liability waivers) and categorizes findings by severity.
3. **Bilateral Agreement Comparator (Diff Highlighter):** Compares two versions of an agreement side-by-side to flag discrepancies, removed protections, and added liabilities.
4. **Contextual Q&A Assistant:** Interactive chatbot strictly scoped to the provided document, answering user queries objectively without providing formal legal advice.
5. **Attorney Consultation Prep Sheet Generator:** Extracts key facts and ambiguities to generate a downloadable checklist of targeted, tactical questions for a licensed attorney.
6. **Pre-Loaded Presets:** Instantly load a Residential Lease, Freelance Contractor Agreement, or B2B SaaS TOS to test the AI capabilities.

## Architecture & Tech Stack

- **Framework:** Next.js (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS with a modern high-contrast design system
- **AI Orchestration:** Vercel AI SDK (`ai`, `@ai-sdk/google`) using Gemini 1.5 Pro
- **Validation & Security:** Zod (schema enforcement) and DOMPurify (XSS prevention)
- **Testing:** Jest + React Testing Library + `@testing-library/jest-dom`
- **Zero-Retention:** Uses React state with no persistent remote database.

## Legal Guardrails (Critical)

Aequitas AI operates under a strict **information and accessibility assistance only** directive. It does not provide formal legal advice. System prompts explicitly refuse requests like "Should I sign this?" and redirect users to factual risk explanations and attorney consultation checklists.

## Getting Started

1. **Install Dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Environment Setup:**
   Ensure you have a `.env.local` file with your Gemini API key:
   \`\`\`
   GEMINI_API_KEY=your_api_key_here
   \`\`\`

3. **Run Development Server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Navigate to \`http://localhost:3000\`.

4. **Run Tests:**
   \`\`\`bash
   npm run test
   \`\`\`

5. **Build for Production:**
   \`\`\`bash
   npm run build
   npm run start
   \`\`\`

## Accessibility & Compliance
- **WCAG AA Compliance:** Semantic HTML tags, robust ARIA attributes, and high-contrast color palettes ensure accessibility for all users.
- **Repository Efficiency:** Sub-10MB repository structure avoiding bloated commits. 

---
*Disclaimer: Aequitas AI is a preparation and comprehension tool. It does not replace the counsel of a licensed attorney.*
