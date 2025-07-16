import { HealthSidebar } from "@/components/HealthSidebar";
import { Dashboard } from "@/components/Dashboard";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center p-6">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-foreground">Welcome to HealthTracker</h1>
          <p className="text-xl text-muted-foreground">
            Track your health metrics and get personalized insights
          </p>
          <Link to="/auth">
            <Button size="lg" className="mt-8">
              <LogIn className="mr-2 h-5 w-5" />
              Sign In to Get Started
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
