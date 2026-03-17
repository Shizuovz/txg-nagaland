import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Trophy, Building2, Eye, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import { useRegistrationAPI } from "@/hooks/useRegistrationAPI";
import { TeamRegistration, SponsorRegistration, VisitorRegistration } from "@/lib/firebase";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("teams");
  const { 
    loading, 
    getAllTeamRegistrations, 
    getAllSponsorRegistrations, 
    getAllVisitorRegistrations,
    updateTeamRegistrationStatus,
    updateSponsorRegistrationStatus,
    updateVisitorRegistrationStatus,
    getDashboardStats 
  } = useRegistrationAPI();

  const [teamRegistrations, setTeamRegistrations] = useState<TeamRegistration[]>([]);
  const [sponsorRegistrations, setSponsorRegistrations] = useState<SponsorRegistration[]>([]);
  const [visitorRegistrations, setVisitorRegistrations] = useState<VisitorRegistration[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [teamsData, sponsorsData, visitorsData, statsData] = await Promise.all([
      getAllTeamRegistrations(),
      getAllSponsorRegistrations(),
      getAllVisitorRegistrations(),
      getDashboardStats(),
    ]);

    if (teamsData) setTeamRegistrations(teamsData);
    if (sponsorsData) setSponsorRegistrations(sponsorsData);
    if (visitorsData) setVisitorRegistrations(visitorsData);
    if (statsData) setStats(statsData);
  };

  const handleStatusUpdate = async (
    type: 'team' | 'sponsor' | 'visitor',
    id: string,
    status: 'pending' | 'approved' | 'rejected'
  ) => {
    let result = null;
    
    if (type === 'team') {
      result = await updateTeamRegistrationStatus(id, status);
    } else if (type === 'sponsor') {
      result = await updateSponsorRegistrationStatus(id, status);
    } else if (type === 'visitor') {
      result = await updateVisitorRegistrationStatus(id, status);
    }

    if (result) {
      await loadData(); // Refresh data
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (loading && teamRegistrations.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-['Rajdhani'] text-3xl font-bold text-foreground mb-2">
            TXG TechXGames Expo Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage registrations and view event statistics
          </p>
        </motion.div>

        {/* Stats Overview */}
        {stats && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Registrations</p>
                    <p className="text-2xl font-bold">{stats.data.totalRegistrations}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Teams</p>
                    <p className="text-2xl font-bold">{stats.data.teams.total}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Sponsors</p>
                    <p className="text-2xl font-bold">{stats.data.sponsors.total}</p>
                  </div>
                  <Building2 className="h-8 w-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Visitors</p>
                    <p className="text-2xl font-bold">{stats.data.visitors.total}</p>
                  </div>
                  <Eye className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Registration Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
              <TabsTrigger value="visitors">Visitors</TabsTrigger>
            </TabsList>

            <TabsContent value="teams" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Team Registrations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamRegistrations.map((team) => (
                      <div key={team.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{team.teamName}</h3>
                              <Badge className={`${getStatusColor(team.status)} text-white`}>
                                {getStatusIcon(team.status)}
                                <span className="ml-1">{team.status}</span>
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Type: {team.registrationType === 'college' ? 'College' : 'Open Category'}
                            </p>
                            <p className="text-sm text-muted-foreground mb-1">
                              Captain: {team.captainName} ({team.captainEmail})
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Registration ID: {team.registrationId}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {team.status !== 'approved' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate('team', team.id, 'approved')}
                              >
                                Approve
                              </Button>
                            )}
                            {team.status !== 'rejected' && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleStatusUpdate('team', team.id, 'rejected')}
                              >
                                Reject
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sponsors" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Sponsor Registrations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sponsorRegistrations.map((sponsor) => (
                      <div key={sponsor.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{sponsor.companyName}</h3>
                              <Badge className={`${getStatusColor(sponsor.status)} text-white`}>
                                {getStatusIcon(sponsor.status)}
                                <span className="ml-1">{sponsor.status}</span>
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Contact: {sponsor.contactPerson} ({sponsor.contactEmail})
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Registration ID: {sponsor.registrationId}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {sponsor.status !== 'approved' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate('sponsor', sponsor.id, 'approved')}
                              >
                                Approve
                              </Button>
                            )}
                            {sponsor.status !== 'rejected' && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleStatusUpdate('sponsor', sponsor.id, 'rejected')}
                              >
                                Reject
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visitors" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Visitor Registrations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {visitorRegistrations.map((visitor) => (
                      <div key={visitor.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{visitor.fullName}</h3>
                              <Badge className={`${getStatusColor(visitor.status)} text-white`}>
                                {getStatusIcon(visitor.status)}
                                <span className="ml-1">{visitor.status}</span>
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Email: {visitor.email}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Registration ID: {visitor.registrationId}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {visitor.status !== 'approved' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate('visitor', visitor.id, 'approved')}
                              >
                                Approve
                              </Button>
                            )}
                            {visitor.status !== 'rejected' && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleStatusUpdate('visitor', visitor.id, 'rejected')}
                              >
                                Reject
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
