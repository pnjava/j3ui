import { z } from 'zod';

export const createPlanFundsUtilizationSchema = z.object({
  plan_id: z.string()
    .min(1, 'plan_id cannot be empty'),
  month: z.string().min(1, 'month cannot be empty').optional(),
  year: z.string().min(1, 'year cannot be empty').optional(),
  utilized_funds: z.string().min(1, 'utilized_funds cannot be empty').optional(),  
  created_by: z.string().min(1, 'created_by cannot be empty'),
  service_name: z.string().min(1, 'service_name cannot be empty'),
}).strict();

export const updatePlanFundsUtilizationSchema = z.object({
  id:z.string()
  .min(1, 'id cannot be empty'),
  plan_id: z.string()
    .min(1, 'plan_id cannot be empty'),
  month: z.string().min(1, 'month cannot be empty'),
  year: z.string().min(1, 'year cannot be empty'),
  utilized_funds: z.string().min(1, 'utilized_funds cannot be empty'),  
  last_updated_by: z.string().min(1, 'last_updated_by cannot be empty').optional(),
  service_name: z.string().min(1, 'service_name cannot be empty'),
}).strict();