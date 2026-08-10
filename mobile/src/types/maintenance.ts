export type MaintenanceRecord = {
  id: string;
  vehicleId: string;
  typeName: string;
  performedAt: string;// formato ISO: '2026-06-15'
  kmAtService: number;
  cost?: number;
  notes?: string;
};