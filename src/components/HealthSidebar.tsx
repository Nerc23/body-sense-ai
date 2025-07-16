import { useState } from "react";
import { 
  Activity, 
  Heart, 
  Droplets, 
  Moon, 
  User, 
  Bell, 
  LogOut,
  Stethoscope,
  Brain,
  Home,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const healthCategories = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Heart Rate", url: "/heart-rate", icon: Heart },
  { title: "Blood Oxygen", url: "/blood-oxygen", icon: Droplets },
  { title: "Activity", url: "/activity", icon: Activity },
  { title: "Sleep Patterns", url: "/sleep", icon: Moon },
  { title: "Stress Levels", url: "/stress", icon: Brain },
];

const userActions = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Notifications", url: "/notifications", icon: Bell },
];

export function HealthSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { signOut } = useAuth();

  const isActive = (path: string) => currentPath === path;

  const getNavClasses = (path: string) =>
    isActive(path)
      ? "bg-gradient-primary text-primary-foreground shadow-glow font-medium" 
      : "hover:bg-secondary/50 text-foreground hover:text-primary transition-all duration-200";

  return (
    <div className={`${collapsed ? "w-16" : "w-64"} h-screen bg-gradient-background border-r border-border/50 transition-all duration-300 flex flex-col`}>
      {/* Header with toggle */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-foreground">BodySense AI</h1>
                <p className="text-xs text-muted-foreground">Health Monitor</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-6">
        {/* Health Metrics */}
        <div>
          {!collapsed && (
            <h3 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-3">
              Health Metrics
            </h3>
          )}
          <nav className="space-y-2">
            {healthCategories.map((item) => (
              <NavLink 
                key={item.title}
                to={item.url} 
                end 
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${getNavClasses(item.url)}`}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span className="text-sm">{item.title}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Actions */}
        <div>
          {!collapsed && (
            <h3 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-3">
              Account
            </h3>
          )}
          <nav className="space-y-2">
            {userActions.map((item) => (
              <NavLink 
                key={item.title}
                to={item.url} 
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${getNavClasses(item.url)}`}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span className="text-sm">{item.title}</span>}
              </NavLink>
            ))}
            
            {/* Logout */}
            <button 
              onClick={signOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span className="text-sm">Logout</span>}
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}