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
        <TabsList className="flex flex-wrap h-auto gap-2 p-2">
          <TabsTrigger value="input">1. Input Document</TabsTrigger>
          <TabsTrigger value="simplifier" disabled={!documentContent}>2. Plain-English Decoder</TabsTrigger>
          <TabsTrigger value="analyzer" disabled={!documentContent}>3. Risk Analyzer</TabsTrigger>
          <TabsTrigger value="comparator" disabled={!documentContent || !isComparing}>4. Comparator</TabsTrigger>
          <TabsTrigger value="chat" disabled={!documentContent}>5. Q&A Assistant</TabsTrigger>
          <TabsTrigger value="prep" disabled={!documentContent}>6. Consultation Prep</TabsTrigger>
        </TabsList>

        <TabsContent value="input">
          <Card>
            <CardHeader>
              <CardTitle>Provide Legal Document</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button variant="outline" onClick={() => handleLoadPreset('lease')}>Preset A: Lease</Button>
                <Button variant="outline" onClick={() => handleLoadPreset('freelance')}>Preset B: Freelance</Button>
                <Button variant="outline" onClick={() => handleLoadPreset('saas')}>Preset C: SaaS TOS</Button>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="main-doc" className="text-sm font-medium">Main Document (Paste your text here)</label>
                <Textarea 
                  id="main-doc"
                  className="h-64"
                  value={documentContent}
                  onChange={handleDocumentChange}
                  placeholder="Paste lease, terms of service, or contract here..."
                />
              </div>

              <div className="pt-4">
                <Button variant="ghost" onClick={() => setIsComparing(!isComparing)}>
                  {isComparing ? "Remove Comparison" : "+ Add Document to Compare (e.g. V2 or Amendment)"}
                </Button>
              </div>

              {isComparing && (
                <div className="space-y-2">
                  <label htmlFor="compare-doc" className="text-sm font-medium">Secondary Document (For comparison)</label>
                  <Textarea 
                    id="compare-doc"
                    className="h-64 border-blue-200 focus-visible:ring-blue-500"
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
