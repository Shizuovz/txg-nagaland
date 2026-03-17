-- NGE2026 Database Schema
-- Create tables for the Nagaland Gaming Expo 2026 registration system

-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Games table
CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  team_size INTEGER NOT NULL CHECK (team_size > 0),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Colleges table
CREATE TABLE IF NOT EXISTS colleges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sponsorship tiers table
CREATE TABLE IF NOT EXISTS sponsorship_tiers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  price VARCHAR(50) NOT NULL,
  description TEXT,
  benefits TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team registrations table
CREATE TABLE IF NOT EXISTS team_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_id VARCHAR(20) NOT NULL UNIQUE,
  team_name VARCHAR(255) NOT NULL,
  registration_type VARCHAR(20) NOT NULL CHECK (registration_type IN ('college', 'open_category')),
  game_id INTEGER NOT NULL REFERENCES games(id),
  college_id INTEGER REFERENCES colleges(id),
  team_category VARCHAR(100),
  captain_name VARCHAR(255) NOT NULL,
  captain_email VARCHAR(255) NOT NULL,
  captain_phone VARCHAR(20) NOT NULL,
  team_members JSONB NOT NULL DEFAULT '[]',
  substitute JSONB,
  additional_message TEXT,
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sponsor registrations table
CREATE TABLE IF NOT EXISTS sponsor_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_id VARCHAR(20) NOT NULL UNIQUE,
  company_name VARCHAR(255) NOT NULL,
  sponsorship_tier_id INTEGER NOT NULL REFERENCES sponsorship_tiers(id),
  contact_person VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(20) NOT NULL,
  message TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Visitor registrations table
CREATE TABLE IF NOT EXISTS visitor_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_id VARCHAR(20) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_team_registrations_status ON team_registrations(status);
CREATE INDEX IF NOT EXISTS idx_team_registrations_registration_type ON team_registrations(registration_type);
CREATE INDEX IF NOT EXISTS idx_team_registrations_game_id ON team_registrations(game_id);
CREATE INDEX IF NOT EXISTS idx_team_registrations_college_id ON team_registrations(college_id);
CREATE INDEX IF NOT EXISTS idx_team_registrations_created_at ON team_registrations(created_at);

CREATE INDEX IF NOT EXISTS idx_sponsor_registrations_status ON sponsor_registrations(status);
CREATE INDEX IF NOT EXISTS idx_sponsor_registrations_tier_id ON sponsor_registrations(sponsorship_tier_id);
CREATE INDEX IF NOT EXISTS idx_sponsor_registrations_created_at ON sponsor_registrations(created_at);

CREATE INDEX IF NOT EXISTS idx_visitor_registrations_status ON visitor_registrations(status);
CREATE INDEX IF NOT EXISTS idx_visitor_registrations_created_at ON visitor_registrations(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_games_updated_at BEFORE UPDATE ON games
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_colleges_updated_at BEFORE UPDATE ON colleges
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sponsorship_tiers_updated_at BEFORE UPDATE ON sponsorship_tiers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_registrations_updated_at BEFORE UPDATE ON team_registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sponsor_registrations_updated_at BEFORE UPDATE ON sponsor_registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_visitor_registrations_updated_at BEFORE UPDATE ON visitor_registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
-- Enable RLS on all tables
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorship_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_registrations ENABLE ROW LEVEL SECURITY;

-- Public read access for reference data
CREATE POLICY "Public read access for games" ON games
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for colleges" ON colleges
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for sponsorship tiers" ON sponsorship_tiers
    FOR SELECT USING (is_active = true);

-- Allow anyone to create registrations
CREATE POLICY "Allow team registration creation" ON team_registrations
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow sponsor registration creation" ON sponsor_registrations
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow visitor registration creation" ON visitor_registrations
    FOR INSERT WITH CHECK (true);

-- Users can read their own registrations (based on email)
CREATE POLICY "Users can read own team registrations" ON team_registrations
    FOR SELECT USING (auth.email() = captain_email);

CREATE POLICY "Users can read own sponsor registrations" ON sponsor_registrations
    FOR SELECT USING (auth.email() = contact_email);

CREATE POLICY "Users can read own visitor registrations" ON visitor_registrations
    FOR SELECT USING (auth.email() = email);

-- Admin access policies (you'll need to create an admin role in Supabase)
CREATE POLICY "Admin full access to team registrations" ON team_registrations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

CREATE POLICY "Admin full access to sponsor registrations" ON sponsor_registrations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

CREATE POLICY "Admin full access to visitor registrations" ON visitor_registrations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Insert initial data
INSERT INTO games (name, team_size) VALUES 
    ('BGMI', 4),
    ('Mobile Legends', 5)
ON CONFLICT (name) DO NOTHING;

INSERT INTO colleges (name) VALUES 
    ('Kohima College'),
    ('Patkai Christian College'),
    ('St. Joseph College'),
    ('Modern College'),
    ('Aldrich College'),
    ('Kohima Science College'),
    ('Mount Olive College'),
    ('Oriental College'),
    ('Sazolie College'),
    ('City College')
ON CONFLICT (name) DO NOTHING;

INSERT INTO sponsorship_tiers (name, price, description, benefits) VALUES 
    ('Title Sponsor', '₹5,00,000+', 'Top-tier sponsorship with maximum visibility', 
     ARRAY['Naming rights', 'Premium branding', 'Main stage presence', 'Social media promotion', 'Booth space']),
    ('Powered By Sponsor', '₹2,50,000', 'Prominent branding and visibility', 
     ARRAY['Stage branding', 'Booth space', 'Digital promotion', 'Logo placement']),
    ('Associate Sponsor', '₹1,00,000', 'Standard sponsorship package', 
     ARRAY['Logo placement', 'Social media mentions', 'Website listing']),
    ('Category Partner', 'Custom/In-Kind', 'Specialized partnership opportunities', 
     ARRAY['Category exclusivity', 'Custom integration', 'Special recognition'])
ON CONFLICT (name) DO NOTHING;
