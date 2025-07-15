import { Activity, Target, TrendingUp, MapPin } from "lucide-react";
import { HealthSidebar } from "@/components/HealthSidebar";
import { HealthMetricCard } from "@/components/HealthMetricCard";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { generateHealthMetrics } from "@/lib/healthData";
import { useState, useEffect } from "react";

export default function ActivityPage() {
  const [metrics, setMetrics] = useState(generateHealthMetrics());

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(generateHealthMetrics());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stepGoal = 10000;
  const stepProgress = (metrics.steps / stepGoal) * 100;
  const calorieGoal = 2000;
  const calorieProgress = (metrics.calories / calorieGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-background flex">
      <HealthSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Activity className="h-8 w-8 text-activity" />
              Activity Tracking
            </h1>
            <p className="text-muted-foreground">Daily movement and fitness goals</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <HealthMetricCard
              title="Steps Today"
              value={metrics.steps.toLocaleString()}
              unit="steps"
              icon={Activity}
              color="activity"
              trend={metrics.steps > 8000 ? "up" : "stable"}
              trendValue={`${Math.round(stepProgress)}% of goal`}
            >
              <div className="mt-3">
                <Progress value={stepProgress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0</span>
                  <span>{stepGoal.toLocaleString()}</span>
                </div>
              </div>
            </HealthMetricCard>

            <HealthMetricCard
              title="Calories Burned"
              value={metrics.calories.toLocaleString()}
              unit="kcal"
              icon={TrendingUp}
              color="activity"
              trend="up"
              trendValue={`${Math.round(calorieProgress)}% of goal`}
            >
              <div className="mt-3">
                <Progress value={calorieProgress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0</span>
                  <span>{calorieGoal.toLocaleString()}</span>
                </div>
              </div>
            </HealthMetricCard>

            <HealthMetricCard
              title="Distance"
              value={(metrics.steps * 0.0008).toFixed(1)}
              unit="km"
              icon={MapPin}
              color="activity"
              trend="up"
              trendValue="Today's journey"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Activity Goals</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Steps (Weekly)</span>
                    <span className="text-sm text-muted-foreground">45,200 / 70,000</span>
                  </div>
                  <Progress value={64.6} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Active Minutes</span>
                    <span className="text-sm text-muted-foreground">128 / 150</span>
                  </div>
                  <Progress value={85.3} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Workouts</span>
                    <span className="text-sm text-muted-foreground">4 / 5</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Activity Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-activity" />
                    <span className="text-sm font-medium">Walking</span>
                  </div>
                  <span className="text-sm text-muted-foreground">4.2 km</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium">Running</span>
                  </div>
                  <span className="text-sm text-muted-foreground">1.8 km</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-orange-500" />
                    <span className="text-sm font-medium">Cycling</span>
                  </div>
                  <span className="text-sm text-muted-foreground">0 km</span>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Achievement Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg">
                <div className="text-2xl mb-2">🏆</div>
                <div className="text-sm font-medium">Step Master</div>
                <div className="text-xs text-muted-foreground">10K steps/day</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                <div className="text-2xl mb-2">💪</div>
                <div className="text-sm font-medium">Streak Warrior</div>
                <div className="text-xs text-muted-foreground">7 day streak</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                <div className="text-2xl mb-2">🔥</div>
                <div className="text-sm font-medium">Calorie Crusher</div>
                <div className="text-xs text-muted-foreground">2000+ calories</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg opacity-50">
                <div className="text-2xl mb-2">⭐</div>
                <div className="text-sm font-medium">Distance Legend</div>
                <div className="text-xs text-muted-foreground">Marathon month</div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}