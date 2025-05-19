
import { useState } from 'react';

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  description: string;
  sku: string;
  stock: number;
  price: number;
  minimumStock: number;
}

export function useInventory(initialInventory: InventoryItem[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    sku: '',
    price: 0,
    stock: 0,
    minimumStock: 0,
    category: ''
  });

  // Filter inventory items based on search term and category
  const filteredItems = initialInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Sort the filtered items
  const sortedItems = [...filteredItems].sort((a, b) => {
    let compareResult = 0;
    
    if (sortBy === 'name') {
      compareResult = a.name.localeCompare(b.name);
    } else if (sortBy === 'price') {
      compareResult = a.price - b.price;
    } else if (sortBy === 'stock') {
      compareResult = a.stock - b.stock;
    } else if (sortBy === 'category') {
      compareResult = a.category.localeCompare(b.category);
    }
    
    return sortOrder === 'asc' ? compareResult : -compareResult;
  });

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Format price function
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Handle item edit
  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  // Handle item delete
  const handleDeleteItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  // Handle new item
  const handleAddNewItem = () => {
    setSelectedItem(null);
    setNewItem({
      name: '',
      description: '',
      sku: '',
      price: 0,
      stock: 0,
      minimumStock: 0,
      category: ''
    });
    setIsDialogOpen(true);
  };

  return {
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    sortOrder,
    selectedItem,
    setSelectedItem,
    isDialogOpen,
    setIsDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    newItem,
    setNewItem,
    filteredItems,
    sortedItems,
    handleSort,
    formatCurrency,
    handleEditItem,
    handleDeleteItem,
    handleAddNewItem
  };
}

export default useInventory;
