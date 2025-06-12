import { z } from 'zod';

export const LandlordProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").regex(/^\+?[0-9\s-()]*$/, "Invalid phone number format"),
});
export type LandlordProfileFormData = z.infer<typeof LandlordProfileSchema>;

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "New passwords do not match",
  path: ["confirmNewPassword"],
});
export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;