import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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

interface VehicleDataPanelProps {
  data: VehicleData;
  onDataChange: (field: keyof VehicleData, value: string) => void;
  onGenerateReport: () => void;
  vehicleType: 'aircraft' | 'ship';
}

export function VehicleDataPanel({ 
  data, 
  onDataChange, 
  onGenerateReport, 
  vehicleType 
}: VehicleDataPanelProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Data Section */}
      <Card>
        <CardHeader>
          <CardTitle>DATOS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="origin">Origen</Label>
            <Input
              id="origin"
              value={data.origin}
              onChange={(e) => onDataChange('origin', e.target.value)}
              placeholder="Ciudad/Puerto de origen"
            />
          </div>
          
          <div>
            <Label htmlFor="destination">Destino</Label>
            <Input
              id="destination"
              value={data.destination}
              onChange={(e) => onDataChange('destination', e.target.value)}
              placeholder="Ciudad/Puerto de destino"
            />
          </div>
          
          <div>
            <Label htmlFor="status">Estado</Label>
            <Select value={data.status} onValueChange={(value) => onDataChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-ruta">En ruta</SelectItem>
                <SelectItem value="arribando">Arribando</SelectItem>
                <SelectItem value="en-puerto">En puerto/aeropuerto</SelectItem>
                <SelectItem value="retrasado">Retrasado</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={onGenerateReport} 
            className="w-full"
            variant="outline"
          >
            Generar reporte
          </Button>
        </CardContent>
      </Card>

      {/* Real-time Data Section */}
      <Card>
        <CardHeader>
          <CardTitle>DATOS EN TIEMPO REAL</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Identificador: {vehicleType === 'aircraft' ? 'ICAO24' : 'MMSI'}</Label>
            <Input
              value={data.identifier}
              onChange={(e) => onDataChange('identifier', e.target.value)}
              placeholder={vehicleType === 'aircraft' ? 'Código ICAO24' : 'Código MMSI'}
            />
          </div>
          
          <div>
            <Label>Velocidad</Label>
            <div className="flex items-center gap-2">
              <Input
                value={data.speed}
                onChange={(e) => onDataChange('speed', e.target.value)}
                placeholder="0"
                className="flex-1"
              />
              <span className="text-muted-foreground text-sm">
                {vehicleType === 'aircraft' ? 'kt' : 'nudos'}
              </span>
            </div>
          </div>
          
          <div>
            <Label>Rumbo</Label>
            <div className="flex items-center gap-2">
              <Input
                value={data.heading}
                onChange={(e) => onDataChange('heading', e.target.value)}
                placeholder="0"
                className="flex-1"
              />
              <span className="text-muted-foreground text-sm">°</span>
            </div>
          </div>
          
          {vehicleType === 'aircraft' && (
            <div>
              <Label>Altitud</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={data.altitude}
                  onChange={(e) => onDataChange('altitude', e.target.value)}
                  placeholder="0"
                  className="flex-1"
                />
                <span className="text-muted-foreground text-sm">ft</span>
              </div>
            </div>
          )}
          
          <div>
            <Label>{vehicleType === 'aircraft' ? 'Compañía' : 'Bandera'}</Label>
            <Input
              value={data.flagCompany}
              onChange={(e) => onDataChange('flagCompany', e.target.value)}
              placeholder={vehicleType === 'aircraft' ? 'Línea aérea' : 'País de bandera'}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}