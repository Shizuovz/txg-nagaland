import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ isOpen, onClose }) => {
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

  // Reset scroll state when modal opens
  useEffect(() => {
    if (isOpen && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
      setHasScrolledToBottom(false);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white font-['Neiko'] tracking-wider">
            Terms of Service
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div 
          className="flex-1 overflow-y-auto p-6 text-sm text-gray-300 font-['Nonito'] leading-relaxed"
          ref={scrollAreaRef}
          onScroll={handleScroll}
        >
          <div className="space-y-6 max-w-none">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white font-['Neiko'] mb-2">
                TERMS OF SERVICE
              </h1>
              <p className="text-gray-400">
                Tech X Gaming Expo / TXG Nagaland
              </p>
              <p className="text-gray-400">
                Hosted and Organised by Nagaland Esports Society (NES)
              </p>
              {/* <p className="text-gray-400 mt-2">
                Website and Platform Terms for TXG Expo
              </p> */}
            </div>

            {/* Main Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white font-['Neiko']">
                TXG Nagaland - Terms of Service
              </h2>
            </div>

            {/* Terms Introduction */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                Terms of Service
              </h3>
              <p className="mb-3">
                Tech X Gaming Expo / TXG Nagaland
              </p>
              <p className="mb-3">
                Hosted and Organised by Nagaland Esports Society (NES)
              </p>
            
              <p className="mb-4">
                These Terms of Service ("Terms") govern your access to and use of Tech X Gaming Expo / TXG Nagaland website, registration portals, forms, pages, content, digital services, and related online functionality (collectively, the "Platform").
              </p>
              <p className="mb-4">
                The Platform is operated by Nagaland Esports Society (NES) ("NES", "we", "us", or "our") in connection with Tech X Gaming Expo / TXG Nagaland ("TXG" or the "Event").
              </p>
              <p className="mb-4">
                By accessing or using Platform, clicking to accept these Terms, submitting a form, making a booking, completing a registration, uploading materials, purchasing tickets, requesting accreditation, or otherwise using any part of the Platform, you agree to be legally bound by these Terms.
              </p>
              <p>
                If you do not agree to these Terms, you must not use the Platform.
              </p>
            </section>

            {/* Section 1 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                1. About These Terms
              </h3>
              <p className="mb-3">
                These Terms govern your general use of the Platform as a website and online service.
              </p>
              <p className="mb-3">
                These Terms are separate from and in addition to any specific rules, policies, or participation terms that may apply to particular TXG activities, including but not limited to:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
                <li>tournament registrations;</li>
                <li>sponsor registrations;</li>
                <li>exhibitor registrations;</li>
                <li>vendor registrations;</li>
                <li>cosplay registrations;</li>
                <li>media or press registrations;</li>
                <li>ticketing or entry terms;</li>
                <li>promotional campaigns;</li>
                <li>contests or giveaways; and</li>
                <li>other Event-specific programmes or categories.</li>
              </ol>
              <p>
                Where specific additional terms apply to a particular service, registration, or category, those additional terms shall apply together with these Terms. If there is any inconsistency, the more specific additional terms shall prevail for that particular service or category to the extent of the inconsistency.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                2. Eligibility to Use Platform
              </h3>
              <p className="mb-3">
                By using the Platform, you represent and warrant that:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
                <li>you are legally capable of entering into binding obligations;</li>
                <li>you are using the Platform lawfully and for legitimate purposes;</li>
                <li>all information you provide is true, accurate, current, and complete; and</li>
                <li>your use of the Platform does not violate any applicable law, third-party right, or binding obligation.</li>
              </ol>
              <p>
                If you are below the age of legal majority or otherwise not authorised to enter into binding obligations for a particular registration or transaction, you may use the relevant part of the Platform only through a parent, guardian, institution, or duly authorised representative where permitted by us.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                3. Electronic Acceptance and Communications
              </h3>
              <p className="mb-3">
                The Platform may use electronic forms, digital checkboxes, online submissions, email confirmations, and other electronic methods to create, record, confirm, or administer registrations, requests, transactions, and related interactions.
              </p>
              <p className="mb-3">You agree that:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
                <li>electronic acceptance may be treated as your binding agreement where legally valid;</li>
                <li>communications sent by us electronically may satisfy legal communication requirements where permitted by law;</li>
                <li>records generated through the Platform may be used for administrative, evidentiary, compliance, and enforcement purposes; and</li>
                <li>it is your responsibility to ensure that your contact details are correct and monitored.</li>
              </ol>
            </section>

            {/* Section 4 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                4. Changes to Platform and Event Information
              </h3>
              <p className="mb-3">
                We may modify, suspend, restrict, expand, redesign, or discontinue any part of the Platform at any time, with or without notice.
              </p>
              <p className="mb-3">
                We may also update, revise, postpone, cancel, relocate, or otherwise change any Event-related information displayed on the Platform, including but not limited to:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
                <li>schedules;</li>
                <li>programme details;</li>
                <li>tournament structures;</li>
                <li>dates or timings;</li>
                <li>venue details;</li>
                <li>registration categories;</li>
                <li>pricing;</li>
                <li>eligibility requirements;</li>
                <li>access limits; and</li>
                <li>promotional materials.</li>
              </ol>
              <p className="mb-3">
                The Platform may contain draft, planned, proposed, estimated, or evolving Event information. Unless expressly confirmed by us in writing for a specific transaction or participation right, such information is subject to change.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                5. No Automatic Right to Registration, Booking, or Participation
              </h3>
              <p className="mb-3">
                Access to the Platform does not by itself entitle you to:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
                <li>register successfully;</li>
                <li>obtain a ticket;</li>
                <li>obtain accreditation;</li>
                <li>reserve a slot;</li>
                <li>secure sponsorship;</li>
                <li>secure vendor or exhibitor space;</li>
                <li>participate in a tournament;</li>
                <li>appear on stage;</li>
                <li>obtain media access; or</li>
                <li>obtain any specific Event-related right.</li>
              </ol>
              <p className="mb-3">
                Any registration, application, enquiry, payment, or submission made through the Platform remains subject to our review, acceptance, availability, verification, category rules, operational constraints, and any additional applicable terms.
              </p>
              <p>
                We reserve the right to reject, cancel, suspend, revoke, or refuse any registration, booking, request, application, or participation right at any time, with or without assigning reasons, to the fullest extent permitted by law.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                6. Accounts, Forms, and Submitted Information
              </h3>
              <p className="mb-3">
                Where the Platform permits account creation, form submission, registration, uploads, or profile management, you agree that:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
                <li>you will provide only accurate and complete information;</li>
                <li>you will promptly update information where necessary;</li>
                <li>you will not impersonate any person or entity;</li>
                <li>you will not submit false, misleading, fraudulent, or manipulated information;</li>
                <li>you will not create registrations or submissions on behalf of others without authority; and</li>
                <li>you are responsible for all activity carried out using your account, email, device, or access credentials, to the extent caused by your acts or omissions.</li>
              </ol>
              <p>
                We may request documents, IDs, authorisation letters, proof of age, proof of affiliation, business information, or other verification materials where reasonably necessary.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                7. Acceptable Use
              </h3>
              <p className="mb-3">
                You may use the Platform only for lawful, proper, and authorised purposes.
              </p>
              <p className="mb-3">You must not, and must not attempt to:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
                <li>use the Platform in breach of any law or regulation;</li>
                <li>interfere with the security, integrity, or operation of the Platform;</li>
                <li>gain unauthorised access to any system, account, data, or restricted area;</li>
                <li>scrape, copy, harvest, or extract data from the Platform by automated or unauthorised means;</li>
                <li>upload malware, spyware, malicious code, harmful scripts, or destructive content;</li>
                <li>overload, disrupt, disable, or impair the Platform or its infrastructure;</li>
                <li>submit spam, unsolicited promotions, chain messages, or mass submissions;</li>
                <li>impersonate NES, TXG, staff, officials, partners, or another user;</li>
                <li>misrepresent your identity, organisation, affiliation, authority, or eligibility;</li>
                <li>use the Platform to publish or transmit unlawful, defamatory, obscene, hateful, discriminatory, violent, threatening, or infringing material;</li>
                <li>infringe intellectual property, privacy, publicity, confidentiality, or other rights;</li>
                <li>attempt to bypass our registration controls, eligibility checks, or payment flows; or</li>
                <li>use the Platform in any manner that, in our opinion, may expose NES, Event, users, or third parties to legal, technical, reputational, or security risk.</li>
              </ol>
            </section>

            {/* Section 8 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                8. Uploaded Materials and User Content
              </h3>
              <p className="mb-3">
                Where you upload or submit any material through the Platform, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                <li>names;</li>
                <li>logos;</li>
                <li>photographs;</li>
                <li>artwork;</li>
                <li>reference images;</li>
                <li>roster details;</li>
                <li>IDs or proof documents;</li>
                <li>forms;</li>
                <li>portfolio materials;</li>
                <li>menus;</li>
                <li>product lists;</li>
                <li>sponsor creatives;</li>
                <li>media information; or</li>
                <li>other content,</li>
              </ul>
              <p className="mb-3">you represent and warrant that:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
                <li>you own or control necessary rights to submit that material;</li>
                <li>material is accurate, lawful, and not misleading;</li>
                <li>material does not infringe third-party rights; and</li>
                <li>material does not contain malware, hidden code, or harmful components.</li>
              </ol>
              <p className="mb-3">
                You grant NES a non-exclusive, worldwide, royalty-free right to host, store, reproduce, process, review, format, and use such materials as reasonably necessary to operate the Platform, administer the Event, verify applications, communicate with you, provide Event services, and carry out related promotional, archival, reporting, and operational purposes where applicable.
              </p>
              <p>
                We may refuse, remove, block, or disable any submitted material at our discretion.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                9. Intellectual Property
              </h3>
              <p className="mb-3">
                Unless otherwise stated, the Platform and all content made available through it, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                <li>TXG and NES names;</li>
                <li>logos;</li>
                <li>branding;</li>
                <li>graphics;</li>
                <li>layout;</li>
                <li>text;</li>
                <li>designs;</li>
                <li>audio-visual content;</li>
                <li>event materials;</li>
                <li>website structure;</li>
                <li>downloadable materials; and</li>
                <li>related intellectual property,</li>
              </ul>
              <p className="mb-3">
                are owned by NES, its licensors, or its content providers and are protected by applicable intellectual property laws.
              </p>
              <p className="mb-3">
                You may not, except as expressly permitted by us in writing or by law:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
                <li>copy;</li>
                <li>reproduce;</li>
                <li>modify;</li>
                <li>publish;</li>
                <li>distribute;</li>
                <li>sell;</li>
                <li>sublicense;</li>
                <li>frame;</li>
                <li>mirror;</li>
                <li>adapt; or</li>
                <li>commercially exploit</li>
              </ol>
              <p>
                any part of the Platform or its content.
              </p>
              <p className="mt-3">
                Limited personal, non-commercial viewing and use for legitimate registration, participation, and information purposes is permitted.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                10. Tickets, Fees, Payments, and Transactions
              </h3>
              <p className="mb-3">
                Where the Platform enables purchases, paid registrations, booking requests, or other fee-based actions:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
                <li>all prices, charges, and fees are subject to change unless already confirmed by us for a completed transaction;</li>
                <li>all payments are subject to verification and successful processing;</li>
                <li>additional taxes, gateway charges, bank charges, or transfer costs may apply;</li>
                <li>refunds, cancellations, credits, and transferability shall be governed by specific applicable terms for the relevant category, ticket, registration, or service; and</li>
                <li>we may cancel, suspend, or reverse access, bookings, or participation where payment is incomplete, disputed, reversed, fraudulent, or otherwise invalid.</li>
              </ol>
              <p>
                Where third-party payment services are used, your transaction may also be subject to the payment provider's terms and privacy practices.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                11. Third-Party Services and Links
              </h3>
              <p className="mb-3">
                The Platform may contain links to or integrations with third-party websites, payment gateways, ticketing tools, streaming platforms, game services, social media platforms, map services, analytics tools, or other external services.
              </p>
              <p className="mb-3">
                We do not own or control all third-party services, and we are not responsible for:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
                <li>their availability;</li>
                <li>their security;</li>
                <li>their privacy practices;</li>
                <li>their content;</li>
                <li>their terms; or</li>
                <li>any transaction or interaction you have with them.</li>
              </ol>
              <p>
                Your use of third-party services is at your own risk and may be governed by their own terms and policies.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                12. Event Media and Public-Facing Participation
              </h3>
              <p className="mb-3">
                The Event may involve livestreaming, photography, filming, interviews, broadcasts, social media publication, and other public-facing coverage.
              </p>
              <p className="mb-3">
                If you use the Platform to register for public-facing Event activities, you acknowledge that participation may involve your name, team name, organisation name, booth name, likeness, image, voice, gameplay, costume, or other participation-related material being captured and used in accordance with our applicable event rules, participation terms, and privacy policy.
              </p>
              <p>
                Nothing in these Terms limits any more specific media consent or media-use provisions applicable to a particular category or registration.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                13. Privacy
              </h3>
              <p className="mb-3">
                Your use of the Platform is also subject to our Privacy Policy.
              </p>
              <p>
                By using the Platform, you acknowledge that your personal information may be collected, used, stored, and processed in accordance with our Privacy Policy and as otherwise permitted by law and any applicable additional terms.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                14. No Warranty
              </h3>
              <p className="mb-3">
                To the fullest extent permitted by law, the Platform is provided on an "as is" and "as available" basis.
              </p>
              <p className="mb-3">
                We do not warrant that the Platform will be:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
                <li>uninterrupted;</li>
                <li>error-free;</li>
                <li>secure at all times;</li>
                <li>free from delay;</li>
                <li>free from harmful components;</li>
                <li>fully compatible with every device, browser, or network;</li>
                <li>continuously available; or</li>
                <li>accurate, complete, or up to date in every respect at every moment.</li>
              </ol>
              <p>
                We may correct errors, omissions, or inaccuracies at any time, but we are under no obligation to keep every page continuously current.
              </p>
            </section>

            {/* Section 15 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                15. Disclaimer of Event Outcome and Availability
              </h3>
              <p className="mb-3">
                To the fullest extent permitted by law, we make no guarantee regarding:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
                <li>ticket availability;</li>
                <li>registration success;</li>
                <li>sponsor acceptance;</li>
                <li>exhibitor or vendor acceptance;</li>
                <li>tournament participation;</li>
                <li>schedule continuity;</li>
                <li>event timing;</li>
                <li>venue access;</li>
                <li>live coverage;</li>
                <li>attendance numbers;</li>
                <li>commercial results; or</li>
                <li>any outcome, visibility, or benefit that a user hopes to obtain from using the Platform.</li>
              </ol>
              <p>
                The Platform is an administrative and informational tool, not a guarantee of any particular commercial, competitive, media, or participation outcome.
              </p>
            </section>

            {/* Section 16 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                16. Suspension and Termination
              </h3>
              <p className="mb-3">
                We may, at any time and without liability, suspend, restrict, block, cancel, or terminate your access to all or any part of the Platform, or reject or remove any submission, if:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
                <li>you breach these Terms;</li>
                <li>you breach any category-specific terms;</li>
                <li>your conduct creates legal, technical, operational, safety, or reputational risk;</li>
                <li>we suspect fraud, impersonation, abuse, scraping, or unauthorised access;</li>
                <li>information provided by you appears false, incomplete, misleading, or unverifiable; or</li>
                <li>suspension or termination is otherwise necessary to protect NES, TXG, users, partners, venue, or the public.</li>
              </ol>
              <p>
                Termination or suspension of Platform access does not limit any other remedy available to us.
              </p>
            </section>

            {/* Section 17 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                17. Indemnity
              </h3>
              <p className="mb-3">
                You agree to defend, indemnify, and hold harmless NES, its office-bearers, organisers, staff, volunteers, contractors, affiliates, partners, sponsors, venue partners, licensors, and representatives from and against all claims, actions, losses, damages, liabilities, costs, and expenses, including reasonable legal fees, arising out of or related to:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
                <li>your use of the Platform;</li>
                <li>your breach of these Terms;</li>
                <li>your breach of any additional applicable terms;</li>
                <li>your submitted materials or content;</li>
                <li>your unlawful conduct;</li>
                <li>your infringement of third-party rights; or</li>
                <li>any misrepresentation, false statement, or unauthorised act by you.</li>
              </ol>
            </section>

            {/* Section 18 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                18. Limitation of Liability
              </h3>
              <p className="mb-3">
                To the fullest extent permitted by law, NES shall not be liable for any indirect, incidental, special, consequential, exemplary, punitive, reputational, or opportunity-based loss arising out of or in connection with:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
                <li>your use of or inability to use the Platform;</li>
                <li>access delays or interruptions;</li>
                <li>technical failure;</li>
                <li>loss of data;</li>
                <li>rejection of registrations or applications;</li>
                <li>schedule changes;</li>
                <li>third-party service failure;</li>
                <li>unauthorised access not caused by our proven wilful misconduct; or</li>
                <li>any event-related change, postponement, suspension, or cancellation.</li>
              </ol>
              <p className="mb-3">
                To the fullest extent permitted by law, our aggregate liability arising out of or in connection with the Platform shall not exceed the amount, if any, actually paid by you directly to NES for the specific Platform-related service giving rise to the claim, or INR 5,000, whichever is lower, unless a different amount is required by applicable law.
              </p>
              <p>
                Nothing in these Terms excludes liability to the extent such exclusion is not permitted by law.
              </p>
            </section>

            {/* Section 19 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                19. Force Majeure
              </h3>
              <p className="mb-3">
                We shall not be liable for any delay, interruption, suspension, restriction, failure, or inability to perform arising from events beyond our reasonable control, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>natural disasters;</li>
                <li>severe weather;</li>
                <li>pandemic or epidemic-related disruptions;</li>
                <li>civil unrest;</li>
                <li>labour issues;</li>
                <li>governmental restrictions;</li>
                <li>venue unavailability;</li>
                <li>technical failure;</li>
                <li>cyber incidents;</li>
                <li>internet outages;</li>
                <li>platform outages;</li>
                <li>payment network failure;</li>
                <li>power disruptions; or</li>
                <li>third-party service interruptions.</li>
              </ul>
              <p>
                In such circumstances, we may suspend or modify the Platform or related Event services without liability.
              </p>
            </section>

            {/* Section 20 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                20. Governing Law and Jurisdiction
              </h3>
              <p className="mb-3">
                These Terms shall be governed by and construed in accordance with laws of India.
              </p>
              <p>
                Subject to applicable law, courts having jurisdiction in Nagaland shall have exclusive jurisdiction over disputes arising out of or in connection with these Terms and your use of the Platform.
              </p>
            </section>

            {/* Section 21 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                21. Modifications to These Terms
              </h3>
              <p className="mb-3">
                We may revise, update, replace, or supplement these Terms from time to time.
              </p>
              <p>
                The updated version will apply from the date it is posted on the Platform or otherwise communicated by us, unless we state otherwise. Your continued use of the Platform after updated Terms become effective constitutes your acceptance of the revised Terms.
              </p>
            </section>

            {/* Section 22 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                22. Severability
              </h3>
              <p>
                If any provision of these Terms is found to be unlawful, invalid, or unenforceable, remaining provisions shall remain in full force and effect to the extent permitted by law.
              </p>
            </section>

            {/* Section 23 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                23. Waiver
              </h3>
              <p>
                Any failure or delay by us to enforce any provision of these Terms shall not operate as a waiver of that provision or any other right.
              </p>
            </section>

            {/* Section 24 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                24. Entire Agreement for Platform Use
              </h3>
              <p>
                These Terms, together with our Privacy Policy and any additional applicable rules, policies, or category-specific terms expressly incorporated by reference, constitute the entire agreement between you and NES regarding your use of the Platform.
              </p>
            </section>

            {/* Section 25 */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                25. Contact
              </h3>
              <p className="mb-3">
                For questions regarding these Terms, please contact:
              </p>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <p>Nagaland Esports Society (NES)</p>
                <p>Email: nes@txg-nagaland.com</p>
                <p>Address: 3rd mile Dimapur Nagaland 797115 Temoa building landmark ARTC, Plot 421</p>
                <p>Website: txg-nagaland.com</p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-6 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#50D075] hover:bg-[#45b865] text-white rounded-lg font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
