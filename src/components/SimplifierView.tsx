"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { simplifyText } from "@/server/actions";
import { SimplifiedClause } from "@/types";

export default function SimplifierView({ content }: { content: string }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ clauses: SimplifiedClause[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSimplify = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await simplifyText(content);
      if (result && "error" in result) { setError(result.error); } else { setData(result); }
    } catch (e: any) {
      console.error(e);
      setError(e.message || "An error occurred during translation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/60 bg-card/40 hover:border-primary/40 transition-colors shadow-none rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="font-display font-bold">Plain-English Decoder</CardTitle>
        <Button onClick={handleSimplify} disabled={loading || !content}>
          {loading ? "Decoding..." : "Translate to Plain English"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6" aria-live="polite" aria-busy={loading}>
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">
            <strong className="font-semibold">Error:</strong> {error}
          </div>
        )}
        {data?.clauses.map((clause, idx) => (
          <div key={idx} className="p-5 border border-border/60 rounded-lg space-y-4 bg-background/50">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Original Clause</h4>
              <p className="text-sm font-mono text-muted-foreground">{clause.original}</p>
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-primary mb-1">Simplified Meaning</h4>
              <p className="text-base text-foreground font-medium">{clause.simplified}</p>
            </div>
            {clause.jargon.length > 0 && (
              <div className="pt-2 border-t border-border/40">
                <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Jargon Defined</h4>
                <ul className="space-y-1">
                  {clause.jargon.map((j, i) => (
                    <li key={i} className="text-sm">
                      <span className="font-semibold text-primary">{j.term}:</span> <span className="text-muted-foreground">{j.definition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
        {!data && !loading && (
          <p className="text-slate-500 text-center py-8">Click the button above to simplify the document.</p>
        )}
      </CardContent>
    </Card>
  );
}
