import { z } from "zod";

export const dapAdminUserManagementSchema = z.object({
    userManagementFiles: z.array(z.string()),
});

export type DapAdminUserManagementData = z.infer<typeof dapAdminUserManagementSchema>;
