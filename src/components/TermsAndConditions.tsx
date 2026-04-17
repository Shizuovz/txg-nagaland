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
      case 'moba-open':
        return 'MOBA 5V5 Open Tournament Registration';
      case 'mini-tournament':
        return 'Mini Tournament Registration';
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
              {(registrationType === 'college' || registrationType === 'moba-open') ? (
                <>
                  <h3 className="font-semibold text-base">Nagaland Esports Society (NES) - Inter-College MOBA 5V5 Tournament Terms and Conditions</h3>
                  
                  <section>
                    <h4 className="font-semibold mb-2">Introduction</h4>
                    <p>
                      These Terms and Conditions ("Terms") govern participation in the Inter-College MOBA 5V5 Tournament (the "Tournament") organised by Nagaland Esports Society (NES) ("NES", "Organiser", "we", "us", or "our").
                    </p>
                    <p className="mt-2">
                      By registering, submitting team details, checking the acceptance box on the website, participating in qualifiers, attending offline stages, or otherwise taking part in the Tournament, each player, captain, manager, coach, substitute, and participating institution agrees to be legally bound by these Terms.
                    </p>
                    <p className="mt-2">
                      If a team captain, representative, or other person completes registration on behalf of a team or institution, that person represents and warrants that they are duly authorised to do so and to bind all listed participants and, where applicable, the represented institution.
                    </p>
                  </section>

              <section>
                <h4 className="font-semibold mb-2">1. Nature of the Tournament</h4>
                <p>
                  The Tournament is an institution-linked competitive MOBA 5V5 tournament intended for eligible colleges and/or other institutions permitted by the Organiser for the relevant edition of the Tournament.
                </p>
                <p className="mt-2">
                  The Organiser may structure the Tournament in one or more stages, including but not limited to:
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>internal or institutional selection rounds;</li>
                  <li>online knockout or qualifying rounds;</li>
                  <li>semi-finals or finals; and</li>
                  <li>one or more offline or on-ground stages connected to the Tech X Gaming Expo or another Organiser-designated venue.</li>
                </ol>
                <p className="mt-2">
                  Any announced format, including a 32-institution knockout structure, livestreamed matches, certificates, prize pool details, or expo finals, remains subject to change, refinement, operational adjustment, and final confirmation by the Organiser.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">2. Eligibility</h4>
                <p>To be eligible:</p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>each player must satisfy the eligibility criteria published by the Organiser for the relevant Tournament edition;</li>
                  <li>each player must belong to, study at, or otherwise be validly associated with the institution they are representing, as required by the Organiser;</li>
                  <li>each team must provide true, accurate, and complete registration details;</li>
                  <li>each participant must comply with all applicable age requirements, game publisher requirements, and applicable law; and</li>
                  <li>each team must comply with any roster, identity, academic, or institutional verification requested by the Organiser.</li>
                </ol>
                <p className="mt-2">
                  The Organiser reserves the right to determine eligibility in its sole discretion and may require identity cards, institutional ID cards, bonafide certificates, admission records, authorisation letters, age proof, or any other supporting documents.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">3. Institutional Representation</h4>
                <p>Unless expressly permitted otherwise in writing by the Organiser:</p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>a player may represent only one institution in the Tournament;</li>
                  <li>a player may be registered on only one Tournament roster;</li>
                  <li>an institution may submit only the number of teams expressly permitted by the Organiser; and</li>
                  <li>the Organiser may require the institution to confirm that the team is its official or approved representative team.</li>
                </ol>
                <p className="mt-2">
                  If any dispute arises regarding which team or player validly represents an institution, the Organiser's decision shall be final and binding.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">4. Registration and Acceptance</h4>
                <p>
                  Registration does not guarantee participation.
                </p>
                <p className="mt-2">
                  A team shall be deemed accepted only when the Organiser confirms acceptance, publishes the team in an accepted list, or otherwise communicates participation approval through official channels.
                </p>
                <p className="mt-2">
                  The Organiser may reject, refuse, hold, suspend, or cancel any registration at any time, with or without giving reasons, including where:
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>information is incomplete, inaccurate, false, or misleading;</li>
                  <li>eligibility is not satisfactorily established;</li>
                  <li>documents are not submitted on time;</li>
                  <li>a conflict exists regarding institutional representation;</li>
                  <li>the team or any player has a history of misconduct, cheating, abuse, or rule violations; or</li>
                  <li>acceptance is not in the best interests of competitive integrity, safety, logistics, scheduling, or the reputation of the Tournament, the Event, or NES.</li>
                </ol>
              </section>

              <section>
                <h4 className="font-semibold mb-2">5. Free Registration Does Not Create Any Right</h4>
                <p>
                  Where registration is advertised as free, such free registration does not create any contractual right to participation, slot allocation, match timing preference, accommodation, travel support, device support, or prize entitlement.
                </p>
                <p className="mt-2">
                  The Organiser retains full control over acceptance, seeding, scheduling, and tournament administration.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">6. Team Composition and Roster Rules</h4>
                <p>
                  Each team must consist of the player count and role composition specified by the Organiser for the relevant game title and Tournament stage.
                </p>
                <p className="mt-2">
                  Unless the Organiser states otherwise:
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>roster locks may apply after registration, check-in, or commencement of a stage;</li>
                  <li>substitutions may be restricted, disallowed, or permitted only with prior approval;</li>
                  <li>no unregistered player may participate in any match;</li>
                  <li>account sharing, identity swapping, and substitute misuse are strictly prohibited; and</li>
                  <li>the Organiser may disqualify a team for any roster irregularity.</li>
                </ol>
                <p className="mt-2">
                  The Organiser may impose separate rules for starters, substitutes, captains, managers, and coaches.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">7. Verification and Identity Checks</h4>
                <p>
                  The Organiser may at any time require any participant to verify their identity, age, institution, in-game account, ranking, server details, device details, or other eligibility-related matters.
                </p>
                <p className="mt-2">
                  Failure, refusal, delay, or inability to complete verification to the Organiser's satisfaction may result in:
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>suspension from one or more matches;</li>
                  <li>match forfeiture;</li>
                  <li>disqualification;</li>
                  <li>prize withholding; or</li>
                  <li>a ban from future events.</li>
                </ol>
              </section>

              <section>
                <h4 className="font-semibold mb-2">8. Tournament Format, Seeding, and Scheduling</h4>
                <p>
                  The Tournament format, bracket structure, match type, server, game patch, check-in process, timing, seeding, stage progression, and operational rules shall be determined solely by the Organiser.
                </p>
                <p className="mt-2">
                  The Organiser may, at any time and without liability:
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>change the format or number of rounds;</li>
                  <li>revise check-in times or match timings;</li>
                  <li>modify bracket positions or seedings;</li>
                  <li>reschedule matches;</li>
                  <li>compress, extend, postpone, or cancel stages;</li>
                  <li>move matches between online and offline environments; or</li>
                  <li>change venues, platforms, dates, or operational procedures.</li>
                </ol>
                <p className="mt-2">
                  No participant shall be entitled to challenge the Tournament merely because of such operational changes.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">9. Match Readiness, Check-In, and No-Show</h4>
                <p>
                  Each team is responsible for being ready at the required reporting, check-in, lobby, or stage time.
                </p>
                <p className="mt-2">
                  A team may be penalised, given a warning, lose side/slot preference, forfeit a game, forfeit a series, or be disqualified if it:
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>fails to check in on time;</li>
                  <li>is absent when called;</li>
                  <li>delays the match;</li>
                  <li>cannot field an eligible lineup on time; or</li>
                  <li>otherwise causes avoidable disruption.</li>
                </ol>
                <p className="mt-2">
                  The Organiser's timekeeping and reporting records shall be final.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">10. Player Equipment, Devices, and Connectivity</h4>
                <p>
                  For online stages, unless the Organiser expressly provides otherwise, each participant is solely responsible for their own:
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>device;</li>
                  <li>charger and accessories;</li>
                  <li>power backup;</li>
                  <li>stable internet connection;</li>
                  <li>game account access;</li>
                  <li>software updates; and</li>
                  <li>communication readiness.</li>
                </ol>
                <p className="mt-2">
                  For offline stages, the Organiser may specify whether devices are player-provided, partly provided, or fully provided. The Organiser is not responsible for player-side hardware failure, ISP issues, battery drain, account lockouts, peripheral issues, or other personal equipment problems.
                </p>
                <p className="mt-2">
                  Technical pauses, remakes, or restarts shall be granted only where the Organiser considers them justified.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">11. Competitive Integrity and Fair Play</h4>
                <p>
                  All participants must compete honestly, fairly, respectfully, and in the spirit of legitimate competition.
                </p>
                <p className="mt-2">
                  The following are strictly prohibited:
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>cheating of any kind;</li>
                  <li>use of hacks, scripts, exploits, macros, bots, injectors, or unauthorised third-party software;</li>
                  <li>use of modified clients or unauthorised tools;</li>
                  <li>account sharing or account substitution;</li>
                  <li>impersonation;</li>
                  <li>bug abuse or exploit abuse;</li>
                  <li>ghosting or stream sniping;</li>
                  <li>collusion, match fixing, win trading, or pre-arranged results;</li>
                  <li>intentional throwing or sandbagging;</li>
                  <li>playing from unauthorised accounts or unauthorised regions/servers where prohibited;</li>
                  <li>use of false identity or false institutional claims; and</li>
                  <li>any other conduct that undermines fair competition.</li>
                </ol>
                <p className="mt-2">
                  The Organiser may investigate suspected misconduct using screenshots, game records, live observation, device checks, communications, reports from officials, or any other evidence it deems relevant.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">12. Code of Conduct</h4>
                <p>
                  All participants, including players, substitutes, managers, staff, supporters, and representatives, must behave professionally and respectfully at all times.
                </p>
                <p className="mt-2">
                  The following are prohibited:
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>abusive, insulting, threatening, obscene, hateful, discriminatory, or harassing language or conduct;</li>
                  <li>bullying, intimidation, or targeting of opponents, staff, casters, audience members, or online viewers;</li>
                  <li>damage to venue property, organiser property, or another person's property;</li>
                  <li>disruptive behaviour on stage, in lobbies, in group chats, or on social media;</li>
                  <li>political, communal, inflammatory, or reputation-damaging conduct connected to the Tournament; and</li>
                  <li>any conduct that, in the Organiser's opinion, harms the integrity, safety, or reputation of NES, the Tournament, the Expo, the venue, sponsors, partners, institutions, or participants.</li>
                </ol>
                <p className="mt-2">
                  The Organiser may sanction both on-platform and off-platform misconduct where it affects the Tournament or its reputation.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">13. Institutional Responsibility</h4>
                <p>
                  Each institution is responsible for ensuring that its representatives comply with these Terms and with any official rulebook, schedule notice, code of conduct, or operational instructions.
                </p>
                <p className="mt-2">
                  The Organiser may communicate directly with institutional heads, faculty coordinators, or authorised representatives regarding team disputes, discipline, verification, scheduling, or disqualification matters.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">14. Official Rules, Notices, and Instructions</h4>
                <p>
                  These Terms operate alongside any official rulebook, registration instructions, match rules, technical notices, player handbooks, schedule notices, livestream rules, and disciplinary notices issued by the Organiser.
                </p>
                <p className="mt-2">
                  In the event of inconsistency, the following order shall generally apply unless the Organiser states otherwise:
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>official match ruling issued by the Tournament admin panel;</li>
                  <li>official tournament stage rules or rulebook;</li>
                  <li>these Terms;</li>
                  <li>promotional material, posters, announcements, or social posts.</li>
                </ol>
                <p className="mt-2">
                  Participants must comply with all instructions issued by the Organiser, referees, admins, marshals, production crew, and authorised officials.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">15. Decisions of the Organiser</h4>
                <p>
                  All rulings, interpretations, eligibility decisions, disciplinary findings, operational judgments, format decisions, reseeding decisions, scheduling decisions, replay/rematch decisions, and sanction decisions of the Organiser shall be final and binding.
                </p>
                <p className="mt-2">
                  The Organiser is not obliged to provide an appeal process unless it chooses to do so.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">16. Penalties and Disciplinary Action</h4>
                <p>
                  The Organiser may impose one or more of the following penalties:
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>verbal or written warning;</li>
                  <li>game loss;</li>
                  <li>match loss;</li>
                  <li>series forfeiture;</li>
                  <li>point deduction;</li>
                  <li>disqualification;</li>
                  <li>removal of a player from the roster;</li>
                  <li>removal of a team from the Tournament;</li>
                  <li>withholding of prize money, certificates, medals, trophies, or benefits;</li>
                  <li>temporary suspension; and/or</li>
                  <li>ban from future tournaments or events organised by NES.</li>
                </ol>
                <p className="mt-2">
                  Penalties may be imposed immediately where the Organiser considers urgent action necessary.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">17. Livestreaming, Recording, and Media Rights</h4>
                <p>
                  The Tournament or parts of it may be livestreamed, recorded, photographed, clipped, archived, edited, reposted, broadcast, or otherwise publicly communicated by the Organiser or its authorised media partners.
                </p>
                <p className="mt-2">
                  By participating, each participant grants NES and its authorised partners a non-exclusive, worldwide, royalty-free right to capture and use the participant's:
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>name;</li>
                  <li>gamer tag or in-game name;</li>
                  <li>team name;</li>
                  <li>institution name;</li>
                  <li>voice;</li>
                  <li>image;</li>
                  <li>likeness;</li>
                  <li>gameplay footage;</li>
                  <li>match communications where officially captured; and</li>
                  <li>tournament-related photographs, videos, interviews, or recordings</li>
                </ol>
                <p className="mt-2">
                  for Tournament administration, livestreaming, reporting, promotion, marketing, archival use, social media, highlight videos, press coverage, and future event promotion, without further consent or compensation.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">18. Participant Streaming and Content Restrictions</h4>
                <p>
                  Participants may be restricted from independently streaming, co-streaming, restreaming, rebroadcasting, recording, or commercially exploiting Tournament matches, lobbies, official streams, overlays, admin communications, or protected event content unless expressly permitted by the Organiser.
                </p>
                <p className="mt-2">
                  The Organiser may issue separate creator or streaming guidelines.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">19. Prize Pool, Trophy, Certificates, and Withholding</h4>
                <p>
                  Any prize pool, trophy, certificates, or related awards shall be governed by the Organiser's official prize announcement and verification process. TXG materials currently describe individual tournament prize pools of INR 1,00,000 each for Inter-College Championship, Open MOBA 5v5 Tournament, and Mini Tournaments, along with trophies and certificates, subject to Tournament confirmation and administration.
                </p>
                <p className="mt-2">
                  The Organiser may withhold, reduce, defer, revoke, or refuse any prize, certificate, or trophy if:
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>eligibility is not verified;</li>
                  <li>cheating or misconduct is discovered;</li>
                  <li>a rules breach occurred;</li>
                  <li>documents are not submitted;</li>
                  <li>identity or institutional status is disputed; or</li>
                  <li>tax, legal, regulatory, or compliance requirements remain unmet.</li>
                </ol>
                <p className="mt-2">
                  Where applicable, taxes or statutory deductions may be applied before prize disbursement.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">20. Travel, Accommodation, and Expenses</h4>
                <p>
                  Unless expressly stated otherwise in writing, all costs relating to participation are the sole responsibility of the players and/or their institution, including but not limited to:
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>travel;</li>
                  <li>accommodation;</li>
                  <li>food;</li>
                  <li>local transport;</li>
                  <li>data or internet costs;</li>
                  <li>device repair or replacement; and</li>
                  <li>incidental expenses.</li>
                </ol>
                <p className="mt-2">
                  The Organiser is under no obligation to reimburse any expense.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">21. Health, Safety, and Venue Compliance</h4>
                <p>
                  For any offline stage, all participants must comply with venue rules, security directions, safety requirements, crowd control instructions, accreditation procedures, and local law.
                </p>
                <p className="mt-2">
                  The Organiser may refuse entry, remove persons, or disqualify teams where necessary for safety, security, health, order, or event management.
                </p>
                <p className="mt-2">
                  Participants attend and compete at their own risk.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">22. Suspension, Cancellation, or Changes Beyond Control</h4>
                <p>
                  The Organiser may cancel, suspend, postpone, curtail, relocate, digitise, reschedule, or materially alter the Tournament or any stage of it due to circumstances beyond its reasonable control, including but not limited to:
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>connectivity failures;</li>
                  <li>server issues;</li>
                  <li>game publisher actions or restrictions;</li>
                  <li>venue issues;</li>
                  <li>weather;</li>
                  <li>public order concerns;</li>
                  <li>epidemic or pandemic-related issues;</li>
                  <li>technical breakdowns;</li>
                  <li>governmental restrictions; or</li>
                  <li>force majeure events.</li>
                </ol>
                <p className="mt-2">
                  In such circumstances, the Organiser may determine an alternative format, revised schedule, online replacement, deferred final, or cancellation, and no participant shall have any claim against NES for compensation, loss, inconvenience, travel cost, or missed opportunity.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">23. Data Use and Privacy</h4>
                <p>
                  The Organiser may collect and process registration and Tournament-related information for legitimate Tournament purposes, including administration, verification, scheduling, communication, compliance, media, reporting, and future event coordination.
                </p>
                <p className="mt-2">
                  Participants must submit accurate information and consent to reasonable Tournament-related communications.
                </p>
                <p className="mt-2">
                  Where a separate Privacy Policy is published on the website, that Privacy Policy shall also apply.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">24. Intellectual Property</h4>
                <p>
                  All Tournament branding, names, logos, graphics, stream overlays, designs, media assets, written materials, and event-related intellectual property belonging to NES or its licensors remain their exclusive property.
                </p>
                <p className="mt-2">
                  No participant or institution may use the name, logo, branding, or identity of NES, TXG, or the Tournament in a misleading, unauthorised, defamatory, commercial, or endorsement-implying manner.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">25. Limitation of Liability</h4>
                <p>
                  To the fullest extent permitted by law, NES, its office-bearers, organisers, admins, volunteers, staff, contractors, venue partners, sponsors, and affiliates shall not be liable for:
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>any indirect, incidental, consequential, or special loss;</li>
                  <li>loss of opportunity, reputation, academic convenience, sponsorship opportunity, or media visibility;</li>
                  <li>travel or accommodation losses;</li>
                  <li>device loss, data loss, account issues, or connectivity failure;</li>
                  <li>injury, delay, disruption, or cancellation caused by third parties or external circumstances; or</li>
                  <li>any act or omission of the game publisher, venue, telecom provider, internet provider, or third-party service.</li>
                </ol>
                <p className="mt-2">
                  Participation is at the participant's own risk.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">26. Indemnity</h4>
                <p>
                  Each participant, and where applicable the registering institution or authorised representative, agrees to indemnify and hold harmless NES and its associated persons from claims, losses, damages, liabilities, and expenses arising out of:
                </p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>breach of these Terms;</li>
                  <li>cheating, misconduct, or unlawful activity;</li>
                  <li>false representation of identity or institutional affiliation;</li>
                  <li>violation of third-party rights; or</li>
                  <li>damage caused by the participant or team.</li>
                </ol>
              </section>

              <section>
                <h4 className="font-semibold mb-2">27. Disqualification Does Not Require Prior Warning</h4>
                <p>
                  The Organiser may disqualify a player or team immediately where it considers the breach serious enough to justify immediate action. No prior warning is required in cases involving cheating, fraud, identity manipulation, abusive conduct, safety concerns, or conduct threatening Tournament integrity.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">28. Governing Law and Jurisdiction</h4>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India.
                </p>
                <p className="mt-2">
                  Subject to applicable law, courts having jurisdiction in Nagaland shall have exclusive jurisdiction over disputes arising out of or in connection with these Terms and the Tournament.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">29. Amendments</h4>
                <p>
                  The Organiser may modify, update, or replace these Terms at any time. The version published on the official website or otherwise communicated by the Organiser shall govern the relevant Tournament edition unless the Organiser states otherwise.
                </p>
              </section>

              <section>
                <h4 className="font-semibold mb-2">30. Acceptance</h4>
                <p>
                  By checking the acceptance box, submitting registration, or participating in any stage of the Tournament, each participant confirms that they have read, understood, and agreed to these Terms, and that all information submitted is true and complete.
                </p>
              </section>

              <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
                <p>Nagaland Esports Society (NES) - Inter-College MOBA 5V5 Tournament Terms and Conditions</p>
                <p> 2026 Nagaland Esports Society (NES). All rights reserved.</p>
              </div>
                </>
              ) : registrationType === 'mini-tournament' ? (
                <>
                  <h3 className="font-semibold text-base">TXG Nagaland - Mini Tournaments Terms and Conditions</h3>
                  
                  <section>
                    <h4 className="font-semibold mb-2">Mini Tournaments Terms and Conditions</h4>
                    <p>
                      Organised by Nagaland Esports Society (NES)
                    </p>
                    <p>
                      For Tech X Gaming Expo / TXG Nagaland
                    </p>

                    <p className="mt-2">
                      These Terms and Conditions ("Terms") govern registration for and participation in the Mini Tournaments conducted in connection with Tech X Gaming Expo / TXG Nagaland (the "Event"), organised by Nagaland Esports Society (NES) ("NES", "Organiser", "we", "us", or "our").
                    </p>
                    <p className="mt-2">
                      These Terms apply to all participants in any mini tournament, side event, open bracket, community bracket, casual competitive bracket, title-specific competition, or organiser-designated tournament segment conducted at or in connection with the Event (collectively, the "Mini Tournaments").
                    </p>
                    <p className="mt-2">
                      By registering, checking the acceptance box on the website, paying any applicable fee, attending check-in, entering a bracket, playing a match, remaining in the tournament area, or otherwise participating in any Mini Tournament, each player, team, substitute, captain, manager, coach, guardian, and representative agrees to be legally bound by these Terms.
                    </p>
                    <p className="mt-2">
                      If any person registers on behalf of a player or team, that person represents and warrants that they are duly authorised to bind all listed participants to these Terms.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">1. Nature of the Mini Tournaments</h4>
                    <p>
                      The Mini Tournaments are organiser-controlled competition activities conducted as part of the Event's broader esports and live programming. Event materials indicate that the expo includes multiple tournament finals and organiser-run livestream coverage.
                    </p>
                    <p className="mt-2">
                      The Organiser may conduct Mini Tournaments in one or more titles, formats, or categories, including but not limited to:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>single-player brackets;</li>
                      <li>team brackets;</li>
                      <li>duo brackets;</li>
                      <li>open-entry community brackets;</li>
                      <li>invitational side brackets;</li>
                      <li>on-ground knockouts;</li>
                      <li>limited-slot tournaments; and</li>
                      <li>title-specific finals or showcase matches.</li>
                    </ol>
                    <p className="mt-2">
                      Any specific title list, such as fighting games, sports games, arena titles, or other announced games, remains subject to organiser confirmation, slot availability, time constraints, platform availability, and operational discretion.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">2. Scope of These Terms</h4>
                    <p>
                      These Terms are umbrella rules for all Mini Tournaments.
                    </p>
                    <p className="mt-2">
                      In addition to these Terms, NES may publish or issue:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>title-specific rules;</li>
                      <li>platform-specific rules;</li>
                      <li>match format rules;</li>
                      <li>controller and device rules;</li>
                      <li>technical notices;</li>
                      <li>schedule notices;</li>
                      <li>code of conduct rules;</li>
                      <li>bracket instructions; and</li>
                      <li>admin rulings.</li>
                    </ol>
                    <p className="mt-2">
                      Where any game-specific or stage-specific rules are issued by NES, participants must comply with those rules as well.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">3. Registration Does Not Guarantee Entry</h4>
                    <p>
                      Submission of a registration form, payment, enquiry, walk-in registration, check-in, or roster submission does not guarantee entry into any Mini Tournament.
                    </p>
                    <p className="mt-2">
                      A participant or team shall be deemed accepted only when NES confirms acceptance, places the player or team in a bracket, issues a slot, or otherwise communicates approval.
                    </p>
                    <p className="mt-2">
                      NES reserves the absolute right to:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>accept or reject registrations;</li>
                      <li>close registrations early;</li>
                      <li>cap entries;</li>
                      <li>waitlist players or teams;</li>
                      <li>merge or split brackets;</li>
                      <li>cancel specific game titles; and</li>
                      <li>deny participation to any applicant,</li>
                    </ol>
                    <p className="mt-2">
                      with or without assigning reasons.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">4. Eligibility</h4>
                    <p>
                      To be eligible, each participant must:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>satisfy any age, title, platform, team, or roster criteria specified by NES;</li>
                      <li>provide true, complete, and accurate registration details;</li>
                      <li>comply with these Terms and all official tournament instructions;</li>
                      <li>be legally permitted to participate under applicable law and game rules; and</li>
                      <li>complete any identity, age, or team verification requested by NES.</li>
                    </ol>
                    <p className="mt-2">
                      NES may require government ID, school/college ID, player name confirmation, in-game profile details, team details, guardian consent, or any other supporting document it considers necessary.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">5. Age and Minor Participants</h4>
                    <p>
                      NES may permit or restrict participation based on age depending on the title, event setting, venue conditions, or organiser policy.
                    </p>
                    <p className="mt-2">
                      Where a participant is a minor, NES may require parent or guardian consent in a form acceptable to NES.
                    </p>
                    <p className="mt-2">
                      Failure to provide required consent or age proof may result in refusal of participation, removal from a bracket, or withholding of prizes.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">6. Individual and Team Entry</h4>
                    <p>
                      Mini Tournaments may be organised as solo, duo, or team competitions depending on the title.
                    </p>
                    <p className="mt-2">
                      Unless NES expressly permits otherwise:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>a participant may register only once per bracket;</li>
                      <li>a participant may not appear on multiple rosters in the same bracket;</li>
                      <li>substitute usage may be restricted or disallowed;</li>
                      <li>unregistered players may not participate; and</li>
                      <li>roster lock rules may apply after registration, check-in, or commencement of a stage.</li>
                    </ol>
                    <p className="mt-2">
                      NES may disqualify any player or team for roster manipulation, identity swapping, or unauthorised substitution.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">7. Fees and Payments</h4>
                    <p>
                      Where a Mini Tournament requires an entry fee, registration fee, on-ground fee, or participation charge:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>the fee must be paid in the manner specified by NES;</li>
                      <li>payment does not guarantee acceptance or final slot allocation;</li>
                      <li>transaction charges, bank charges, and payment gateway charges may apply;</li>
                      <li>NES may refuse participation where payment is incomplete, disputed, reversed, or delayed; and</li>
                      <li>all fees shall be non-refundable unless NES expressly states otherwise in writing.</li>
                    </ol>
                    <p className="mt-2">
                      Where a tournament is free to enter, free entry does not create any right to participation, bracket placement, or scheduling preference.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">8. Check-In and Reporting</h4>
                    <p>
                      All participants must report, check in, or be present at the time and place specified by NES.
                    </p>
                    <p className="mt-2">
                      A participant or team may be penalised, lose bracket priority, forfeit a match, or be disqualified for:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>late arrival;</li>
                      <li>failure to check in;</li>
                      <li>absence when called;</li>
                      <li>incomplete roster readiness;</li>
                      <li>failure to be available for lobby creation or stage reporting; or</li>
                      <li>avoidable delay caused by the participant or team.</li>
                    </ol>
                    <p className="mt-2">
                      NES's reporting records, call times, and admin logs shall be final.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">9. Format, Seeding, and Bracket Control</h4>
                    <p>
                      NES has sole control over:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>bracket size;</li>
                      <li>seeding;</li>
                      <li>randomisation;</li>
                      <li>game order;</li>
                      <li>stage order;</li>
                      <li>side or slot selection;</li>
                      <li>lobby or station allocation;</li>
                      <li>title scheduling;</li>
                      <li>match format; and</li>
                      <li>stage progression.</li>
                    </ol>
                    <p className="mt-2">
                      NES may at any time:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>change a bracket format;</li>
                      <li>combine brackets;</li>
                      <li>split brackets;</li>
                      <li>alter match lengths;</li>
                      <li>reduce or expand rounds;</li>
                      <li>change a game title from featured to non-featured status;</li>
                      <li>reseed participants; or</li>
                      <li>cancel a title due to low entries, time constraints, technical issues, or operational reasons.</li>
                    </ol>
                    <p className="mt-2">
                      No participant shall have any claim merely because the original proposed format was changed.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">10. Game-Specific Rules</h4>
                    <p>
                      Each title may have its own match settings, rule set, map rules, side-selection rules, round settings, pause rules, remake standards, stage bans, character restrictions, ban phases, or controller settings.
                    </p>
                    <p className="mt-2">
                      NES may issue game-specific rules for any title, including but not limited to sports games, fighting games, arena titles, mobile titles, or other platform-based competitions.
                    </p>
                    <p className="mt-2">
                      Participants are solely responsible for knowing the game-specific rules that apply to their bracket.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">11. Devices, Controllers, and Player Equipment</h4>
                    <p>
                      Unless NES expressly provides otherwise, each participant is solely responsible for their own:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>controller;</li>
                      <li>mobile device;</li>
                      <li>charger;</li>
                      <li>data cable;</li>
                      <li>headphones or earphones where permitted;</li>
                      <li>controller converter or adapter where permitted;</li>
                      <li>game account access;</li>
                      <li>battery readiness; and</li>
                      <li>other approved personal peripherals.</li>
                    </ol>
                    <p className="mt-2">
                      NES may restrict, inspect, or prohibit any controller, adapter, accessory, software, or peripheral it considers unsafe, unfair, unauthorised, unstable, or disruptive.
                    </p>
                    <p className="mt-2">
                      Participants may not use cracked, tampered, modded, exploit-based, or unauthorised hardware or software.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">12. Connectivity, Accounts, and Technical Responsibility</h4>
                    <p>
                      Participants are responsible for ensuring that their game accounts, login credentials, update status, compatible hardware, and connection readiness are in order before match time.
                    </p>
                    <p className="mt-2">
                      NES is not responsible for:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>account lockouts;</li>
                      <li>forgotten credentials;</li>
                      <li>suspended accounts;</li>
                      <li>app update delays;</li>
                      <li>platform maintenance;</li>
                      <li>controller pairing issues;</li>
                      <li>player-side battery problems;</li>
                      <li>device overheating; or</li>
                      <li>personal hardware malfunction.</li>
                    </ol>
                    <p className="mt-2">
                      NES may decide in its sole discretion whether any pause, restart, remake, or station transfer is justified.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">13. Competitive Integrity</h4>
                    <p>
                      All Mini Tournaments must be played honestly, fairly, and in accordance with the rules and spirit of competition.
                    </p>
                    <p className="mt-2">
                      The following are strictly prohibited:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>cheating of any kind;</li>
                      <li>use of hacks, scripts, bots, macros, exploits, or unauthorised third-party tools;</li>
                      <li>account sharing or identity misrepresentation;</li>
                      <li>ghosting or stream sniping;</li>
                      <li>collusion, match fixing, or pre-arranged results;</li>
                      <li>intentional disconnects;</li>
                      <li>deliberate stalling beyond permitted limits;</li>
                      <li>abuse of bugs or glitches;</li>
                      <li>station sabotage or equipment tampering; and</li>
                      <li>any conduct which NES believes undermines fair competition.</li>
                    </ol>
                    <p className="mt-2">
                      NES may investigate using admin observation, recordings, screenshots, device inspection, witness statements, game records, or any other evidence it considers relevant.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">14. Code of Conduct</h4>
                    <p>
                      All participants must behave respectfully, professionally, and safely.
                    </p>
                    <p className="mt-2">
                      The following are prohibited:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>abusive, insulting, obscene, threatening, harassing, hateful, or discriminatory language or conduct;</li>
                      <li>physical intimidation;</li>
                      <li>unsporting behaviour;</li>
                      <li>damage to organiser, venue, or third-party property;</li>
                      <li>misconduct toward admins, referees, casters, volunteers, sponsors, exhibitors, or attendees;</li>
                      <li>intoxicated or disorderly behaviour;</li>
                      <li>crowd disruption; and</li>
                      <li>any conduct which, in NES's opinion, harms the integrity, safety, operation, or reputation of the Event or Mini Tournaments.</li>
                    </ol>
                    <p className="mt-2">
                      NES may take action for both on-site and directly connected off-site or online misconduct where relevant to the Event.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">15. Admin Instructions and Match Procedure</h4>
                    <p>
                      Participants must comply immediately with instructions issued by tournament admins, referees, marshals, stage staff, production crew, security staff, and authorised NES representatives.
                    </p>
                    <p className="mt-2">
                      This includes instructions relating to:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>station assignment;</li>
                      <li>seating;</li>
                      <li>check-in;</li>
                      <li>lobby formation;</li>
                      <li>stage order;</li>
                      <li>audio levels;</li>
                      <li>device handling;</li>
                      <li>crowd control;</li>
                      <li>filming positions; and</li>
                      <li>health and safety.</li>
                    </ol>
                    <p className="mt-2">
                      Failure to comply may result in penalties or disqualification.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">16. No-Show, Walkover, and Forfeit</h4>
                    <p>
                      A participant or team may be given a walkover loss, game loss, match loss, or full disqualification if they:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>fail to report on time;</li>
                      <li>abandon a station;</li>
                      <li>disconnect and fail to return within the time permitted by NES;</li>
                      <li>refuse to play when called;</li>
                      <li>leave the venue without approval before elimination or completion; or</li>
                      <li>otherwise make the bracket unworkable.</li>
                    </ol>
                    <p className="mt-2">
                      NES may determine whether a no-show is excusable, but is under no obligation to excuse lateness or absence.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">17. Spectator and Coaching Restrictions</h4>
                    <p>
                      NES may regulate or prohibit external coaching, live assistance, crowd interference, back-seating, coaching during active games, or unauthorised support in the tournament area.
                    </p>
                    <p className="mt-2">
                      Participants must not receive unauthorised competitive assistance during live matches.
                    </p>
                    <p className="mt-2">
                      Spectators may be moved or removed where necessary for crowd control, fairness, or safety.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">18. Recording, Streaming, and Media Rights</h4>
                    <p>
                      The Event materials state that tournament matches may be livestreamed by the organiser.
                    </p>
                    <p className="mt-2">
                      By participating, each participant grants NES and its authorised partners a non-exclusive, worldwide, royalty-free right to capture, record, film, photograph, stream, edit, archive, publish, distribute, and publicly communicate the participant's:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>name;</li>
                      <li>gamer tag;</li>
                      <li>team name;</li>
                      <li>voice;</li>
                      <li>image;</li>
                      <li>likeness;</li>
                      <li>gameplay footage;</li>
                      <li>stage appearance;</li>
                      <li>interview content; and</li>
                      <li>tournament results</li>
                    </ol>
                    <p className="mt-2">
                      for tournament administration, livestreaming, highlight videos, publicity, reporting, sponsor reporting, archival use, social media, and future Event promotion, without further consent or compensation.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">19. Participant Streaming Restrictions</h4>
                    <p>
                      No participant may independently livestream, restream, rebroadcast, commercially exploit, or republish organiser-controlled tournament footage, overlays, match feeds, or stage audio without prior written approval from NES.
                    </p>
                    <p className="mt-2">
                      NES may separately allow limited player POV content, station clips, or social snippets, but any such permission remains revocable.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">20. Prizes, Awards, and Certificates</h4>
                    <p>
                      Any prize pool, trophies, medals, merchandise, vouchers, gifts, certificates, or other awards shall be governed solely by NES's official announcements and final verification process.
                    </p>
                    <p className="mt-2">
                      NES may withhold, reduce, defer, revoke, or refuse any prize or award if:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>eligibility is not established;</li>
                      <li>cheating or misconduct is discovered;</li>
                      <li>false information was submitted;</li>
                      <li>documents are not provided;</li>
                      <li>tax or compliance requirements remain unmet; or</li>
                      <li>a result is under dispute or review.</li>
                    </ol>
                    <p className="mt-2">
                      Where applicable, NES may make statutory deductions before releasing any prize.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">21. No Guarantee of Prize, Coverage, or Stage Placement</h4>
                    <p>
                      Participation does not guarantee:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>prize eligibility;</li>
                      <li>stage feature status;</li>
                      <li>streamed coverage;</li>
                      <li>equal camera time;</li>
                      <li>equal station quality;</li>
                      <li>exact schedule adherence;</li>
                      <li>media exposure; or</li>
                      <li>social media posting.</li>
                    </ol>
                    <p className="mt-2">
                      NES retains full editorial, production, and programming discretion.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">22. Venue, Safety, and Public Order</h4>
                    <p>
                      Participants must comply with all venue rules, security checks, bag checks, restricted-area rules, emergency procedures, crowd-control directions, and local law.
                    </p>
                    <p className="mt-2">
                      NES may refuse entry, restrict movement, remove players, or disqualify participants where necessary for:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>safety;</li>
                      <li>health;</li>
                      <li>venue protection;</li>
                      <li>crowd control;</li>
                      <li>public order; or</li>
                      <li>Event management.</li>
                    </ol>
                    <p className="mt-2">
                      Participation is at the participant's own risk.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">23. Changes, Delays, and Cancellation</h4>
                    <p>
                      NES may postpone, suspend, delay, relocate, re-sequence, shorten, digitise, combine, or cancel any Mini Tournament or match for operational, technical, legal, safety, venue, scheduling, game-publisher, or force majeure reasons.
                    </p>
                    <p className="mt-2">
                      In such circumstances, NES may decide whether to:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>restart later;</li>
                      <li>convert to another format;</li>
                      <li>reduce bracket scope;</li>
                      <li>cancel a title;</li>
                      <li>defer finals; or</li>
                      <li>award no result.</li>
                    </ol>
                    <p className="mt-2">
                      No participant shall have any claim for compensation, travel reimbursement, accommodation reimbursement, or other loss arising from such changes.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">24. Health and Personal Responsibility</h4>
                    <p>
                      Each participant is responsible for their own hydration, rest, medication, physical condition, comfort, and safe handling of personal equipment.
                    </p>
                    <p className="mt-2">
                      NES is not responsible for fatigue, missed matches caused by personal negligence, personal health issues not caused by organiser misconduct, or discomfort resulting from extended participation, queues, crowd density, noise, or heat, to the fullest extent permitted by law.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">25. Data Use and Privacy</h4>
                    <p>
                      NES may collect and process participant information for registration, check-in, bracket administration, communication, verification, discipline, media, reporting, and future tournament coordination.
                    </p>
                    <p className="mt-2">
                      Participants must provide true and complete information.
                    </p>
                    <p className="mt-2">
                      Where a separate Privacy Policy is published on the website, that Privacy Policy shall also apply.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">26. Publisher and Third-Party Rights</h4>
                    <p>
                      All game titles, software, characters, marks, and publisher-owned assets remain the property of their respective owners.
                    </p>
                    <p className="mt-2">
                      NES may modify or cancel a bracket where required due to publisher policies, title restrictions, patch issues, platform issues, or rights-related concerns.
                    </p>
                    <p className="mt-2">
                      Nothing in these Terms grants any participant any ownership in the games, Event branding, or organiser-owned media assets.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">27. Disqualification and Penalties</h4>
                    <p>
                      NES may impose one or more of the following penalties at its sole discretion:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>verbal or written warning;</li>
                      <li>game loss;</li>
                      <li>round loss;</li>
                      <li>match loss;</li>
                      <li>bracket removal;</li>
                      <li>prize withholding;</li>
                      <li>station removal;</li>
                      <li>suspension from one or more titles; and</li>
                      <li>ban from future NES events.</li>
                    </ol>
                    <p className="mt-2">
                      Serious misconduct may result in immediate disqualification without prior warning.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">28. Organiser Decisions</h4>
                    <p>
                      All decisions of NES relating to registration, eligibility, seeding, scheduling, station assignment, remakes, pauses, technical calls, penalties, disqualification, prize decisions, and interpretation of these Terms shall be final and binding.
                    </p>
                    <p className="mt-2">
                      NES is not required to provide an appeal process.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">29. Limitation of Liability</h4>
                    <p>
                      To the fullest extent permitted by law, NES, its office-bearers, organisers, staff, admins, referees, volunteers, contractors, sponsors, partners, venue partners, and affiliates shall not be liable for any indirect, incidental, consequential, reputational, or opportunity-based loss arising out of or connected with the Mini Tournaments.
                    </p>
                    <p className="mt-2">
                      Without limiting the above, NES shall not be liable for:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>player-side technical failure;</li>
                      <li>account issues;</li>
                      <li>schedule changes;</li>
                      <li>bracket changes;</li>
                      <li>cancellation of a title;</li>
                      <li>missed matches caused by participant error;</li>
                      <li>travel or accommodation losses;</li>
                      <li>loss of chance to win; or</li>
                      <li>acts or omissions of game publishers, venues, internet providers, hardware providers, or other third parties.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">30. Indemnity</h4>
                    <p>
                      Each participant agrees to indemnify and hold harmless NES and its associated persons from claims, liabilities, losses, damages, costs, and expenses arising out of:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>breach of these Terms;</li>
                      <li>cheating, misconduct, or unlawful activity;</li>
                      <li>false registration information;</li>
                      <li>injury or damage caused by the participant;</li>
                      <li>damage to equipment, stations, or venue property caused by the participant; or</li>
                      <li>infringement of third-party rights by the participant.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">31. Governing Law and Jurisdiction</h4>
                    <p>
                      These Terms shall be governed by and construed in accordance with the laws of India.
                    </p>
                    <p className="mt-2">
                      Subject to applicable law, courts having jurisdiction in Nagaland shall have exclusive jurisdiction over disputes arising out of or in connection with these Terms and the Mini Tournaments.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">32. Amendments</h4>
                    <p>
                      NES may modify, update, replace, or supplement these Terms at any time. The version published on the official website or otherwise communicated by NES shall apply to the relevant edition of the Mini Tournaments unless NES states otherwise.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">33. Acceptance</h4>
                    <p>
                      By checking the acceptance box, submitting registration, paying any applicable fee, checking in, or participating in any Mini Tournament, each participant confirms that they have read, understood, and agreed to these Terms, and that all information submitted is true and complete.
                    </p>
                  </section>

                  <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
                    <p>TXG Nagaland - Mini Tournaments Terms and Conditions</p>
                    <p> 2026 Nagaland Esports Society (NES). All rights reserved.</p>
                  </div>
                </>
              ) : registrationType === 'cosplayer' ? (
                <>
                  <h3 className="font-semibold text-base">Nagaland Esports Society (NES) - Cosplay Competition Terms and Conditions</h3>
                  
                  <section>
                    <h4 className="font-semibold mb-2">Cosplay Competition Terms and Conditions</h4>
                    <p>
                      Organised by Nagaland Esports Society (NES)
                    </p>
                    <p>
                      For Tech X Gaming Expo / TXG Nagaland
                    </p>

                    <p className="mt-2">
                      These Terms and Conditions ("Terms") govern registration for and participation in the Cosplay Competition (the "Competition") organised by Nagaland Esports Society (NES) ("NES", "Organiser", "we", "us", or "our") in connection with Tech X Gaming Expo / TXG Nagaland (the "Event").
                    </p>
                    <p className="mt-2">
                      By registering, checking the acceptance box on the website, attending the Competition, appearing in costume, entering the judging area, going on stage, or otherwise participating in the Competition, each applicant and participant agrees to be legally bound by these Terms.
                    </p>
                    <p className="mt-2">
                      If a parent, guardian, or authorised representative completes registration on behalf of a participant, that person represents and warrants that they are legally authorised to do so and to bind the participant to these Terms.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">1. Nature of the Competition</h4>
                    <p>
                      The Competition is a cosplay segment of the Event and may include pre-screening, registration review, costume approval, check-in, stage presentation, photography, judging, audience display, awards, and related programming.
                    </p>
                    <p className="mt-2">
                      The Organiser may structure the Competition in any format it considers appropriate, including but not limited to:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>online registration and pre-approval;</li>
                      <li>in-person costume verification;</li>
                      <li>shortlist rounds;</li>
                      <li>stage presentation rounds;</li>
                      <li>photo/video coverage; and</li>
                      <li>prize announcements.</li>
                    </ol>
                    <p className="mt-2">
                      The Organiser may change the Competition format, timing, sequence, categories, rules, judging criteria, or prize structure at any time without liability.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">2. Game-Character-Only Rule</h4>
                    <p>
                      This Competition is intended only for characters from games.
                    </p>
                    <p className="mt-2">
                      Unless the Organiser expressly approves otherwise in writing, the following shall apply:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>only characters originating in, officially appearing in, or being materially associated with a recognised video game or game franchise are eligible;</li>
                      <li>purely anime-only, manga-only, comic-only, film-only, television-only, or unrelated original characters are not eligible;</li>
                      <li>a character that exists across multiple media may be accepted only if the Organiser is satisfied that the character has a genuine and recognisable game connection; and</li>
                      <li>final determination of whether a character qualifies as a game character rests solely with the Organiser.</li>
                    </ol>
                    <p className="mt-2">
                      The Organiser may require reference images, title/source details, or other evidence to verify eligibility.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">3. Registration Does Not Guarantee Acceptance</h4>
                    <p>
                      Registration does not guarantee entry, shortlisting, stage time, judging, or prize eligibility.
                    </p>
                    <p className="mt-2">
                      A participant shall be deemed accepted only when the Organiser expressly confirms acceptance, approves the character/costume, issues a participation confirmation, or otherwise permits the participant to proceed.
                    </p>
                    <p className="mt-2">
                      The Organiser may reject, hold, revoke, or cancel any registration or participation at any time, with or without giving reasons, including where:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>the costume or character is ineligible;</li>
                      <li>the costume is incomplete, unsafe, offensive, or unsuitable;</li>
                      <li>information submitted is false, misleading, or incomplete;</li>
                      <li>the participant breaches these Terms or any Event rules; or</li>
                      <li>acceptance is not in the best interests of safety, Event management, reputation, public order, or programme quality.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">4. Eligibility</h4>
                    <p>
                      To be eligible, a participant must:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>meet any age requirements communicated by the Organiser;</li>
                      <li>provide true, complete, and accurate registration details;</li>
                      <li>comply with all costume, conduct, safety, and Event rules;</li>
                      <li>appear in a costume substantially matching the approved or declared character; and</li>
                      <li>complete check-in and verification procedures as directed by the Organiser.</li>
                    </ol>
                    <p className="mt-2">
                      The Organiser may require government ID, school/college ID, guardian consent, reference art, progress photographs, or any other documents it considers necessary.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">5. Minors</h4>
                    <p>
                      If a participant is below the age of majority applicable to them, the Organiser may require parent or guardian consent before allowing participation.
                    </p>
                    <p className="mt-2">
                      The Organiser may refuse stage participation, competition entry, or prize eligibility if required consent is not provided in the form and manner requested.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">6. Costume Standards and Accuracy</h4>
                    <p>
                      Participants are responsible for the design, construction, purchase, transport, wearing, maintenance, repair, and safe handling of their own costumes, props, accessories, makeup, wigs, footwear, and related items.
                    </p>
                    <p className="mt-2">
                      Costumes may be self-made, commissioned, assembled, purchased, or adapted unless the Organiser specifies otherwise for a particular category.
                    </p>
                    <p className="mt-2">
                      The Organiser may assess costume suitability based on any factor it considers relevant, including:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>recognisability of the character;</li>
                      <li>resemblance to the declared source;</li>
                      <li>overall presentation;</li>
                      <li>craftsmanship or styling;</li>
                      <li>safety;</li>
                      <li>public appropriateness; and</li>
                      <li>stage suitability.</li>
                    </ol>
                    <p className="mt-2">
                      The Organiser's decision on costume eligibility and category fit shall be final.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">7. Prohibited Costumes and Themes</h4>
                    <p>
                      The following may be prohibited, restricted, or removed at the Organiser's sole discretion:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>costumes that are not game-character-based;</li>
                      <li>costumes that are excessively revealing or indecent for a public event;</li>
                      <li>costumes containing hate symbols, extremist imagery, or unlawful material;</li>
                      <li>costumes likely to cause panic, confusion, or security concern;</li>
                      <li>costumes that are offensive, obscene, defamatory, discriminatory, communal, inflammatory, or otherwise inappropriate;</li>
                      <li>costumes with unsafe construction, sharp edges, exposed blades, or hazardous parts; and</li>
                      <li>costumes that may damage venue property, obstruct movement, or interfere with Event operations.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">8. Props and Weapons Policy</h4>
                    <p>
                      All props are subject to inspection and approval.
                    </p>
                    <p className="mt-2">
                      Unless expressly permitted by the Organiser, participants may not carry or use:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>real firearms;</li>
                      <li>real ammunition;</li>
                      <li>real knives, swords, or sharpened metal weapons;</li>
                      <li>explosive, flammable, pressurised, or pyrotechnic items;</li>
                      <li>hazardous chemicals, smoke devices, or irritants;</li>
                      <li>hard props likely to cause injury;</li>
                      <li>heavy unwieldy items unsafe for public movement; or</li>
                      <li>any item prohibited by venue management, security personnel, or law.</li>
                    </ol>
                    <p className="mt-2">
                      Even approved props may be restricted from stage use, venue circulation, or audience areas.
                    </p>
                    <p className="mt-2">
                      The Organiser and security personnel may confiscate, hold aside, disallow, or require removal of any prop or accessory without liability.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">9. Safety and Mobility</h4>
                    <p>
                      Each participant is solely responsible for ensuring that their costume, props, footwear, vision range, movement range, and physical setup are safe for walking, stairs, staging, photography, public interaction, and emergency movement.
                    </p>
                    <p className="mt-2">
                      The Organiser may restrict or deny participation where a costume is too large, unstable, obstructive, fragile, unsafe, or impractical for the venue or stage.
                    </p>
                    <p className="mt-2">
                      Participants must immediately follow any instruction relating to safety, crowd movement, backstage control, prop handling, or stage access.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">10. Behaviour and Public Conduct</h4>
                    <p>
                      All participants must behave respectfully, safely, and professionally.
                    </p>
                    <p className="mt-2">
                      The following are prohibited:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>abusive, insulting, obscene, threatening, harassing, or discriminatory language or conduct;</li>
                      <li>inappropriate touching, intimidation, stalking, or harassment of attendees, staff, or other participants;</li>
                      <li>disruptive conduct on stage, backstage, in queues, or on the event floor;</li>
                      <li>deliberately offensive gestures, performance elements, or interactions;</li>
                      <li>political, communal, inflammatory, or reputation-damaging conduct connected to the Event; and</li>
                      <li>refusal to comply with organiser, marshal, security, or venue instructions.</li>
                    </ol>
                    <p className="mt-2">
                      The Organiser may remove a participant from the Competition or Event area for misconduct.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">11. Stage Presentation and Performance Rules</h4>
                    <p>
                      Participants must follow all timing, sequencing, backstage, and performance instructions issued by the Organiser.
                    </p>
                    <p className="mt-2">
                      Unless expressly authorised, participants may not:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>use fire, smoke, sparks, liquids, powders, confetti, or hazardous effects;</li>
                      <li>throw objects into the audience;</li>
                      <li>engage in dangerous acrobatics or unsafe movement;</li>
                      <li>use unauthorised audio or video playback; or</li>
                      <li>involve third parties in a stage act without approval.</li>
                    </ol>
                    <p className="mt-2">
                      The Organiser may stop, shorten, skip, or cancel any stage appearance for safety, schedule, content, or operational reasons.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">12. Judging and Selection</h4>
                    <p>
                      The Organiser may appoint judges, screeners, or internal panels in its sole discretion.
                    </p>
                    <p className="mt-2">
                      Judging may consider any factors the Organiser chooses, including but not limited to:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>character recognisability;</li>
                      <li>costume quality;</li>
                      <li>detailing and finish;</li>
                      <li>resemblance to source material;</li>
                      <li>creativity of adaptation;</li>
                      <li>stage presence;</li>
                      <li>audience impact;</li>
                      <li>performance quality; and</li>
                      <li>rule compliance.</li>
                    </ol>
                    <p className="mt-2">
                      The Organiser may create categories, sub-categories, honourable mentions, or special awards at its discretion.
                    </p>
                    <p className="mt-2">
                      All judging decisions, rankings, selections, shortlist decisions, and prize decisions shall be final and binding.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">13. Disqualification</h4>
                    <p>
                      The Organiser may at any time disqualify, remove, or declare ineligible any participant who:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>violates these Terms;</li>
                      <li>misrepresents the costume source or identity;</li>
                      <li>appears in an ineligible costume;</li>
                      <li>uses prohibited props or unsafe materials;</li>
                      <li>behaves in a disruptive, abusive, or unsafe manner;</li>
                      <li>fails to check in on time;</li>
                      <li>refuses inspection or instructions; or</li>
                      <li>otherwise acts in a way that, in the Organiser's opinion, harms the integrity, safety, reputation, or operations of the Competition or Event.</li>
                    </ol>
                    <p className="mt-2">
                      Disqualification may occur with or without prior warning.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">14. Check-In, Verification, and Attendance</h4>
                    <p>
                      Participants must report at the designated time and place for check-in, inspection, numbering, lineup, and briefing.
                    </p>
                    <p className="mt-2">
                      Late arrival, failure to check in, incomplete costume readiness, absence when called, or inability to safely present may result in:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>reduced stage time;</li>
                      <li>loss of judging opportunity;</li>
                      <li>removal from the lineup; or</li>
                      <li>disqualification.</li>
                    </ol>
                    <p className="mt-2">
                      The Organiser's reporting records and call times shall be final.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">15. Photography, Filming, and Media Rights</h4>
                    <p>
                      The Competition and Event may be photographed, livestreamed, recorded, clipped, edited, archived, published, reposted, or otherwise publicly communicated by the Organiser and its authorised media, marketing, and broadcast partners.
                    </p>
                    <p className="mt-2">
                      By participating, each participant grants NES and its authorised partners a non-exclusive, worldwide, royalty-free right to capture, use, reproduce, edit, publish, distribute, and display the participant's:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>name;</li>
                      <li>stage name, if any;</li>
                      <li>likeness;</li>
                      <li>image;</li>
                      <li>voice;</li>
                      <li>costume;</li>
                      <li>performance;</li>
                      <li>photographs;</li>
                      <li>video recordings; and</li>
                      <li>related interview or presentation material</li>
                    </ol>
                    <p className="mt-2">
                      for Event administration, publicity, social media, highlights, future promotion, reporting, archival use, sponsor reporting, and general event marketing, without further consent or compensation.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">16. Participant Content and Social Posting</h4>
                    <p>
                      Participants may take personal photographs and videos for ordinary personal use, unless restricted for safety, backstage privacy, or programme management.
                    </p>
                    <p className="mt-2">
                      However, participants may not falsely claim official endorsement, official judging status, or sponsorship authority, and may not post misleading, defamatory, abusive, or reputation-damaging content connected to the Competition or Event.
                    </p>
                    <p className="mt-2">
                      The Organiser may take action based on off-platform conduct where it materially affects the Event or its reputation.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">17. Prizes, Awards, and Withholding</h4>
                    <p>
                      Any prize money, trophies, certificates, gifts, or other awards shall be governed by the Organiser's official announcements and final verification process. The Event materials indicate prize money for the cosplay attraction, but details remain subject to organiser administration and confirmation.
                    </p>
                    <p className="mt-2">
                      The Organiser may withhold, reduce, revoke, defer, or refuse any prize or award if:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>the participant is found ineligible;</li>
                      <li>a rules breach is discovered;</li>
                      <li>false information was submitted;</li>
                      <li>misconduct occurred;</li>
                      <li>required documents are not provided; or</li>
                      <li>tax, legal, or compliance requirements remain unmet.</li>
                    </ol>
                    <p className="mt-2">
                      Where applicable, statutory deductions may be made before prize disbursement.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">18. No Guarantee of Stage Time, Exposure, or Prize</h4>
                    <p>
                      Participation does not guarantee:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>stage appearance;</li>
                      <li>equal stage duration;</li>
                      <li>equal photography coverage;</li>
                      <li>livestream inclusion;</li>
                      <li>media exposure;</li>
                      <li>audience interaction;</li>
                      <li>social media posting;</li>
                      <li>judging time; or</li>
                      <li>any prize or award.</li>
                    </ol>
                    <p className="mt-2">
                      The Organiser controls all programming and visibility decisions.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">19. Health, Risk, and Personal Responsibility</h4>
                    <p>
                      Each participant participates at their own risk.
                    </p>
                    <p className="mt-2">
                      The Organiser is not responsible for:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>costume damage;</li>
                      <li>prop damage or confiscation;</li>
                      <li>wardrobe malfunction;</li>
                      <li>makeup or prosthetic issues;</li>
                      <li>discomfort, overheating, dehydration, or fatigue;</li>
                      <li>slips, trips, falls, or crowd-related inconvenience not caused by proven wilful misconduct of the Organiser; or</li>
                      <li>loss or theft of personal belongings.</li>
                    </ol>
                    <p className="mt-2">
                      Participants are responsible for their own hydration, comfort, changing arrangements, physical limitations, and safe costume use.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">20. Venue and Security Compliance</h4>
                    <p>
                      All participants must comply with venue rules, security checks, access control, restricted zones, backstage policies, and emergency directions.
                    </p>
                    <p className="mt-2">
                      The Organiser or venue security may refuse entry, restrict movement, remove props, remove costumes, or remove participants from the Event area where necessary for safety, public order, compliance, or crowd management.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">21. Changes, Postponement, or Cancellation</h4>
                    <p>
                      The Organiser may alter, postpone, suspend, curtail, relocate, digitise, reschedule, or cancel the Competition or any part of it for any operational, safety, reputational, logistical, technical, venue-related, legal, or force majeure reason.
                    </p>
                    <p className="mt-2">
                      In such circumstances, no participant shall have any claim against NES for compensation, travel reimbursement, accommodation costs, preparation costs, lost opportunity, or any other loss.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">22. Data Use and Privacy</h4>
                    <p>
                      The Organiser may collect and process participant information for registration, screening, communication, safety, administration, judging, publicity, compliance, and Event coordination.
                    </p>
                    <p className="mt-2">
                      Participants must submit true and complete information.
                    </p>
                    <p className="mt-2">
                      Where a separate Privacy Policy is published on the website, that Privacy Policy shall also apply.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">23. Intellectual Property and Character Rights</h4>
                    <p>
                      Participants are solely responsible for ensuring that their costume materials, music, props, performances, visuals, or submitted assets do not unlawfully infringe third-party rights.
                    </p>
                    <p className="mt-2">
                      The Organiser does not assume responsibility for any participant's unauthorised use of third-party content.
                    </p>
                    <p className="mt-2">
                      Nothing in these Terms grants the participant any ownership rights in the Event, NES, or TXG branding.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">24. Limitation of Liability</h4>
                    <p>
                      To the fullest extent permitted by law, NES, its office-bearers, organisers, staff, volunteers, contractors, venue partners, sponsors, judges, and affiliates shall not be liable for any indirect, incidental, consequential, special, reputational, or opportunity-based loss arising from or connected to the Competition or Event.
                    </p>
                    <p className="mt-2">
                      Without limiting the above, NES shall not be liable for:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>rejection of a costume or character;</li>
                      <li>schedule changes;</li>
                      <li>disqualification;</li>
                      <li>removal of props;</li>
                      <li>reduced stage time;</li>
                      <li>non-selection for prizes;</li>
                      <li>loss of publicity;</li>
                      <li>travel or accommodation expenses; or</li>
                      <li>damage to costumes, props, accessories, or personal items, except as required by law.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">25. Indemnity</h4>
                    <p>
                      Each participant agrees to indemnify and hold harmless NES and its associated persons from claims, liabilities, losses, damages, costs, and expenses arising out of:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>breach of these Terms;</li>
                      <li>unsafe costume construction or prop use;</li>
                      <li>unlawful conduct or misconduct;</li>
                      <li>infringement of third-party rights;</li>
                      <li>false statements made in registration; or</li>
                      <li>injury, damage, or loss caused by the participant or the participant's costume, props, or conduct.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">26. Decisions of the Organiser</h4>
                    <p>
                      All decisions of the Organiser relating to eligibility, costume approval, prop approval, safety, stage access, judging, awards, conduct, removal, disqualification, and interpretation of these Terms shall be final and binding.
                    </p>
                    <p className="mt-2">
                      The Organiser is not required to provide an appeal process.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">27. Governing Law and Jurisdiction</h4>
                    <p>
                      These Terms shall be governed by and construed in accordance with the laws of India.
                    </p>
                    <p className="mt-2">
                      Subject to applicable law, courts having jurisdiction in Nagaland shall have exclusive jurisdiction over disputes arising out of or in connection with these Terms and the Competition.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">28. Amendments</h4>
                    <p>
                      The Organiser may modify, update, or replace these Terms at any time. The version published on the official website or otherwise communicated by the Organiser shall apply to the relevant edition of the Competition unless the Organiser states otherwise.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">29. Acceptance</h4>
                    <p>
                      By checking the acceptance box, submitting registration, or participating in the Competition, each participant confirms that they have read, understood, and agreed to these Terms, and that all information provided is true and complete.
                    </p>
                  </section>

                  <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
                    <p>Nagaland Esports Society (NES) - Cosplay Competition Terms and Conditions</p>
                    <p> 2026 Nagaland Esports Society (NES). All rights reserved.</p>
                  </div>
                </>
              ) : registrationType === 'vendor' ? (
                <>
                  <h3 className="font-semibold text-base">Nagaland Esports Society (NES) - Vendor Terms and Conditions</h3>
                  
                  <section>
                    <h4 className="font-semibold mb-2">Vendor Terms and Conditions</h4>
                    <p>
                      Organised by Nagaland Esports Society (NES)
                    </p>
                    <p>
                      For Tech X Gaming Expo / TXG Nagaland
                    </p>

                    <p className="mt-2">
                      Website legal terms for vendors covering food, beverages, toys, collectibles, clothing, footwear, accessories, and similar approved retail categories.
                    </p>
                    <p className="mt-2">
                      These Terms and Conditions ("Terms") govern all vendor registrations, stall bookings, temporary retail participation, food and beverage vending, merchandise sales, product display, sampling, and related on-ground participation by vendors, sellers, traders, retailers, food businesses, beverage businesses, cafes, bakeries, restaurants, snack vendors, toy sellers, collectible sellers, clothing brands, footwear brands, lifestyle brands, pop-culture sellers, accessory sellers, and other approved commercial participants (collectively, "Vendor", "you", or "your") in connection with Tech X Gaming Expo / TXG Nagaland (the "Event"), organised by Nagaland Esports Society (NES) ("NES", "Organiser", "we", "us", or "our").
                    </p>
                    <p className="mt-2">
                      By submitting a vendor registration, booking request, payment, setup request, product list, compliance declaration, or by checking the acceptance box on the website, collecting credentials, entering the venue for setup, installing equipment, occupying space, displaying products, selling goods, serving food or beverages, or otherwise participating in the Event, you agree to be legally bound by these Terms.
                    </p>
                    <p className="mt-2">
                      If a registration is submitted on behalf of a company, brand, shop, restaurant, cafe, startup, seller group, agency, or other entity, the person submitting the registration represents and warrants that they are duly authorised to bind that entity and its personnel to these Terms.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">1. Nature of Vendor Participation</h4>
                    <p>
                      The Event may include vendor stalls, food stalls, beverage stalls, retail booths, pop-up stalls, temporary sales counters, demo-based sales, merchandise tables, showcase pods, and related commercial spaces.
                    </p>
                    <p className="mt-2">
                      Vendor participation may include, depending on approval and package, any combination of:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>food sales;</li>
                      <li>beverage sales;</li>
                      <li>snack sales;</li>
                      <li>dessert sales;</li>
                      <li>apparel and footwear sales;</li>
                      <li>toy and collectible sales;</li>
                      <li>accessory and lifestyle merchandise sales;</li>
                      <li>display and demonstration rights;</li>
                      <li>customer engagement; and</li>
                      <li>related event-linked commercial activity.</li>
                    </ol>
                    <p className="mt-2">
                      All vendor rights are limited strictly to what NES expressly approves in writing.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">2. Registration Does Not Guarantee Acceptance</h4>
                    <p>
                      Submission of a vendor application, enquiry, expression of interest, product list, payment, or supporting document does not automatically create a confirmed booking.
                    </p>
                    <p className="mt-2">
                      A Vendor shall be deemed confirmed only when NES has expressly approved the booking in writing, including by email, invoice confirmation, written acceptance, or other official communication.
                    </p>
                    <p className="mt-2">
                      NES reserves the absolute right to accept, reject, defer, revoke, cancel, or refuse any vendor application or booking at any time, with or without assigning reasons.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">3. Eligibility and Authority</h4>
                    <p>
                      By applying, you represent and warrant that:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>all information submitted is true, accurate, current, and complete;</li>
                      <li>you are legally authorised to sell, display, promote, prepare, serve, distribute, or otherwise deal in the goods or services declared by you;</li>
                      <li>you have full authority to act for the named entity, where applicable;</li>
                      <li>your participation, products, food items, drinks, merchandise, branding, and sales activity are lawful; and</li>
                      <li>your personnel, equipment, materials, and conduct will comply with these Terms and all Event directions.</li>
                    </ol>
                    <p className="mt-2">
                      NES may request supporting documents, including business details, identity proof, trade registrations, tax details, licences, menus, product photographs, brand details, safety declarations, authorisation letters, or other documents it considers appropriate.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">4. Scope of Approval</h4>
                    <p>
                      A Vendor may only sell, display, distribute, or promote the specific category of products or services approved by NES.
                    </p>
                    <p className="mt-2">
                      Unless expressly approved in writing by NES, registration does not automatically include:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>the right to sell outside the approved product category;</li>
                      <li>exclusivity of category;</li>
                      <li>guaranteed stall position;</li>
                      <li>guaranteed stall dimensions beyond written confirmation;</li>
                      <li>guaranteed storage;</li>
                      <li>guaranteed refrigeration;</li>
                      <li>guaranteed cooking permission;</li>
                      <li>guaranteed dedicated power capacity;</li>
                      <li>guaranteed furniture, fixtures, or water supply;</li>
                      <li>the right to use amplified sound;</li>
                      <li>the right to run contests or giveaways; or</li>
                      <li>sponsorship, exhibitor, or media status.</li>
                    </ol>
                    <p className="mt-2">
                      NES may restrict, expand, redefine, or reclassify vendor categories at its sole discretion.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">5. Fees, Payment, and Confirmation</h4>
                    <p>
                      All vendor fees, booking charges, deposits, utility charges, and related amounts must be paid in the manner and by the deadlines specified by NES.
                    </p>
                    <p className="mt-2">
                      Unless NES expressly agrees otherwise in writing:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>all payments are non-refundable;</li>
                      <li>payment deadlines are strict;</li>
                      <li>bank charges, transfer costs, withholding, gateway charges, and applicable taxes are the responsibility of the Vendor; and</li>
                      <li>NES may refuse setup, occupancy, sales activity, or participation if payment is incomplete, delayed, disputed, reversed, or not cleared.</li>
                    </ol>
                    <p className="mt-2">
                      NES may suspend benefits, reallocate space, deny entry, or terminate participation for payment default, without liability.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">6. Space Allocation and Stall Location</h4>
                    <p>
                      NES retains full discretion over stall allocation, zoning, aisle planning, vendor clustering, neighbouring placements, public traffic flow, crowd movement, and floor reconfiguration.
                    </p>
                    <p className="mt-2">
                      NES may at any time, with or without prior notice:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>change the location of a stall;</li>
                      <li>revise stall dimensions within reasonable operational limits;</li>
                      <li>relocate the Vendor to another zone;</li>
                      <li>reconfigure neighbouring vendor layouts;</li>
                      <li>adjust aisle structures;</li>
                      <li>create restricted service paths; or</li>
                      <li>repurpose portions of the venue.</li>
                    </ol>
                    <p className="mt-2">
                      Such changes shall not entitle the Vendor to cancellation, refund, damages, or price reduction, provided NES acts in good faith and reasonably preserves comparable participation value where practicable.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">7. Setup, Operations, and Dismantling</h4>
                    <p>
                      Each Vendor must strictly follow all setup, unloading, installation, service, staffing, dismantling, waste-clearance, and exit timings issued by NES.
                    </p>
                    <p className="mt-2">
                      The Vendor must:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>arrive within the permitted setup window;</li>
                      <li>complete installation within the prescribed timeframe;</li>
                      <li>remain operational during required event hours unless otherwise approved;</li>
                      <li>dismantle only within the authorised teardown period; and</li>
                      <li>vacate the allotted area in the condition required by NES and the venue.</li>
                    </ol>
                    <p className="mt-2">
                      Late setup, early closure, unattended stalls, delayed dismantling, or failure to clear materials may result in penalties, removal, recovery of related costs, or loss of future eligibility.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">8. Stall Construction, Equipment, and Display Materials</h4>
                    <p>
                      All counters, shelves, display units, food-service equipment, racks, banners, decor, lighting, menu boards, stands, and promotional materials must comply with organiser directions, venue limitations, and safety requirements.
                    </p>
                    <p className="mt-2">
                      Unless expressly permitted by NES, the Vendor shall not:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>exceed allotted boundaries;</li>
                      <li>block aisles, exits, signage, or neighbouring visibility;</li>
                      <li>attach items to venue structures in a prohibited manner;</li>
                      <li>use unsafe, unstable, messy, or damaging materials;</li>
                      <li>create unsafe wiring arrangements;</li>
                      <li>store stock in public circulation areas; or</li>
                      <li>create obstruction through queues, packaging, trolleys, or loose materials.</li>
                    </ol>
                    <p className="mt-2">
                      NES may require modification, repositioning, reduction, or complete removal of any structure or material that does not comply.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">9. Approved Products Only</h4>
                    <p>
                      The Vendor may only sell, serve, display, promote, or distribute the products and categories approved by NES.
                    </p>
                    <p className="mt-2">
                      NES may prohibit, restrict, seize from display, or require removal of any item, product, activity, or material that, in its sole judgment:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>was not disclosed in the application;</li>
                      <li>is unlawful, counterfeit, pirated, misleading, unsafe, or unauthorised;</li>
                      <li>infringes third-party rights;</li>
                      <li>is offensive, obscene, defamatory, discriminatory, hateful, communal, political, or inflammatory;</li>
                      <li>creates reputational, legal, health, hygiene, safety, or operational risk; or</li>
                      <li>is inconsistent with the Event's audience, standards, or vendor policy.</li>
                    </ol>
                    <p className="mt-2">
                      NES is not responsible for verifying the legality, originality, authenticity, or regulatory compliance of any Vendor product or claim.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">10. Food and Beverage Compliance</h4>
                    <p>
                      Any Vendor selling or serving food or beverages shall be solely responsible for food safety, hygiene, preparation standards, handling standards, storage standards, temperature control, freshness, ingredient quality, allergen awareness, cleanliness, waste disposal, staff hygiene, and all legal and regulatory compliance applicable to such activity.
                    </p>
                    <p className="mt-2">
                      The Vendor shall be solely responsible for obtaining and maintaining any licence, permit, registration, or approval legally required for food or beverage sale or service.
                    </p>
                    <p className="mt-2">
                      NES may inspect, restrict, suspend, or stop food and beverage operations where hygiene, safety, legality, or public-health concerns arise.
                    </p>
                    <p className="mt-2">
                      NES shall not be liable for food spoilage, customer illness, contamination claims, allergen incidents, service complaints, or regulatory violations arising from the Vendor's operations.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">11. Merchandise Authenticity and Retail Responsibility</h4>
                    <p>
                      Any Vendor selling toys, collectibles, clothing, footwear, accessories, or other merchandise shall be solely responsible for ensuring that all goods are genuine, lawful, properly sourced, safe for sale, and not counterfeit, pirated, infringing, or prohibited.
                    </p>
                    <p className="mt-2">
                      The Vendor shall be solely responsible for:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>product authenticity;</li>
                      <li>product descriptions;</li>
                      <li>pricing;</li>
                      <li>size and fit claims;</li>
                      <li>material disclosures;</li>
                      <li>warranty or return claims;</li>
                      <li>product safety; and</li>
                      <li>all customer grievances relating to the Vendor's goods.</li>
                    </ol>
                    <p className="mt-2">
                      NES shall have no responsibility for counterfeit disputes, quality complaints, delivery complaints, or consumer disputes arising from Vendor sales.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">12. Prohibited and Restricted Goods</h4>
                    <p>
                      Unless NES expressly approves in writing and all legal requirements are fully satisfied, the Vendor shall not sell, display, distribute, promote, or store:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>alcohol;</li>
                      <li>tobacco or nicotine products;</li>
                      <li>age-restricted intoxicants;</li>
                      <li>unlawful or counterfeit goods;</li>
                      <li>dangerous chemicals;</li>
                      <li>hazardous materials;</li>
                      <li>offensive or extremist merchandise;</li>
                      <li>weapons or weapon-like restricted items;</li>
                      <li>pirated media or infringing merchandise; or</li>
                      <li>any other prohibited or regulated goods not expressly authorised by NES.</li>
                    </ol>
                    <p className="mt-2">
                      NES may immediately remove any such goods and terminate the Vendor's participation without refund.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">13. Pricing, Sales, and Customer Dealings</h4>
                    <p>
                      The Vendor is solely responsible for:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>pricing;</li>
                      <li>billing;</li>
                      <li>invoices or receipts;</li>
                      <li>stock control;</li>
                      <li>taxes and statutory compliance;</li>
                      <li>payment collection;</li>
                      <li>warranties or return obligations;</li>
                      <li>customer support;</li>
                      <li>consumer complaints; and</li>
                      <li>all dealings with customers.</li>
                    </ol>
                    <p className="mt-2">
                      NES is not a seller, distributor, guarantor, intermediary, warehouse operator, or delivery agent for any Vendor transaction and shall have no liability for any sale, defect, refund demand, pricing dispute, shortage, delivery issue, or customer grievance.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">14. Cash, UPI, and Payment Handling</h4>
                    <p>
                      The Vendor is solely responsible for all payment collection systems, UPI acceptance, QR code management, change handling, POS systems, cash security, charge disputes, and transaction reconciliation.
                    </p>
                    <p className="mt-2">
                      NES shall not be liable for failed digital transactions, cash loss, QR code errors, banking issues, settlement delays, fraud, or payment disputes involving the Vendor.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">15. Electricity, Water, and Utility Use</h4>
                    <p>
                      Power, lighting, water access, refrigeration access, charging points, and other utilities are available only to the extent expressly confirmed by NES.
                    </p>
                    <p className="mt-2">
                      Unless specifically guaranteed in writing:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>no uninterrupted power is guaranteed;</li>
                      <li>no uninterrupted water supply is guaranteed;</li>
                      <li>no refrigeration or cold-chain support is guaranteed;</li>
                      <li>no dedicated utility line is guaranteed; and</li>
                      <li>the Vendor may not overload circuits, tamper with points, or connect unsafe appliances.</li>
                    </ol>
                    <p className="mt-2">
                      The Vendor is solely responsible for ensuring that all appliances and equipment are safe, compatible, and suitable for the assigned utility environment.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">16. Cooking, Heating, and Food Preparation</h4>
                    <p>
                      No Vendor may cook, heat, prepare, fry, grill, or otherwise use live-preparation or heating equipment unless NES has expressly approved such activity in writing.
                    </p>
                    <p className="mt-2">
                      Where cooking or heating is approved, the Vendor shall strictly comply with all safety, ventilation, fire-control, fuel-handling, and venue instructions.
                    </p>
                    <p className="mt-2">
                      NES may prohibit any appliance, flame, heating device, gas cylinder, induction unit, fryer, or preparation method it considers unsafe or unsuitable.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">17. Sound, Promotions, and Stall Conduct</h4>
                    <p>
                      The Vendor may only conduct promotions, product demos, sampling, announcements, music playback, or customer engagement in a manner approved by NES.
                    </p>
                    <p className="mt-2">
                      The Vendor must not:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>use excessive sound;</li>
                      <li>obstruct public movement;</li>
                      <li>use microphones or speakers without approval;</li>
                      <li>solicit aggressively beyond the allotted area;</li>
                      <li>interfere with nearby stalls, sponsors, tournaments, or stage programming; or</li>
                      <li>create unsafe queues or crowd build-up.</li>
                    </ol>
                    <p className="mt-2">
                      NES may restrict, stop, shorten, or remove any promotional activity at any time.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">18. Branding and Promotional Use</h4>
                    <p>
                      The Vendor grants NES a non-exclusive, royalty-free licence to use the Vendor's approved name, logo, and approved promotional assets for reasonable Event-related listing, wayfinding, reporting, archival, publicity, and marketing purposes.
                    </p>
                    <p className="mt-2">
                      The Vendor warrants that it owns or controls all rights necessary for such use.
                    </p>
                    <p className="mt-2">
                      NES may refuse or remove branding that is unsuitable, misleading, infringing, offensive, or technically unusable.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">19. Intellectual Property and Third-Party Rights</h4>
                    <p>
                      The Vendor is solely responsible for ensuring that all products, branding, music, visuals, packaging, logos, merchandise, and display material lawfully belong to it or are lawfully licensed.
                    </p>
                    <p className="mt-2">
                      NES shall not be responsible for any allegation that the Vendor has infringed copyright, trademark, design rights, publicity rights, patent rights, or other third-party rights.
                    </p>
                    <p className="mt-2">
                      The Vendor shall not use NES, TXG, or Event branding in a way that falsely implies partnership, sponsorship, exclusivity, ownership, or official endorsement unless expressly authorised in writing.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">20. Staffing and Conduct</h4>
                    <p>
                      The Vendor is responsible for the conduct, dress, statements, sales behaviour, and compliance of all its employees, agents, servers, promoters, helpers, and representatives.
                    </p>
                    <p className="mt-2">
                      All representatives must behave professionally, respectfully, hygienically, and safely.
                    </p>
                    <p className="mt-2">
                      The following are prohibited:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>abusive, harassing, obscene, threatening, or discriminatory conduct;</li>
                      <li>aggressive selling or crowding tactics;</li>
                      <li>disorderly, intoxicated, or unsafe conduct;</li>
                      <li>damage to venue or neighbouring property;</li>
                      <li>refusal to comply with organiser, marshal, security, or venue instructions; and</li>
                      <li>any conduct that, in NES's opinion, harms the safety, reputation, operation, or integrity of the Event.</li>
                    </ol>
                    <p className="mt-2">
                      NES may remove any person whose conduct is unacceptable, with or without prior warning.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">21. No Subletting or Sharing</h4>
                    <p>
                      The Vendor may not assign, sublet, transfer, re-sell, share, co-occupy, or otherwise make available any part of the allotted stall or participation rights to another person or entity without prior written approval from NES.
                    </p>
                    <p className="mt-2">
                      Any unauthorised sharing or re-selling may result in immediate cancellation without refund.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">22. Cleanliness, Waste, and Housekeeping</h4>
                    <p>
                      Each Vendor must keep its stall, service area, and immediate surroundings clean, orderly, and free from waste accumulation.
                    </p>
                    <p className="mt-2">
                      The Vendor shall be solely responsible for:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>waste collection within its area;</li>
                      <li>safe disposal of food waste, packaging, and service items;</li>
                      <li>cleanliness of preparation and serving surfaces;</li>
                      <li>removal of spills;</li>
                      <li>hygiene of staff and utensils; and</li>
                      <li>prevention of odour, leakage, pest attraction, or sanitation issues.</li>
                    </ol>
                    <p className="mt-2">
                      NES may require immediate corrective action where cleanliness or hygiene standards fall below acceptable levels.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">23. Security, Risk, and Personal Property</h4>
                    <p>
                      The Vendor participates at its own risk and is solely responsible for its stock, food items, beverages, cash, equipment, tools, decor, packaging, signage, POS systems, and personal belongings.
                    </p>
                    <p className="mt-2">
                      NES does not provide insurance for vendor property and shall not be liable for:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>theft;</li>
                      <li>loss;</li>
                      <li>spoilage;</li>
                      <li>damage;</li>
                      <li>breakage;</li>
                      <li>refrigeration failure not caused by NES's proven wilful misconduct;</li>
                      <li>crowd-related interference; or</li>
                      <li>operational disruptions not caused by NES's proven wilful misconduct, to the extent permitted by law.</li>
                    </ol>
                    <p className="mt-2">
                      NES strongly recommends that the Vendor obtain appropriate insurance.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">24. Health, Safety, and Legal Compliance</h4>
                    <p>
                      The Vendor must comply with all applicable laws, venue rules, food-safety standards, fire safety norms, crowd-control directions, electrical restrictions, sanitation requirements, waste rules, labour requirements, and organiser instructions.
                    </p>
                    <p className="mt-2">
                      The Vendor shall be solely responsible for obtaining all licences, permissions, declarations, registrations, or approvals required for its participation, products, food or beverage service, staffing, sales, demonstrations, or operations.
                    </p>
                    <p className="mt-2">
                      NES may require immediate corrective action or complete shutdown where compliance concerns arise.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">25. Photography, Videography, and Event Media</h4>
                    <p>
                      The Event may be photographed, filmed, livestreamed, recorded, clipped, edited, archived, and publicly promoted by NES and its authorised media, marketing, and broadcast partners.
                    </p>
                    <p className="mt-2">
                      By participating, the Vendor grants NES and its authorised partners a non-exclusive, worldwide, royalty-free right to capture and use the Vendor's:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>stall;</li>
                      <li>displays;</li>
                      <li>products;</li>
                      <li>food and beverage presentation;</li>
                      <li>logos;</li>
                      <li>staff; and</li>
                      <li>customer-facing setup</li>
                    </ol>
                    <p className="mt-2">
                      for Event administration, publicity, social media, sponsor reporting, archival use, and future event marketing, without further consent or compensation.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">26. No Guarantee of Footfall, Sales, or Exposure</h4>
                    <p>
                      NES makes no guarantee regarding:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>total attendance;</li>
                      <li>stall traffic;</li>
                      <li>food sales;</li>
                      <li>product sales;</li>
                      <li>lead generation;</li>
                      <li>customer conversions;</li>
                      <li>media exposure;</li>
                      <li>influencer coverage;</li>
                      <li>repeat business; or</li>
                      <li>return on investment.</li>
                    </ol>
                    <p className="mt-2">
                      Any projections, promotional statements, or anticipated engagement levels are illustrative only and do not create any guarantee or warranty.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">27. Changes, Postponement, and Cancellation</h4>
                    <p>
                      NES may alter, postpone, suspend, reduce, relocate, resequence, digitise, or cancel the Event or any part of it at any time for operational, safety, legal, technical, venue-related, reputational, commercial, or force majeure reasons.
                    </p>
                    <p className="mt-2">
                      In such circumstances, NES may determine, in its sole discretion, whether to:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>reschedule the booking;</li>
                      <li>provide replacement space;</li>
                      <li>convert certain benefits to another format;</li>
                      <li>issue future credit; or</li>
                      <li>provide no further remedy.</li>
                    </ol>
                    <p className="mt-2">
                      To the fullest extent permitted by law, the Vendor shall have no claim for compensation for preparation costs, stock costs, spoilage, transport, staffing, accommodation, lost business, or other consequential losses.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">28. Cancellation by Vendor</h4>
                    <p>
                      If the Vendor cancels, withdraws, abandons setup, fails to attend, fails to operate, or otherwise elects not to utilise the allotted stall or rights, all amounts paid shall remain non-refundable unless NES expressly agrees otherwise in writing.
                    </p>
                    <p className="mt-2">
                      NES may also recover any unpaid balance, committed service costs, cleaning costs, damage costs, or third-party expenses incurred on the Vendor's behalf, to the extent permitted by law.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">29. Removal, Suspension, and Immediate Termination</h4>
                    <p>
                      NES may remove, suspend, restrict, or terminate any Vendor's participation immediately, without refund or liability, if:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>these Terms are breached;</li>
                      <li>payment obligations are not met;</li>
                      <li>false or misleading information was submitted;</li>
                      <li>unapproved products are sold or displayed;</li>
                      <li>hygiene, safety, legality, or authenticity concerns arise;</li>
                      <li>the Vendor creates reputational, operational, legal, or public-order risk; or</li>
                      <li>NES considers continued participation contrary to the best interests of the Event, attendees, venue, partners, or public safety.</li>
                    </ol>
                    <p className="mt-2">
                      NES may require immediate shutdown, removal of products, withdrawal of staff, or clearance of the stall.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">30. Data Protection and Contact Use</h4>
                    <p>
                      If the Vendor collects attendee, customer, student, or visitor data, the Vendor shall be solely responsible for compliance with all applicable privacy, consent, notice, and data protection requirements.
                    </p>
                    <p className="mt-2">
                      Unless expressly stated otherwise, NES does not transfer attendee databases to Vendors.
                    </p>
                    <p className="mt-2">
                      Any contact details shared by NES must be used only for legitimate Event-related purposes and not for spam, scraping, harassment, resale, or unrelated solicitation.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">31. Indemnity</h4>
                    <p>
                      The Vendor agrees to defend, indemnify, and hold harmless NES, its office-bearers, organisers, staff, volunteers, contractors, sponsors, venue partners, media partners, and representatives from and against all claims, liabilities, losses, damages, costs, and expenses, including reasonable legal fees, arising out of or related to:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>breach of these Terms;</li>
                      <li>Vendor products, food, beverages, merchandise, claims, sales, service, or conduct;</li>
                      <li>food-safety incidents, contamination, allergen incidents, illness claims, or hygiene failures;</li>
                      <li>counterfeit or infringing goods;</li>
                      <li>injury, damage, or loss caused by the Vendor or its personnel, property, goods, or operations;</li>
                      <li>consumer disputes arising from Vendor dealings; or</li>
                      <li>violation of law, regulation, or venue requirement by the Vendor.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">32. Limitation of Liability</h4>
                    <p>
                      To the fullest extent permitted by law, NES shall not be liable for any indirect, incidental, consequential, punitive, reputational, or opportunity-based loss arising out of or connected with vendor registration, booking, participation, sales, food service, product service, setup, dismantling, or Event operations.
                    </p>
                    <p className="mt-2">
                      Without limiting the above, NES shall not be liable for:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>loss of sales or profits;</li>
                      <li>spoilage or inventory loss;</li>
                      <li>poor footfall near a stall;</li>
                      <li>blocked sight lines;</li>
                      <li>schedule changes;</li>
                      <li>power interruptions;</li>
                      <li>utility limitations;</li>
                      <li>attendee conduct;</li>
                      <li>theft or damage of vendor property; or</li>
                      <li>acts or omissions of the venue, internet provider, payment gateway, transporter, customer, or any third party.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">33. Organiser Decisions</h4>
                    <p>
                      All decisions of NES regarding applications, vendor categories, stall allocation, approved products, utility permissions, compliance, removals, penalties, and interpretation of these Terms shall be final and binding.
                    </p>
                    <p className="mt-2">
                      NES is not required to provide an appeal process.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">34. Governing Law and Jurisdiction</h4>
                    <p>
                      These Terms shall be governed by and construed in accordance with the laws of India.
                    </p>
                    <p className="mt-2">
                      Subject to applicable law, courts having jurisdiction in Nagaland shall have exclusive jurisdiction over disputes arising out of or in connection with these Terms and Vendor participation in the Event.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">35. Amendments</h4>
                    <p>
                      NES may modify, update, replace, or supplement these Terms at any time. The version published on the official website or otherwise communicated by NES shall apply to the relevant Event edition unless NES states otherwise.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">36. Acceptance</h4>
                    <p>
                      By checking the acceptance box, submitting a Vendor application, making payment, collecting credentials, setting up, or participating in the Event, the Vendor confirms that it has read, understood, and agreed to these Terms, and that all submitted information is true and complete.
                    </p>
                  </section>

                  <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
                    <p>Nagaland Esports Society (NES) - Vendor Terms and Conditions</p>
                    <p> 2026 Nagaland Esports Society (NES). All rights reserved.</p>
                  </div>
                </>
              ) : registrationType === 'exhibitor' ? (
                <>
                  <h3 className="font-semibold text-base">Nagaland Esports Society (NES) - Exhibitor Terms and Conditions</h3>
                  
                  <section>
                    <h4 className="font-semibold mb-2">Exhibitor Terms and Conditions</h4>
                    <p>
                      Organised by Nagaland Esports Society (NES)
                    </p>
                    <p>
                      For Tech X Gaming Expo / TXG Nagaland
                    </p>

                    <p className="mt-2">
                      These Terms and Conditions ("Terms") govern all exhibitor registrations, booth bookings, indie booth participation, showcase space allocations, activation spaces, display permissions, and related on-ground participation by exhibitors, brands, startups, developers, sellers, institutions, creators, communities, agencies, and commercial or non-commercial participants (collectively, "Exhibitor", "you", or "your") in connection with Tech X Gaming Expo / TXG Nagaland (the "Event"), organised by Nagaland Esports Society (NES) ("NES", "Organiser", "we", "us", or "our").
                    </p>
                    <p className="mt-2">
                      By submitting an exhibitor registration, booking request, payment, setup request, asset submission, or by checking the acceptance box on the website, collecting exhibitor credentials, entering the venue for setup, installing materials, occupying space, displaying products, or otherwise participating in the Event, you agree to be legally bound by these Terms.
                    </p>
                    <p className="mt-2">
                      If a registration is submitted on behalf of a company, institution, startup, studio, developer, agency, or other entity, the person submitting the registration represents and warrants that they are duly authorised to bind that entity and its personnel to these Terms.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">1. Nature of Participation</h4>
                    <p>
                      The Event may include technology exhibits, gaming showcases, brand booths, indie and developer showcases, product displays, sponsor activations, stage programming, livestream-linked zones, audience engagement features, and other public or business-facing exhibition elements.
                    </p>
                    <p className="mt-2">
                      Exhibitor participation may include, depending on approval and package, any combination of:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>booth or table allocation;</li>
                      <li>display space;</li>
                      <li>product demonstration rights;</li>
                      <li>activation rights;</li>
                      <li>branding opportunities;</li>
                      <li>trailer or screen showcase opportunities where separately approved;</li>
                      <li>direct public engagement;</li>
                      <li>business networking participation; and</li>
                      <li>related expo privileges.</li>
                    </ol>
                    <p className="mt-2">
                      All exhibitor rights are limited strictly to what NES expressly approves in writing.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">2. Registration Does Not Guarantee Acceptance</h4>
                    <p>
                      Submission of an exhibitor form, application, enquiry, expression of interest, asset submission, or payment does not automatically create a confirmed booking.
                    </p>
                    <p className="mt-2">
                      An exhibitor shall be deemed confirmed only when NES has expressly approved the booking in writing, including by email, invoice confirmation, written acceptance, or other official communication.
                    </p>
                    <p className="mt-2">
                      NES reserves the absolute right to accept, reject, deny, defer, revoke, or cancel any exhibitor application or booking at any time, with or without assigning reasons.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">3. Eligibility and Authority</h4>
                    <p>
                      By applying, you represent and warrant that:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>all information submitted is true, accurate, current, and complete;</li>
                      <li>you are legally authorised to exhibit, promote, display, or sell the goods, services, experiences, or materials proposed by you;</li>
                      <li>you have full authority to act on behalf of the named entity, where applicable;</li>
                      <li>your participation, displays, products, services, and promotional activities are lawful; and</li>
                      <li>your personnel, materials, and conduct will comply with these Terms and all Event directions.</li>
                    </ol>
                    <p className="mt-2">
                      NES may request supporting documents, including business details, ID proof, registration documents, GST or tax details where relevant, portfolio links, product lists, licences, authorisation letters, safety declarations, or other supporting material.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">4. Booking Scope and No Automatic Rights</h4>
                    <p>
                      Any booth, table, indie space, showcase pod, exhibitor slot, activation area, or other participation right granted by NES is limited to the exact scope expressly confirmed by NES.
                    </p>
                    <p className="mt-2">
                      Unless expressly stated in writing by NES, exhibitor registration does not automatically include:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>exclusivity of category;</li>
                      <li>guaranteed floor position;</li>
                      <li>guaranteed booth dimensions beyond written confirmation;</li>
                      <li>guaranteed power capacity beyond written confirmation;</li>
                      <li>guaranteed furniture, fixtures, screens, sound systems, lighting, storage, or internet;</li>
                      <li>guaranteed trailer playback or stage mention;</li>
                      <li>the right to sell goods;</li>
                      <li>the right to distribute food or beverages;</li>
                      <li>the right to use amplified sound;</li>
                      <li>the right to conduct contests, raffles, or games of chance; or</li>
                      <li>sponsorship, partner, or media status.</li>
                    </ol>
                    <p className="mt-2">
                      NES may create, change, or remove exhibitor categories and participation formats at its sole discretion.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">5. Fees, Payment, and Confirmation</h4>
                    <p>
                      All exhibitor fees, charges, deposits, and related amounts must be paid in the manner and by the deadlines specified by NES.
                    </p>
                    <p className="mt-2">
                      Unless NES expressly agrees otherwise in writing:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>all payments are non-refundable;</li>
                      <li>payment deadlines are strict;</li>
                      <li>taxes, bank charges, transaction fees, withholding, and transfer costs are the responsibility of the Exhibitor; and</li>
                      <li>NES may refuse setup, occupancy, or participation if payment is incomplete, delayed, disputed, reversed, or not cleared.</li>
                    </ol>
                    <p className="mt-2">
                      If any payment remains unpaid, NES may suspend benefits, reallocate space, deny entry, terminate participation, and retain any amount already paid, to the fullest extent permitted by law.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">6. Space Allocation and Location Discretion</h4>
                    <p>
                      NES retains full discretion over all floor planning, hall zoning, booth layout, aisle structures, traffic flows, category clustering, indie area placement, sponsor integration, demo positioning, and public movement planning.
                    </p>
                    <p className="mt-2">
                      NES may at any time, with or without prior notice:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>change the location of an Exhibitor's allotted space;</li>
                      <li>revise booth dimensions within reasonable operational limits;</li>
                      <li>reconfigure aisles or neighbouring placements;</li>
                      <li>relocate the Exhibitor to another zone;</li>
                      <li>change ingress and egress routes;</li>
                      <li>alter the size or shape of the event floor; or</li>
                      <li>reduce, expand, or repurpose certain areas.</li>
                    </ol>
                    <p className="mt-2">
                      Such operational changes shall not entitle the Exhibitor to cancellation, refund, damages, or price reduction, provided NES acts in good faith and endeavours to preserve comparable participation value where reasonably practicable.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">7. Setup, Dismantling, and Time Compliance</h4>
                    <p>
                      Each Exhibitor must strictly follow all setup, vehicle movement, unloading, installation, operation, staffing, teardown, and exit timings issued by NES.
                    </p>
                    <p className="mt-2">
                      The Exhibitor must:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>arrive within the permitted setup window;</li>
                      <li>complete installation within the prescribed timeframe;</li>
                      <li>remain operational during required event hours unless otherwise approved;</li>
                      <li>dismantle only within the authorised teardown period; and</li>
                      <li>vacate the site in the condition required by NES and the venue.</li>
                    </ol>
                    <p className="mt-2">
                      Late setup, early breakdown, unattended booths, delayed removal, or failure to clear materials may result in penalties, removal, loss of future eligibility, or recovery of related costs.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">8. Booth Construction, Displays, and Materials</h4>
                    <p>
                      All booths, displays, fittings, fixtures, banners, backdrops, stands, props, demo units, equipment, and decorative materials must comply with organiser instructions, venue limitations, and safety requirements.
                    </p>
                    <p className="mt-2">
                      Unless expressly permitted by NES, the Exhibitor shall not:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>exceed allotted boundaries;</li>
                      <li>block aisles, exits, signage, or neighbouring visibility;</li>
                      <li>attach anything to venue walls, floors, ceilings, or structures in a prohibited manner;</li>
                      <li>use materials that are unsafe, unstable, excessively messy, or damaging;</li>
                      <li>construct oversized or obstructive installations;</li>
                      <li>obstruct common areas with stock or packaging; or</li>
                      <li>create hazards through wiring, loose flooring, or unstable supports.</li>
                    </ol>
                    <p className="mt-2">
                      NES may require modification, trimming, repositioning, or complete removal of any structure or display that does not comply.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">9. Products, Services, and Display Content</h4>
                    <p>
                      The Exhibitor may only display, promote, demonstrate, distribute, or sell the goods, services, materials, experiences, or content approved by NES.
                    </p>
                    <p className="mt-2">
                      NES may prohibit, restrict, or remove any item, display, service, activity, or content that, in its sole judgment:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>is unlawful, misleading, counterfeit, or unauthorised;</li>
                      <li>is offensive, obscene, defamatory, discriminatory, hateful, communal, political, or inflammatory;</li>
                      <li>infringes third-party rights;</li>
                      <li>creates reputational, safety, legal, or operational risk;</li>
                      <li>is inconsistent with the Event's character, audience, or standards; or</li>
                      <li>was not disclosed in the booking application.</li>
                    </ol>
                    <p className="mt-2">
                      NES is not responsible for verifying the legality, quality, safety, authenticity, or regulatory compliance of any Exhibitor product or claim.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">10. Sales, Transactions, and Customer Dealings</h4>
                    <p>
                      If sales are permitted by NES, the Exhibitor is solely responsible for:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>pricing;</li>
                      <li>billing;</li>
                      <li>invoices and receipts;</li>
                      <li>stock control;</li>
                      <li>taxes and statutory compliance;</li>
                      <li>warranties and after-sales obligations;</li>
                      <li>consumer complaints;</li>
                      <li>refund obligations;</li>
                      <li>product safety; and</li>
                      <li>all interactions with customers.</li>
                    </ol>
                    <p className="mt-2">
                      NES is not a seller, distributor, guarantor, agent, or intermediary for any Exhibitor transaction and shall have no liability for any sale, defect, delivery issue, dispute, warranty claim, or customer grievance.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">11. Food, Beverage, and Sampling Restrictions</h4>
                    <p>
                      No Exhibitor may distribute, sell, sample, prepare, cook, or serve food or beverages unless NES has expressly approved such activity in writing and all applicable venue, hygiene, and legal requirements are satisfied.
                    </p>
                    <p className="mt-2">
                      NES may impose separate operational conditions for food or beverage exhibitors, including waste handling, electricity use, hygiene, timing, and safety control.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">12. Electricity, Internet, and Technical Services</h4>
                    <p>
                      Power supply, internet access, lighting, audio support, screens, tables, chairs, partitions, extension lines, and other technical or infrastructural services are available only to the extent expressly confirmed by NES.
                    </p>
                    <p className="mt-2">
                      Unless specifically guaranteed in writing:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>no uninterrupted power supply is guaranteed;</li>
                      <li>no uninterrupted internet service is guaranteed;</li>
                      <li>no dedicated technical support is guaranteed; and</li>
                      <li>no exhibitor may overload circuits, tamper with power points, or connect unsafe equipment.</li>
                    </ol>
                    <p className="mt-2">
                      The Exhibitor is solely responsible for ensuring that its devices and setups are compatible, safe, and suitable for the assigned power and technical environment.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">13. Sound, Demonstrations, and Audience Engagement</h4>
                    <p>
                      The Exhibitor may only conduct demonstrations, performances, announcements, games, or audience interactions in a manner approved by NES.
                    </p>
                    <p className="mt-2">
                      The Exhibitor must not:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>use excessive sound;</li>
                      <li>create disturbance to adjacent exhibitors or stage programming;</li>
                      <li>obstruct aisles or crowd movement;</li>
                      <li>use microphones, speakers, or amplified systems without approval;</li>
                      <li>create unsafe queues or crowd build-up; or</li>
                      <li>run activities that interfere with the Event schedule, livestream, or other exhibits.</li>
                    </ol>
                    <p className="mt-2">
                      NES may restrict, stop, shorten, or remove any demonstration or engagement activity at any time.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">14. Trailer, Screen, and Content Showcase Requests</h4>
                    <p>
                      Any right to submit trailers, teasers, gameplay footage, brand videos, promotional clips, or other visual media for screen playback, announcement use, or arena display is subject to separate approval by NES.
                    </p>
                    <p className="mt-2">
                      NES may refuse, edit, reschedule, shorten, or decline playback of any content for technical, legal, reputational, or programming reasons.
                    </p>
                    <p className="mt-2">
                      Submission of content does not guarantee display.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">15. Branding, Logos, and Promotional Use</h4>
                    <p>
                      The Exhibitor grants NES a non-exclusive, royalty-free licence to use the Exhibitor's approved name, logo, and approved promotional assets for reasonable Event-related promotional, listing, wayfinding, reporting, archival, and marketing purposes.
                    </p>
                    <p className="mt-2">
                      The Exhibitor warrants that it owns or controls all rights required for such use.
                    </p>
                    <p className="mt-2">
                      NES may refuse or remove branding assets that are technically unsuitable, misleading, offensive, or infringing.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">16. Intellectual Property and Third-Party Rights</h4>
                    <p>
                      The Exhibitor is solely responsible for ensuring that all displayed products, software, games, artwork, logos, audio, video, merchandise, promotional materials, and branding elements lawfully belong to it or are lawfully licensed.
                    </p>
                    <p className="mt-2">
                      NES shall not be responsible for any allegation that the Exhibitor has infringed copyright, trademark, design rights, publicity rights, patent rights, or any other third-party rights.
                    </p>
                    <p className="mt-2">
                      The Exhibitor agrees not to use NES, TXG, or Event branding in a misleading way or in a way that falsely implies sponsorship, exclusivity, endorsement, or ownership unless expressly authorised.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">17. Staffing and Representative Conduct</h4>
                    <p>
                      The Exhibitor is responsible for the conduct, dress, behaviour, statements, and compliance of all its employees, agents, promoters, crew, volunteers, vendors, contractors, and representatives.
                    </p>
                    <p className="mt-2">
                      All representatives must behave professionally, respectfully, and safely.
                    </p>
                    <p className="mt-2">
                      The following are prohibited:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>abusive, harassing, obscene, threatening, or discriminatory conduct;</li>
                      <li>aggressive sales tactics;</li>
                      <li>unauthorised solicitation outside the allotted area;</li>
                      <li>damage to venue or neighbouring property;</li>
                      <li>disorderly, intoxicated, or unsafe behaviour; and</li>
                      <li>refusal to comply with organiser, venue, marshal, or security instructions.</li>
                    </ol>
                    <p className="mt-2">
                      NES may remove any person whose conduct is unacceptable, with or without prior warning.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">18. No Subletting, Sharing, or Unauthorised Transfer</h4>
                    <p>
                      The Exhibitor may not assign, sublet, license, share, co-occupy, transfer, or otherwise make available any part of its allotted space or participation rights to another person or entity without prior written approval from NES.
                    </p>
                    <p className="mt-2">
                      Any unauthorised sharing, re-selling, or transfer may result in immediate cancellation without refund.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">19. Security, Risk, and Personal Property</h4>
                    <p>
                      The Exhibitor participates at its own risk and is solely responsible for its stock, displays, devices, cash, signage, furniture, demo equipment, tools, decor, documents, and personal belongings.
                    </p>
                    <p className="mt-2">
                      NES does not provide insurance for exhibitor property and shall not be liable for:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>theft;</li>
                      <li>loss;</li>
                      <li>damage;</li>
                      <li>breakage;</li>
                      <li>accidental interference by attendees;</li>
                      <li>weather-related impact where applicable; or</li>
                      <li>operational disruptions not caused by NES's proven wilful misconduct, to the extent permitted by law.</li>
                    </ol>
                    <p className="mt-2">
                      NES strongly recommends that the Exhibitor obtain appropriate insurance.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">20. Health, Safety, and Legal Compliance</h4>
                    <p>
                      The Exhibitor must comply with all applicable laws, venue rules, fire safety norms, electrical restrictions, crowd control directions, waste disposal rules, public safety directions, and organiser instructions.
                    </p>
                    <p className="mt-2">
                      The Exhibitor shall be solely responsible for obtaining all licences, permissions, approvals, declarations, or authorisations required for its participation, goods, displays, staffing, sales, demos, or activations.
                    </p>
                    <p className="mt-2">
                      NES may require immediate corrective action or removal where compliance concerns arise.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">21. Photography, Videography, and Event Media</h4>
                    <p>
                      The Event may be photographed, filmed, livestreamed, recorded, clipped, edited, archived, and publicly promoted by NES and its authorised media, marketing, and broadcast partners.
                    </p>
                    <p className="mt-2">
                      By participating, the Exhibitor grants NES and its authorised partners a non-exclusive, worldwide, royalty-free right to capture and use the Exhibitor's:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>booth;</li>
                      <li>displays;</li>
                      <li>personnel;</li>
                      <li>logos;</li>
                      <li>products;</li>
                      <li>demonstrations; and</li>
                      <li>interactions at the Event</li>
                    </ol>
                    <p className="mt-2">
                      for Event administration, publicity, social media, sponsor reporting, promotional use, archival use, and future event marketing, without further consent or compensation.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">22. No Guarantee of Footfall, Leads, Sales, or Exposure</h4>
                    <p>
                      NES makes no guarantee regarding:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>total attendance;</li>
                      <li>booth traffic;</li>
                      <li>lead generation;</li>
                      <li>sales volumes;</li>
                      <li>customer conversion;</li>
                      <li>media exposure;</li>
                      <li>influencer coverage;</li>
                      <li>B2B outcomes;</li>
                      <li>visibility duration; or</li>
                      <li>return on investment.</li>
                    </ol>
                    <p className="mt-2">
                      Any projections, promotional statements, proposed attractions, or anticipated visitor engagement indicators are illustrative only and do not create any guarantee or warranty.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">23. Changes, Postponement, and Cancellation</h4>
                    <p>
                      NES may alter, postpone, suspend, reduce, relocate, resequence, digitise, or cancel the Event or any part of it at any time for operational, safety, legal, technical, venue-related, reputational, commercial, or force majeure reasons.
                    </p>
                    <p className="mt-2">
                      In such circumstances, NES may determine, in its sole discretion, whether to:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>reschedule the booking;</li>
                      <li>provide a replacement location;</li>
                      <li>convert certain benefits to another format;</li>
                      <li>issue future credit; or</li>
                      <li>provide no further remedy.</li>
                    </ol>
                    <p className="mt-2">
                      To the fullest extent permitted by law, the Exhibitor shall have no claim for compensation for preparation costs, transport, staff costs, accommodation, lost opportunity, lost business, or other consequential losses.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">24. Cancellation by Exhibitor</h4>
                    <p>
                      If the Exhibitor cancels, withdraws, abandons setup, fails to attend, fails to operate, or otherwise elects not to utilise the allotted space, all amounts paid shall remain non-refundable unless NES expressly agrees otherwise in writing.
                    </p>
                    <p className="mt-2">
                      NES may also recover any unpaid balance, committed service cost, damage cost, or third-party expense incurred on the Exhibitor's behalf, to the extent permitted by law.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">25. Removal, Suspension, and Immediate Termination</h4>
                    <p>
                      NES may remove, suspend, restrict, or terminate any Exhibitor's participation immediately, without refund or liability, if:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>these Terms are breached;</li>
                      <li>payment obligations are not met;</li>
                      <li>false or misleading information was submitted;</li>
                      <li>prohibited items or conduct are involved;</li>
                      <li>the Exhibitor creates safety, legal, reputational, or operational risk; or</li>
                      <li>NES considers continued participation contrary to the best interests of the Event, attendees, venue, partners, or public order.</li>
                    </ol>
                    <p className="mt-2">
                      NES may require immediate shutdown, removal of goods, cessation of sales, withdrawal of staff, or clearance of the space.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">26. Data Protection and Contact Use</h4>
                    <p>
                      If the Exhibitor collects attendee, visitor, customer, student, or participant data, the Exhibitor shall be solely responsible for compliance with all applicable privacy, consent, notice, and data protection requirements.
                    </p>
                    <p className="mt-2">
                      Unless expressly stated otherwise, NES does not transfer attendee databases to Exhibitors.
                    </p>
                    <p className="mt-2">
                      Any contact details shared by NES must be used only for legitimate Event-related purposes and not for spam, harassment, scraping, resale, or unrelated solicitation.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">27. Indemnity</h4>
                    <p>
                      The Exhibitor agrees to defend, indemnify, and hold harmless NES, its office-bearers, organisers, staff, volunteers, contractors, sponsors, venue partners, media partners, and representatives from and against all claims, liabilities, losses, damages, costs, and expenses, including reasonable legal fees, arising out of or related to:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>breach of these Terms;</li>
                      <li>Exhibitor products, services, claims, sales, demonstrations, or conduct;</li>
                      <li>injury, damage, or loss caused by the Exhibitor or its personnel, property, goods, or installation;</li>
                      <li>infringement of third-party rights;</li>
                      <li>consumer disputes arising from Exhibitor dealings; or</li>
                      <li>violation of law, regulation, or venue requirement by the Exhibitor.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">28. Limitation of Liability</h4>
                    <p>
                      To the fullest extent permitted by law, NES shall not be liable for any indirect, incidental, consequential, punitive, reputational, or opportunity-based loss arising out of or connected with exhibitor registration, booking, participation, access, sales, setup, dismantling, or event operations.
                    </p>
                    <p className="mt-2">
                      Without limiting the above, NES shall not be liable for:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>loss of sales or profits;</li>
                      <li>poor footfall near a booth;</li>
                      <li>blocked sight lines;</li>
                      <li>schedule changes;</li>
                      <li>power interruptions;</li>
                      <li>internet issues;</li>
                      <li>attendee conduct;</li>
                      <li>theft or damage of exhibitor property; or</li>
                      <li>acts or omissions of the venue, internet provider, payment gateway, transporter, or any third party.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">29. Organiser Decisions</h4>
                    <p>
                      All decisions of NES regarding applications, allocations, categories, layout, safety, compliance, display eligibility, access, removals, penalties, and interpretation of these Terms shall be final and binding.
                    </p>
                    <p className="mt-2">
                      NES is not required to provide an appeal process.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">30. Governing Law and Jurisdiction</h4>
                    <p>
                      These Terms shall be governed by and construed in accordance with the laws of India.
                    </p>
                    <p className="mt-2">
                      Subject to applicable law, courts having jurisdiction in Nagaland shall have exclusive jurisdiction over disputes arising out of or in connection with these Terms and exhibitor participation in the Event.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">31. Amendments</h4>
                    <p>
                      NES may modify, update, replace, or supplement these Terms at any time. The version published on the official website or otherwise communicated by NES shall apply to the relevant Event edition unless NES states otherwise.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">32. Acceptance</h4>
                    <p>
                      By checking the acceptance box, submitting an exhibitor application, making payment, collecting credentials, or participating in the Event, the Exhibitor confirms that it has read, understood, and agreed to these Terms, and that all submitted information is true and complete.
                    </p>
                  </section>

                  <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
                    <p>Nagaland Esports Society (NES) - Exhibitor Terms and Conditions</p>
                    <p> 2026 Nagaland Esports Society (NES). All rights reserved.</p>
                  </div>
                </>
              ) : registrationType === 'media' ? (
                <>
                  <h3 className="font-semibold text-base">Nagaland Esports Society (NES) - Media House / Press Registration Terms and Conditions</h3>
                  
                  <section>
                    <h4 className="font-semibold mb-2">Media House / Press Registration Terms and Conditions</h4>
                    <p>
                      Organised by Nagaland Esports Society (NES)
                    </p>
                    <p>
                      For Tech X Gaming Expo / TXG Nagaland
                    </p>

                    <p className="mt-2">
                      These Terms and Conditions ("Terms") govern accreditation, registration, attendance, recording, reporting, photography, filming, interviewing, and all other media-related participation by media houses, press organisations, digital publishers, journalists, reporters, editors, photographers, videographers, camera crews, production teams, content platforms, and other media representatives (collectively, "Media Applicant", "Media House", "you", or "your") in connection with Tech X Gaming Expo / TXG Nagaland (the "Event"), organised by Nagaland Esports Society (NES) ("NES", "Organiser", "we", "us", or "our").
                    </p>
                    <p className="mt-2">
                      By submitting a registration, accreditation request, media form, or by checking the acceptance box on the website, attending the Event, collecting media credentials, entering the venue, filming, photographing, interviewing, publishing, livestreaming, or otherwise participating in any media capacity, you agree to be legally bound by these Terms.
                    </p>
                    <p className="mt-2">
                      If an application is submitted on behalf of a company, newsroom, publication, channel, agency, platform, or crew, the person submitting the application represents and warrants that they are duly authorised to bind that entity and all listed personnel to these Terms.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">1. Nature of the Event and Media Participation</h4>
                    <p>
                      The Event is a youth-focused platform bringing together technology, gaming, esports, exhibition, community participation, creators, brands, investors, and live programming, and includes tournament finals, stage programming, activations, showcases, and public-facing experiences. Media participation may therefore involve crowded spaces, active competition areas, stage presentations, sponsor zones, and ongoing production activity.
                    </p>
                    <p className="mt-2">
                      The Event materials also provide for media/exhibitor partner participation, creator and influencer reach, live stage programming, and livestreamed tournament matches.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">2. Registration Does Not Guarantee Accreditation</h4>
                    <p>
                      Submission of a media registration, accreditation request, press application, partnership request, or enquiry does not guarantee approval, entry, media credentials, interview access, backstage access, stage access, filming rights, photography rights, or any other privilege.
                    </p>
                    <p className="mt-2">
                      A Media Applicant shall be deemed approved only when NES expressly confirms approval in writing, issues accreditation, provides a credential, or otherwise permits participation.
                    </p>
                    <p className="mt-2">
                      NES reserves the absolute right to approve, reject, deny, revoke, suspend, limit, or cancel any media application, accreditation, or access request at any time, with or without assigning reasons.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">3. Eligibility and Authority</h4>
                    <p>
                      By applying, you represent and warrant that:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>all information submitted is true, accurate, current, and complete;</li>
                      <li>you are a bona fide media representative, content publisher, or authorised communications representative, where applicable;</li>
                      <li>you have authority to act for the named media entity or crew, where relevant;</li>
                      <li>your participation and reporting activities are lawful; and</li>
                      <li>your personnel, equipment, publication methods, and conduct will comply with these Terms and all Event directions.</li>
                    </ol>
                    <p className="mt-2">
                      NES may request business details, publication links, social handles, portfolio samples, identification documents, press card details, assignment letters, company authorisation letters, or any other supporting material it considers appropriate.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">4. Scope of Accreditation</h4>
                    <p>
                      Any accreditation or approval granted by NES is limited strictly to the scope expressly approved by NES.
                    </p>
                    <p className="mt-2">
                      Unless specifically confirmed in writing, accreditation does not automatically include:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>unrestricted venue access;</li>
                      <li>unrestricted camera access;</li>
                      <li>unrestricted backstage access;</li>
                      <li>access to player warm-up or holding areas;</li>
                      <li>access to restricted sponsor, production, technical, admin, or security zones;</li>
                      <li>the right to conduct interviews anywhere at will;</li>
                      <li>the right to livestream from the venue;</li>
                      <li>the right to use drones, large rigs, cranes, stabilised stage-edge systems, or special production equipment;</li>
                      <li>the right to commercialise footage beyond ordinary editorial use; or</li>
                      <li>exclusivity of any kind.</li>
                    </ol>
                    <p className="mt-2">
                      NES may issue different access levels, badges, permissions, or restrictions to different media applicants in its sole discretion.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">5. Media Credentials Are Personal and Revocable</h4>
                    <p>
                      Any media pass, badge, wristband, authorisation, or accreditation issued by NES:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>remains the property of NES;</li>
                      <li>is personal to the approved individual or approved team;</li>
                      <li>is non-transferable and non-shareable;</li>
                      <li>may be checked at any time; and</li>
                      <li>may be revoked, suspended, or restricted at any time by NES.</li>
                    </ol>
                    <p className="mt-2">
                      Use by an unauthorised person, credential swapping, badge sharing, impersonation, or misuse of access privileges may result in immediate removal and blacklisting.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">6. Organiser Control Over Venue Access</h4>
                    <p>
                      NES retains full control over all areas of the venue, event floor, media zones, interview points, stage edges, esports areas, sponsor zones, backstage areas, player access corridors, technical rooms, and restricted sections.
                    </p>
                    <p className="mt-2">
                      NES may at any time:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>restrict movement;</li>
                      <li>create no-camera areas;</li>
                      <li>create no-interview areas;</li>
                      <li>restrict stage-front access;</li>
                      <li>impose pool coverage arrangements;</li>
                      <li>require escorted access;</li>
                      <li>re-route media movement; or</li>
                      <li>remove any person or equipment from any area.</li>
                    </ol>
                    <p className="mt-2">
                      Such restrictions may be imposed for safety, crowd control, scheduling, privacy, competitive integrity, production management, contractual obligations, sponsor sensitivities, or any other operational reason.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">7. Filming, Photography, and Recording Rules</h4>
                    <p>
                      Approved media may photograph, film, or record only in accordance with the permissions granted by NES.
                    </p>
                    <p className="mt-2">
                      The following may be restricted or prohibited unless expressly authorised:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>filming in restricted areas;</li>
                      <li>obstructing audience view or foot traffic;</li>
                      <li>filming admin screens, unpublished brackets, private technical systems, or confidential production areas;</li>
                      <li>filming backstage, prep zones, or staff-only sections;</li>
                      <li>intrusive close-up filming of minors without appropriate permission;</li>
                      <li>filming where a participant has been directed to remain private for safety or welfare reasons;</li>
                      <li>use of high-intensity lighting that interferes with stage, stream, or gameplay;</li>
                      <li>tripod or rig placement that creates obstruction or hazard; and</li>
                      <li>recording private conversations not intended for media capture.</li>
                    </ol>
                    <p className="mt-2">
                      NES may create special rules for the main stage, livestream production areas, cosplay zone, tournament areas, sponsor zones, or interview corners.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">8. Livestreaming and Broadcasting Restrictions</h4>
                    <p>
                      The Event includes organiser-controlled livestream and digital reach elements, and tournament matches may be officially livestreamed by NES or its authorised partners.
                    </p>
                    <p className="mt-2">
                      Accordingly, no Media House may independently livestream, co-stream, rebroadcast, relay, or carry live video or audio from the Event, in whole or in part, without prior written approval from NES.
                    </p>
                    <p className="mt-2">
                      NES may in its sole discretion:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>prohibit all independent livestreaming;</li>
                      <li>allow limited live cut-ins only;</li>
                      <li>impose platform restrictions;</li>
                      <li>require branding or source credit;</li>
                      <li>impose delay requirements;</li>
                      <li>restrict monetisation; or</li>
                      <li>withdraw livestream permission at any time.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">9. Interviews and Talent Access</h4>
                    <p>
                      Media access does not guarantee interviews with organisers, speakers, sponsors, creators, players, cosplayers, guests, influencers, or attendees.
                    </p>
                    <p className="mt-2">
                      All interviews remain subject to:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>participant willingness;</li>
                      <li>scheduling;</li>
                      <li>security and crowd conditions;</li>
                      <li>programme timing;</li>
                      <li>safeguarding requirements;</li>
                      <li>backstage control; and</li>
                      <li>organiser approval where applicable.</li>
                    </ol>
                    <p className="mt-2">
                      NES may designate official interview zones, pooled interview formats, mixed zones, or limited interview windows.
                    </p>
                    <p className="mt-2">
                      No Media House may harass, chase, corner, pressure, or obstruct any person for a statement, interview, photograph, or clip.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">10. Protection of Minors, Students, and Sensitive Participants</h4>
                    <p>
                      The Event involves youth participation, student engagement, and public-facing programming.
                    </p>
                    <p className="mt-2">
                      Media Houses must exercise particular care when filming, photographing, or interviewing minors, students, and vulnerable participants. NES may impose additional restrictions relating to identity disclosure, close-up filming, direct interviews, or publication of personal details.
                    </p>
                    <p className="mt-2">
                      Media Houses are solely responsible for ensuring they obtain any consent or permission required by law for their own publication or broadcast use.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">11. Conduct and Professional Standards</h4>
                    <p>
                      All accredited media personnel must conduct themselves professionally, respectfully, and safely.
                    </p>
                    <p className="mt-2">
                      The following are prohibited:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>abusive, threatening, harassing, obscene, discriminatory, or inflammatory conduct;</li>
                      <li>interference with matches, stage programming, livestream production, sponsor activations, or public movement;</li>
                      <li>entering prohibited areas after being denied access;</li>
                      <li>aggressive or unsafe equipment handling;</li>
                      <li>obstruction of staff, players, attendees, or emergency routes;</li>
                      <li>impersonation of officials or unauthorised use of organiser branding; and</li>
                      <li>any conduct which, in NES's opinion, harms the safety, integrity, operations, or reputation of the Event.</li>
                    </ol>
                    <p className="mt-2">
                      NES may remove or sanction any media representative for misconduct, whether on-site or in connected digital interactions.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">12. Accuracy, Fair Reporting, and No False Endorsement</h4>
                    <p>
                      Each Media House is solely responsible for its own reporting, editing, publication, headlines, captions, thumbnails, commentary, and contextual framing.
                    </p>
                    <p className="mt-2">
                      Media Houses must not:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>falsely state or imply endorsement by NES where none exists;</li>
                      <li>falsely represent themselves as official organisers, official broadcasters, or official spokespersons unless expressly authorised;</li>
                      <li>publish materially false information knowingly or recklessly in a way that harms the Event or persons connected to it; or</li>
                      <li>use Event access to create deceptive, manipulated, defamatory, or maliciously misleading coverage.</li>
                    </ol>
                    <p className="mt-2">
                      NES is not responsible for the editorial choices of any Media House.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">13. Use of NES, TXG, and Event Branding</h4>
                    <p>
                      NES may allow reasonable nominative use of the Event name for editorial reporting.
                    </p>
                    <p className="mt-2">
                      However, no Media House may use NES, TXG, or Event logos, marks, stage designs, overlays, or branded assets in a way that implies official partnership, sponsorship, exclusivity, ownership, or formal endorsement unless expressly authorised in writing.
                    </p>
                    <p className="mt-2">
                      Use of branding for advertising, paid promotion, merchandising, sponsorship sales, or other commercial exploitation requires prior written approval.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">14. Commercial Use and Footage Exploitation</h4>
                    <p>
                      Unless expressly approved by NES, accreditation is for editorial/news/reporting purposes only and does not authorise the Media House to:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>sell raw Event footage as stock;</li>
                      <li>sublicense Event footage;</li>
                      <li>commercially package Event content for third-party brand campaigns;</li>
                      <li>use Event footage in unrelated advertising;</li>
                      <li>create paid documentary or OTT-style exploitation of Event content; or</li>
                      <li>monetise official matches or stage content beyond ordinary platform monetisation attached to standard news/editorial publication.</li>
                    </ol>
                    <p className="mt-2">
                      NES may require a separate licence or agreement for extended commercial use.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">15. Sponsor, Exhibitor, and Partner Sensitivities</h4>
                    <p>
                      The Event includes sponsor, exhibitor, and partner participation, including media/exhibitor partner positioning and public-facing brand integration.
                    </p>
                    <p className="mt-2">
                      Media Houses must not interfere with sponsor booths, demonstrations, branded installations, or commercial activities. Filming within sponsor or exhibitor spaces may be subject to the consent of the relevant exhibitor or partner in addition to NES approval.
                    </p>
                    <p className="mt-2">
                      NES may also restrict capture of unreleased products, private demos, embargoed showcases, or commercially sensitive displays.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">16. Technical and Safety Restrictions</h4>
                    <p>
                      Media Houses are responsible for their own equipment, batteries, storage media, communications, backups, and operational readiness.
                    </p>
                    <p className="mt-2">
                      NES may restrict or prohibit any equipment it considers unsafe, obstructive, overly intrusive, or operationally unsuitable, including but not limited to:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>oversized camera rigs;</li>
                      <li>lighting stands;</li>
                      <li>wired setups crossing public paths;</li>
                      <li>aerial capture devices;</li>
                      <li>generators or external power systems;</li>
                      <li>unstable mounts; and</li>
                      <li>any equipment that threatens venue flooring, production, power, safety, or public movement.</li>
                    </ol>
                    <p className="mt-2">
                      All equipment is brought and used at the Media House's own risk.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">17. No Guarantee of Access, Content, or Exclusivity</h4>
                    <p>
                      NES makes no guarantee regarding:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>audience numbers;</li>
                      <li>uninterrupted access;</li>
                      <li>interview availability;</li>
                      <li>clean filming lines;</li>
                      <li>fixed schedules;</li>
                      <li>exclusive angles;</li>
                      <li>uninterrupted power or connectivity;</li>
                      <li>uninterrupted stage access;</li>
                      <li>visibility of all competitions or attractions; or</li>
                      <li>the commercial or editorial value of accreditation.</li>
                    </ol>
                    <p className="mt-2">
                      Any published event estimates, programme concepts, media-facing attractions, or partnership descriptions are subject to change.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">18. Changes, Rescheduling, and Operational Discretion</h4>
                    <p>
                      NES may alter, postpone, cancel, suspend, relocate, compress, expand, resequence, or otherwise modify any part of the Event, including stage schedules, tournament timings, interview windows, media calls, and access plans.
                    </p>
                    <p className="mt-2">
                      Such changes shall not create any right to compensation, travel reimbursement, accommodation reimbursement, damages, or loss claims.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">19. Media House Responsibility for Publication Law</h4>
                    <p>
                      Each Media House is solely responsible for compliance with all laws, regulations, platform rules, copyright requirements, privacy obligations, defamation standards, youth-protection requirements, and journalistic or broadcasting obligations applicable to its own content and operations.
                    </p>
                    <p className="mt-2">
                      NES does not provide legal clearance for your publication or broadcast.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">20. Data Protection and Contact Use</h4>
                    <p>
                      Any contact details, media lists, speaker details, or participant information shared by NES are to be used only for legitimate Event-related media purposes and not for spam, harassment, scraping, database resale, or unrelated commercial solicitation.
                    </p>
                    <p className="mt-2">
                      Where a separate website Privacy Policy applies, it shall also govern personal data processed by NES in connection with media registration.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">21. Assumption of Risk and Personal Property</h4>
                    <p>
                      Attendance and coverage are undertaken at the Media House's own risk.
                    </p>
                    <p className="mt-2">
                      NES shall not be responsible for:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>loss, theft, or damage to equipment;</li>
                      <li>battery failure, data loss, or card corruption;</li>
                      <li>signal or internet disruption;</li>
                      <li>missed shots, missed interviews, or blocked views;</li>
                      <li>venue noise, crowd movement, or operational interruptions; or</li>
                      <li>injury or inconvenience not caused by NES's proven wilful misconduct, to the extent permitted by law.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">22. Indemnity</h4>
                    <p>
                      The Media House agrees to defend, indemnify, and hold harmless NES, its office-bearers, organisers, staff, volunteers, contractors, venue partners, sponsors, exhibitors, partners, and representatives from and against all claims, liabilities, losses, damages, costs, and expenses, including reasonable legal fees, arising out of or related to:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>breach of these Terms;</li>
                      <li>unlawful or negligent filming, recording, reporting, or publication;</li>
                      <li>infringement of third-party rights;</li>
                      <li>false, defamatory, misleading, or unlawful content published by the Media House;</li>
                      <li>data misuse or privacy violations by the Media House; or</li>
                      <li>injury, damage, or disruption caused by the Media House or its personnel or equipment.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">23. Limitation of Liability</h4>
                    <p>
                      To the fullest extent permitted by law, NES shall not be liable for any indirect, incidental, consequential, special, punitive, reputational, editorial, commercial, or opportunity-based loss arising out of or connected with media registration, accreditation, attendance, filming, reporting, access restrictions, schedule changes, or Event operations.
                    </p>
                    <p className="mt-2">
                      Without limiting the above, NES shall not be liable for:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>refusal or revocation of accreditation;</li>
                      <li>inability to access a specific person or area;</li>
                      <li>loss of coverage opportunity;</li>
                      <li>inability to livestream or broadcast;</li>
                      <li>cancellation or delay of a programmed segment; or</li>
                      <li>loss arising from third-party acts, venue decisions, internet issues, or security restrictions.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">24. Removal and Immediate Revocation</h4>
                    <p>
                      NES may immediately revoke credentials, remove media personnel, seize or neutralise access, restrict equipment, or require deletion of unlawfully captured restricted material where necessary for safety, privacy, legal compliance, competitive integrity, operational control, or Event reputation.
                    </p>
                    <p className="mt-2">
                      No prior warning is required in serious cases.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">25. Organiser Decisions</h4>
                    <p>
                      All decisions of NES regarding accreditation, access level, filming permissions, area restrictions, conduct, interviews, stage access, equipment, and enforcement of these Terms shall be final and binding.
                    </p>
                    <p className="mt-2">
                      NES is not required to provide an appeal process.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">26. Governing Law and Jurisdiction</h4>
                    <p>
                      These Terms shall be governed by and construed in accordance with the laws of India.
                    </p>
                    <p className="mt-2">
                      Subject to applicable law, courts having jurisdiction in Nagaland shall have exclusive jurisdiction over disputes arising out of or in connection with these Terms and media participation in the Event.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">27. Amendments</h4>
                    <p>
                      NES may modify, update, replace, or supplement these Terms at any time. The version published on the official website or otherwise communicated by NES shall apply to the relevant Event edition unless NES states otherwise.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">28. Acceptance</h4>
                    <p>
                      By checking the acceptance box, submitting a media application, collecting media credentials, or attending and covering the Event, the Media House confirms that it has read, understood, and agreed to these Terms, and that all submitted information is true and complete.
                    </p>
                  </section>

                  <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
                    <p>Nagaland Esports Society (NES) - Media House / Press Registration Terms and Conditions</p>
                    <p> 2026 Nagaland Esports Society (NES). All rights reserved.</p>
                  </div>
                </>
              ) : registrationType === 'sponsor' ? (
                <>
                  <h3 className="font-semibold text-base">Nagaland Esports Society (NES) - Sponsor Terms and Conditions</h3>
                  
                  <section>
                    <h4 className="font-semibold mb-2">Sponsor Terms and Conditions</h4>
                    <p>
                      Tech X Gaming Expo / TXG Nagaland
                    </p>
                    <p>
                      Organised by Nagaland Esports Society (NES)
                    </p>

                    <p>
                      Website: txg-nagaland.com
                    </p>
                    <p className="mt-2">
                      These Sponsor Terms and Conditions ("Terms") govern all sponsorships, partner packages, promotional collaborations, media partnerships, activation rights, exhibitor-linked sponsorships, and related commercial arrangements offered in connection with the Tech X Gaming Expo and any associated activities, tournaments, showcases, livestreams, networking events, dinners, digital campaigns, or ancillary programmes (collectively, the "Event").
                    </p>
                    <p className="mt-2">
                      The Event is organised and managed by Nagaland Esports Society, also referred to in these Terms as "NES", "Organiser", "we", "us", or "our".
                    </p>
                    <p className="mt-2">
                      By submitting a sponsorship enquiry, application, registration, booking, payment, artwork, activation request, campaign material, or by checking the acceptance box on our website, the sponsor entity and its representative (collectively, "Sponsor", "you", or "your") agree to be legally bound by these Terms.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">1. Eligibility and Authority</h4>
                    <p>
                      You represent and warrant that:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>you are at least 18 years of age and legally competent to enter into binding agreements;</li>
                      <li>if acting for a company, institution, brand, agency, or other entity, you are duly authorised to bind that entity;</li>
                      <li>all information submitted to NES is true, accurate, current, and complete; and</li>
                      <li>your participation, branding, products, content, and activities are lawful and do not infringe the rights of any third party.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">2. No Automatic Acceptance</h4>
                    <p>
                      Submission of a sponsorship form, expression of interest, enquiry, or payment does not automatically create a confirmed sponsorship.
                    </p>
                    <p className="mt-2">
                      A sponsorship shall be deemed confirmed only when all of the following have occurred:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>NES has expressly accepted the sponsorship in writing, including by email or written invoice confirmation;</li>
                      <li>the applicable sponsorship fee, deposit, or consideration has been received in cleared funds, if required; and</li>
                      <li>NES has allocated or approved the relevant package, category, rights, activation, booth, or branding inventory.</li>
                    </ol>
                    <p className="mt-2">
                      NES reserves the absolute right to accept, reject, refuse, defer, or cancel any sponsorship enquiry, application, or booking, with or without assigning reasons, to the fullest extent permitted by law.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">3. Sponsorship Packages and Benefits</h4>
                    <p>
                      All sponsorship rights, designations, deliverables, and visibility shall be strictly limited to the specific package or rights expressly confirmed in writing by NES.
                    </p>
                    <p className="mt-2">
                      Unless expressly confirmed in writing by NES:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>no exclusivity is granted;</li>
                      <li>no category lockout is granted;</li>
                      <li>no booth size, stage time, branding quantity, location, floor position, speaking slot, livestream placement, or promotional entitlement is guaranteed; and</li>
                      <li>no benefit shown in a brochure, deck, concept note, sales discussion, mock-up, verbal conversation, or draft layout shall be binding.</li>
                    </ol>
                    <p className="mt-2">
                      NES may offer sponsorship categories, rights, or custom packages at its discretion, and may revise package structure, commercial positioning, or deliverable formatting at any time before written confirmation.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">4. Fees, Payment, Taxes, and Non-Payment</h4>
                    <p>
                      All sponsorship fees:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>shall be paid in the manner, timeline, and currency specified by NES;</li>
                      <li>are exclusive of applicable taxes, duties, bank charges, withholding, and transfer costs unless expressly stated otherwise in writing; and</li>
                      <li>must be paid without deduction, counterclaim, set-off, withholding, or delay, except where required by mandatory law.</li>
                    </ol>
                    <p className="mt-2">
                      If payment is overdue, NES may, without liability:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>suspend or withhold sponsorship benefits;</li>
                      <li>reallocate inventory, branding space, category rights, or booth space to another party;</li>
                      <li>refuse installation, content display, or event access;</li>
                      <li>charge reasonable late fees or recovery costs where legally permissible; and</li>
                      <li>terminate the sponsorship without refund.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">5. Sponsor Materials, Branding, and IP Licence</h4>
                    <p>
                      The Sponsor grants NES a non-exclusive, worldwide, royalty-free licence during the promotional lifecycle of the Event and for reasonable post-event archival, reporting, and promotional use to use, reproduce, resize, crop, publish, display, and distribute the Sponsor's approved name, logo, trademarks, slogans, approved creatives, and brand assets solely for Event-related purposes.
                    </p>
                    <p className="mt-2">
                      The Sponsor represents and warrants that it owns or validly controls all rights necessary for such use.
                    </p>
                    <p className="mt-2">
                      NES may refuse, remove, resize, reposition, or decline to use any material that, in its sole judgment:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>is unlawful, defamatory, misleading, obscene, discriminatory, hateful, political, or otherwise inappropriate;</li>
                      <li>may expose NES, the Event, its attendees, partners, venue, or digital platforms to legal, reputational, technical, or commercial risk;</li>
                      <li>conflicts with Event standards, layout limitations, safety requirements, platform rules, or production constraints; or</li>
                      <li>infringes or may infringe intellectual property, image rights, privacy rights, publicity rights, or other third-party rights.</li>
                    </ol>
                    <p className="mt-2">
                      NES shall not be responsible for errors in artwork, spelling, claims, pricing, specifications, or any promotional content supplied by the Sponsor.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">6. Content Submission and Deadlines</h4>
                    <p>
                      All logos, videos, trailers, teasers, ads, creatives, speaker details, activation plans, booth requirements, branding files, and other submissions must be delivered in the format and by the deadlines specified by NES.
                    </p>
                    <p className="mt-2">
                      Failure to meet deadlines may result in:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>loss of certain benefits or placements;</li>
                      <li>exclusion from print, digital, stage, or screen-based integration;</li>
                      <li>use of fallback assets already on file, if any; or</li>
                      <li>cancellation of the relevant deliverable without refund or compensation.</li>
                    </ol>
                    <p className="mt-2">
                      NES is under no obligation to extend deadlines or rework creative materials supplied late or in unusable form.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">7. Booths, Activations, Installations, and On-Site Conduct</h4>
                    <p>
                      Where a sponsorship includes booth space, activation rights, or physical presence, the Sponsor shall:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>comply with all venue rules, safety requirements, fire regulations, exhibitor instructions, operational directives, and technical limitations;</li>
                      <li>keep its area staffed, safe, orderly, and professionally managed;</li>
                      <li>obtain all licences, permissions, and approvals necessary for its products, displays, demonstrations, sampling, contests, giveaways, recordings, or promotional activity;</li>
                      <li>not sub-license, sublet, transfer, assign, or share its space or rights without prior written consent from NES;</li>
                      <li>not use hazardous materials, obstruct aisles, exceed approved dimensions, overload electrical supply, create excessive noise, or interfere with other sponsors, exhibitors, or Event operations; and</li>
                      <li>promptly comply with any instruction issued by NES, venue management, security personnel, production teams, or authorised Event representatives.</li>
                    </ol>
                    <p className="mt-2">
                      NES may stop, suspend, remove, or modify any installation, personnel, product, display, or activation that it considers unsafe, non-compliant, misleading, offensive, disruptive, or damaging to the Event.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">8. Sponsor Responsibilities for Claims, Promotions, and Sales</h4>
                    <p>
                      The Sponsor shall be solely responsible for all claims, promises, advertisements, offers, discounts, contests, sales promotions, product warranties, product safety, customer service, and post-sale obligations relating to its own goods, services, campaigns, or statements.
                    </p>
                    <p className="mt-2">
                      NES does not verify and shall not be responsible for the legality, accuracy, regulatory compliance, or commercial performance of Sponsor claims, products, or services.
                    </p>
                    <p className="mt-2">
                      The Sponsor shall not make any statement implying that NES has independently certified, endorsed, approved, guaranteed, or audited the Sponsor or its products unless NES has expressly authorised such statement in writing.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">9. No Guarantee of Attendance, Reach, Outcomes, or Returns</h4>
                    <p>
                      Any references to footfall, livestream reach, impressions, college participation, media exposure, audience profile, business opportunities, influencer reach, digital visibility, or expected engagement are estimates, targets, projections, or promotional indicators only.
                    </p>
                    <p className="mt-2">
                      NES makes no warranty or guarantee regarding:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>attendee numbers;</li>
                      <li>sponsor leads or conversions;</li>
                      <li>media coverage;</li>
                      <li>livestream viewership;</li>
                      <li>sales, revenue, or return on investment;</li>
                      <li>competitor presence or absence;</li>
                      <li>exact schedule adherence; or</li>
                      <li>the commercial outcome of any sponsorship.</li>
                    </ol>
                    <p className="mt-2">
                      The Sponsor acknowledges that Event conditions may change and that sponsorship value may be influenced by factors beyond NES's control.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">10. Programme Changes, Floorplan Changes, and Operational Discretion</h4>
                    <p>
                      NES reserves the right at any time to alter, substitute, relocate, postpone, curtail, expand, reduce, reschedule, or otherwise modify any aspect of the Event, including:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>dates and timing;</li>
                      <li>venue, rooms, stages, zones, or floorplans;</li>
                      <li>tournament structure, match order, titles, finals lineup, or livestream format;</li>
                      <li>speaker sessions, panels, showcases, ceremonies, or B2B activities;</li>
                      <li>branding positions, inventory allocation, booth placement, traffic flow, or technical setup; and</li>
                      <li>any other operational or commercial feature of the Event.</li>
                    </ol>
                    <p className="mt-2">
                      Such changes shall not entitle the Sponsor to termination, refund, compensation, damages, or price reduction, provided NES acts in good faith and, where reasonably practicable, endeavours to provide substantially comparable value.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">11. Cancellations by Sponsor</h4>
                    <p>
                      If the Sponsor cancels, withdraws, abandons, downsizes, fails to participate, fails to supply materials, fails to attend, or otherwise elects not to utilise confirmed sponsorship rights, all amounts paid shall be non-refundable unless NES expressly agrees otherwise in writing.
                    </p>
                    <p className="mt-2">
                      If any balance remains unpaid at the time of Sponsor cancellation, NES may demand and recover the unpaid balance together with any reasonable recovery costs, loss of committed inventory value, and direct third-party costs already incurred on the Sponsor's behalf, to the extent permitted by law.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">12. Cancellation, Suspension, or Termination by NES</h4>
                    <p>
                      NES may cancel, suspend, or terminate a sponsorship immediately, without refund or liability, if:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>the Sponsor breaches these Terms;</li>
                      <li>payment is delayed or disputed;</li>
                      <li>the Sponsor provides false, misleading, or incomplete information;</li>
                      <li>the Sponsor engages in unlawful, unethical, unsafe, offensive, abusive, discriminatory, infringing, deceptive, or reputationally harmful conduct;</li>
                      <li>the Sponsor's presence, messaging, or activity creates actual or potential legal, operational, platform, political, community, or safety risk; or</li>
                      <li>continuation of the sponsorship is, in NES's reasonable opinion, not in the best interests of the Event, attendees, venue, partners, or NES.</li>
                    </ol>
                    <p className="mt-2">
                      NES may also refuse access, remove persons, remove content, or withdraw benefits where necessary for safety, compliance, reputation, logistics, or Event integrity.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">13. Force Majeure</h4>
                    <p>
                      NES shall not be liable for any delay, failure, interruption, reduction, cancellation, suspension, postponement, or modification arising from events beyond its reasonable control, including but not limited to:
                    </p>
                    <p className="mt-2">
                      natural disasters, severe weather, epidemic or pandemic conditions, public health advisories, war, terrorism, civil unrest, labour disruption, travel disruption, supply failure, power outage, internet or network failure, venue unavailability, governmental restriction, licensing issue, law enforcement direction, judicial order, or any other force majeure event.
                    </p>
                    <p className="mt-2">
                      In such circumstances, NES may, at its sole discretion:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>reschedule the Event;</li>
                      <li>substitute benefits;</li>
                      <li>convert certain benefits into digital or deferred rights;</li>
                      <li>issue credit toward a future edition; or</li>
                      <li>provide such other remedy, if any, as NES considers commercially reasonable.</li>
                    </ol>
                    <p className="mt-2">
                      To the fullest extent permitted by law, no additional compensation, consequential damages, or indirect loss shall be payable.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">14. Insurance and Risk</h4>
                    <p>
                      The Sponsor participates at its own risk and is responsible for its own personnel, contractors, property, equipment, products, samples, displays, promotional items, stock, data devices, and valuables.
                    </p>
                    <p className="mt-2">
                      NES strongly recommends that each Sponsor obtain adequate insurance, including public liability, property damage, theft, transit, employee coverage, and any product-specific insurance appropriate to its activity.
                    </p>
                    <p className="mt-2">
                      NES shall not be liable for any loss, theft, damage, destruction, delay, injury, or business interruption affecting Sponsor property or personnel, except to the extent caused by NES's proven wilful misconduct and only to the extent not excluded by law.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">15. Indemnity</h4>
                    <p>
                      The Sponsor shall defend, indemnify, and hold harmless NES, its office-bearers, organisers, staff, contractors, volunteers, affiliates, venue partners, production partners, digital partners, and representatives from and against all claims, actions, liabilities, penalties, losses, damages, costs, and expenses, including reasonable legal fees, arising out of or related to:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>the Sponsor's breach of these Terms;</li>
                      <li>Sponsor products, services, statements, promotions, activations, contests, sampling, sales, or conduct;</li>
                      <li>infringement or alleged infringement of intellectual property or other rights;</li>
                      <li>personal injury, death, property damage, product defect, or safety incident connected to the Sponsor;</li>
                      <li>misuse of personal data collected by the Sponsor; or</li>
                      <li>any act or omission of the Sponsor, its employees, agents, contractors, agencies, influencers, or representatives.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">16. Limitation of Liability</h4>
                    <p>
                      To the fullest extent permitted by law:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>NES shall not be liable for any indirect, incidental, consequential, special, punitive, or exemplary damages, including loss of profit, loss of business, loss of revenue, loss of opportunity, loss of goodwill, loss of data, or loss of anticipated savings;</li>
                      <li>NES shall not be liable for any acts or omissions of the venue, third-party vendors, broadcasters, internet providers, livestream platforms, payment processors, or other third parties; and</li>
                      <li>NES's total aggregate liability arising out of or in connection with the sponsorship, whether in contract, tort, negligence, statutory duty, or otherwise, shall not exceed the net sponsorship fee actually received by NES from the Sponsor for the specific package giving rise to the claim.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">17. Data Protection and Lead Collection</h4>
                    <p>
                      If the Sponsor collects, records, stores, or processes any personal data from attendees, participants, staff, creators, students, vendors, or any other individuals in connection with the Event, the Sponsor shall be solely responsible for compliance with all applicable privacy, data protection, consent, notice, and security requirements.
                    </p>
                    <p className="mt-2">
                      Unless expressly agreed otherwise in writing:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>NES does not transfer attendee databases to Sponsors;</li>
                      <li>any data independently collected by the Sponsor shall be collected lawfully and transparently;</li>
                      <li>the Sponsor shall provide all required notices and obtain all necessary consents; and</li>
                      <li>the Sponsor shall indemnify NES for any data-related claim arising from the Sponsor's collection or use of data.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">18. Media, Recording, and Publicity</h4>
                    <p>
                      NES may photograph, film, livestream, record, or otherwise capture the Event, including Sponsor booths, personnel, signage, products, stage appearances, activations, and audience interactions, and may use such material for archival, reporting, promotional, documentary, commercial, and future Event marketing purposes without compensation to the Sponsor.
                    </p>
                    <p className="mt-2">
                      The Sponsor shall not record, broadcast, livestream, commercially exploit, or distribute Event footage, stage proceedings, tournament feeds, or protected Event content beyond its own booth or approved activation area unless expressly authorised in writing by NES.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">19. Exclusivity</h4>
                    <p>
                      No exclusivity, territorial protection, category exclusivity, or competitor restriction applies unless expressly stated in a written agreement signed or approved by NES.
                    </p>
                    <p className="mt-2">
                      NES may accept multiple sponsors from the same or related sectors and may structure sponsor inventory at its sole commercial discretion.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">20. Assignment and Subcontracting</h4>
                    <p>
                      The Sponsor may not assign, novate, transfer, sub-license, or otherwise deal with any sponsorship rights or obligations without prior written consent from NES.
                    </p>
                    <p className="mt-2">
                      NES may subcontract operational functions, production, media handling, security, installation, digital deployment, event management, livestreaming, and fulfilment responsibilities as it considers appropriate.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">21. Relationship of Parties</h4>
                    <p>
                      Nothing in these Terms creates any partnership, joint venture, agency, employment, fiduciary relationship, or authority for either party to bind the other, except as expressly set out in writing.
                    </p>
                    <p className="mt-2">
                      The Sponsor may not represent itself as owning, controlling, or officially speaking on behalf of the Event or NES.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">22. Confidentiality</h4>
                    <p>
                      Any commercial terms, pricing, negotiations, sponsor-specific arrangements, internal layouts, planning documents, operational data, or non-public Event information shared by NES shall be treated as confidential and shall not be disclosed without prior written approval, except where required by law.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">23. Entire Agreement and Precedence</h4>
                    <p>
                      These Terms, together with any written sponsorship confirmation, invoice, package sheet, and specific written addendum issued by NES, constitute the entire agreement between the parties concerning the sponsorship.
                    </p>
                    <p className="mt-2">
                      In the event of inconsistency, the following order of precedence shall apply:
                    </p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>signed or expressly approved written addendum from NES;</li>
                      <li>written sponsorship confirmation or invoice issued by NES;</li>
                      <li>these Terms;</li>
                      <li>brochure, deck, website copy, or promotional material.</li>
                    </ol>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">24. Severability</h4>
                    <p>
                      If any provision of these Terms is held unlawful, invalid, or unenforceable, the remaining provisions shall remain in full force and effect.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">25. Waiver</h4>
                    <p>
                      Failure or delay by NES to enforce any right or remedy shall not operate as a waiver of that right or remedy.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">26. Governing Law and Jurisdiction</h4>
                    <p>
                      These Terms shall be governed by and construed in accordance with the laws of India.
                    </p>
                    <p className="mt-2">
                      Subject to applicable law, the courts having jurisdiction in Nagaland shall have exclusive jurisdiction over any dispute arising out of or relating to these Terms or the sponsorship relationship.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">27. Amendments</h4>
                    <p>
                      NES may update or revise these Terms from time to time. The version in force at the time of Sponsor acceptance shall apply unless a later version is expressly agreed in writing.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">28. Acceptance</h4>
                    <p>
                      By checking the acceptance box on the website, submitting a sponsorship form, or proceeding with sponsorship registration, payment, or fulfilment, the Sponsor confirms that it has read, understood, and agreed to these Terms and that the person accepting them is duly authorised to bind the Sponsor.
                    </p>
                  </section>

                  <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
                    <p>Nagaland Esports Society (NES) - Sponsor Terms and Conditions</p>
                    <p> 2026 Nagaland Esports Society (NES). All rights reserved.</p>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-base">General Terms and Conditions</h3>
                  <p>
                    Please review the terms and conditions for your registration type.
                  </p>
                  <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
                    <p>Nagaland Esports Society (NES) - General Terms and Conditions</p>
                    <p> 2026 Nagaland Esports Society (NES). All rights reserved.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Checkbox
            id="terms-checkbox"
            checked={accepted}
            onChange={handleCheckboxChange}
            disabled={!hasScrolledToBottom}
            className="mt-1 h-5 w-5 shrink-0 border-primary"
          />
          <Label 
            htmlFor="terms-checkbox" 
            className={`text-sm ${!hasScrolledToBottom ? 'text-muted-foreground' : ''}`}
          >
            {hasScrolledToBottom 
              ? registrationType === 'mini-tournament' 
                ? "I confirm that I have read and agree to the TXG Nagaland Mini Tournaments Terms and Conditions of Nagaland Esports Society (NES). I confirm that the information submitted is true, that I am eligible to participate, and that I am authorised to register where applicable. *" 
                : registrationType === 'cosplayer'
                ? "I confirm that I have read and agree to the Cosplay Competition Terms and Conditions of Nagaland Esports Society (NES). I confirm that the information submitted is true, that I am eligible to participate, and that I am authorised to register where applicable. *"
                : registrationType === 'vendor'
                ? "I confirm that I have read and agree to the Vendor Terms and Conditions of Nagaland Esports Society (NES). I confirm that the information submitted is true, that I am eligible to participate, and that I am authorised to register where applicable. *"
                : registrationType === 'exhibitor'
                ? "I confirm that I have read and agree to the Exhibitor Terms and Conditions of Nagaland Esports Society (NES). I confirm that the information submitted is true, that I am eligible to participate, and that I am authorised to register where applicable. *"
                : registrationType === 'media'
                ? "I confirm that I have read and agree to the Media House / Press Registration Terms and Conditions of Nagaland Esports Society (NES). I confirm that the information submitted is true, that I am eligible to participate, and that I am authorised to register where applicable. *"
                : registrationType === 'sponsor'
                ? "I confirm that I have read and agree to the Sponsor Terms and Conditions of Nagaland Esports Society (NES). I confirm that the information submitted is true, that I am eligible to participate, and that I am authorised to register where applicable. *"
                : "I confirm that I have read and agree to the Inter-College MOBA 5V5 Tournament Terms and Conditions of Nagaland Esports Society (NES). I confirm that the information submitted is true, that I am eligible to participate, and that I am authorised to register and represent my team/institution where applicable. *"
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
