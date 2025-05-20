
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-7xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-gray-400 mb-8">Página não encontrada</p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-white text-black hover:bg-gray-200"
        >
          Voltar para o início
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
