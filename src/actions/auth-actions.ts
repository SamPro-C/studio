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

export async function loginUser(data: LoginFormData) {
  console.log("Login attempt with:", data);
  // In a real app, you would call your authentication API here
  // For now, simulate success or failure
  if (data.emailOrPhone === "error@example.com") {
    return { success: false, message: "Invalid credentials provided." };
  }
  return { success: true, message: "Login successful! Redirecting..." };
}

export async function requestPasswordReset(data: { emailOrPhone: string }) {
  console.log("Password reset request for:", data.emailOrPhone);
  // In a real app, you would:
  // 1. Verify if the email/phone exists.
  // 2. Generate a unique, time-sensitive reset token/code.
  // 3. Send an email/SMS with the reset link/code.
  return { success: true, message: "If an account exists for this email/phone, a password reset link has been sent." };
}
