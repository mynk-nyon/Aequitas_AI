"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { analyzeRisks } from "@/server/actions";
import { RiskFinding } from "@/types";

export default function AnalyzerView({ content }: { content: string }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ findings: RiskFinding[] } | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await analyzeRisks(content);
      setData(result);
    } catch (err) {
      console.error(err);
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Clause Risk & Obligation Matrix</CardTitle>
        <Button onClick={handleAnalyze} disabled={loading || !content}>
          {loading ? "Auditing..." : "Audit Risks"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6" aria-live="polite" aria-busy={loading}>
        {data?.findings.map((finding, idx) => (
          <div key={idx} className="p-4 border border-l-4 rounded-r-lg space-y-2 bg-slate-50"
               style={{ borderLeftColor: finding.severity === 'HIGH' ? '#ef4444' : finding.severity === 'MEDIUM' ? '#f59e0b' : '#3b82f6' }}>
            <div className="flex justify-between items-start">
              <Badge variant="outline">{finding.category}</Badge>
              <Badge variant={getSeverityVariant(finding.severity)}>{finding.severity} RISK</Badge>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1 text-slate-700">Clause Extract:</p>
              <p className="text-sm bg-white p-2 rounded border font-mono">{finding.clause}</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1 text-slate-700">Analysis:</p>
              <p className="text-sm">{finding.explanation}</p>
            </div>
          </div>
        ))}
        {!data && !loading && (
          <p className="text-slate-500 text-center py-8">Click the button to scan the document for risks.</p>
        )}
      </CardContent>
    </Card>
  );
}
