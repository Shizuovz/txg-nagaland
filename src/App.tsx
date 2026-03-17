import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { Suspense, lazy, useEffect } from "react";

// Lazy load only heavy components
const Index = lazy(() => import("./pages/Index"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const LoginForm = lazy(() => import("./components/auth/LoginForm"));
const AdminLoginForm = lazy(() => import("./components/auth/AdminLoginForm"));
const UserDashboard = lazy(() => import("./components/auth/UserDashboard"));
const ProtectedRoute = lazy(() => import("./components/auth/ProtectedRoute"));
const AdminProtectedRoute = lazy(() => import("./components/auth/AdminProtectedRoute"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FirebaseConnectionTest = lazy(() => import("./components/FirebaseConnectionTest"));

// Import RegistrationSection directly to avoid lazy loading issues
import RegistrationSection from "./components/RegistrationSection";

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

const queryClient = new QueryClient();

const LoginRoute = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  console.log('LoginRoute - Auth state:', { isAuthenticated, user, isLoading });
  
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('LoginRoute - User is authenticated, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return <LoginForm />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <AuthProvider>
          <Routes>
          <Route path="/" element={<Suspense fallback={<LoadingSpinner />}><Index /></Suspense>} />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/dashboard" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            </Suspense>
          } />
          {/* Admin Routes */}
          <Route path="/admin/login" element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminAuthProvider>
                <AdminLoginForm />
              </AdminAuthProvider>
            </Suspense>
          } />
          <Route path="/admin" element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminAuthProvider>
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              </AdminAuthProvider>
            </Suspense>
          } />
          {/* Firebase Test Route */}
          <Route path="/test-firebase" element={<Suspense fallback={<LoadingSpinner />}><FirebaseConnectionTest /></Suspense>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Suspense fallback={<LoadingSpinner />}><NotFound /></Suspense>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
