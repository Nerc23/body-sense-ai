import { MapPin, Phone, Clock, Star, Navigation, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  distance: number;
  rating: number;
  availability: "available" | "busy" | "emergency-only";
  phone: string;
  address: string;
  estimatedTime: string;
  photo: string;
}

const emergencyDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    hospital: "City Medical Center",
    distance: 0.8,
    rating: 4.9,
    availability: "available",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Drive, Downtown",
    estimatedTime: "5 min",
    photo: "👩‍⚕️"
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Emergency Medicine",
    hospital: "General Hospital",
    distance: 1.2,
    rating: 4.8,
    availability: "available",
    phone: "+1 (555) 987-6543",
    address: "456 Health Street, Midtown",
    estimatedTime: "8 min",
    photo: "👨‍⚕️"
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Internal Medicine",
    hospital: "Regional Medical",
    distance: 2.1,
    rating: 4.7,
    availability: "emergency-only",
    phone: "+1 (555) 456-7890",
    address: "789 Care Avenue, Uptown",
    estimatedTime: "12 min",
    photo: "👩‍⚕️"
  }
];

export function EmergencyDoctorFinder() {
  const [searchTerm, setSearchTerm] = useState("");

  const getAvailabilityColor = (availability: Doctor["availability"]) => {
    switch (availability) {
      case "available":
        return "bg-green-500 text-white";
      case "busy":
        return "bg-yellow-500 text-white";
      case "emergency-only":
        return "bg-red-500 text-white";
    }
  };

  const getAvailabilityText = (availability: Doctor["availability"]) => {
    switch (availability) {
      case "available":
        return "Available Now";
      case "busy":
        return "Busy";
      case "emergency-only":
        return "Emergency Only";
    }
  };

  const filteredDoctors = emergencyDoctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-destructive" />
            Emergency Care Finder
          </h3>
          <p className="text-sm text-muted-foreground">
            Find nearby doctors and hospitals for immediate assistance
          </p>
        </div>

        {/* Search */}
        <div>
          <Input
            placeholder="Search by doctor, specialty, or hospital..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Emergency Banner */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-destructive mb-1">Emergency Alert Active</h4>
              <p className="text-sm text-destructive/80">High heart rate detected. Immediate care recommended.</p>
            </div>
            <Button variant="destructive" size="sm">
              Call 911
            </Button>
          </div>
        </div>

        {/* Doctor List */}
        <div className="space-y-4">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="p-4 border hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                {/* Doctor Photo */}
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-xl">
                  {doctor.photo}
                </div>

                {/* Doctor Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{doctor.name}</h4>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      <p className="text-sm text-muted-foreground">{doctor.hospital}</p>
                    </div>
                    <Badge className={getAvailabilityColor(doctor.availability)}>
                      {getAvailabilityText(doctor.availability)}
                    </Badge>
                  </div>

                  {/* Details */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{doctor.distance} km away</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{doctor.estimatedTime} travel</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{doctor.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{doctor.address}</p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="default" size="sm" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Video Call
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Navigation className="h-4 w-4" />
                      Directions
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button variant="outline" className="justify-start">
              <Phone className="h-4 w-4 mr-2" />
              Call Emergency Services
            </Button>
            <Button variant="outline" className="justify-start">
              <MapPin className="h-4 w-4 mr-2" />
              Nearest Hospital
            </Button>
            <Button variant="outline" className="justify-start">
              <Video className="h-4 w-4 mr-2" />
              Telemedicine
            </Button>
            <Button variant="outline" className="justify-start">
              <Star className="h-4 w-4 mr-2" />
              Health Insurance
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}