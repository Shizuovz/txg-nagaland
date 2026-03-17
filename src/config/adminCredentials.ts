// Admin credentials configuration
export const ADMIN_CREDENTIALS = [
  {
    email: 'admin@nge2026.com',
    password: 'nge2026admin123',
    name: 'NGE2026 Admin',
    role: 'super_admin'
  },
  {
    email: 'organizer@nge2026.com',
    password: 'nge2026org123',
    name: 'Event Organizer',
    role: 'organizer'
  },
  {
    email: 'manager@nge2026.com',
    password: 'nge2026mgr123',
    name: 'Operations Manager',
    role: 'manager'
  }
];

// All admin credentials combined
export const ALL_ADMIN_CREDENTIALS = [
  ...ADMIN_CREDENTIALS
];

// Helper function to check admin credentials
export const validateAdminCredentials = (email: string, password: string) => {
  return ALL_ADMIN_CREDENTIALS.find(
    admin => admin.email === email && admin.password === password
  );
};

// Helper function to check if email is admin
export const isAdminEmail = (email: string) => {
  return ALL_ADMIN_CREDENTIALS.some(admin => admin.email === email);
};
