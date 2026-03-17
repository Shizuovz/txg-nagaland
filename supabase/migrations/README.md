# Database Migrations

## Adding College Name Field

To add the `college_name` field to the `team_registrations` table:

### Option 1: Run via Supabase Dashboard
1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and paste the content from `add_college_name.sql`
4. Click "Run" to execute the migration

### Option 2: Run via Supabase CLI
```bash
supabase db push
```

### What this migration does:
- Adds a `college_name` TEXT column to `team_registrations`
- Updates existing records to populate college_name from colleges table
- Makes college_name required for college registrations
- Keeps college_id for backward compatibility

### After Migration
- The registration form will now accept college names as text input
- Users can type any college name instead of selecting from a dropdown
- Existing data will be preserved and migrated
