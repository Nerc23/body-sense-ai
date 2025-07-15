import { HealthSidebar } from "@/components/HealthSidebar";
import { HealthChart } from "@/components/HealthChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Moon, Clock, TrendingUp, Award, AlertTriangle } from "lucide-react";

const SleepPatterns = () => {
  const sleepData = [
    { date: "Mon", hours: 7.5, quality: 85, deepSleep: 2.1 },
    { date: "Tue", hours: 6.2, quality: 72, deepSleep: 1.8 },
    { date: "Wed", hours: 8.1, quality: 92, deepSleep: 2.4 },
    { date: "Thu", hours: 7.0, quality: 80, deepSleep: 2.0 },
    { date: "Fri", hours: 5.8, quality: 65, deepSleep: 1.5 },
    { date: "Sat", hours: 9.2, quality: 95, deepSleep: 2.8 },
    { date: "Sun", hours: 8.5, quality: 88, deepSleep: 2.5 }
  ];

  const currentNight = {
    totalSleep: "7h 35m",
    sleepQuality: 85,
    deepSleep: "2h 15m",
    remSleep: "1h 45m",
    lightSleep: "3h 35m",
    bedTime: "10:45 PM",
    wakeTime: "6:20 AM",
    restfulness: 82
  };

  const weeklyAverage = {
    avgSleep: "7h 24m",
    avgQuality: 82,
    goalProgress: 74
  };

  const insights = [
    {
      type: "positive",
      title: "Consistent Sleep Schedule",
      description: "You've maintained a regular bedtime for 5 out of 7 days this week.",
      icon: Award
    },
    {
      type: "warning",
      title: "Weekend Sleep Debt",
      description: "Consider maintaining weekday sleep schedule on weekends for better rhythm.",
      icon: AlertTriangle
    },
    {
      type: "improvement",
      title: "Deep Sleep Improving",
      description: "Your deep sleep duration has increased by 15% compared to last week.",
      icon: TrendingUp
    }
  ];

  const getQualityColor = (quality: number) => {
    if (quality >= 85) return "text-green-600";
    if (quality >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getQualityLabel = (quality: number) => {
    if (quality >= 85) return "Excellent";
    if (quality >= 70) return "Good";
    if (quality >= 50) return "Fair";
    return "Poor";
  };

  return (
    <div className="min-h-screen bg-gradient-background flex">
      <HealthSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
              <Moon className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Sleep Patterns</h1>
              <p className="text-muted-foreground">Track and analyze your sleep quality and duration</p>
            </div>
          </div>

          {/* Current Night Overview */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5" />
                  Last Night
                </CardTitle>
                <CardDescription>Sleep summary from {currentNight.bedTime} to {currentNight.wakeTime}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{currentNight.totalSleep}</div>
                <div className="flex items-center justify-center gap-2">
                  <span className={`text-lg font-medium ${getQualityColor(currentNight.sleepQuality)}`}>
                    {getQualityLabel(currentNight.sleepQuality)}
                  </span>
                  <Badge variant="secondary">{currentNight.sleepQuality}%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sleep Stages</CardTitle>
                <CardDescription>Breakdown of your sleep phases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Deep Sleep</span>
                    <span className="text-sm font-medium">{currentNight.deepSleep}</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">REM Sleep</span>
                    <span className="text-sm font-medium">{currentNight.remSleep}</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Light Sleep</span>
                    <span className="text-sm font-medium">{currentNight.lightSleep}</span>
                  </div>
                  <Progress value={47} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Average</CardTitle>
                <CardDescription>Your sleep patterns this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{weeklyAverage.avgSleep}</div>
                  <p className="text-sm text-muted-foreground">Average Sleep Duration</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Sleep Goal Progress</span>
                    <span className="text-sm font-medium">{weeklyAverage.goalProgress}%</span>
                  </div>
                  <Progress value={weeklyAverage.goalProgress} className="h-2" />
                </div>
                <div className="text-center">
                  <span className={`text-lg font-medium ${getQualityColor(weeklyAverage.avgQuality)}`}>
                    {getQualityLabel(weeklyAverage.avgQuality)}
                  </span>
                  <p className="text-sm text-muted-foreground">Average Quality</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sleep Chart */}
          <Card>
            <CardHeader>
              <CardTitle>7-Day Sleep Analysis</CardTitle>
              <CardDescription>Your sleep duration and quality over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <HealthChart 
                data={sleepData.map(d => ({ time: d.date, value: d.hours }))} 
                color="#3b82f6"
                height={300}
              />
            </CardContent>
          </Card>

          {/* Sleep Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Sleep Insights</CardTitle>
              <CardDescription>AI-powered analysis of your sleep patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                    <div className={`p-2 rounded-lg ${
                      insight.type === 'positive' ? 'bg-green-100 text-green-600' :
                      insight.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <insight.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sleep Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>Improve your sleep quality with these AI-generated tips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Tonight's Recommendations</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Aim for bed by 10:30 PM for optimal 8-hour sleep</li>
                    <li>• Avoid screens 1 hour before bedtime</li>
                    <li>• Keep bedroom temperature around 65-68°F</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Long-term Goals</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Maintain consistent sleep schedule on weekends</li>
                    <li>• Increase deep sleep duration by 15 minutes</li>
                    <li>• Establish a 30-minute wind-down routine</li>
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

export default SleepPatterns;