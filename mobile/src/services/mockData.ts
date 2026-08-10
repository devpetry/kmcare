import { Vehicle } from '../types/vehicle';

export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    nickname: 'Carro do João',
    brand: 'Volkswagen',
    model: 'Gol',
    year: 2019,
    currentKm: 48200,
    nextMaintenance: { typeName: 'Troca de óleo', dueInKm: 800 },
  },
  {
    id: '2',
    nickname: 'Moto',
    brand: 'Honda',
    model: 'CG 160',
    year: 2021,
    currentKm: 12500,
    nextMaintenance: { typeName: 'Revisão', dueInDays: 15 },
  },
];