import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OpenCategoryRegistrationForm = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    organizationName: "",
    captainName: "",
    captainEmail: "",
    captainPhone: "",
    game: "",
    experienceLevel: "",
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Open category registration submitted:", formData);
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
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Registration Options
          </Button>

          {/* Form Card */}
          <Card className="shadow-lg">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-accent" />
                </div>
              </div>
              <CardTitle className="font-['Rajdhani'] text-2xl font-bold text-foreground">
                Open Category Registration
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

                {/* Organization Name */}
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization/Company Name *</Label>
                  <Input
                    id="organizationName"
                    placeholder="Enter organization name (if applicable)"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  />
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

                {/* Experience Level */}
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level *</Label>
                  <Select value={formData.experienceLevel} onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Team Requirements */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <AlertCircle className="h-4 w-4 text-accent" />
                    Team Requirements
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• BGMI: 4 players per team</li>
                    <li>• Mobile Legends: 5 players per team</li>
                    <li>• Open to professionals and working adults</li>
                    <li>• No college restrictions</li>
                    <li>• Higher skill level competition expected</li>
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
                <Button type="submit" className="w-full" variant="outline">
                  Submit Open Category Registration
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default OpenCategoryRegistrationForm;
