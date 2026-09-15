'use server';

import { generateObject, generateText, streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

const LEGAL_GUARDRAIL = `
CRITICAL INSTRUCTION: You are an AI assistant designed to provide legal information, plain-english translations, and objective analysis of document clauses.
YOU MUST NEVER PROVIDE FORMAL LEGAL ADVICE. 
If the user asks questions like "Should I sign this?", "Is this legal?", or "Can they do this?", you must explicitly refuse to provide legal advice, redirect them to factual risk explanations, and recommend they consult a licensed attorney.
`;

export async function simplifyText(content: string) {
  const { object } = await generateObject({
    model: google('gemini-1.5-pro'),
    system: LEGAL_GUARDRAIL + '\nYou are a plain-english legal translator. Translate complex legal text into an 8th-grade reading level while preserving core obligations. Identify and define hidden jargon.',
    prompt: `Analyze and simplify the following legal text:\n\n${content}`,
    schema: z.object({
      clauses: z.array(z.object({
        original: z.string().describe('The original text clause'),
        simplified: z.string().describe('The simplified, 8th-grade level translation'),
        jargon: z.array(z.object({
          term: z.string(),
          definition: z.string()
        })).describe('Complex legal terms found in this clause and their definitions')
      }))
    })
  });
  return object;
}

export async function analyzeRisks(content: string) {
  const { object } = await generateObject({
    model: google('gemini-1.5-pro'),
    system: LEGAL_GUARDRAIL + '\nYou are a legal contract auditor. Audit the text for predatory terms: unilateral termination, automatic renewals, liability waivers, non-disparagement, and indemnification traps. Categorize findings by severity (LOW, MEDIUM, HIGH).',
    prompt: `Audit the following legal text for risks and obligations:\n\n${content}`,
    schema: z.object({
      findings: z.array(z.object({
        clause: z.string(),
        explanation: z.string(),
        severity: z.enum(['LOW', 'MEDIUM', 'HIGH']),
        category: z.string()
      }))
    })
  });
  return object;
}

export async function compareDocuments(original: string, modified: string) {
  const { object } = await generateObject({
    model: google('gemini-1.5-pro'),
    system: LEGAL_GUARDRAIL + '\nYou are a legal document comparator. Compare two versions of an agreement. Flag material discrepancies, removed protections, and introduced liabilities side by side.',
    prompt: `Compare these two documents.\n\nORIGINAL:\n${original}\n\nMODIFIED:\n${modified}`,
    schema: z.object({
      discrepancies: z.array(z.object({
        originalText: z.string(),
        newText: z.string(),
        changeType: z.enum(['ADDED', 'REMOVED', 'MODIFIED']),
        impact: z.string(),
        severity: z.enum(['LOW', 'MEDIUM', 'HIGH'])
      }))
    })
  });
  return object;
}

export async function generatePrepSheet(content: string) {
  const { object } = await generateObject({
    model: google('gemini-1.5-pro'),
    system: LEGAL_GUARDRAIL + '\nYou are a legal assistant helping a user prepare for an attorney consultation. Extract key facts, ambiguities, and generate 5-8 tactical questions for the user to ask a lawyer.',
    prompt: `Generate an attorney consultation prep sheet based on this document:\n\n${content}`,
    schema: z.object({
      keyFacts: z.array(z.string()),
      ambiguities: z.array(z.string()),
      questionsToAsk: z.array(z.string())
    })
  });
  return object;
}

export async function askQuestion(content: string, question: string, history: { role: 'user'|'assistant', content: string }[]) {
  const { text } = await generateText({
    model: google('gemini-1.5-pro'),
    system: LEGAL_GUARDRAIL + '\nYou are a helpful legal AI assistant. Answer questions strictly based on the provided document context.',
    prompt: `DOCUMENT CONTEXT:\n${content}\n\nChat History:\n${history.map(m => m.role + ': ' + m.content).join('\n')}\n\nUser: ${question}`
  });
  return text;
}
