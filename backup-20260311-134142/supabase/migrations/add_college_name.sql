-- Add college_name field to team_registrations table
-- This migration allows users to enter their college name instead of selecting from a dropdown

-- Add the new column
ALTER TABLE team_registrations 
ADD COLUMN college_name TEXT;

-- Update existing records (if any) to have college_name from colleges table
UPDATE team_registrations 
SET college_name = colleges.name 
FROM colleges 
WHERE team_registrations.college_id = colleges.id;

-- Make college_name required for college registrations
ALTER TABLE team_registrations 
ALTER COLUMN college_name SET NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN team_registrations.college_name IS 'College name entered by user (for college registrations)';

-- Note: college_id column is kept for backward compatibility but won't be used in new registrations
