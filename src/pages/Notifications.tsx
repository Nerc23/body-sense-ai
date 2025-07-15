import { useState } from "react";
import { HealthSidebar } from "@/components/HealthSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmergencyDoctorFinder } from "@/components/EmergencyDoctorFinder";
import { 
  Bell, 
  AlertTriangle, 
  Heart, 
  Activity, 
  Smartphone, 
  Watch, 
  User, 
  Shield,
  Phone,
  Video,
  Search
} from "lucide-react";

const Notifications = () => {
  const [showEmergencyFinder, setShowEmergencyFinder] = useState(false);

  const generalNotifications = [
    {
      id: 1,
      type: "profile",
      title: "Profile Updated",
      message: "Your profile information has been successfully updated.",
      time: "2 hours ago",
      icon: User,
      read: false
    },
    {
      id: 2,
      type: "device",
      title: "Apple Watch Connected",
      message: "Your Apple Watch has been successfully connected and is syncing data.",
      time: "1 day ago",
      icon: Watch,
      read: true
    },
    {
      id: 3,
      type: "device",
      title: "iPhone Sync Complete",
      message: "Health data from your iPhone has been synchronized.",
      time: "2 days ago",
      icon: Smartphone,
      read: true
    },
    {
      id: 4,
      type: "security",
      title: "Security Update",
      message: "Your account security settings have been updated.",
      time: "3 days ago",
      icon: Shield,
      read: true
    }
  ];

  const alertNotifications = [
    {
      id: 1,
      type: "critical",
      title: "Critical Heart Rate Alert",
      message: "Heart rate detected at 145 BPM for extended period. Immediate attention recommended.",
      time: "30 minutes ago",
      severity: "critical",
      icon: Heart,
      actionRequired: true
    },
    {
      id: 2,
      type: "warning",
      title: "Low Activity Warning",
      message: "You've been sedentary for 3+ hours. Consider taking a break for movement.",
      time: "1 hour ago",
      severity: "warning",
      icon: Activity,
      actionRequired: false
    },
    {
      id: 3,
      type: "info",
      title: "Daily Goal Achieved",
      message: "Congratulations! You've reached your daily step goal of 10,000 steps.",
      time: "4 hours ago",
      severity: "info",
      icon: Activity,
      actionRequired: false
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "warning": return "secondary";
      case "info": return "default";
      default: return "default";
    }
  };

  const emergencyFeatures = [
    {
      title: "Smart Emergency Search",
      description: "AI-powered search for emergency care, availability, and telemedicine options",
      icon: Search
    },
    {
      title: "Comprehensive Doctor Cards",
      description: "Complete doctor profiles with credentials, hospital affiliation, distance, and ratings",
      icon: User
    },
    {
      title: "Multiple Contact Options",
      description: "Instant phone calls, video consultations, and emergency messaging",
      icon: Phone
    },
    {
      title: "Real-time Information",
      description: "Live availability status, travel time estimates, and emergency room wait times",
      icon: Activity
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-background flex">
      <HealthSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your health alerts and system notifications</p>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Health Alerts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="space-y-3">
                {generalNotifications.map((notification) => (
                  <Card key={notification.id} className={`${!notification.read ? 'border-primary' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-secondary rounded-lg">
                          <notification.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{notification.title}</h4>
                            <span className="text-sm text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4">
              {/* Emergency Care Integration Banner */}
              <Card className="border-destructive bg-destructive/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    Emergency Care Integration
                  </CardTitle>
                  <CardDescription>
                    Advanced emergency response system with AI-powered doctor matching and instant care access
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {emergencyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-2 bg-destructive/10 rounded-lg">
                          <feature.icon className="h-4 w-4 text-destructive" />
                        </div>
                        <div>
                          <h5 className="font-medium text-sm">{feature.title}</h5>
                          <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    onClick={() => setShowEmergencyFinder(true)}
                    className="w-full bg-destructive hover:bg-destructive/90"
                  >
                    Access Emergency Care Network
                  </Button>
                </CardContent>
              </Card>

              {/* Health Alerts */}
              <div className="space-y-3">
                {alertNotifications.map((alert) => (
                  <Card key={alert.id} className={`${alert.severity === 'critical' ? 'border-destructive' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${alert.severity === 'critical' ? 'bg-destructive/10' : 'bg-secondary'}`}>
                          <alert.icon className={`h-4 w-4 ${alert.severity === 'critical' ? 'text-destructive' : ''}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{alert.title}</h4>
                              <Badge variant={getSeverityColor(alert.severity) as any}>
                                {alert.severity}
                              </Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">{alert.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                          {alert.actionRequired && (
                            <Button 
                              size="sm" 
                              className="mt-2"
                              onClick={() => setShowEmergencyFinder(true)}
                            >
                              Find Emergency Care
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {showEmergencyFinder && (
        <EmergencyDoctorFinder />
      )}
    </div>
  );
};

export default Notifications;