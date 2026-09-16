export type Severity = 'LOW' | 'MEDIUM' | 'HIGH';

export interface RiskFinding {
  clause: string;
  explanation: string;
  severity: Severity;
  category: string;
}

export interface AnalyzerResult {
  findings: RiskFinding[];
}

export interface SimplifiedClause {
  original: string;
  simplified: string;
  jargon: { term: string; definition: string }[];
}

export interface DiffFinding {
  originalText: string;
  newText: string;
  changeType: 'ADDED' | 'REMOVED' | 'MODIFIED';
  impact: string;
  severity: Severity;
}

export interface DocumentContext {
  id: string;
  title: string;
  content: string;
  secondaryContent?: string; // For comparison
}
