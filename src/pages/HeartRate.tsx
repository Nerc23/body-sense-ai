import { Heart, AlertTriangle, TrendingUp } from "lucide-react";
import { HealthSidebar } from "@/components/HealthSidebar";
import { HealthMetricCard } from "@/components/HealthMetricCard";
import { HealthChart } from "@/components/HealthChart";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generateHealthMetrics, generateTrendData } from "@/lib/healthData";
import { useState, useEffect } from "react";

export default function HeartRate() {
  const [metrics, setMetrics] = useState(generateHealthMetrics());
  const [trendData, setTrendData] = useState(generateTrendData(24));

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(generateHealthMetrics());
      setTrendData(generateTrendData(24));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getHeartRateZone = (bpm: number) => {
    if (bpm < 60) return { zone: "Resting", color: "bg-blue-500", description: "Very relaxed state" };
    if (bpm < 100) return { zone: "Normal", color: "bg-green-500", description: "Healthy range" };
    if (bpm < 120) return { zone: "Elevated", color: "bg-yellow-500", description: "Light activity" };
    if (bpm < 150) return { zone: "High", color: "bg-orange-500", description: "Moderate exercise" };
    return { zone: "Maximum", color: "bg-red-500", description: "Intense exercise" };
  };

  const currentZone = getHeartRateZone(metrics.heartRate);

  return (
    <div className="min-h-screen bg-gradient-background flex">
      <HealthSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Heart className="h-8 w-8 text-heart-rate" />
                Heart Rate Monitoring
              </h1>
              <p className="text-muted-foreground">Real-time cardiovascular tracking and analysis</p>
            </div>
            {metrics.heartRate > 100 && (
              <div className="flex items-center gap-2 px-3 py-2 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">High Heart Rate Alert</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Heart Rate */}
            <HealthMetricCard
              title="Current Heart Rate"
              value={metrics.heartRate.toString()}
              unit="BPM"
              icon={Heart}
              color="heart-rate"
              trend={metrics.heartRate > 80 ? "up" : metrics.heartRate < 65 ? "down" : "stable"}
              trendValue={`${currentZone.zone} Zone`}
              alert={metrics.heartRate > 100 ? "critical" : metrics.heartRate > 85 ? "warning" : "normal"}
            />

            {/* Resting Heart Rate */}
            <HealthMetricCard
              title="Resting HR (7-day avg)"
              value="68"
              unit="BPM"
              icon={Heart}
              color="heart-rate"
              trend="stable"
              trendValue="Within normal range"
            />

            {/* Heart Rate Variability */}
            <HealthMetricCard
              title="HR Variability"
              value="42"
              unit="ms"
              icon={TrendingUp}
              color="heart-rate"
              trend="up"
              trendValue="Good recovery"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 24-Hour Trend */}
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">24-Hour Heart Rate Pattern</h3>
              <HealthChart 
                data={trendData.map(d => ({ time: d.time, value: d.heartRate }))}
                color="hsl(var(--heart-rate))"
                height={300}
              />
            </Card>

            {/* Heart Rate Zones */}
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Heart Rate Zones</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div className="flex items-center gap-3">
                    <div className={`h-4 w-4 rounded-full ${currentZone.color}`} />
                    <div>
                      <span className="font-medium">Current: {currentZone.zone}</span>
                      <p className="text-sm text-muted-foreground">{currentZone.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{metrics.heartRate} BPM</Badge>
                </div>

                <div className="space-y-2">
                  {[
                    { zone: "Resting", range: "< 60", color: "bg-blue-500" },
                    { zone: "Normal", range: "60-100", color: "bg-green-500" },
                    { zone: "Elevated", range: "100-120", color: "bg-yellow-500" },
                    { zone: "High", range: "120-150", color: "bg-orange-500" },
                    { zone: "Maximum", range: "> 150", color: "bg-red-500" },
                  ].map((zone) => (
                    <div key={zone.zone} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${zone.color}`} />
                        <span>{zone.zone}</span>
                      </div>
                      <span className="text-muted-foreground">{zone.range} BPM</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Weekly Summary */}
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-foreground">72</div>
                <div className="text-sm text-muted-foreground">Avg Resting HR</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-foreground">148</div>
                <div className="text-sm text-muted-foreground">Max HR This Week</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-foreground">38</div>
                <div className="text-sm text-muted-foreground">Avg HRV</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-foreground">5.2</div>
                <div className="text-sm text-muted-foreground">Hours in Target Zone</div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}