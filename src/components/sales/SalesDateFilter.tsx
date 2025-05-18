
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
import { Separator } from '@/components/ui/separator';

interface SalesDateFilterProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onDateRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  period: string;
  onPeriodChange: (period: string) => void;
}

export const SalesDateFilter: React.FC<SalesDateFilterProps> = ({
  dateRange,
  onDateRangeChange,
  period,
  onPeriodChange,
}) => {
  const handleSelectPeriod = (newPeriod: string) => {
    onPeriodChange(newPeriod);
    // Clear date range when selecting a preset period
    onDateRangeChange({ from: undefined, to: undefined });
  };

  const handleDateSelect = (date: Date | undefined) => {
    // Clear preset period when selecting custom dates
    onPeriodChange('all');
    
    const { from, to } = dateRange;
    
    if (!from) {
      onDateRangeChange({ from: date, to: undefined });
    } else if (from && !to && date && date > from) {
      onDateRangeChange({ from, to: date });
    } else {
      onDateRangeChange({ from: date, to: undefined });
    }
  };

  const getPeriodLabel = () => {
    switch (period) {
      case 'today':
        return 'Hoje';
      case 'week':
        return 'Últimos 7 dias';
      case 'month':
        return 'Último mês';
      case 'year':
        return 'Último ano';
      default:
        return 'Período';
    }
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

  const displayLabel = period !== 'all' ? getPeriodLabel() : 
                      (dateRange.from || dateRange.to) ? getDateRangeLabel() : 
                      'Filtro de período';

  return (
    <div className="flex items-center space-x-2">
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
          <DropdownMenuItem onClick={() => handleSelectPeriod('week')}>
            Últimos 7 dias
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelectPeriod('month')}>
            Último mês
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelectPeriod('year')}>
            Último ano
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
              onPeriodChange('all');
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
  );
};
