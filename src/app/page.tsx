import DashboardView from "@/components/DashboardView";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col items-start gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Aequitas AI</h1>
          <p className="text-slate-600">AI for Legal Assistance & Access. Paste a document or select a preset to begin.</p>
        </header>
        <DashboardView />
      </div>
    </main>
  );
}
