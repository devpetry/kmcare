import { z } from 'zod';

export const vehicleSchema = z.object({
  nickname: z.string().min(1, 'Dê um apelido para o veículo'),
  brand: z.string().min(1, 'Marca é obrigatória'),
  model: z.string().min(1, 'Modelo é obrigatório'),
  year: z
    .string()
    .min(4, 'Ano inválido')
    .refine((val) => {
      const year = Number(val);
      return year >= 1950 && year <= new Date().getFullYear() + 1;
    }, 'Digite um ano válido'),
  currentKm: z
    .string()
    .min(1, 'Quilometragem é obrigatória')
    .refine((val) => Number(val) >= 0, 'Quilometragem inválida'),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;