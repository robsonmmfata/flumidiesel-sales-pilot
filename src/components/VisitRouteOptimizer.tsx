
import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Visit } from '@/models/types';
import { MapPin, Clock, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import MapVisits from './MapVisits';

interface VisitRouteOptimizerProps {
  visits: Visit[];
}

type Coordinate = {
  latitude: number;
  longitude: number;
};

const calculateDistance = (pointA: Coordinate, pointB: Coordinate): number => {
  if (!pointA || !pointB) return 0;
  
  // Earth radius in km
  const R = 6371;
  
  // Convert degrees to radians
  const lat1 = (pointA.latitude * Math.PI) / 180;
  const lat2 = (pointB.latitude * Math.PI) / 180;
  const lon1 = (pointA.longitude * Math.PI) / 180;
  const lon2 = (pointB.longitude * Math.PI) / 180;
  
  // Haversine formula
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1) * Math.cos(lat2) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in km
  
  return distance;
};

const VisitRouteOptimizer: React.FC<VisitRouteOptimizerProps> = ({ visits }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Get unique dates from visits
  const uniqueDates = useMemo(() => {
    const dates = new Set<string>();
    visits.forEach(visit => {
      if (visit.date) {
        const dateStr = visit.date.split('T')[0];
        dates.add(dateStr);
      }
    });
    return Array.from(dates).sort();
  }, [visits]);

  // Get filtered visits for selected date
  const filteredVisits = useMemo(() => {
    if (!selectedDate) return [];
    return visits.filter(visit => visit.date.split('T')[0] === selectedDate);
  }, [visits, selectedDate]);

  // Get visits with coordinates
  const visitsWithCoordinates = useMemo(() => {
    return filteredVisits.filter(visit => 
      visit.location && 
      visit.location.latitude && 
      visit.location.longitude
    );
  }, [filteredVisits]);

  // Create optimized route starting from office location (assuming in São Paulo)
  const officeLocation: Coordinate = {
    latitude: -23.5505,
    longitude: -46.6333
  };

  // Nearest neighbor algorithm for route optimization
  const optimizedRoute = useMemo(() => {
    if (visitsWithCoordinates.length === 0) return [];
    
    // Make a copy of visits to work with
    const availableVisits = [...visitsWithCoordinates];
    const result: Visit[] = [];
    
    // Start with office location as current point
    let currentPoint = officeLocation;
    
    // Find nearest neighbor for each point
    while (availableVisits.length > 0) {
      // Find closest visit to current point
      let closestVisitIndex = 0;
      let closestDistance = Number.MAX_VALUE;
      
      for (let i = 0; i < availableVisits.length; i++) {
        if (availableVisits[i].location) {
          const dist = calculateDistance(currentPoint, availableVisits[i].location!);
          if (dist < closestDistance) {
            closestDistance = dist;
            closestVisitIndex = i;
          }
        }
      }
      
      // Add closest visit to result and update current point
      const nextVisit = availableVisits.splice(closestVisitIndex, 1)[0];
      result.push(nextVisit);
      
      if (nextVisit.location) {
        currentPoint = nextVisit.location;
      }
    }
    
    return result;
  }, [visitsWithCoordinates]);

  // Calculate total route distance
  const totalDistance = useMemo(() => {
    if (optimizedRoute.length === 0) return 0;
    
    let total = 0;
    let prevPoint = officeLocation;
    
    for (const visit of optimizedRoute) {
      if (visit.location) {
        total += calculateDistance(prevPoint, visit.location);
        prevPoint = visit.location;
      }
    }
    
    // Add distance back to office
    if (optimizedRoute.length > 0 && optimizedRoute[optimizedRoute.length-1].location) {
      total += calculateDistance(optimizedRoute[optimizedRoute.length-1].location!, officeLocation);
    }
    
    return total;
  }, [optimizedRoute]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Roteirização de visitas</h2>
          <p className="text-sm text-muted-foreground">
            Otimize sua rota de visitas diárias para reduzir o tempo de deslocamento
          </p>
        </div>
        
        <Select 
          value={selectedDate} 
          onValueChange={setSelectedDate}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione uma data" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Datas disponíveis</SelectLabel>
              {uniqueDates.map(date => (
                <SelectItem key={date} value={date}>
                  {new Date(date).toLocaleDateString('pt-BR')}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {selectedDate && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Visitas do dia</CardTitle>
              </CardHeader>
              <CardContent>
                {optimizedRoute.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nenhuma visita agendada para esta data
                  </p>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{optimizedRoute.length} visitas programadas</p>
                      <p className="text-sm">
                        Distância total: <span className="font-bold">{totalDistance.toFixed(1)} km</span>
                      </p>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-md">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                          O
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Escritório Flumidiesel</p>
                          <p className="text-xs text-muted-foreground">Ponto de partida e chegada</p>
                        </div>
                      </div>

                      {optimizedRoute.map((visit, index) => (
                        <div 
                          key={visit.id}
                          className={cn(
                            "flex items-center gap-2 p-2 rounded-md", 
                            "border-l-4 border-l-blue-500"
                          )}
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{visit.clientName}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" /> {visit.arrivalTime}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" /> {visit.city}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Mapa da rota otimizada</CardTitle>
              </CardHeader>
              <CardContent>
                <MapVisits visits={optimizedRoute} routeOptimized={true} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitRouteOptimizer;
