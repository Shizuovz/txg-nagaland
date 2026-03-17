-- Remove BGMI game from the games table
-- This migration removes BGMI and keeps only Mobile Legends for college registration

-- First, check if there are any existing team registrations for BGMI
-- You may want to handle these existing registrations before running this migration

-- Delete BGMI game from the games table
DELETE FROM games WHERE name = 'BGMI';

-- Ensure Mobile Legends is still present and active
UPDATE games 
SET is_active = true 
WHERE name = 'Mobile Legends';
