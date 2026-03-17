

# Nagaland Gaming Expo 2026 — Event Website

A professional single-page event website inspired by the Digital Gaming India Expo, tailored for the Nagaland E-Sports Society's Inter-College E-Sports Showcase.

---

## 1. Hero Section
- Full-screen background image/gradient with gaming-themed visuals
- Event title: **"Nagaland Gaming Expo 2026"** with tagline
- Event date, venue, and organizer (NESS) prominently displayed
- Primary CTA button: **"Register Your Team"**
- Secondary CTA: **"Become a Sponsor"**

## 2. About Section
- Two-column layout: event description + feature image
- Overview of the Inter-College E-Sports Showcase
- Featured games: **BGMI** and **Mobile Legends**
- Prize pool highlight: **₹2,00,000**
- Brief about NESS (Nagaland E-Sports Society)

## 3. Event Schedule / What's On
- Three visually styled cards (similar to Discover / Connect / Explore from reference)
- Cards for: **Tournament Details**, **Entertainment & Activities**, **Networking & Community**
- Event timeline or day-wise schedule breakdown

## 4. Stats Counter Section
- Animated counters with key numbers:
  - Prize Pool (₹2,00,000)
  - Number of Colleges
  - Teams Expected
  - Games Featured
- Clean, bold design matching the reference's "Big Figures, Huge Success" section

## 5. Games Showcase Grid
- Image cards for featured tournament games (BGMI, Mobile Legends)
- Additional cards for side activities or exhibition games if any

## 6. Sponsorship Tiers
- Visual display of sponsorship packages from the pitch deck:
  - **Title Sponsor** (₹5,00,000)
  - **Gold Sponsor** (₹3,00,000)
  - **Silver Sponsor** (₹1,50,000)
  - **Bronze Sponsor** (₹50,000)
- Each tier shows benefits and logo placement areas
- Partner/sponsor logo carousel section

## 7. Registration Cards
- Horizontal card layout (like the reference) for different registration types:
  - **Team Registration** → links to registration form
  - **Sponsor Registration** → contact/interest form
  - **Visitor/Attendee** → simple sign-up
- Each card with a brief description and "Register" CTA

## 8. Gallery Section
- Photo grid placeholder for event branding images or past event photos
- "Load More" capability

## 9. Footer
- Contact information for NESS
- Social media links
- Event date & venue reminder
- Quick links to key sections

---

## Backend: Team Registration System (Lovable Cloud / Supabase)

### Database Tables:
- **teams** — team name, college name, game selection (BGMI / Mobile Legends), captain details, contact info
- **players** — player name, in-game ID, linked to team
- **sponsors_interest** — name, company, email, phone, preferred tier, message

### Features:
- Team registration form with validation (team name, college, 4-5 player details, game selection)
- Sponsor interest form
- Data stored securely in Supabase with proper validation
- Toast notifications for successful submissions

