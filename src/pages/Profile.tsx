import { useState } from "react";
import { HealthSidebar } from "@/components/HealthSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { User, Phone, Mail, MapPin, Calendar, Edit2, Save, X } from "lucide-react";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    dateOfBirth: "1990-05-15",
    emergencyContact: "John Johnson - +1 (555) 987-6543"
  });

  const [editProfile, setEditProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  const connectedDevices = [
    { name: "Apple Watch Series 9", type: "Smartwatch", status: "Connected", lastSync: "2 min ago" },
    { name: "iPhone 15 Pro", type: "Smartphone", status: "Connected", lastSync: "1 min ago" },
    { name: "AirPods Pro", type: "Audio Health", status: "Connected", lastSync: "5 min ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-background flex">
      <HealthSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Profile</h1>
              <p className="text-muted-foreground">Manage your account information and preferences</p>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="gap-2">
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel} className="gap-2">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{profile.name}</h3>
                  <p className="text-muted-foreground">BodySense AI Member</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editProfile.name}
                      onChange={(e) => setEditProfile({...editProfile, name: e.target.value})}
                    />
                  ) : (
                    <p className="text-foreground mt-1">{profile.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editProfile.email}
                      onChange={(e) => setEditProfile({...editProfile, email: e.target.value})}
                    />
                  ) : (
                    <p className="text-foreground mt-1">{profile.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editProfile.phone}
                      onChange={(e) => setEditProfile({...editProfile, phone: e.target.value})}
                    />
                  ) : (
                    <p className="text-foreground mt-1">{profile.phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={editProfile.location}
                      onChange={(e) => setEditProfile({...editProfile, location: e.target.value})}
                    />
                  ) : (
                    <p className="text-foreground mt-1">{profile.location}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="dob" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date of Birth
                  </Label>
                  {isEditing ? (
                    <Input
                      id="dob"
                      type="date"
                      value={editProfile.dateOfBirth}
                      onChange={(e) => setEditProfile({...editProfile, dateOfBirth: e.target.value})}
                    />
                  ) : (
                    <p className="text-foreground mt-1">{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="emergency" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Emergency Contact
                  </Label>
                  {isEditing ? (
                    <Input
                      id="emergency"
                      value={editProfile.emergencyContact}
                      onChange={(e) => setEditProfile({...editProfile, emergencyContact: e.target.value})}
                    />
                  ) : (
                    <p className="text-foreground mt-1">{profile.emergencyContact}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Connected Devices */}
          <Card>
            <CardHeader>
              <CardTitle>Connected Devices</CardTitle>
              <CardDescription>Devices syncing your health data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {connectedDevices.map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{device.name}</h4>
                      <p className="text-sm text-muted-foreground">{device.type}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={device.status === "Connected" ? "default" : "secondary"}>
                        {device.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">Last sync: {device.lastSync}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;