
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Visit } from '@/models/types';
import { cn } from '@/lib/utils';

interface MapVisitsProps {
  visits: Visit[];
  routeOptimized?: boolean;
}

const MapVisits: React.FC<MapVisitsProps> = ({ visits, routeOptimized = false }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);
  
  // Filter visits that have location data
  const visitsWithLocation = visits.filter(visit => 
    visit.location && visit.location.latitude && visit.location.longitude
  );

  useEffect(() => {
    // If no token or no visits with location, don't initialize map
    if (!mapboxToken || visitsWithLocation.length === 0) return;

    // Initialize map
    if (!map.current && mapContainer.current) {
      try {
        mapboxgl.accessToken = mapboxToken;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [visitsWithLocation[0].location!.longitude, visitsWithLocation[0].location!.latitude],
          zoom: 11
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl());

        // Set token as valid if map loads successfully
        map.current.on('load', () => {
          setIsTokenValid(true);
          addMarkers();
          if (routeOptimized && visitsWithLocation.length > 1) {
            drawRoute();
          }
        });

        // Handle map load error
        map.current.on('error', () => {
          setIsTokenValid(false);
        });
      } catch (error) {
        console.error('Error initializing map:', error);
        setIsTokenValid(false);
      }
    }

    return () => {
      // Cleanup map on unmount
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken, visitsWithLocation.length]);

  // Add markers for each visit
  const addMarkers = () => {
    if (!map.current) return;
    
    visitsWithLocation.forEach((visit, index) => {
      // Create marker element
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '25px';
      el.style.height = '25px';
      el.style.borderRadius = '50%';
      el.style.display = 'flex';
      el.style.justifyContent = 'center';
      el.style.alignItems = 'center';
      el.style.backgroundColor = routeOptimized ? '#3b82f6' : '#10b981';
      el.style.border = '2px solid white';
      el.style.color = 'white';
      el.style.fontWeight = 'bold';
      el.style.fontSize = '12px';
      el.textContent = String(index + 1);
      
      // Add popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="p-2">
          <h3 class="font-bold">${visit.clientName}</h3>
          <p>${visit.address}</p>
          <p>${visit.city}</p>
          <p>Horário: ${visit.arrivalTime}</p>
        </div>`
      );

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat([visit.location!.longitude, visit.location!.latitude])
        .setPopup(popup)
        .addTo(map.current!);
    });
  };

  // Draw route between visits (simplified version without actual routing API)
  const drawRoute = () => {
    if (!map.current) return;
    
    // Add route line as a layer
    const coordinates = visitsWithLocation.map(visit => [
      visit.location!.longitude, 
      visit.location!.latitude
    ]);
    
    // Add source for the route
    map.current.addSource('route', {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': coordinates
        }
      }
    });
    
    // Add route layer
    map.current.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#3b82f6',
        'line-width': 3
      }
    });
  };

  // Fit map to bounds of all markers
  useEffect(() => {
    if (map.current && isTokenValid && visitsWithLocation.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      
      visitsWithLocation.forEach(visit => {
        bounds.extend([
          visit.location!.longitude,
          visit.location!.latitude
        ]);
      });
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 13
      });
    }
  }, [isTokenValid, visitsWithLocation]);

  return (
    <div className="space-y-4">
      {!mapboxToken && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Mapbox Access Token</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Cole seu token do Mapbox aqui"
              className="flex-1 border rounded-md p-2"
              onChange={(e) => setMapboxToken(e.target.value)}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Crie uma conta no <a href="https://www.mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">Mapbox</a> e obtenha um token de acesso público
          </p>
        </div>
      )}

      {mapboxToken && !isTokenValid && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Token do Mapbox inválido. Por favor, verifique o token e tente novamente.
        </div>
      )}

      {visitsWithLocation.length === 0 ? (
        <div className="border rounded-lg p-8 text-center">
          <p className="text-gray-500">Nenhuma visita com dados de localização disponível</p>
        </div>
      ) : (
        <div 
          ref={mapContainer} 
          className={cn(
            "w-full h-[400px] rounded-lg border",
            !mapboxToken && "bg-gray-100 flex items-center justify-center"
          )}
        >
          {!mapboxToken && (
            <p className="text-gray-500">Insira um token do Mapbox para visualizar o mapa</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MapVisits;
