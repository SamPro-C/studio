import { z } from 'zod';

export const LoginSchema = z.object({
  emailOrPhone: z.string().min(1, { message: "Email or Phone Number is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const RegisterLandlordSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits" }).regex(/^\+?[0-9\s-()]*$/, "Invalid phone number format"),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the Terms of Service and Privacy Policy",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // path of error
});

export type RegisterLandlordFormData = z.infer<typeof RegisterLandlordSchema>;
