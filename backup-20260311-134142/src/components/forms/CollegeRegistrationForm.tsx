import { useState } from "react";
import { motion } from "framer-motion";
import GamingIcon, { GamingIcons } from "../GamingIcons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CollegeRegistrationForm = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    collegeName: "",
    captainName: "",
    captainEmail: "",
    captainPhone: "",
    game: "",
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("College registration submitted:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <Button variant="ghost" className="mb-6" onClick={() => window.history.back()}>
            <span className="mr-2">←</span>
            Back to Registration Options
          </Button>

          {/* Form Card */}
          <Card className="shadow-lg">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <GamingIcon iconId={GamingIcons.USERS} size={32} color="#00ff88" />
                </div>
              </div>
              <CardTitle className="font-['Rajdhani'] text-2xl font-bold text-foreground">
                Inter-College Tournament Registration
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Team Name */}
                <div className="space-y-2">
                  <Label htmlFor="teamName">Team Name *</Label>
                  <Input
                    id="teamName"
                    placeholder="Enter your team name"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    required
                  />
                </div>

                {/* College Name */}
                <div className="space-y-2">
                  <Label htmlFor="collegeName">College Name *</Label>
                  <Select value={formData.collegeName} onValueChange={(value) => setFormData({ ...formData, collegeName: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your college" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kohima-college">Kohima College</SelectItem>
                      <SelectItem value="patkai-college">Patkai Christian College</SelectItem>
                      <SelectItem value="st-joseph-college">St. Joseph College</SelectItem>
                      <SelectItem value="modern-college">Modern College</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Team Captain Name */}
                <div className="space-y-2">
                  <Label htmlFor="captainName">Team Captain Name *</Label>
                  <Input
                    id="captainName"
                    placeholder="Enter team captain name"
                    value={formData.captainName}
                    onChange={(e) => setFormData({ ...formData, captainName: e.target.value })}
                    required
                  />
                </div>

                {/* Captain Email */}
                <div className="space-y-2">
                  <Label htmlFor="captainEmail">Captain Email *</Label>
                  <Input
                    id="captainEmail"
                    type="email"
                    placeholder="Enter captain email"
                    value={formData.captainEmail}
                    onChange={(e) => setFormData({ ...formData, captainEmail: e.target.value })}
                    required
                  />
                </div>

                {/* Captain Phone */}
                <div className="space-y-2">
                  <Label htmlFor="captainPhone">Captain Phone *</Label>
                  <Input
                    id="captainPhone"
                    type="tel"
                    placeholder="Enter captain phone number"
                    value={formData.captainPhone}
                    onChange={(e) => setFormData({ ...formData, captainPhone: e.target.value })}
                    required
                  />
                </div>

                {/* Select Game */}
                <div className="space-y-2">
                  <Label htmlFor="game">Select Game *</Label>
                  <Select value={formData.game} onValueChange={(value) => setFormData({ ...formData, game: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your game" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bgmi">BGMI</SelectItem>
                      <SelectItem value="mobile-legends">Mobile Legends</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Team Requirements */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <span className="text-primary">⚠</span>
                    Team Requirements
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• BGMI: 4 players per team</li>
                    <li>• Mobile Legends: 5 players per team</li>
                    <li>• All players must be from the same college</li>
                    <li>• Valid college ID required for all team members</li>
                    <li>• Team captain must submit college ID during registration</li>
                  </ul>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                    required
                  />
                  <div className="text-sm">
                    <Label htmlFor="terms" className="text-foreground">
                      I agree to the tournament rules and terms of participation
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" size="lg">
                  Submit College Registration
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CollegeRegistrationForm;
