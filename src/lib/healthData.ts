// Simulated health data for the demo
export interface HealthMetrics {
  heartRate: number;
  bloodOxygen: number;
  steps: number;
  calories: number;
  sleepHours: number;
  stressLevel: number;
  waterIntake: number;
}

export interface HealthTrend {
  time: string;
  heartRate: number;
  bloodOxygen: number;
  steps: number;
  stressLevel: number;
}

// Generate realistic health data
export function generateHealthMetrics(): HealthMetrics {
  const now = new Date();
  const hour = now.getHours();
  
  // Simulate realistic variations based on time of day
  const baseHeartRate = hour < 6 || hour > 22 ? 55 + Math.random() * 10 : 70 + Math.random() * 20;
  
  return {
    heartRate: Math.round(baseHeartRate),
    bloodOxygen: Math.round(96 + Math.random() * 4), // 96-100%
    steps: Math.round(1000 + Math.random() * 8000), // 1K-9K steps
    calories: Math.round(300 + Math.random() * 1200), // 300-1500 calories
    sleepHours: Math.round((6 + Math.random() * 3) * 10) / 10, // 6-9 hours
    stressLevel: Math.round(20 + Math.random() * 60), // 20-80 stress level
    waterIntake: Math.round(500 + Math.random() * 2000), // 0.5-2.5L
  };
}

export function generateTrendData(hours: number = 24): HealthTrend[] {
  const data: HealthTrend[] = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = time.getHours();
    
    // Simulate realistic daily patterns
    let heartRate = 70;
    let stressLevel = 30;
    
    if (hour >= 6 && hour <= 9) {
      heartRate += 15; // Morning activity
      stressLevel += 20;
    } else if (hour >= 12 && hour <= 14) {
      heartRate += 10; // Lunch time activity
      stressLevel += 15;
    } else if (hour >= 17 && hour <= 19) {
      heartRate += 20; // Evening workout
      stressLevel += 25;
    } else if (hour >= 22 || hour <= 5) {
      heartRate -= 15; // Sleep/rest
      stressLevel -= 10;
    }
    
    data.push({
      time: time.getHours().toString().padStart(2, '0') + ':00',
      heartRate: Math.max(50, Math.min(120, heartRate + (Math.random() - 0.5) * 20)),
      bloodOxygen: Math.max(95, Math.min(100, 98 + (Math.random() - 0.5) * 4)),
      steps: Math.max(0, Math.round((Math.random() * 500) + (hour >= 7 && hour <= 21 ? 200 : 0))),
      stressLevel: Math.max(10, Math.min(80, stressLevel + (Math.random() - 0.5) * 30)),
    });
  }
  
  return data;
}

export function generateAIInsights() {
  const insights = [
    {
      id: "1",
      type: "recommendation" as const,
      title: "Hydration Reminder",
      message: "Your water intake is below the recommended 2L daily goal. Consider drinking a glass of water now.",
      timestamp: "2 minutes ago",
      priority: "medium" as const,
    },
    {
      id: "2",
      type: "achievement" as const,
      title: "Sleep Goal Achieved!",
      message: "Great job! You've maintained 7+ hours of sleep for 5 consecutive nights.",
      timestamp: "1 hour ago",
      priority: "low" as const,
    },
    {
      id: "3",
      type: "alert" as const,
      title: "Elevated Heart Rate",
      message: "Your resting heart rate has been consistently above normal. Consider reducing caffeine intake.",
      timestamp: "3 hours ago",
      priority: "high" as const,
    },
    {
      id: "4",
      type: "recommendation" as const,
      title: "Activity Suggestion",
      message: "You've been sedentary for 2 hours. A 5-minute walk could help improve circulation.",
      timestamp: "30 minutes ago",
      priority: "medium" as const,
    },
  ];
  
  return insights;
}