import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Trophy, Calendar, Settings, ChevronRight, Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FirebaseService } from "@/lib/firebase";

interface Registration {
  id: string;
  type: "team" | "sponsor" | "visitor";
  eventName: string;
  teamName?: string;
  members?: string[];
  contactInfo: {
    email: string;
    phone: string;
  };
  status: "pending" | "confirmed" | "rejected";
  submittedAt: string;
  updatedAt: string;
}

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firebaseService] = useState(() => new FirebaseService());

  useEffect(() => {
    // Load user registrations from Firebase
    const loadRegistrations = async () => {
      if (!user?.email) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        // Load all registration types from Firebase
        const [teamRegistrations, sponsorRegistrations, visitorRegistrations] = await Promise.all([
          firebaseService.getAllTeamRegistrations(),
          firebaseService.getAllSponsorRegistrations(),
          firebaseService.getAllVisitorRegistrations()
        ]);

        // Transform and filter registrations for current user
        const transformedRegistrations: Registration[] = [
          ...teamRegistrations.map(reg => ({
            id: reg.id,
            type: "team" as const,
            eventName: reg.gameId || "Tournament",
            teamName: reg.teamName,
            members: [
              reg.captainName,
              ...reg.teamMembers.map(member => member.ign),
              reg.substitute?.ign].filter(Boolean),
            contactInfo: {
              email: reg.captainEmail,
              phone: reg.captainPhone
            },
            status: reg.status,
            submittedAt: reg.createdAt.toISOString(),
            updatedAt: reg.updatedAt.toISOString()
          })),
          ...sponsorRegistrations.map(reg => ({
            id: reg.id,
            type: "sponsor" as const,
            eventName: reg.sponsorshipTierId || "Sponsorship",
            teamName: reg.companyName,
            contactInfo: {
              email: reg.contactEmail,
              phone: reg.contactPhone
            },
            status: reg.status,
            submittedAt: reg.createdAt.toISOString(),
            updatedAt: reg.updatedAt.toISOString()
          })),
          ...visitorRegistrations.map(reg => ({
            id: reg.id,
            type: "visitor" as const,
            eventName: "General Visit",
            teamName: reg.fullName,
            contactInfo: {
              email: reg.email,
              phone: reg.phone
            },
            status: reg.status,
            submittedAt: reg.createdAt.toISOString(),
            updatedAt: reg.updatedAt.toISOString()
          }))
        ];

        // Filter registrations for current user
        const userRegistrations = transformedRegistrations.filter(reg => 
          reg.contactInfo.email === user.email
        );

        setRegistrations(userRegistrations);
      } catch (error) {
        console.error('Error loading registrations from Firebase:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRegistrations();
  }, [user?.email, firebaseService]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getRegistrationTypeColor = (type: string) => {
    switch (type) {
      case 'team':
        return 'bg-blue-500';
      case 'sponsor':
        return 'bg-purple-500';
      case 'visitor':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const stats = {
    totalRegistrations: registrations.length,
    confirmedRegistrations: registrations.filter(r => r.status === 'confirmed').length,
    pendingRegistrations: registrations.filter(r => r.status === 'pending').length,
    teamRegistrations: registrations.filter(r => r.type === 'team').length,
    sponsorRegistrations: registrations.filter(r => r.type === 'sponsor').length,
    visitorRegistrations: registrations.filter(r => r.type === 'visitor').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <div className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-['Rajdhani'] text-xl font-bold text-foreground">
                  Welcome back, {user?.name || 'User'}!
                </h1>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                Home
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="border-border/50 bg-background/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Registrations</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalRegistrations}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                  <p className="text-2xl font-bold text-foreground">{stats.confirmedRegistrations}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-foreground">{stats.pendingRegistrations}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sponsor Registrations</p>
                  <p className="text-2xl font-bold text-foreground">{stats.sponsorRegistrations}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card className="border-border/50 bg-background/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-['Rajdhani'] text-lg font-bold text-foreground">
                Your Registrations
              </CardTitle>
              <CardDescription>
                Track your event registration status and details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : registrations.length === 0 ? (
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No registrations yet</p>
                  <Button onClick={() => navigate('/#register')}>
                    Register for Events
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {registrations.slice(0, 5).map((registration, index) => (
                    <motion.div
                      key={registration.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="p-4 rounded-lg border border-border/50 hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getRegistrationTypeColor(registration.type)}`}></div>
                          <span className="text-xs font-medium text-muted-foreground uppercase">
                            {registration.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(registration.status)}
                          <span className="text-xs font-medium capitalize">{registration.status}</span>
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-foreground mb-1">{registration.eventName}</h4>
                      {registration.teamName && (
                        <p className="text-sm text-muted-foreground mb-2">Team: {registration.teamName}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(registration.submittedAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {registration.contactInfo.email}
                        </div>
                      </div>
                      
                      {registration.members && registration.members.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <p className="text-xs text-muted-foreground mb-2">Team Members:</p>
                          <div className="flex flex-wrap gap-1">
                            {registration.members.map((member, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {member}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {registrations.length > 5 && (
                    <div className="text-center pt-4">
                      <Button variant="outline" size="sm">
                        View All Registrations ({registrations.length})
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-['Rajdhani'] text-lg font-bold text-foreground">
                Registration Overview
              </CardTitle>
              <CardDescription>
                Summary of your registration types and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Team Registrations</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium">{stats.teamRegistrations}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Sponsor Registrations</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-sm font-medium">{stats.sponsorRegistrations}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Visitor Registrations</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">{stats.visitorRegistrations}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="text-sm font-medium">
                      {stats.totalRegistrations > 0 
                        ? Math.round((stats.confirmedRegistrations / stats.totalRegistrations) * 100) 
                        : 0}%
                    </span>
                  </div>
                  <Progress 
                    value={stats.totalRegistrations > 0 
                      ? (stats.confirmedRegistrations / stats.totalRegistrations) * 100 
                      : 0} 
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-border/50 bg-background/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-['Rajdhani'] text-lg font-bold text-foreground">
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common tasks and event management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="justify-between"
                  onClick={() => navigate('/')}
                >
                  <span>Browse Events</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  className="justify-between"
                  onClick={() => navigate('/#register')}
                >
                  <span>New Registration</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  className="justify-between"
                  onClick={() => window.open('mailto:support@txgexpo.com', '_blank')}
                >
                  <span>Contact Support</span>
                  <Mail className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  className="justify-between"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
