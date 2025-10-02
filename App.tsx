import React, { useState } from 'react';
import { TrackingMap } from './components/TrackingMap';
import { VehicleDataPanel } from './components/VehicleDataPanel';
import { VehicleTypeSelector } from './components/VehicleTypeSelector';
import { LoginDialog } from './components/LoginDialog';
import { Button } from './components/ui/button';
import { LogIn } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface VehicleData {
  origin: string;
  destination: string;
  status: string;
  identifier: string;
  speed: string;
  heading: string;
  altitude: string;
  flagCompany: string;
}

export default function App() {
  const [vehicleType, setVehicleType] = useState<'aircraft' | 'ship'>('aircraft');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    origin: '',
    destination: '',
    status: '',
    identifier: '',
    speed: '',
    heading: '',
    altitude: '',
    flagCompany: ''
  });

  // Mock trajectory data
  const mockTrajectory = [
    { lat: 40.7128, lng: -74.0060, timestamp: '2025-10-01T10:00:00Z' },
    { lat: 41.8781, lng: -87.6298, timestamp: '2025-10-01T12:00:00Z' },
    { lat: 39.9526, lng: -75.1652, timestamp: '2025-10-01T14:00:00Z' }
  ];

  const currentPosition = { lat: 39.9526, lng: -75.1652 };

  const handleDataChange = (field: keyof VehicleData, value: string) => {
    setVehicleData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateReport = () => {
    if (!vehicleData.identifier) {
      toast.error('Por favor ingrese un identificador válido');
      return;
    }

    // Mock report generation
    const reportData = {
      vehicleType,
      ...vehicleData,
      timestamp: new Date().toLocaleString(),
      position: currentPosition
    };

    console.log('Reporte generado:', reportData);
    toast.success('Reporte generado exitosamente');
    
    // In a real application, this would send the data to a backend service
    // or generate a downloadable PDF report
  };

  const handleVehicleTypeChange = (type: 'aircraft' | 'ship') => {
    setVehicleType(type);
    // Reset altitude when switching to ship
    if (type === 'ship') {
      setVehicleData(prev => ({ ...prev, altitude: '' }));
    }
  };

  const handleLogin = () => {
    setIsLoginOpen(true);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="relative">
          <div className="text-center">
            <h1>Sistema de Seguimiento de Vehículos</h1>
            <p className="text-muted-foreground">
              Monitoreo en tiempo real de aeronaves y embarcaciones
            </p>
          </div>
          <Button 
            onClick={handleLogin}
            className="absolute top-0 right-0 flex items-center gap-2"
            variant="outline"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Button>
        </header>

        <VehicleTypeSelector 
          vehicleType={vehicleType}
          onVehicleTypeChange={handleVehicleTypeChange}
        />

        <TrackingMap 
          trajectory={mockTrajectory}
          vehicleType={vehicleType}
          currentPosition={currentPosition}
        />

        <VehicleDataPanel
          data={vehicleData}
          onDataChange={handleDataChange}
          onGenerateReport={handleGenerateReport}
          vehicleType={vehicleType}
        />

        <LoginDialog 
          open={isLoginOpen} 
          onOpenChange={setIsLoginOpen} 
        />
      </div>
    </div>
  );
}