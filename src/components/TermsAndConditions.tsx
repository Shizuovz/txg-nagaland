import React, { useState, useRef, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TermsAndConditionsProps {
  accepted: boolean;
  onAccept: (accepted: boolean) => void;
  registrationType?: string;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ 
  accepted, 
  onAccept, 
  registrationType 
}) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = element;
    
    // Calculate how close to bottom (within 50px)
    const threshold = 50;
    const isAtBottom = scrollHeight - scrollTop - clientHeight <= threshold;
    
    if (isAtBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    if (checked && hasScrolledToBottom) {
      onAccept(true);
    } else {
      onAccept(false);
    }
  };

  // Reset scroll state when registration type changes
  useEffect(() => {
    setHasScrolledToBottom(false);
    onAccept(false);
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
  }, [registrationType]);

  const getRegistrationTypeText = () => {
    switch (registrationType) {
      case 'college':
        return 'Inter-College Tournament Registration';
      case 'cosplayer':
        return 'Cosplayer Registration';
      case 'vendor':
        return 'Vendor Registration';
      case 'exhibitor':
        return 'Exhibitor Registration';
      case 'media':
        return 'Media Registration';
      case 'sponsor':
        return 'Sponsor Registration';
      default:
        return 'Event Registration';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Terms and Conditions</CardTitle>
        <p className="text-sm text-muted-foreground">
          Please read and scroll through the complete terms and conditions for {getRegistrationTypeText()}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-lg p-1">
          <div 
            className="h-64 w-full rounded-md border p-4 overflow-y-auto" 
            ref={scrollAreaRef}
            onScroll={handleScroll}
          >
            <div className="space-y-4 text-sm">
              <h3 className="font-semibold text-base">NGE2026 (NESS) Event Terms and Conditions</h3>
              
              <section>
                <h4 className="font-semibold mb-2">1. Event Registration</h4>
                <p>
                  By registering for NGE2026 (NESS), you agree to comply with all event rules, regulations, 
                  and guidelines set forth by the organizing committee. Registration is subject to approval 
                  by the event organizers.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">2. Participant Eligibility</h4>
                <p>
                  Participants must be of legal age (18+) or have parental consent. All participants must 
                  provide accurate and complete information during registration. Any false or misleading 
                  information may result in immediate disqualification.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">3. Code of Conduct</h4>
                <p>
                  All participants must maintain professional behavior throughout the event. Any form of 
                  harassment, discrimination, or unsportsmanlike conduct will result in immediate 
                  disqualification and removal from the premises.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">4. Event Schedule and Timing</h4>
                <p>
                  Participants must arrive at the venue at least 30 minutes before their scheduled time. 
                  The organizing committee reserves the right to modify the schedule without prior notice.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">5. Equipment and Setup</h4>
                <p>
                  For tournament participants, personal equipment may be subject to inspection. The event 
                  organizers are not responsible for lost, damaged, or stolen personal items.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">6. Prizes and Awards</h4>
                <p>
                  Prizes will be awarded as per the tournament structure. Winners must be present during 
                  the award ceremony to claim their prizes. Prizes are non-transferable.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">7. Media and Publicity</h4>
                <p>
                  By participating, you grant the organizers the right to use your likeness, photographs, 
                  videos, and interviews for promotional purposes without additional compensation.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">8. Cancellation and Refunds</h4>
                <p>
                  Registration fees are non-refundable unless the event is cancelled by the organizers. 
                  In case of event cancellation, participants will be notified and refunds will be processed 
                  within 30 days.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">9. Liability and Insurance</h4>
                <p>
                  Participants are responsible for their own health and safety. The organizers are not 
                  liable for any injuries, losses, or damages sustained during the event. Participants 
                  are encouraged to have their own insurance coverage.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">10. Data Protection</h4>
                <p>
                  Personal information collected during registration will be used solely for event management 
                  purposes and will not be shared with third parties without explicit consent, except as 
                  required by law.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">11. Specific Terms by Registration Type</h4>
                
                {registrationType === 'college' && (
                  <div className="mt-2 p-2 bg-blue-50 rounded">
                    <p className="font-medium">College Teams:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>All team members must be from the same college/university</li>
                      <li>Valid college ID cards must be presented during check-in</li>
                      <li>Team rosters cannot be modified after registration deadline</li>
                      <li>Substitute players must be registered in advance</li>
                    </ul>
                  </div>
                )}

                {registrationType === 'cosplayer' && (
                  <div className="mt-2 p-2 bg-pink-50 rounded">
                    <p className="font-medium">Cosplayers:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Costumes must be appropriate for all audiences</li>
                      <li>Props must be safe and approved by security</li>
                      <li>Performance slots are allocated on a first-come, first-served basis</li>
                      <li>Participants must bring their own makeup and costume supplies</li>
                    </ul>
                  </div>
                )}

                {registrationType === 'vendor' && (
                  <div className="mt-2 p-2 bg-blue-50 rounded">
                    <p className="font-medium">Vendors:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Food vendors must have valid health permits</li>
                      <li>All vendors must comply with local business regulations</li>
                      <li>Booth setup must be completed 1 hour before event start</li>
                      <li>Vendors are responsible for their own equipment and inventory</li>
                    </ul>
                  </div>
                )}

                {registrationType === 'exhibitor' && (
                  <div className="mt-2 p-2 bg-yellow-50 rounded">
                    <p className="font-medium">Exhibitors:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Exhibition space is allocated based on availability</li>
                      <li>Technical equipment must be tested before the event</li>
                      <li>Exhibitors must staff their booths during event hours</li>
                      <li>All promotional materials must be approved by organizers</li>
                    </ul>
                  </div>
                )}

                {registrationType === 'media' && (
                  <div className="mt-2 p-2 bg-purple-50 rounded">
                    <p className="font-medium">Media Personnel:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Press credentials must be displayed at all times</li>
                      <li>Interview areas are designated and must be respected</li>
                      <li>Live streaming requires prior approval</li>
                      <li>Media passes are non-transferable</li>
                    </ul>
                  </div>
                )}

                {registrationType === 'sponsor' && (
                  <div className="mt-2 p-2 bg-green-50 rounded">
                    <p className="font-medium">Sponsors:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Sponsorship benefits are as per the agreed contract</li>
                      <li>Brand materials must be submitted 2 weeks before event</li>
                      <li>Exclusive sponsorship rights are protected</li>
                      <li>Sponsor representatives must follow event protocols</li>
                    </ul>
                  </div>
                )}
              </section>

              <section>
                <h4 className="font-semibold mb-2">12. Dispute Resolution</h4>
                <p>
                  Any disputes arising from participation in NGE2026 (NESS) will be resolved through 
                  arbitration as per the laws of India. The decision of the organizing committee will 
                  be final and binding.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">13. Force Majeure</h4>
                <p>
                  The organizers are not responsible for event cancellation or delays due to circumstances 
                  beyond their control, including but not limited to natural disasters, government restrictions, 
                  or technical failures.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">14. Contact Information</h4>
                <p>
                  For any questions regarding these terms and conditions, please contact:<br/>
                  Email: info@nge2026.com<br/>
                  Phone: +91-XXXX-XXXX-XXXX
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">15. Agreement</h4>
                <p>
                  By proceeding with registration, you acknowledge that you have read, understood, and 
                  agree to be bound by these terms and conditions. You confirm that all information 
                  provided is accurate and complete.
                </p>
              </section>

              <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
                <p>Last updated: March 2026</p>
                <p>© 2026 NGE2026 (NESS). All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms-checkbox"
            checked={accepted}
            onChange={handleCheckboxChange}
            disabled={!hasScrolledToBottom}
          />
          <Label 
            htmlFor="terms-checkbox" 
            className={`text-sm ${!hasScrolledToBottom ? 'text-muted-foreground' : ''}`}
          >
            {hasScrolledToBottom 
              ? "I have read and agree to the terms and conditions *" 
              : "Please scroll through the complete terms and conditions to enable agreement *"
            }
          </Label>
        </div>

        {!hasScrolledToBottom && (
          <div className="text-xs p-2 rounded">
            ⚠️ You must scroll through the complete terms and conditions before you can agree.
          </div>
        )}

        {hasScrolledToBottom && (
          <div className="text-xs p-2 rounded">
            ✅ Thank you for reading the terms and conditions. You can now agree to proceed.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TermsAndConditions;
