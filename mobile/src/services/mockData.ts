import { Vehicle } from "../types/vehicle";
import { MaintenanceRecord } from "../types/maintenance";

export const mockVehicles: Vehicle[] = [
  {
    id: "1",
    nickname: "Carro do João",
    brand: "Volkswagen",
    model: "Gol",
    year: 2019,
    currentKm: 48200,
    nextMaintenance: { typeName: "Troca de óleo", dueInKm: 800 },
  },
  {
    id: "2",
    nickname: "Moto",
    brand: "Honda",
    model: "CG 160",
    year: 2021,
    currentKm: 12500,
    nextMaintenance: { typeName: "Revisão", dueInDays: 15 },
  },
];

export const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: "m1",
    vehicleId: "1",
    typeName: "Troca de óleo",
    performedAt: "2026-02-10",
    kmAtService: 40200,
    cost: 180,
    notes: "Óleo sintético 5W30",
  },
  {
    id: "m2",
    vehicleId: "1",
    typeName: "Troca de pneus",
    performedAt: "2025-11-03",
    kmAtService: 36500,
    cost: 1200,
  },
  {
    id: "m3",
    vehicleId: "2",
    typeName: "Revisão",
    performedAt: "2026-01-20",
    kmAtService: 10000,
    cost: 250,
  },
];
