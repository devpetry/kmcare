import { z } from 'zod';

export const maintenanceSchema = z.object({
  maintenanceTypeId: z.string().min(1, 'Selecione o tipo de manutenção'),
  performedAt: z
    .string()
    .min(1, 'Data é obrigatória')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Use o formato DD/MM/AAAA'),
  kmAtService: z
    .string()
    .min(1, 'Quilometragem é obrigatória')
    .refine((val) => Number(val) >= 0, 'Quilometragem inválida'),
  cost: z.string().optional(),
  notes: z.string().optional(),
});

export type MaintenanceFormData = z.infer<typeof maintenanceSchema>;