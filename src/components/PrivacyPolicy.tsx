import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
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
            Privacy Policy
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
                Privacy Policy
              </h1>
              <p className="text-gray-400">
                Tech X Gaming Expo / TXG Nagaland
              </p>
              <p className="text-gray-400">
                Organised by Nagaland Esports Society (NES)
              </p>
              {/* <p className="text-gray-400 mt-2">
                Effective Date: [Insert Date]
              </p> */}
            </div>

            {/* Introduction */}
            <section>
              <p className="mb-4">
                This Privacy Policy ("Policy") explains how Nagaland Esports Society (NES), as organiser of Tech X Gaming Expo / TXG Nagaland ("TXG", "Event", "we", "us", or "our"), collects, uses, stores, shares, and otherwise processes personal information through the TXG website, online forms, registration systems, communications, and related event operations.
              </p>
              <p className="mb-4">
                This Policy applies to personal information collected through the TXG website and in connection with TXG-related registrations, enquiries, applications, ticketing, tournament participation, cosplay registration, exhibitor registration, sponsor enquiries, vendor registration, media registration, college participation, and related event activities.
              </p>
              <p>
                By accessing the website, submitting forms, registering for any TXG activity, communicating with us, or otherwise interacting with us, you acknowledge that your information may be processed in accordance with this Policy.
              </p>
            </section>

            {/* Section 1: Who We Are */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                1. Who We Are
              </h3>
              <p className="mb-3">
                TXG Nagaland is organised by Nagaland Esports Society (NES).
              </p>
              <p className="mb-3">
                For the purposes of this Policy, NES is the entity responsible for determining how and why personal information is processed in connection with the website and Event operations.
              </p>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <p className="font-semibold text-white mb-2">Contact for privacy matters:</p>
                <p>Nagaland Esports Society (NES)</p>
                <p>Email: info@txg-nagaland.com</p>
                <p>Address: 3rd mile Dimapur Nagaland 797115 Temoa building landmark ARTC</p>
                <p>Website: www.txg-nagaland.com</p>
              </div>
            </section>

            {/* Section 2: Scope */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                2. Scope of This Policy
              </h3>
              <p className="mb-3">
                This Policy applies to personal information collected from:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>website visitors;</li>
                <li>ticket purchasers or attendees;</li>
                <li>tournament players, teams, captains, substitutes, coaches, and managers;</li>
                <li>college representatives and institutional coordinators;</li>
                <li>cosplay applicants and participants;</li>
                <li>sponsors, partners, exhibitors, and vendors;</li>
                <li>media houses, journalists, photographers, videographers, and creators;</li>
                <li>speakers, guests, and invitees;</li>
                <li>persons contacting us by email, phone, message, form, or social media in relation to TXG.</li>
              </ul>
              <p className="mt-4">
                This Policy does not govern third-party websites, platforms, payment gateways, social media services, game publisher platforms, or other external services that may be linked from or connected to our website. Those third parties may operate under their own privacy terms.
              </p>
            </section>

            {/* Section 3: Personal Information We May Collect */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                3. Personal Information We May Collect
              </h3>
              <p className="mb-3">
                Depending on how you interact with us, we may collect the following categories of personal information:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    3.1 Identity and Contact Information
                  </h4>
                  <p className="mb-2">This may include:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>full name;</li>
                    <li>team name or organisation name;</li>
                    <li>institution name;</li>
                    <li>email address;</li>
                    <li>phone number;</li>
                    <li>postal address;</li>
                    <li>city, district, or state;</li>
                    <li>designation or role;</li>
                    <li>age or date of birth, where relevant;</li>
                    <li>emergency contact details, where relevant.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    3.2 Registration and Participation Information
                  </h4>
                  <p className="mb-2">
                    Where you register for a tournament, competition, vendor slot, exhibitor slot, cosplay segment, media accreditation, sponsor enquiry, or similar activity, we may collect:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>gamer tag, in-game name, in-game ID, team roster, and player details;</li>
                    <li>game title selection;</li>
                    <li>college or institutional details;</li>
                    <li>cosplay character details and source title;</li>
                    <li>vendor category, menu, product list, or merchandise type;</li>
                    <li>exhibitor product or service details;</li>
                    <li>sponsor enquiry details;</li>
                    <li>media house details, equipment declarations, and requested access type;</li>
                    <li>participation history, check-in status, match status, bracket status, or competition results;</li>
                    <li>photographs, portfolio samples, reference images, or similar supporting materials you submit.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    3.3 Verification and Compliance Information
                  </h4>
                  <p className="mb-2">
                    Where necessary for eligibility, safety, legal compliance, or operational verification, we may collect:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>government-issued ID details or copies;</li>
                    <li>student or institutional ID details;</li>
                    <li>guardian or parent consent details;</li>
                    <li>age proof;</li>
                    <li>authorisation letters;</li>
                    <li>business or licence-related documents;</li>
                    <li>tax or registration details where relevant.</li>
                  </ul>
                  <p>
                    We collect such material only where reasonably necessary for the relevant activity, registration, or compliance purpose.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    3.4 Payment and Transaction Information
                  </h4>
                  <p className="mb-2">
                    Where payments are processed, we or our payment service providers may collect or receive:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>payment status;</li>
                    <li>transaction reference details;</li>
                    <li>billing name;</li>
                    <li>invoicing information;</li>
                    <li>limited payment metadata.</li>
                  </ul>
                  <p>
                    We do not intend to store full card details on our own systems unless explicitly stated. Payment processing may be handled by third-party providers subject to their own privacy practices.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    3.5 Technical and Usage Information
                  </h4>
                  <p className="mb-2">When you visit the website, we may automatically collect certain technical data, such as:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>IP address;</li>
                    <li>browser type;</li>
                    <li>device type;</li>
                    <li>operating system;</li>
                    <li>referring pages;</li>
                    <li>date and time of access;</li>
                    <li>pages visited;</li>
                    <li>clicks, navigation, and interaction data;</li>
                    <li>cookie or similar identifier information.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    3.6 Communications and Support Information
                  </h4>
                  <p className="mb-2">If you contact us, we may keep records of:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>emails;</li>
                    <li>messages;</li>
                    <li>support requests;</li>
                    <li>call-related notes;</li>
                    <li>application discussions;</li>
                    <li>complaint correspondence;</li>
                    <li>admin communications;</li>
                    <li>event-related queries.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    3.7 Media and Event Coverage Information
                  </h4>
                  <p className="mb-2">
                    If you attend, participate in, or appear at the Event, your image, voice, likeness, costume, gameplay, booth presence, team presence, stage appearance, or related participation may be captured through:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>photographs;</li>
                    <li>livestreams;</li>
                    <li>recorded video;</li>
                    <li>interviews;</li>
                    <li>highlight clips;</li>
                    <li>reels, social content, or other event coverage.</li>
                  </ul>
                  <p>
                    Because TXG includes public-facing event activity, tournaments, cosplay, exhibitions, live programming, and organiser-led coverage, participants and attendees may appear in event media.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: How We Collect Information */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                4. How We Collect Information
              </h3>
              <p className="mb-3">We may collect personal information:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>directly from you when you submit a form or contact us;</li>
                <li>when you register for a tournament, competition, vendor slot, exhibitor slot, or media accreditation;</li>
                <li>when you buy tickets or make payments;</li>
                <li>when you upload documents, images, or supporting materials;</li>
                <li>when you interact with the website;</li>
                <li>when you attend or participate in the Event;</li>
                <li>from your institution, team captain, guardian, authorised representative, or organisation where they register on your behalf;</li>
                <li>from service providers who help us operate registrations, payments, communications, streaming, hosting, or analytics.</li>
              </ul>
            </section>

            {/* Section 5: How We Use Personal Information */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                5. How We Use Personal Information
              </h3>
              <p className="mb-3">We may use personal information for the following purposes:</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    5.1 Website and Event Administration
                  </h4>
                  <p className="mb-2">We use information to operate the website and Event, including:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>processing registrations and applications;</li>
                    <li>reviewing eligibility;</li>
                    <li>allocating slots and access;</li>
                    <li>communicating schedules, approvals, changes, and instructions;</li>
                    <li>administering tickets, stalls, booths, or participation rights;</li>
                    <li>managing entry, access control, check-in, and on-ground operations.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    5.2 Tournament, Competition, and Programme Management
                  </h4>
                  <p className="mb-2">We may use information to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>create rosters and brackets;</li>
                    <li>verify identity and eligibility;</li>
                    <li>manage check-in and scheduling;</li>
                    <li>publish match listings, results, leaderboards, and winners;</li>
                    <li>administer rules, penalties, disputes, and awards;</li>
                    <li>manage cosplay, media, sponsor, exhibitor, vendor, and other programme segments.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    5.3 Communication
                  </h4>
                  <p className="mb-2">We may use your contact information to send:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>confirmations;</li>
                    <li>reminders;</li>
                    <li>admin notices;</li>
                    <li>schedule updates;</li>
                    <li>event instructions;</li>
                    <li>safety notices;</li>
                    <li>support responses;</li>
                    <li>important policy or rule updates.</li>
                  </ul>
                  <p>
                    We may also send promotional or event-related communications where appropriate, subject to applicable requirements and your communication preferences.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    5.4 Payment, Finance, and Recordkeeping
                  </h4>
                  <p className="mb-2">We may use information to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>process payments;</li>
                    <li>issue invoices or receipts;</li>
                    <li>confirm payment status;</li>
                    <li>maintain accounting and commercial records;</li>
                    <li>handle disputes, refunds, credits, or related commercial matters where applicable.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    5.5 Security, Safety, and Integrity
                  </h4>
                  <p className="mb-2">We may use information to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>maintain safety and public order;</li>
                    <li>prevent fraud, abuse, cheating, unauthorised access, impersonation, or misconduct;</li>
                    <li>investigate rule violations or complaints;</li>
                    <li>enforce our website and event terms;</li>
                    <li>protect the rights, property, safety, and reputation of NES, participants, partners, attendees, and the Event.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    5.6 Media, Promotion, and Archival Use
                  </h4>
                  <p className="mb-2">We may use event-related photographs, recordings, names, team names, booth names, organisation names, and participation-related content for:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>livestreaming;</li>
                    <li>event publicity;</li>
                    <li>social media posting;</li>
                    <li>sponsor reporting;</li>
                    <li>press releases;</li>
                    <li>highlights and recaps;</li>
                    <li>future event promotion;</li>
                    <li>archival and historical record purposes.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    5.7 Legal and Compliance Purposes
                  </h4>
                  <p className="mb-2">We may use personal information where necessary to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>comply with applicable law;</li>
                    <li>respond to lawful requests;</li>
                    <li>protect legal rights and claims;</li>
                    <li>keep required business and operational records;</li>
                    <li>support dispute handling and enforcement.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Continue with remaining sections... */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                6. Cookies and Similar Technologies
              </h3>
              <p className="mb-3">
                We may use cookies and similar technologies to operate the website, understand traffic, remember preferences, improve performance, and measure engagement.
              </p>
              <p className="mb-3">
                These technologies may be used for purposes such as:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>website functionality;</li>
                <li>analytics;</li>
                <li>security;</li>
                <li>session handling;</li>
                <li>performance measurement;</li>
                <li>user experience improvement.</li>
              </ul>
              <p className="mb-3">
                Where non-essential cookies or similar tools are used and consent is required, we may seek that consent through a banner or similar mechanism.
              </p>
              <p>
                You may also be able to control cookies through your browser settings, though disabling certain cookies may affect website functionality.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                7. When We Share Personal Information
              </h3>
              <p className="mb-3">
                We do not sell personal information as part of ordinary TXG website and event operations. However, we may share personal information where reasonably necessary with:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    7.1 Service Providers
                  </h4>
                  <p className="mb-2">Third parties that help us run the website and Event, such as:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>website hosting providers;</li>
                    <li>form and registration providers;</li>
                    <li>payment processors;</li>
                    <li>email or communication service providers;</li>
                    <li>cloud storage providers;</li>
                    <li>analytics providers;</li>
                    <li>ticketing or credentialing support services;</li>
                    <li>streaming, media, production, photography, and broadcast partners.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    7.2 Event Partners and Operational Stakeholders
                  </h4>
                  <p className="mb-2">Where necessary, we may share relevant information with:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>venue operators;</li>
                    <li>security providers;</li>
                    <li>tournament admins or referees;</li>
                    <li>production teams;</li>
                    <li>judges or screening panels;</li>
                    <li>logistics and accreditation staff;</li>
                    <li>legal or compliance advisers.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    7.3 Sponsors, Institutions, or Coordinators
                  </h4>
                  <p className="mb-2">In limited cases, relevant details may be shared where reasonably necessary for programme administration, such as with:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>team captains;</li>
                    <li>institutional coordinators;</li>
                    <li>authorised representatives;</li>
                    <li>partner institutions;</li>
                    <li>sponsors or collaborators, where the context clearly requires operational coordination.</li>
                  </ul>
                  <p>
                    We do not intend to share personal information more broadly than necessary for the relevant purpose.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    7.4 Legal or Protective Disclosures
                  </h4>
                  <p className="mb-2">We may disclose information where reasonably necessary to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>comply with law, regulation, legal process, or official request;</li>
                    <li>enforce our terms and policies;</li>
                    <li>investigate suspected misconduct, fraud, or abuse;</li>
                    <li>protect safety, rights, property, or public order.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                8. Public Information and Event Visibility
              </h3>
              <p className="mb-3">
                Certain information may be made public as part of the nature of the Event or competition activity. This may include:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>team names;</li>
                <li>player names or gamer tags;</li>
                <li>institution names;</li>
                <li>match schedules;</li>
                <li>tournament brackets;</li>
                <li>results;</li>
                <li>winner announcements;</li>
                <li>cosplay participant names or stage names;</li>
                <li>exhibitor, vendor, or sponsor listings;</li>
                <li>event photographs and video coverage.</li>
              </ul>
              <p>
                If you participate in a public-facing event segment, your participation may become visible to attendees, viewers, media, and online audiences.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                9. Minors
              </h3>
              <p className="mb-3">
                Some TXG activities may involve students, youth participants, or minor participants.
              </p>
              <p className="mb-3">
                Where we reasonably consider guardian or parent involvement necessary, we may require consent from a parent, guardian, institution, or authorised representative before permitting registration, participation, or prize processing.
              </p>
              <p>
                If you believe a minor has submitted personal information improperly through the website, please contact us so that we can review the matter.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                10. Data Retention
              </h3>
              <p className="mb-3">
                We retain personal information only for as long as reasonably necessary for the purposes described in this Policy, including:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>registration and event administration;</li>
                <li>compliance and verification;</li>
                <li>dispute handling;</li>
                <li>financial recordkeeping;</li>
                <li>safety and integrity;</li>
                <li>media, reporting, and archival purposes.</li>
              </ul>
              <p className="mb-3">
                Different categories of information may be retained for different periods depending on operational need, legal obligations, dispute risk, recordkeeping requirements, or historical/event documentation needs.
              </p>
              <p>
                Event photographs, video recordings, livestream archives, and published promotional materials may be retained for longer periods, including for archival and future promotional use.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                11. Data Security
              </h3>
              <p className="mb-3">
                We use reasonable organisational and technical measures intended to help protect personal information from unauthorised access, misuse, alteration, loss, or unlawful disclosure.
              </p>
              <p className="mb-3">
                However, no website, online platform, storage system, or transmission method is completely secure. Accordingly, we cannot guarantee absolute security.
              </p>
              <p>
                Users are responsible for ensuring that submitted information is accurate and that any credentials, devices, and personal access methods used by them are handled securely.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                12. Your Choices and Rights
              </h3>
              <p className="mb-3">
                Depending on the nature of the information and applicable law, you may request to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>access certain personal information we hold about you;</li>
                <li>correct or update inaccurate information;</li>
                <li>withdraw consent where processing is based on consent;</li>
                <li>request deletion or restriction where appropriate;</li>
                <li>object to certain uses of your information;</li>
                <li>opt out of promotional communications.</li>
              </ul>
              <p className="mb-3">
                These rights are not absolute and may be limited where we need to keep information for legal, operational, safety, accounting, dispute, archival, or event-integrity reasons.
              </p>
              <p>
                To make a privacy-related request, contact us using the details in this Policy.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                13. Marketing Communications
              </h3>
              <p className="mb-3">
                We may use contact details to send updates about TXG, registrations, future event editions, related announcements, or participation opportunities.
              </p>
              <p>
                You may request that we stop non-essential promotional communications by using unsubscribe tools where available or by contacting us directly. Administrative or service-related messages may still be sent where necessary.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                14. Third-Party Links and Services
              </h3>
              <p className="mb-3">
                The website or event materials may contain links to third-party services, including ticketing services, payment providers, streaming platforms, social media pages, or partner websites.
              </p>
              <p>
                We are not responsible for the privacy practices, security, or content of third-party services. You should review the privacy terms of those third parties before providing information to them.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                15. International or External Processing
              </h3>
              <p className="mb-3">
                Some service providers we use may process information on systems located outside your immediate state or country. By interacting with the website or submitting information, you acknowledge that information may be processed using external platforms or service providers as reasonably necessary for website and event operations.
              </p>
              <p>
                Where this occurs, we expect such service providers to process information only for authorised operational purposes.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                16. Changes to This Policy
              </h3>
              <p className="mb-3">
                We may revise or update this Policy from time to time.
              </p>
              <p>
                The updated version will apply from the date it is posted or otherwise communicated by us, unless we state otherwise. Your continued use of the website or continued participation after an updated Policy becomes effective will be treated as acknowledgment of the updated Policy.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Neiko']">
                17. Contact Us
              </h3>
              <p className="mb-3">
                If you have questions, concerns, or requests relating to this Privacy Policy or our handling of personal information, please contact:
              </p>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <p>Nagaland Esports Society (NES)</p>
                <p>Email: info@txg-nagaland.com</p>
                <p>Address: 3rd mile Dimapur Nagaland 797115 Temoa building landmark ARTC</p>
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

export default PrivacyPolicy;
