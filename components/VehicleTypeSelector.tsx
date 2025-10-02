
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Ship } from 'lucide-react';

interface VehicleTypeSelectorProps {
  vehicleType: 'aircraft' | 'ship';
  onVehicleTypeChange: (type: 'aircraft' | 'ship') => void;
}

export function VehicleTypeSelector({ vehicleType, onVehicleTypeChange }: VehicleTypeSelectorProps) {
  return (
  <Tabs value={vehicleType} onValueChange={(value: string) => onVehicleTypeChange(value as 'aircraft' | 'ship')}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="aircraft" className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
          Aeronave
        </TabsTrigger>
        <TabsTrigger value="ship" className="flex items-center gap-2">
          <Ship className="w-4 h-4" />
          Buque
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}