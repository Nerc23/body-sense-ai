import { HealthSidebar } from "@/components/HealthSidebar";
import { Dashboard } from "@/components/Dashboard";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!user) {
    return (
      <div className={`min-h-screen bg-gradient-background flex items-center justify-center ${isMobile ? "p-4" : "p-6"}`}>
        <div className="text-center space-y-6">
          <h1 className={`${isMobile ? "text-2xl" : "text-4xl"} font-bold text-foreground`}>
            Welcome to HealthTracker
          </h1>
          <p className={`${isMobile ? "text-base" : "text-xl"} text-muted-foreground`}>
            Track your health metrics and get personalized insights
          </p>
          <Link to="/auth">
            <Button size={isMobile ? "default" : "lg"} className="mt-8">
              <LogIn className={`mr-2 ${isMobile ? "h-4 w-4" : "h-5 w-5"}`} />
              Sign In to Get Started
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-background ${isMobile ? "flex-col" : "flex"}`}>
      <HealthSidebar />
      <main className={`flex-1 ${isMobile ? "p-4" : "p-6"} overflow-auto ${isMobile ? "ml-0" : ""}`}>
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
