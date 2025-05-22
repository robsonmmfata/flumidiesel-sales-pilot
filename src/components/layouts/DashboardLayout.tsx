import React from 'react';
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
  Search, // 'Search' ainda é importado, mas não usado no header
  UserRound
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from 'sonner';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Component to display each individual sidebar link
const NavLink = ({ to, icon, label, isActive }: { to: string, icon: React.ReactNode, label: string, isActive: boolean }) => {
  const { isMobile, setOpenMobile } = useSidebar();

  const handleClick = () => {
    // For mobile, automatically close the sidebar when an item is clicked
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={label}
      >
        <Link to={to} onClick={handleClick}>
          {icon}
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

// Component for the application sidebar
const AppSidebar = () => {
  const { user, logout, isAdmin, isManager } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;

  const handleLogout = () => {
    logout();
    toast.success("Sessão encerrada com sucesso");
  };

  const baseRoute = isAdmin ? '/admin' : isManager ? '/manager' : '/salesperson';

  // Define links based on user role
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
    <Sidebar
      className="border-r border-gray-800 bg-black text-white"
    >
      <SidebarHeader className="border-b border-gray-800">
        <div className="p-4">
          {/* MUDANÇA AQUI: Adiciona a imagem e o texto */}
          <Link to="/" className="flex items-center justify-center gap-2"> {/* Link para a home, se desejar */}
            <img
              src="/src/pages/favicon.ico" // Confirme o caminho da sua imagem na pasta public/
 alt="Logo Flumidiesel"
              // Ajuste essas classes para o tamanho da logo na sidebar.
              // h-10 seria 40px de altura. w-auto mantém a proporção.
              className="h-50 w-auto"
            />
            {/* Opcional: Mantenha o texto "Flumidiesel" se quiser a logo ao lado dele */}
            
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              isActive={link.isActive}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-800 p-4">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white">
            <User size={18} />
          </div>
          <div className="ml-2">
            <div className="text-sm font-semibold text-white">{user.name}</div>
            <div className="text-xs text-gray-400">{user.role}</div>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <LogOut size={18} className="mr-2" />
          <span>Sair</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

// Main layout component
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-black w-full">
        <AppSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-black">
          {/* Header */}
          <header className="h-16 bg-black border-b border-gray-800 shadow-sm flex items-center px-4">
            <SidebarTrigger className="text-gray-300 hover:text-white mr-4" />
            {/* O filtro de pesquisa foi removido daqui */}
            {/* Opcional: Adicionar logo menor aqui se desejar */}
            {/*
            <Link to="/" className="flex items-center ml-4">
              <img
                src="/logo-flumidiesel.png" // Ajuste o caminho
                alt="Logo Flumidiesel"
                className="h-8 w-auto" // Menor para o cabeçalho
              />
            </Link>
            */}
            <div className="flex items-center space-x-4 ml-auto"> {/* Adicionado ml-auto para empurrar os ícones para a direita */}
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
    </SidebarProvider>
  );
};

export default DashboardLayout;