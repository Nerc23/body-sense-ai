import { Brain, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AIInsight {
  id: string;
  type: "recommendation" | "alert" | "achievement" | "info";
  title: string;
  message: string;
  timestamp: string;
  priority: "low" | "medium" | "high";
}

interface AIInsightsCardProps {
  insights: AIInsight[];
}

export function AIInsightsCard({ insights }: AIInsightsCardProps) {
  const getInsightIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "alert":
        return AlertTriangle;
      case "achievement":
        return CheckCircle;
      case "recommendation":
        return Brain;
      default:
        return Info;
    }
  };

  const getInsightColor = (type: AIInsight["type"], priority: AIInsight["priority"]) => {
    if (type === "alert") {
      return priority === "high" ? "text-destructive" : "text-warning";
    }
    if (type === "achievement") return "text-activity";
    if (type === "recommendation") return "text-primary";
    return "text-muted-foreground";
  };

  const getPriorityColor = (priority: AIInsight["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground">
          <Brain className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">AI Health Insights</h3>
          <p className="text-sm text-muted-foreground">Personalized recommendations</p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          const iconColor = getInsightColor(insight.type, insight.priority);
          
          return (
            <div key={insight.id} className="flex gap-3 p-3 rounded-lg bg-muted/20 border border-border/50">
              <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${iconColor}`} />
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-foreground text-sm">{insight.title}</h4>
                  <Badge variant="outline" className={`text-xs ${getPriorityColor(insight.priority)}`}>
                    {insight.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{insight.message}</p>
                <span className="text-xs text-muted-foreground">{insight.timestamp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}