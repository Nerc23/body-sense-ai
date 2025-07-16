import { useState, useEffect } from "react";
import { Heart, Droplets, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { generateHealthMetrics } from "@/lib/healthData";

export function SmartWatchView() {
  const [metrics, setMetrics] = useState(generateHealthMetrics());
  const [currentView, setCurrentView] = useState(0);

  const views = [
    {
      title: "Heart Rate",
      value: metrics.heartRate,
      unit: "BPM",
      icon: Heart,
      color: "text-heart-rate"
    },
    {
      title: "Blood O2",
      value: metrics.bloodOxygen,
      unit: "%",
      icon: Droplets,
      color: "text-oxygen"
    },
    {
      title: "Steps",
      value: metrics.steps.toLocaleString(),
      unit: "steps",
      icon: Activity,
      color: "text-activity"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(generateHealthMetrics());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView((prev) => (prev + 1) % views.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [views.length]);

  const currentMetric = views[currentView];
  const Icon = currentMetric.icon;

  return (
    <div className="h-screen w-full max-w-xs mx-auto bg-black text-white flex items-center justify-center p-2">
      <Card className="w-full h-full bg-gray-900 border-gray-700 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className={`p-3 rounded-full bg-gray-800 ${currentMetric.color}`}>
            <Icon className="h-8 w-8" />
          </div>
          
          <div>
            <h2 className="text-xs text-gray-400 uppercase tracking-wide">
              {currentMetric.title}
            </h2>
            <div className="text-3xl font-bold text-white mt-1">
              {currentMetric.value}
            </div>
            <div className="text-sm text-gray-400">
              {currentMetric.unit}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-1">
            {views.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 w-1.5 rounded-full ${
                  index === currentView ? 'bg-white' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Time */}
          <div className="text-xs text-gray-500">
            {new Date().toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}