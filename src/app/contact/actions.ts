
'use server';

import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import type { ContactFormValues } from './ContactForm';

// Server Action to save the contact message to Firestore
export async function saveContactMessage(data: ContactFormValues) {
  try {
    // In a Firebase App Hosting environment, Firebase SDK should be configured.
    // getFirestore() should ideally work if the default Firebase app is initialized.
    const db = getFirestore();
    await addDoc(collection(db, 'contactSubmissions'), {
      name: data.name,
      email: data.email,
      message: data.message,
      submittedAt: Timestamp.now(),
    });
    return { success: true, message: 'Your message has been sent successfully and stored!' };
  } catch (error: any) {
    console.error('Error writing to Firestore:', error);
    let userMessage = 'There was an error saving your message. Please try again.';
    // More specific error messages can be helpful for debugging or user feedback
    if (error.code === 'unavailable') {
        userMessage = 'The service is temporarily unavailable. Please try again later.';
    } else if (error.code === 'permission-denied') {
        userMessage = 'Could not save message. Please check service permissions.';
    }
    return { success: false, message: userMessage };
  }
}
