"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { compareDocuments } from "@/server/actions";
import { DiffFinding } from "@/types";

export default function ComparatorView({ original, modified }: { original: string; modified: string }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ discrepancies: DiffFinding[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await compareDocuments(original, modified);
      if (result && "error" in result) { setError(result.error); } else { setData(result); }
    } catch (e: any) {
      console.error(e);
      setError(e.message || "An error occurred during comparison.");
    } finally {
      setLoading(false);
    }
  };

  const getTypeVariant = (type: DiffFinding['changeType']) => {
    switch(type) {
      case 'ADDED': return 'success';
      case 'REMOVED': return 'destructive';
      case 'MODIFIED': return 'warning';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Bilateral Agreement Comparator</CardTitle>
        <Button onClick={handleCompare} disabled={loading || !original || !modified}>
          {loading ? "Comparing..." : "Find Discrepancies"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6" aria-live="polite" aria-busy={loading}>
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">
            <strong className="font-semibold">Error:</strong> {error}
          </div>
        )}
        {!modified && (
          <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md text-sm">
            Please provide a secondary document in the Input tab to enable comparison.
          </div>
        )}
        {data?.discrepancies.map((diff, idx) => (
          <div key={idx} className="p-4 border rounded-lg space-y-4 bg-slate-50">
            <div className="flex justify-between items-center">
              <Badge variant={getTypeVariant(diff.changeType)}>{diff.changeType}</Badge>
              <Badge variant={diff.severity === 'HIGH' ? 'destructive' : diff.severity === 'MEDIUM' ? 'warning' : 'default'}>
                {diff.severity} IMPACT
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase">Original Text</p>
                <div className="text-sm bg-red-50 p-2 rounded text-red-900 border border-red-100 min-h-[3rem]">
                  {diff.originalText || <em>(None)</em>}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase">Modified Text</p>
                <div className="text-sm bg-green-50 p-2 rounded text-green-900 border border-green-100 min-h-[3rem]">
                  {diff.newText || <em>(None)</em>}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t">
              <p className="font-semibold text-sm mb-1 text-slate-700">Practical Impact:</p>
              <p className="text-sm">{diff.impact}</p>
            </div>
          </div>
        ))}
        {!data && !loading && modified && (
          <p className="text-slate-500 text-center py-8">Click the button to compare the original and modified documents.</p>
        )}
      </CardContent>
    </Card>
  );
}
