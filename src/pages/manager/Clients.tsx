
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import SalespersonClientsPage from '../salesperson/Clients';

const ManagerClientsPage = () => {
  // We're reusing the salesperson clients page component since the functionality is the same
  return <SalespersonClientsPage />;
};

export default ManagerClientsPage;
