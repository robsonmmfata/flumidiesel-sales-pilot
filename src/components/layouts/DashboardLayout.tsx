import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LogOut, 
  Menu, 
  User, 
  Users, 
  Calendar, 
  ClipboardCheck,
  TrendingUp,
  Bell,
  Package,
  Search,
  UserRound
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from 'sonner';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  isActive: boolean;
  onMobileItemClick: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  to, 
  icon, 
  label, 
  isCollapsed, 
  isActive,
  onMobileItemClick 
}) => {
  const handleClick = (e: React.MouseEvent) => {
    // Check if we're on mobile before collapsing
    if (window.innerWidth < 768) {
      onMobileItemClick();
    }
  };

  return (
    <Link
      to={to}
      className={cn(
        'flex items-center p-2 rounded-md transition-all',
        isActive
          ? 'bg-white text-black'
          : 'text-gray-300 hover:bg-gray-800'
      )}
      onClick={handleClick}
    >
      <div className="mr-3">{icon}</div>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout, isLoading, isAdmin, isManager } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <Spinner size="lg" />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    toast.success("Sessão encerrada com sucesso");
  };

  const collapseMobileSidebar = () => {
    // Only collapse if we're on mobile
    if (window.innerWidth < 768) {
      setIsSidebarCollapsed(true);
    }
  };

  const baseRoute = isAdmin ? '/admin' : isManager ? '/manager' : '/salesperson';

  // Define links based on user role - removed sales from admin
  const sidebarLinks = [
    { 
      to: `${baseRoute}/dashboard`, 
      icon: <TrendingUp size={20} />, 
      label: 'Dashboard', 
      isActive: pathname === `${baseRoute}/dashboard`,
      roles: ['admin', 'manager', 'salesperson'] 
    },
    { 
      to: `${baseRoute}/users`, 
      icon: <Users size={20} />, 
      label: 'Usuários', 
      isActive: pathname === `${baseRoute}/users`,
      roles: ['admin'] 
    },
    { 
      to: `${baseRoute}/clients`, 
      icon: <UserRound size={20} />, 
      label: 'Clientes', 
      isActive: pathname === `${baseRoute}/clients`,
      roles: ['admin', 'manager', 'salesperson'] 
    },
    { 
      to: `${baseRoute}/visits`, 
      icon: <ClipboardCheck size={20} />, 
      label: 'Visitas', 
      isActive: pathname === `${baseRoute}/visits`,
      roles: ['salesperson'] 
    },
    { 
      to: `${baseRoute}/schedule`, 
      icon: <Calendar size={20} />, 
      label: 'Agenda', 
      isActive: pathname === `${baseRoute}/schedule`,
      roles: ['salesperson'] 
    },
    { 
      to: `${baseRoute}/prospects`, 
      icon: <Users size={20} />, 
      label: 'Prospecção', 
      isActive: pathname === `${baseRoute}/prospects`,
      roles: ['salesperson'] 
    },
    { 
      to: `${baseRoute}/sales`, 
      icon: <TrendingUp size={20} />, 
      label: 'Vendas', 
      isActive: pathname === `${baseRoute}/sales`,
      roles: ['salesperson'] 
    },
    { 
      to: `${baseRoute}/inventory`, 
      icon: <Package size={20} />, 
      label: 'Estoque', 
      isActive: pathname === `${baseRoute}/inventory`,
      roles: ['admin', 'manager', 'salesperson'] 
    },
    { 
      to: `${baseRoute}/promotions`, 
      icon: <TrendingUp size={20} />, 
      label: 'Promoções', 
      isActive: pathname === `${baseRoute}/promotions`,
      roles: ['admin', 'manager', 'salesperson'] 
    },
  ].filter((link) => link.roles.includes(user.role));

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <div 
        className={cn(
          "h-full bg-black border-r border-gray-800 shadow-lg transition-all duration-300 overflow-hidden",
          isSidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex justify-between items-center h-16 px-4 border-b border-gray-800">
          {!isSidebarCollapsed && (
            <div className="font-bold text-xl text-white">
              Flumidiesel
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="ml-auto text-gray-300"
          >
            <Menu size={20} />
          </Button>
        </div>
        <div className="p-4 flex flex-col gap-2">
          {sidebarLinks.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              isCollapsed={isSidebarCollapsed}
              isActive={link.isActive}
              onMobileItemClick={collapseMobileSidebar}
            />
          ))}
          
          <div className="mt-auto pt-4 border-t border-gray-800">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white">
                <User size={18} />
              </div>
              {!isSidebarCollapsed && (
                <div className="ml-2">
                  <div className="text-sm font-semibold text-white">{user.name}</div>
                  <div className="text-xs text-gray-400">{user.role}</div>
                </div>
              )}
            </div>
            <Button 
              variant="outline" 
              size={isSidebarCollapsed ? 'icon' : 'default'} 
              onClick={handleLogout}
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <LogOut size={18} />
              {!isSidebarCollapsed && <span className="ml-2">Sair</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-black border-b border-gray-800 shadow-sm flex items-center px-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:border-transparent bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-black">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
