export type Vehicle = {
  id: string;
  nickname: string;
  brand: string;
  model: string;
  year: number;
  currentKm: number;
  nextMaintenance?: {
    typeName: string;
    dueInKm?: number;
    dueInDays?: number;
  };
};