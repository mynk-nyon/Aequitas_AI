"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PRESETS } from "@/lib/presets";
import DOMPurify from 'isomorphic-dompurify';

import SimplifierView from "./SimplifierView";
import AnalyzerView from "./AnalyzerView";
import ComparatorView from "./ComparatorView";
import ChatView from "./ChatView";
import PrepSheetView from "./PrepSheetView";

export default function DashboardView() {
  const [documentContent, setDocumentContent] = useState("");
  const [comparisonContent, setComparisonContent] = useState("");
  const [isComparing, setIsComparing] = useState(false);
  
  const handleLoadPreset = (key: keyof typeof PRESETS) => {
    setDocumentContent(PRESETS[key].content);
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDocumentContent(DOMPurify.sanitize(e.target.value));
  };
  
  const handleComparisonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComparisonContent(DOMPurify.sanitize(e.target.value));
  };

  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="input">
        <TabsList className="flex flex-wrap h-auto gap-2 p-1.5 bg-card/40 border border-border/60 rounded-xl justify-center mb-6">
          <TabsTrigger value="input">1. Document Input</TabsTrigger>
          <TabsTrigger value="simplifier" disabled={!documentContent}>2. Decoder</TabsTrigger>
          <TabsTrigger value="analyzer" disabled={!documentContent}>3. Risk Analyzer</TabsTrigger>
          <TabsTrigger value="comparator" disabled={!documentContent || !isComparing}>4. Comparator</TabsTrigger>
          <TabsTrigger value="chat" disabled={!documentContent}>5. Q&A</TabsTrigger>
          <TabsTrigger value="prep" disabled={!documentContent}>6. Consult Prep</TabsTrigger>
        </TabsList>

        <TabsContent value="input">
          <Card className="border-border/60 bg-card/40 hover:border-primary/40 transition-colors shadow-none rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="font-display font-bold">Provide Legal Document</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="border-border bg-card/30 text-muted-foreground hover:border-primary/40 hover:text-foreground" onClick={() => handleLoadPreset('lease')}>Preset A: Lease</Button>
                <Button variant="outline" className="border-border bg-card/30 text-muted-foreground hover:border-primary/40 hover:text-foreground" onClick={() => handleLoadPreset('freelance')}>Preset B: Freelance</Button>
                <Button variant="outline" className="border-border bg-card/30 text-muted-foreground hover:border-primary/40 hover:text-foreground" onClick={() => handleLoadPreset('saas')}>Preset C: SaaS TOS</Button>
              </div>
              
              <div className="space-y-3">
                <label htmlFor="main-doc" className="text-xs font-mono uppercase tracking-[0.24em] text-primary">Main Document</label>
                <Textarea 
                  id="main-doc"
                  className="h-64 font-mono text-sm leading-relaxed bg-background/50 border-border/60 focus-visible:border-primary"
                  value={documentContent}
                  onChange={handleDocumentChange}
                  placeholder="Paste lease, terms of service, or contract here..."
                />
              </div>

              <div className="pt-2">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => setIsComparing(!isComparing)}>
                  {isComparing ? "Remove Comparison" : "+ Add Document to Compare (e.g. V2 or Amendment)"}
                </Button>
              </div>

              {isComparing && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label htmlFor="compare-doc" className="text-xs font-mono uppercase tracking-[0.24em] text-primary">Secondary Document</label>
                  <Textarea 
                    id="compare-doc"
                    className="h-64 font-mono text-sm leading-relaxed bg-background/50 border-primary/30 focus-visible:ring-primary"
                    value={comparisonContent}
                    onChange={handleComparisonChange}
                    placeholder="Paste the new version or amendment here..."
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simplifier">
          <SimplifierView content={documentContent} />
        </TabsContent>
        
        <TabsContent value="analyzer">
          <AnalyzerView content={documentContent} />
        </TabsContent>

        <TabsContent value="comparator">
          <ComparatorView original={documentContent} modified={comparisonContent} />
        </TabsContent>

        <TabsContent value="chat">
          <ChatView content={documentContent} />
        </TabsContent>

        <TabsContent value="prep">
          <PrepSheetView content={documentContent} />
        </TabsContent>

      </Tabs>
    </div>
  );
}
