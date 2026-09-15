"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { simplifyText } from "@/server/actions";
import { SimplifiedClause } from "@/types";

export default function SimplifierView({ content }: { content: string }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ clauses: SimplifiedClause[] } | null>(null);

  const handleSimplify = async () => {
    setLoading(true);
    try {
      const result = await simplifyText(content);
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Plain-English Decoder</CardTitle>
        <Button onClick={handleSimplify} disabled={loading || !content}>
          {loading ? "Decoding..." : "Translate to Plain English"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {data?.clauses.map((clause, idx) => (
          <div key={idx} className="p-4 border rounded-lg space-y-4 bg-slate-50">
            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase">Original Legal Text</h4>
              <p className="text-sm mt-1">{clause.original}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-600 uppercase">Plain English Translation</h4>
              <p className="text-base font-medium mt-1">{clause.simplified}</p>
            </div>
            {clause.jargon.length > 0 && (
              <div className="pt-2 border-t">
                <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Jargon Defined</h4>
                <ul className="text-sm space-y-2">
                  {clause.jargon.map((j, jIdx) => (
                    <li key={jIdx}>
                      <strong>{j.term}:</strong> {j.definition}
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
