import { useState, useEffect } from "react";
import { Heart, Droplets, Activity, Moon, Brain, Zap } from "lucide-react";
import { HealthMetricCard } from "./HealthMetricCard";
import { HealthChart } from "./HealthChart";
import { AIInsightsCard } from "./AIInsightsCard";
import { EmergencyDoctorFinder } from "./EmergencyDoctorFinder";
import { Posts } from "./Posts";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateHealthMetrics, generateTrendData, generateAIInsights } from "@/lib/healthData";
import { useToast } from "@/hooks/use-toast";

export function Dashboard() {
  const [metrics, setMetrics] = useState(generateHealthMetrics());
  const [trendData, setTrendData] = useState(generateTrendData(24));
  const [timeframe, setTimeframe] = useState("daily");
  const [showEmergencyFinder, setShowEmergencyFinder] = useState(false);
  const insights = generateAIInsights();
  const { toast } = useToast();

  const getTimeframeData = () => {
    // Generate different data based on timeframe
    switch (timeframe) {
      case "weekly":
        return generateTrendData(7).map((d, i) => ({ time: `Day ${i + 1}`, value: d.heartRate }));
      case "monthly":
        return generateTrendData(30).map((d, i) => ({ time: `Day ${i + 1}`, value: d.heartRate }));
      default:
        return trendData.map(d => ({ time: d.time, value: d.heartRate }));
    }
  };

  // Simulate real-time updates and notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newMetrics = generateHealthMetrics();
      setMetrics(newMetrics);
      setTrendData(generateTrendData(24));
      
      // Trigger notifications for critical health conditions
      if (newMetrics.heartRate > 100) {
        toast({
          title: "⚠️ High Heart Rate Alert",
          description: `Your heart rate is ${newMetrics.heartRate} BPM. Consider taking a break.`,
          variant: "destructive",
        });
        setShowEmergencyFinder(true);
      } else if (newMetrics.bloodOxygen < 95) {
        toast({
          title: "🫁 Low Oxygen Alert",
          description: `Blood oxygen at ${newMetrics.bloodOxygen}%. Check your breathing.`,
          variant: "destructive",
        });
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [toast]);

  const getHealthStatus = (heartRate: number, bloodOxygen: number, stressLevel: number) => {
    if (heartRate > 100 || bloodOxygen < 95 || stressLevel > 70) return "critical";
    if (heartRate > 85 || bloodOxygen < 97 || stressLevel > 50) return "warning";
    return "normal";
  };

  const overallStatus = getHealthStatus(metrics.heartRate, metrics.bloodOxygen, metrics.stressLevel);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Health Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring and AI insights</p>
        </div>
        <div className="flex items-center gap-4">
          <Tabs value={timeframe} onValueChange={setTimeframe}>
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${
              overallStatus === "critical" ? "bg-destructive animate-pulse" :
              overallStatus === "warning" ? "bg-warning" : "bg-activity"
            }`} />
            <span className="text-sm font-medium">
              {overallStatus === "critical" ? "Critical Alert" :
               overallStatus === "warning" ? "Attention Needed" : "All Systems Normal"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HealthMetricCard
          title="Heart Rate"
          value={metrics.heartRate.toString()}
          unit="BPM"
          icon={Heart}
          color="heart-rate"
          trend={metrics.heartRate > 80 ? "up" : metrics.heartRate < 65 ? "down" : "stable"}
          trendValue={metrics.heartRate > 80 ? "+5 vs avg" : metrics.heartRate < 65 ? "-3 vs avg" : "Normal range"}
          alert={metrics.heartRate > 100 ? "critical" : metrics.heartRate > 85 ? "warning" : "normal"}
        >
          <div className="mt-3">
            <HealthChart 
              data={trendData.map(d => ({ time: d.time, value: d.heartRate }))}
              color="hsl(var(--heart-rate))"
              height={80}
            />
          </div>
        </HealthMetricCard>

        <HealthMetricCard
          title="Blood Oxygen"
          value={metrics.bloodOxygen.toString()}
          unit="%"
          icon={Droplets}
          color="oxygen"
          trend={metrics.bloodOxygen >= 98 ? "stable" : "down"}
          trendValue={metrics.bloodOxygen >= 98 ? "Optimal" : "Below optimal"}
          alert={metrics.bloodOxygen < 95 ? "critical" : metrics.bloodOxygen < 97 ? "warning" : "normal"}
        >
          <div className="mt-3">
            <HealthChart 
              data={trendData.map(d => ({ time: d.time, value: d.bloodOxygen }))}
              color="hsl(var(--oxygen))"
              height={80}
            />
          </div>
        </HealthMetricCard>

        <HealthMetricCard
          title="Daily Steps"
          value={metrics.steps.toLocaleString()}
          unit="steps"
          icon={Activity}
          color="activity"
          trend={metrics.steps > 8000 ? "up" : "stable"}
          trendValue={`${Math.round((metrics.steps / 10000) * 100)}% of goal`}
        >
          <div className="mt-3 bg-muted/20 rounded-full h-2">
            <div 
              className="bg-activity h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (metrics.steps / 10000) * 100)}%` }}
            />
          </div>
        </HealthMetricCard>

        <HealthMetricCard
          title="Sleep Quality"
          value={metrics.sleepHours.toString()}
          unit="hours"
          icon={Moon}
          color="sleep"
          trend={metrics.sleepHours >= 7 ? "stable" : "down"}
          trendValue={metrics.sleepHours >= 7 ? "Good sleep" : "Insufficient"}
        />

        <HealthMetricCard
          title="Stress Level"
          value={metrics.stressLevel.toString()}
          unit="/100"
          icon={Brain}
          color="stress"
          trend={metrics.stressLevel > 60 ? "up" : metrics.stressLevel < 30 ? "down" : "stable"}
          trendValue={metrics.stressLevel > 60 ? "Elevated" : metrics.stressLevel < 30 ? "Low" : "Moderate"}
          alert={metrics.stressLevel > 70 ? "warning" : "normal"}
        >
          <div className="mt-3">
            <HealthChart 
              data={trendData.map(d => ({ time: d.time, value: d.stressLevel }))}
              color="hsl(var(--stress))"
              height={80}
            />
          </div>
        </HealthMetricCard>

        <HealthMetricCard
          title="Calories Burned"
          value={metrics.calories.toLocaleString()}
          unit="kcal"
          icon={Zap}
          color="activity"
          trend="up"
          trendValue="Today's progress"
        >
          <div className="mt-3 bg-muted/20 rounded-full h-2">
            <div 
              className="bg-activity h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (metrics.calories / 2000) * 100)}%` }}
            />
          </div>
        </HealthMetricCard>
      </div>

      {/* Charts and Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heart Rate Trend */}
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">{`Heart Rate Trend (${timeframe})`}</h3>
          <HealthChart 
            data={getTimeframeData()}
            color="hsl(var(--heart-rate))"
            height={250}
          />
        </Card>

        {/* AI Insights */}
        <AIInsightsCard insights={insights} />
      </div>

      {/* Emergency Care Finder - Shows when health alerts are triggered */}
      {showEmergencyFinder && (
        <EmergencyDoctorFinder />
      )}

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Stress Level Pattern</h3>
          <HealthChart 
            data={trendData.map(d => ({ time: d.time, value: d.stressLevel }))}
            color="hsl(var(--stress))"
            height={250}
          />
        </Card>

        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Blood Oxygen Levels</h3>
          <HealthChart 
            data={trendData.map(d => ({ time: d.time, value: d.bloodOxygen }))}
            color="hsl(var(--oxygen))"
            height={250}
          />
        </Card>
      </div>

      {/* Community Posts */}
      <Posts />
    </div>
  );
}