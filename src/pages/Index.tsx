import { HealthSidebar } from "@/components/HealthSidebar";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background flex">
      <HealthSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
