import { Sidebar } from "@/components/Sidebar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 text-foreground">
        {/* Dashboard content goes here */}
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </main>
    </div>
  );
}