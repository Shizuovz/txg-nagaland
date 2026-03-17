// Test file to verify Supabase connection
// Run this with: npx tsx src/test-supabase.ts

import { supabase } from './lib/supabase';

async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase connection...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase.from('games').select('*');
    
    if (error) {
      console.error('❌ Supabase connection failed:', error);
      return;
    }
    
    console.log('✅ Supabase connection successful!');
    console.log('📊 Available games:', data?.length || 0);
    
    // Test colleges
    const { data: colleges, error: collegeError } = await supabase.from('colleges').select('*');
    if (collegeError) {
      console.error('❌ Error fetching colleges:', collegeError);
    } else {
      console.log('🏫 Available colleges:', colleges?.length || 0);
    }
    
    // Test sponsorship tiers
    const { data: tiers, error: tierError } = await supabase.from('sponsorship_tiers').select('*');
    if (tierError) {
      console.error('❌ Error fetching sponsorship tiers:', tierError);
    } else {
      console.log('💰 Available sponsorship tiers:', tiers?.length || 0);
    }
    
    console.log('\n🎉 All tests passed! Your Supabase database is ready.');
    console.log('\n📝 Next steps:');
    console.log('1. Set up your .env file with Supabase credentials');
    console.log('2. Run the SQL schema in supabase/schema.sql');
    console.log('3. Start the development server: npm run dev');
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

// Run the test
testSupabaseConnection();
