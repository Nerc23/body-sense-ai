import { ReactNode } from "react";
import { DivideIcon as LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface HealthMetricCardProps {
  title: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  color: "heart-rate" | "oxygen" | "activity" | "sleep" | "stress";
  alert?: "normal" | "warning" | "critical";
  children?: ReactNode;
}

export function HealthMetricCard({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  trendValue,
  color,
  alert = "normal",
  children
}: HealthMetricCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "heart-rate":
        return "text-heart-rate border-heart-rate/20 bg-gradient-to-br from-heart-rate/5 to-heart-rate/10";
      case "oxygen":
        return "text-oxygen border-oxygen/20 bg-gradient-to-br from-oxygen/5 to-oxygen/10";
      case "activity":
        return "text-activity border-activity/20 bg-gradient-to-br from-activity/5 to-activity/10";
      case "sleep":
        return "text-sleep border-sleep/20 bg-gradient-to-br from-sleep/5 to-sleep/10";
      case "stress":
        return "text-stress border-stress/20 bg-gradient-to-br from-stress/5 to-stress/10";
      default:
        return "text-primary border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10";
    }
  };

  const getAlertClasses = () => {
    switch (alert) {
      case "warning":
        return "ring-2 ring-warning/30 border-warning/40";
      case "critical":
        return "ring-2 ring-destructive/30 border-destructive/40 animate-pulse";
      default:
        return "";
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    switch (trend) {
      case "up":
        return "↗";
      case "down":
        return "↘";
      case "stable":
        return "→";
    }
  };

  return (
    <Card className={`p-6 shadow-card hover:shadow-elevated transition-all duration-300 ${getColorClasses()} ${getAlertClasses()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${getColorClasses()} shadow-sm`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            {trend && trendValue && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>{getTrendIcon()}</span>
                <span>{trendValue}</span>
              </div>
            )}
          </div>
        </div>
        {alert !== "normal" && (
          <div className={`h-3 w-3 rounded-full ${alert === "warning" ? "bg-warning" : "bg-destructive"} animate-pulse`} />
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        {children}
      </div>
    </Card>
  );
}