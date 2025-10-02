import { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, MapPin, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TrackingMapProps {
  trajectory?: Array<{ lat: number; lng: number; timestamp: string }>;
  vehicleType: 'aircraft' | 'ship';
  currentPosition?: { lat: number; lng: number };
}

export function TrackingMap({ trajectory = [], vehicleType, currentPosition }: TrackingMapProps) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 });

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 25, 50));
  const handleReset = () => {
    setZoomLevel(100);
    setMapCenter({ x: 50, y: 50 });
  };

  // Convert lat/lng to screen coordinates for visualization
  const convertToScreenCoords = (lat: number, lng: number) => {
    // Simple projection for demo purposes
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  const trajectoryPoints = trajectory.map(point => convertToScreenCoords(point.lat, point.lng));
  const currentScreenPos = currentPosition ? convertToScreenCoords(currentPosition.lat, currentPosition.lng) : null;

  return (
    <div className="w-full h-96 bg-blue-100 rounded-lg relative overflow-hidden border border-gray-300">
      {/* Map Background - Real satellite/geographic image */}
      <div 
        className="absolute inset-0 transition-transform duration-300"
        style={{ 
          transform: `scale(${zoomLevel / 100}) translate(${mapCenter.x - 50}%, ${mapCenter.y - 50}%)`,
          transformOrigin: 'center'
        }}
      >
        {/* Static Map Image */}
        <div className="w-full h-full relative">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1713098965471-d324f294a71d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMG1hcCUyMHNhdGVsbGl0ZSUyMG9jZWFuJTIwZ2VvZ3JhcGh5fGVufDF8fHx8MTc1OTQwNjQ1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Mapa mundial satelital"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay for better contrast */}
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Grid lines for coordinates */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
          
          {/* Major ports/airports markers */}
          <div className="absolute top-[35%] left-[25%] w-2 h-2 bg-red-500 rounded-full shadow-lg border border-white"></div>
          <div className="absolute top-[45%] right-[30%] w-2 h-2 bg-red-500 rounded-full shadow-lg border border-white"></div>
          <div className="absolute bottom-[35%] left-[35%] w-2 h-2 bg-red-500 rounded-full shadow-lg border border-white"></div>
          <div className="absolute top-[25%] right-[20%] w-2 h-2 bg-red-500 rounded-full shadow-lg border border-white"></div>
        </div>

        {/* Trajectory Path */}
        {trajectoryPoints.length > 1 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d={`M ${trajectoryPoints.map(p => `${p.x}% ${p.y}%`).join(' L ')}`}
              stroke="#ef4444"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              className="drop-shadow-sm"
            />
            {/* Trajectory points */}
            {trajectoryPoints.map((point, index) => (
              <circle
                key={index}
                cx={`${point.x}%`}
                cy={`${point.y}%`}
                r="3"
                fill="#dc2626"
                stroke="white"
                strokeWidth="1"
                className="drop-shadow-sm"
              />
            ))}
          </svg>
        )}

        {/* Current Position Marker */}
        {currentScreenPos && (
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
            style={{ left: `${currentScreenPos.x}%`, top: `${currentScreenPos.y}%` }}
          >
            <div className="relative">
              <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                {vehicleType === 'aircraft' ? (
                  <Navigation className="w-3 h-3 text-white" />
                ) : (
                  <MapPin className="w-3 h-3 text-white" />
                )}
              </div>
              {/* Ping animation */}
              <div className="absolute inset-0 w-6 h-6 bg-blue-500 rounded-full animate-ping opacity-30"></div>
            </div>
          </div>
        )}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button
          size="icon"
          variant="secondary"
          onClick={handleZoomIn}
          className="w-8 h-8 bg-white/90 hover:bg-white shadow-md"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          onClick={handleZoomOut}
          className="w-8 h-8 bg-white/90 hover:bg-white shadow-md"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          onClick={handleReset}
          className="w-8 h-8 bg-white/90 hover:bg-white shadow-md"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Map Info Panel */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md max-w-sm">
        <h4 className="mb-2">MAPA CON TRAYECTORIA</h4>
        <div className="space-y-1 text-sm text-muted-foreground">
          {currentPosition && (
            <p>Posición: {currentPosition.lat.toFixed(4)}, {currentPosition.lng.toFixed(4)}</p>
          )}
          <p>Zoom: {zoomLevel}%</p>
          {trajectory.length > 0 && (
            <p>Puntos de trayectoria: {trajectory.length}</p>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-md">
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-red-500"></div>
            <span>Trayectoria</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Posición actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Puertos/Aeropuertos</span>
          </div>
        </div>
      </div>
    </div>
  );
}