import { Droplets, Wind, AlertCircle } from "lucide-react";
import { HealthSidebar } from "@/components/HealthSidebar";
import { HealthMetricCard } from "@/components/HealthMetricCard";
import { HealthChart } from "@/components/HealthChart";
import { Card } from "@/components/ui/card";
import { generateHealthMetrics, generateTrendData } from "@/lib/healthData";
import { useState, useEffect } from "react";

export default function BloodOxygen() {
  const [metrics, setMetrics] = useState(generateHealthMetrics());
  const [trendData, setTrendData] = useState(generateTrendData(24));

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(generateHealthMetrics());
      setTrendData(generateTrendData(24));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getOxygenStatus = (level: number) => {
    if (level >= 98) return { status: "Excellent", color: "text-green-600", description: "Optimal oxygen levels" };
    if (level >= 95) return { status: "Good", color: "text-blue-600", description: "Normal range" };
    if (level >= 90) return { status: "Low", color: "text-yellow-600", description: "Below normal" };
    return { status: "Critical", color: "text-red-600", description: "Requires attention" };
  };

  const oxygenStatus = getOxygenStatus(metrics.bloodOxygen);

  return (
    <div className="min-h-screen bg-gradient-background flex">
      <HealthSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Droplets className="h-8 w-8 text-oxygen" />
                Blood Oxygen Monitoring
              </h1>
              <p className="text-muted-foreground">SpO2 levels and respiratory health tracking</p>
            </div>
            {metrics.bloodOxygen < 95 && (
              <div className="flex items-center gap-2 px-3 py-2 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Low Oxygen Alert</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <HealthMetricCard
              title="Current SpO2"
              value={metrics.bloodOxygen.toString()}
              unit="%"
              icon={Droplets}
              color="oxygen"
              trend={metrics.bloodOxygen >= 98 ? "stable" : "down"}
              trendValue={oxygenStatus.status}
              alert={metrics.bloodOxygen < 95 ? "critical" : metrics.bloodOxygen < 97 ? "warning" : "normal"}
            />

            <HealthMetricCard
              title="24h Average"
              value="97.8"
              unit="%"
              icon={Droplets}
              color="oxygen"
              trend="stable"
              trendValue="Within normal range"
            />

            <HealthMetricCard
              title="Respiratory Rate"
              value="16"
              unit="breaths/min"
              icon={Wind}
              color="oxygen"
              trend="stable"
              trendValue="Normal breathing"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">24-Hour Oxygen Levels</h3>
              <HealthChart 
                data={trendData.map(d => ({ time: d.time, value: d.bloodOxygen }))}
                color="hsl(var(--oxygen))"
                height={300}
              />
            </Card>

            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Oxygen Level Guidelines</h3>
              <div className="space-y-4">
                <div className={`flex items-center justify-between p-3 rounded-lg ${oxygenStatus.color} bg-muted/20`}>
                  <div>
                    <span className="font-medium">Current Status: {oxygenStatus.status}</span>
                    <p className="text-sm text-muted-foreground">{oxygenStatus.description}</p>
                  </div>
                  <span className="text-2xl font-bold">{metrics.bloodOxygen}%</span>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Reference Ranges:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                        Excellent
                      </span>
                      <span className="text-muted-foreground">98-100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500" />
                        Good
                      </span>
                      <span className="text-muted-foreground">95-97%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        Low
                      </span>
                      <span className="text-muted-foreground">90-94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        Critical
                      </span>
                      <span className="text-muted-foreground">&lt; 90%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Health Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Improve Oxygen Levels</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Practice deep breathing exercises</li>
                  <li>• Stay physically active</li>
                  <li>• Maintain good posture</li>
                  <li>• Ensure adequate ventilation</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">When to Seek Help</h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• SpO2 below 90% consistently</li>
                  <li>• Difficulty breathing</li>
                  <li>• Chest pain or discomfort</li>
                  <li>• Persistent fatigue</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}