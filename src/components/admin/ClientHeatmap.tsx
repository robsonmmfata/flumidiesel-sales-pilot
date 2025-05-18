
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mockClientLocations } from '@/data/mockData';

// You would typically store this token in an environment variable
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xsNnB5MHgwMDI1YjNkcDBtdHVjNDB6eCJ9.QHnDceSh-qS65MgQUbbXdA';

const ClientHeatmap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  useEffect(() => {
    if (!mapContainer.current) return;
    
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-53.5, -14.5], // Center on Brazil
      zoom: 3,
      projection: 'mercator',
    });
    
    map.current.addControl(new mapboxgl.NavigationControl());
    
    // Add data points when the map loads
    map.current.on('load', () => {
      if (!map.current) return;
      
      // Add source for heatmap
      map.current.addSource('clients', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: mockClientLocations.map((client) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [client.lng, client.lat]
            },
            properties: {
              name: client.name,
              sales: client.sales,
              salesVolume: Math.log(client.sales) * 2, // Scale for visualization
            }
          }))
        }
      });

      // Add the heatmap layer
      map.current.addLayer({
        id: 'clients-heat',
        type: 'heatmap',
        source: 'clients',
        paint: {
          // Increase weight based on sales
          'heatmap-weight': ['get', 'salesVolume'],
          
          // Increase intensity as zoom level increases
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 1,
            9, 3
          ],
          
          // Color heatmap based on density
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, 'rgb(103,169,207)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(253,219,199)',
            0.8, 'rgb(239,138,98)',
            1, 'rgb(178,24,43)'
          ],
          
          // Radius increases with zoom level
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 10,
            9, 25
          ],
          
          // Opacity decreases with zoom level
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7, 1,
            9, 0.7
          ],
        }
      });

      // Add circle layer for points
      map.current.addLayer({
        id: 'clients-point',
        type: 'circle',
        source: 'clients',
        minzoom: 5,
        paint: {
          // Size based on sales volume
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            5, ['*', ['get', 'salesVolume'], 0.5],
            8, ['*', ['get', 'salesVolume'], 1],
          ],
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'salesVolume'],
            0, '#73b3d8',
            2, '#3887be',
            5, '#2a6fbe',
            8, '#1a54a9',
            10, '#123a76'
          ],
          'circle-stroke-color': 'white',
          'circle-stroke-width': 1,
          'circle-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            5, 0.7,
            8, 0.9
          ]
        }
      });

      // Add popup on hover
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      map.current.on('mouseenter', 'clients-point', (e) => {
        if (!map.current || !e.features || !e.features.length) return;
        
        map.current.getCanvas().style.cursor = 'pointer';
        
        const feature = e.features[0];
        // Type assertion to specify the geometry type
        const pointGeometry = feature.geometry as GeoJSON.Point;
        const coordinates = pointGeometry.coordinates.slice() as [number, number];
        const name = feature.properties?.name || '';
        const sales = feature.properties?.sales || 0;
        
        // Format the sales as currency
        const formattedSales = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(sales);
        
        const popupContent = `
          <strong>${name}</strong><br/>
          Vendas: ${formattedSales}
        `;
        
        popup.setLngLat(coordinates)
          .setHTML(popupContent)
          .addTo(map.current);
      });

      map.current.on('mouseleave', 'clients-point', () => {
        if (!map.current) return;
        map.current.getCanvas().style.cursor = '';
        popup.remove();
      });
    });
    
    return () => {
      map.current?.remove();
    };
  }, []);
  
  return (
    <div className="w-full h-[400px] rounded-lg relative">
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg shadow-lg"
      />
      <div className="absolute bottom-2 left-2 bg-white/90 p-2 rounded-md shadow text-xs">
        <p className="font-bold mb-1">Vendas por Localização</p>
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-blue-900 rounded-full"></span>
          <span>Alta</span>
          <span className="w-2 h-2 bg-blue-700 rounded-full ml-2"></span>
          <span>Média</span>
          <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
          <span>Baixa</span>
        </div>
      </div>
    </div>
  );
};

export default ClientHeatmap;
