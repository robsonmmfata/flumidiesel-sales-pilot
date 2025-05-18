
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
import AdminClientsPage from "./pages/admin/Clients";
import AdminVisitsPage from "./pages/admin/Visits";
import AdminSchedulePage from "./pages/admin/Schedule";
import AdminProspectsPage from "./pages/admin/Prospects";
import AdminSalesPage from "./pages/admin/Sales";
import AdminInventoryPage from "./pages/admin/Inventory";
import AdminPromotionsPage from "./pages/admin/Promotions";

import ManagerDashboard from "./pages/manager/Dashboard";
import ManagerClientsPage from "./pages/manager/Clients";
import ManagerVisitsPage from "./pages/manager/Visits";
import ManagerSchedulePage from "./pages/manager/Schedule";
import ManagerProspectsPage from "./pages/manager/Prospects";
import ManagerSalesPage from "./pages/manager/Sales";
import ManagerInventoryPage from "./pages/manager/Inventory";
import ManagerPromotionsPage from "./pages/manager/Promotions";

import SalespersonDashboard from "./pages/salesperson/Dashboard";
import SalespersonClientsPage from "./pages/salesperson/Clients";
import SalespersonVisitsPage from "./pages/salesperson/Visits";
import SalespersonSchedulePage from "./pages/salesperson/Schedule";
import SalespersonProspectsPage from "./pages/salesperson/Prospects";
import SalespersonSalesPage from "./pages/salesperson/Sales";
import SalespersonInventoryPage from "./pages/salesperson/Inventory";
import SalespersonPromotionsPage from "./pages/salesperson/Promotions";

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
              <Route path="/admin/clients" element={<AdminClientsPage />} />
              <Route path="/admin/visits" element={<AdminVisitsPage />} />
              <Route path="/admin/schedule" element={<AdminSchedulePage />} />
              <Route path="/admin/prospects" element={<AdminProspectsPage />} />
              <Route path="/admin/sales" element={<AdminSalesPage />} />
              <Route path="/admin/inventory" element={<AdminInventoryPage />} />
              <Route path="/admin/promotions" element={<AdminPromotionsPage />} />
            </Route>
            
            {/* Protected Manager Routes */}
            <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
              <Route path="/manager/dashboard" element={<ManagerDashboard />} />
              <Route path="/manager/clients" element={<ManagerClientsPage />} />
              <Route path="/manager/visits" element={<ManagerVisitsPage />} />
              <Route path="/manager/schedule" element={<ManagerSchedulePage />} />
              <Route path="/manager/prospects" element={<ManagerProspectsPage />} />
              <Route path="/manager/sales" element={<ManagerSalesPage />} />
              <Route path="/manager/inventory" element={<ManagerInventoryPage />} />
              <Route path="/manager/promotions" element={<ManagerPromotionsPage />} />
            </Route>
            
            {/* Protected Salesperson Routes */}
            <Route element={<ProtectedRoute allowedRoles={['salesperson']} />}>
              <Route path="/salesperson/dashboard" element={<SalespersonDashboard />} />
              <Route path="/salesperson/clients" element={<SalespersonClientsPage />} />
              <Route path="/salesperson/visits" element={<SalespersonVisitsPage />} />
              <Route path="/salesperson/schedule" element={<SalespersonSchedulePage />} />
              <Route path="/salesperson/prospects" element={<SalespersonProspectsPage />} />
              <Route path="/salesperson/sales" element={<SalespersonSalesPage />} />
              <Route path="/salesperson/inventory" element={<SalespersonInventoryPage />} />
              <Route path="/salesperson/promotions" element={<SalespersonPromotionsPage />} />
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
