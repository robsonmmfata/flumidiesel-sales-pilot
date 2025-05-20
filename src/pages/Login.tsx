
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      toast.error('Falha no login. Verifique suas credenciais.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-black border border-gray-800 p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">Flumidiesel</h1>
          <p className="text-gray-400 mt-2">Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="bg-gray-900 text-white border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Senha
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className="bg-gray-900 text-white border-gray-700"
            />
          </div>

          <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Entre com o email do seu perfil:</p>
          <ul className="mt-2 space-y-1">
            <li><strong>Admin:</strong> admin@flumidiesel.com</li>
            <li><strong>Gerente:</strong> manager@flumidiesel.com</li>
            <li><strong>Vendedor:</strong> vendedor@flumidiesel.com</li>
          </ul>
          <p className="mt-2">Senha: qualquer valor</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
