
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sale } from '@/models/types';

interface SalesTableProps {
  sales: Sale[];
}

export const SalesTable: React.FC<SalesTableProps> = ({ sales }) => {
  return (
    <Table>
      <TableCaption>Lista de vendas recentes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Pedido</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Produtos</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales.map((sale) => (
          <TableRow key={sale.id}>
            <TableCell className="font-medium">{sale.clientName}</TableCell>
            <TableCell>{sale.orderNumber}</TableCell>
            <TableCell>{new Date(sale.createdAt).toLocaleDateString('pt-BR')}</TableCell>
            <TableCell>{sale.products.length} itens</TableCell>
            <TableCell className="text-right">
              {new Intl.NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              }).format(sale.totalValue)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
