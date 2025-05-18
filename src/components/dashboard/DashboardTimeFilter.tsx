
import React from 'react';
import { Calendar as CalendarIcon, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardTimeFilterProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onDateRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  period: string;
  onPeriodChange: (period: string) => void;
}

const DashboardTimeFilter: React.FC<DashboardTimeFilterProps> = ({
  dateRange,
  onDateRangeChange,
  period,
  onPeriodChange,
}) => {
  const handleSelectPeriod = (newPeriod: string) => {
    onPeriodChange(newPeriod);
    // Reset date range when selecting a preset period
    onDateRangeChange({ from: undefined, to: undefined });
  };

  const getDateRangeLabel = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, 'dd/MM/yyyy')} - ${format(dateRange.to, 'dd/MM/yyyy')}`;
    }
    if (dateRange.from) {
      return `A partir de ${format(dateRange.from, 'dd/MM/yyyy')}`;
    }
    if (dateRange.to) {
      return `Até ${format(dateRange.to, 'dd/MM/yyyy')}`;
    }
    return 'Selecione datas';
  };

  const getPeriodLabel = () => {
    switch (period) {
      case 'today':
        return 'Hoje';
      case 'yesterday':
        return 'Ontem';
      case 'week':
        return 'Últimos 7 dias';
      case 'month':
        return 'Este mês';
      case 'lastmonth':
        return 'Mês passado';
      default:
        return 'Período';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-6">
      <h2 className="text-lg font-semibold">Filtrar por período:</h2>
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {getPeriodLabel()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleSelectPeriod('today')}>
              Hoje
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelectPeriod('yesterday')}>
              Ontem
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelectPeriod('week')}>
              Últimos 7 dias
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelectPeriod('month')}>
              Este mês
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelectPeriod('lastmonth')}>
              Mês passado
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelectPeriod('all')}>
              Todos
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn(
              "justify-start text-left",
              (dateRange.from || dateRange.to) ? "" : "text-muted-foreground"
            )}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {getDateRangeLabel()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="range"
              selected={{ 
                from: dateRange.from || undefined, 
                to: dateRange.to || undefined 
              }}
              onSelect={range => {
                onPeriodChange('custom');
                onDateRangeChange({ 
                  from: range?.from || undefined, 
                  to: range?.to || undefined 
                });
              }}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DashboardTimeFilter;
