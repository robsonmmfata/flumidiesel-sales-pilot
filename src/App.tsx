
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsersPage from "./pages/admin/Users";
import ManagerDashboard from "./pages/manager/Dashboard";
import SalespersonDashboard from "./pages/salesperson/Dashboard";
import SalespersonVisitsPage from "./pages/salesperson/Visits";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              {/* Add more admin routes as needed */}
            </Route>
            
            {/* Protected Manager Routes */}
            <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
              <Route path="/manager/dashboard" element={<ManagerDashboard />} />
              {/* Add more manager routes as needed */}
            </Route>
            
            {/* Protected Salesperson Routes */}
            <Route element={<ProtectedRoute allowedRoles={['salesperson']} />}>
              <Route path="/salesperson/dashboard" element={<SalespersonDashboard />} />
              <Route path="/salesperson/visits" element={<SalespersonVisitsPage />} />
              {/* Add more salesperson routes as needed */}
            </Route>
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
