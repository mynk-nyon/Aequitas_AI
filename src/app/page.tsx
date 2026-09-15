import DashboardView from "@/components/DashboardView";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-8">
        <header className="flex flex-col items-center text-center gap-3 pt-8 pb-4">
          <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tight">Aequitas <span className="text-primary">AI</span></h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            AI for Legal Assistance & Access. Paste a document or select a preset to decode complex obligations.
          </p>
        </header>
        <DashboardView />
      </div>
      <footer className="w-full max-w-5xl mt-16 py-8 border-t border-border text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Aequitas AI. Built for the AI for Legal Assistance & Access challenge.</p>
      </footer>
    </main>
  );
}
