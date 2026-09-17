"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { analyzeRisks } from "@/server/actions";
import { RiskFinding, AnalyzerResult } from "@/types";

export default function AnalyzerView({ content }: { content: string }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalyzerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeRisks(content);
      if (result && "error" in result) { setError(result.error); } else { setData(result as AnalyzerResult); }
    } catch (e: any) {
      console.error(e);
      setError(e.message || "An error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  };

  const getSeverityVariant = (severity: RiskFinding['severity']) => {
    switch(severity) {
      case 'HIGH': return 'destructive';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'default';
      default: return 'outline';
    }
  };

  return (
    <Card className="border-border/60 bg-card/40 hover:border-primary/40 transition-colors shadow-none rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="font-display font-bold">Clause Risk & Obligation Matrix</CardTitle>
        <Button onClick={handleAnalyze} disabled={loading || !content}>
          {loading ? "Auditing..." : "Audit Risks"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6" aria-live="polite" aria-busy={loading}>
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">
            <strong className="font-semibold">Error:</strong> {error}
          </div>
        )}
        {data?.findings.map((finding: RiskFinding, idx: number) => (
          <div key={idx} className="p-5 border border-l-4 rounded-r-lg space-y-2 bg-background/50 border-y-border/60 border-r-border/60"
               style={{ borderLeftColor: finding.severity === 'HIGH' ? '#ef4444' : finding.severity === 'MEDIUM' ? '#f59e0b' : '#3b82f6' }}>
            <div className="flex justify-between items-start">
              <Badge variant="outline" className="font-mono text-[10px] tracking-wider uppercase border-primary/40 bg-primary/10 text-primary">
                {finding.category}
              </Badge>
              <Badge variant={finding.severity === 'HIGH' ? 'destructive' : 'default'}
                     className={finding.severity === 'MEDIUM' ? 'bg-amber-500 hover:bg-amber-600' : finding.severity === 'LOW' ? 'bg-blue-500 hover:bg-blue-600' : ''}>
                {finding.severity} RISK
              </Badge>
            </div>
            <p className="font-medium text-foreground text-sm mt-2">{finding.explanation}</p>
            <p className="text-xs font-mono text-muted-foreground bg-card p-2 rounded-md border border-border/40">"{finding.clause}"</p>
          </div>
        ))}
        {!data && !loading && (
          <p className="text-muted-foreground text-sm">Click "Audit Risks" to identify predatory clauses, automatic renewals, and hidden obligations.</p>
        )}
      </CardContent>
    </Card>
  );
}
