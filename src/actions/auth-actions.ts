// src/actions/auth-actions.ts
"use server";

import type { RegisterLandlordFormData, LoginFormData } from "@/schemas/auth";

export async function registerLandlord(data: RegisterLandlordFormData) {
  console.log("Registering landlord with:", data);
  // In a real app, call your registration API and handle admin approval flow.
  // For now, simulate success or failure.
  if (data.email === "exists@example.com") {
    return { success: false, message: "Email already exists." };
  }
  return { success: true, message: "Registration submitted! Awaiting admin approval." };
}

export type UserRole = 'landlord' | 'tenant' | 'worker' | 'admin';

export async function loginUser(data: LoginFormData): Promise<{ success: boolean; message: string; role?: UserRole }> {
  console.log("Login attempt with:", data);
  // In a real app, you would call your authentication API here
  // For now, simulate success or failure and assign a role based on email

  if (data.emailOrPhone === "error@example.com") {
    return { success: false, message: "Invalid credentials provided." };
  }

  let role: UserRole | undefined = undefined;

  if (data.emailOrPhone.toLowerCase() === "landlord@example.com") {
    role = 'landlord';
  } else if (data.emailOrPhone.toLowerCase() === "tenant@example.com") {
    role = 'tenant';
  } else if (data.emailOrPhone.toLowerCase() === "worker@example.com") {
    role = 'worker';
  } else if (data.emailOrPhone.toLowerCase() === "admin@example.com") {
    role = 'admin';
  } else if (data.emailOrPhone && !data.emailOrPhone.includes("error")) {
    // For any other successful login simulation that isn't an error or specific role
    // You might want to assign a default role or handle this case differently
    // For now, let's assume a generic successful login without a specific redirect
    return { success: true, message: "Login successful! Role not determined for this user." };
  } else {
     return { success: false, message: "Invalid credentials or unknown user." };
  }

  if (role) {
    return { success: true, message: "Login successful! Redirecting...", role };
  }
  // Fallback for other non-error cases, though the logic above should cover most.
  return { success: true, message: "Login successful! No specific dashboard for this user." };
}

export async function requestPasswordReset(data: { emailOrPhone: string }) {
  console.log("Password reset request for:", data.emailOrPhone);
  // In a real app, you would:
  // 1. Verify if the email/phone exists.
  // 2. Generate a unique, time-sensitive reset token/code.
  // 3. Send an email/SMS with the reset link/code.
  return { success: true, message: "If an account exists for this email/phone, a password reset link has been sent." };
}