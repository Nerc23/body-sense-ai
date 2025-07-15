import { HealthSidebar } from "@/components/HealthSidebar";
import { HealthChart } from "@/components/HealthChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Brain, TrendingDown, TrendingUp, Heart, Activity, Wind, Target } from "lucide-react";

const StressLevels = () => {
  const stressData = [
    { date: "Mon", stress: 45, hrv: 38, recovery: 82 },
    { date: "Tue", stress: 72, hrv: 28, recovery: 65 },
    { date: "Wed", stress: 38, hrv: 42, recovery: 88 },
    { date: "Thu", stress: 58, hrv: 32, recovery: 75 },
    { date: "Fri", stress: 85, hrv: 25, recovery: 58 },
    { date: "Sat", stress: 25, hrv: 45, recovery: 92 },
    { date: "Sun", stress: 32, hrv: 41, recovery: 85 }
  ];

  const currentStress = {
    level: 42,
    status: "Low",
    hrv: 38.5,
    recoveryScore: 85,
    recommendedAction: "Maintain current balance"
  };

  const weeklyStats = {
    avgStress: 51,
    highStressDays: 2,
    recoveryTrend: "+12%",
    hrvTrend: "+8%"
  };

  const stressFactors = [
    { factor: "Work Meetings", impact: 85, time: "2:00 PM - 4:00 PM" },
    { factor: "Exercise", impact: -25, time: "6:00 AM - 7:00 AM" },
    { factor: "Traffic Commute", impact: 65, time: "8:00 AM - 9:00 AM" },
    { factor: "Meditation", impact: -40, time: "9:00 PM - 9:15 PM" }
  ];

  const relaxationTechniques = [
    { name: "4-7-8 Breathing", duration: "5 min", effectiveness: 85 },
    { name: "Progressive Muscle Relaxation", duration: "10 min", effectiveness: 78 },
    { name: "Guided Meditation", duration: "15 min", effectiveness: 92 },
    { name: "Mindful Walking", duration: "20 min", effectiveness: 70 }
  ];

  const getStressColor = (level: number) => {
    if (level <= 30) return "text-green-600";
    if (level <= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getStressLabel = (level: number) => {
    if (level <= 30) return "Low";
    if (level <= 60) return "Moderate";
    return "High";
  };

  const getStressVariant = (level: number) => {
    if (level <= 30) return "default";
    if (level <= 60) return "secondary";
    return "destructive";
  };

  return (
    <div className="min-h-screen bg-gradient-background flex">
      <HealthSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Stress Levels</h1>
              <p className="text-muted-foreground">Monitor and manage your stress through heart rate variability</p>
            </div>
          </div>

          {/* Current Stress Overview */}
          <div className="grid lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Brain className="h-5 w-5" />
                  Current Stress
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{currentStress.level}</div>
                <Badge variant={getStressVariant(currentStress.level) as any}>
                  {getStressLabel(currentStress.level)}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">{currentStress.recommendedAction}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5" />
                  HRV Score
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{currentStress.hrv}</div>
                <p className="text-sm text-muted-foreground">milliseconds</p>
                <div className="mt-3">
                  <Progress value={currentStress.hrv} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recovery Score
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{currentStress.recoveryScore}%</div>
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">{weeklyStats.recoveryTrend}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle>Weekly Average</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{weeklyStats.avgStress}</div>
                <p className="text-sm text-muted-foreground mb-2">Average Stress Level</p>
                <Badge variant="secondary">{weeklyStats.highStressDays} high stress days</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Stress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>7-Day Stress Analysis</CardTitle>
              <CardDescription>Your stress levels and heart rate variability over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <HealthChart 
                data={stressData.map(d => ({ time: d.date, value: d.stress }))} 
                color="#ef4444"
                height={300}
              />
            </CardContent>
          </Card>

          {/* Stress Factors */}
          <Card>
            <CardHeader>
              <CardTitle>Stress Factors Analysis</CardTitle>
              <CardDescription>Key factors impacting your stress levels today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stressFactors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{factor.factor}</h4>
                      <p className="text-sm text-muted-foreground">{factor.time}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-1 ${factor.impact > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {factor.impact > 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-medium">{Math.abs(factor.impact)}</span>
                      </div>
                      <Badge variant={factor.impact > 0 ? "destructive" : "default"}>
                        {factor.impact > 0 ? "Stressor" : "Reliever"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Relaxation Techniques */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="h-5 w-5" />
                Recommended Relaxation Techniques
              </CardTitle>
              <CardDescription>AI-selected techniques based on your current stress level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {relaxationTechniques.map((technique, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{technique.name}</h4>
                      <Badge variant="outline">{technique.duration}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Effectiveness</p>
                        <div className="flex items-center gap-2">
                          <Progress value={technique.effectiveness} className="h-2 w-20" />
                          <span className="text-sm font-medium">{technique.effectiveness}%</span>
                        </div>
                      </div>
                      <Button size="sm" className="gap-2">
                        <Target className="h-4 w-4" />
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stress Management Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Personalized Stress Management</CardTitle>
              <CardDescription>AI-powered recommendations based on your patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Immediate Actions</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Take 5 deep breaths using the 4-7-8 technique</li>
                    <li>• Step away from screens for 10 minutes</li>
                    <li>• Drink a glass of water mindfully</li>
                    <li>• Do gentle neck and shoulder stretches</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Long-term Strategies</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Schedule 15-minute meditation breaks daily</li>
                    <li>• Plan buffer time between meetings</li>
                    <li>• Establish a consistent sleep schedule</li>
                    <li>• Regular exercise 3-4 times per week</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StressLevels;