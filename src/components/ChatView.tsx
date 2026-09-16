"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { askQuestion } from "@/server/actions";

export default function ChatView({ content }: { content: string }) {
  const [messages, setMessages] = useState<{ id: string, role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !content || isLoading) return;

    const userMessage = { id: Date.now().toString(), role: 'user' as const, content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await askQuestion(content, userMessage.content, messages);
      setMessages(prev => [...prev, { id: (Date.now()+1).toString(), role: 'assistant', content: response }]);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "An error occurred generating response.");
      setMessages(prev => [...prev, { id: (Date.now()+1).toString(), role: 'assistant', content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader>
        <CardTitle>Contextual Q&A Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 p-2 border rounded-md bg-slate-50" aria-live="polite" aria-busy={isLoading}>
          {messages.length === 0 && (
            <p className="text-center text-slate-500 mt-10">
              Ask any question about the provided document. <br/>
              <em>Example: &quot;What is the penalty if I break the lease early?&quot;</em>
            </p>
          )}
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 text-sm ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border text-slate-900 shadow-sm'}`}>
                <div className="font-semibold text-xs mb-1 opacity-70">
                  {m.role === 'user' ? 'You' : 'AI Assistant'}
                </div>
                <div className="whitespace-pre-wrap">{m.content}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 text-sm bg-white border text-slate-900 shadow-sm">
                Thinking...
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            aria-label="Ask a question"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the document..."
            className="min-h-[40px] h-[60px]"
            disabled={!content || isLoading}
          />
          <Button type="submit" disabled={isLoading || !input || !content} className="h-auto">
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
