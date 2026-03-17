import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const SponsorshipRegistrationForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    sponsorshipTier: "",
    marketingGoals: "",
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sponsorship registration submitted:", formData);
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
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-secondary" />
                </div>
              </div>
              <CardTitle className="font-['Rajdhani'] text-2xl font-bold text-foreground">
                Sponsorship Registration
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                  />
                </div>

                {/* Contact Person */}
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    placeholder="Enter contact person name"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                {/* Sponsorship Tier */}
                <div className="space-y-2">
                  <Label htmlFor="sponsorshipTier">Sponsorship Tier *</Label>
                  <Select value={formData.sponsorshipTier} onValueChange={(value) => setFormData({ ...formData, sponsorshipTier: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sponsorship tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="title">Title Sponsor (₹5,00,000+)</SelectItem>
                      <SelectItem value="powered-by">Powered By (₹2,50,000)</SelectItem>
                      <SelectItem value="associate">Associate (₹1,00,000)</SelectItem>
                      <SelectItem value="category">Category Partner (Custom)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Marketing Goals */}
                <div className="space-y-2">
                  <Label htmlFor="marketingGoals">Marketing Goals & Objectives</Label>
                  <Textarea
                    id="marketingGoals"
                    placeholder="Tell us about your marketing goals and what you hope to achieve through this partnership..."
                    value={formData.marketingGoals}
                    onChange={(e) => setFormData({ ...formData, marketingGoals: e.target.value })}
                    rows={4}
                  />
                </div>

                {/* Sponsorship Benefits */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <AlertCircle className="h-4 w-4 text-secondary" />
                    Sponsorship Benefits
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Brand visibility across all event materials</li>
                    <li>• Live streaming mentions and logo placement</li>
                    <li>• On-stage recognition and prize distribution</li>
                    <li>• Social media promotion and content creation</li>
                    <li>• Premium booth space and networking opportunities</li>
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
                      I agree to the sponsorship terms and conditions
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" variant="outline">
                  Submit Sponsorship Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SponsorshipRegistrationForm;
