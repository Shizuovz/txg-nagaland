# Supabase Database Setup Guide for NGE2026

This guide will help you set up Supabase database for the Nagaland Gaming Expo 2026 registration system.

## 🚀 Quick Setup

### 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign Up"
3. Create a new organization (or use existing)
4. Create a new project:
   - **Project Name**: `nge2026-database`
   - **Database Password**: Choose a strong password
   - **Region**: Choose the closest region to your users
5. Wait for the project to be created (2-3 minutes)

### 2. Get Project Credentials

1. Go to Project Settings → API
2. Copy the **Project URL** and **anon public key**
3. Create a `.env` file in your project root:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 3. Run Database Schema

1. Go to Supabase Dashboard → SQL Editor
2. Copy the entire content from `supabase/schema.sql`
3. Paste it into the SQL Editor
4. Click "Run" to execute the schema

The schema will create:
- ✅ All tables (games, colleges, sponsorship_tiers, team_registrations, etc.)
- ✅ Proper indexes for performance
- ✅ Row Level Security (RLS) policies
- ✅ Triggers for updated_at timestamps
- ✅ Initial seed data

### 4. Verify Setup

1. Check that all tables were created:
   - Go to Database → Tables
   - You should see: `games`, `colleges`, `sponsorship_tiers`, `team_registrations`, `sponsor_registrations`, `visitor_registrations`

2. Check initial data:
   ```sql
   SELECT * FROM games;
   SELECT * FROM colleges;
   SELECT * FROM sponsorship_tiers;
   ```

3. Test the connection by running the app:
   ```bash
   npm run dev
   ```

## 📊 Database Schema Overview

### Tables

#### `games`
- Stores available games (BGMI, Mobile Legends)
- Team size requirements
- Active status

#### `colleges`
- List of participating colleges
- Active status for filtering

#### `sponsorship_tiers`
- Available sponsorship packages
- Pricing and benefits
- Active status

#### `team_registrations`
- College and open category team registrations
- Team members and substitutes
- Registration status tracking

#### `sponsor_registrations`
- Company sponsorship applications
- Contact information
- Tier selection

#### `visitor_registrations`
- Individual visitor registrations
- Basic contact information
- Registration status

### Security Features

- **Row Level Security (RLS)**: Protects data access
- **Public Read Access**: For reference data (games, colleges, tiers)
- **Registration Creation**: Anyone can submit registrations
- **Admin Access**: Full control for administrators
- **User Data Access**: Users can only see their own registrations

## 🔧 Advanced Configuration

### Admin User Setup

To create admin users for full database access:

1. Go to Authentication → Users
2. Create a new user or use existing
3. Update user metadata in SQL Editor:
   ```sql
   UPDATE auth.users
   SET raw_user_meta_data = '{"role": "admin"}'
   WHERE email = 'admin@example.com';
   ```

### Custom Policies

You can modify RLS policies in the SQL Editor:

```sql
-- Example: Allow only specific colleges
CREATE POLICY "College specific access" ON team_registrations
    FOR SELECT USING (college_id IN (1, 2, 3));
```

### Database Functions

The schema includes useful functions:

- `update_updated_at_column()`: Auto-updates timestamps
- UUID generation for primary keys
- Registration ID generation with prefixes

## 🚨 Important Notes

### Environment Variables

- Never commit `.env` to version control
- Use `.env.example` as a template
- Add `.env` to `.gitignore`

### Production Considerations

1. **Database Password**: Use a strong, unique password
2. **API Keys**: Regenerate keys if compromised
3. **Backups**: Enable automatic backups in Supabase
4. **Monitoring**: Set up alerts for database usage

### Performance

- Indexes are already created on frequently queried columns
- Consider adding more indexes based on your query patterns
- Monitor query performance in Supabase Dashboard

## 🛠️ Troubleshooting

### Common Issues

**"Missing environment variables" error**
- Check that `.env` file exists
- Verify variable names match exactly
- Restart development server after changes

**"Permission denied" errors**
- Check RLS policies in SQL Editor
- Verify user roles and metadata
- Ensure tables have proper policies

**"Connection failed" error**
- Verify Supabase URL and API key
- Check network connectivity
- Ensure project is active

### Testing Connection

Create a simple test to verify database connection:

```javascript
import { supabase } from './src/lib/supabase';

async function testConnection() {
  try {
    const { data, error } = await supabase.from('games').select('*');
    if (error) throw error;
    console.log('✅ Database connected successfully!');
    console.log('Games:', data);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

testConnection();
```

## 📞 Support

If you encounter issues:

1. Check [Supabase Documentation](https://supabase.com/docs)
2. Review the SQL schema for any syntax errors
3. Verify environment variables are correctly set
4. Check Supabase project status and logs

## 🎉 Next Steps

Once your database is set up:

1. ✅ Test registration forms
2. ✅ Verify admin dashboard functionality
3. ✅ Set up admin users
4. ✅ Configure email notifications (optional)
5. ✅ Set up monitoring and alerts

Your NGE2026 registration system is now ready to use with Supabase! 🚀
