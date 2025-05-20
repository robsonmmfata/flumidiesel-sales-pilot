
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-6">Flumidiesel</h1>
        <p className="text-xl text-gray-400">Sistema de gestão de vendas</p>
      </div>
      
      <Button 
        className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg"
        onClick={() => navigate('/login')}
      >
        Acessar sistema
      </Button>
    </div>
  );
};

export default Index;
