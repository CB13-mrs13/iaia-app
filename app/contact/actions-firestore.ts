'use server';

import * as z from 'zod';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase/config';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  feedbackType: z.enum(['suggestion', 'bug', 'feedback']),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export async function saveContactMessage(formData: ContactFormValues) {
  const validatedFields = contactSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid form data." };
  }

  const { name, email, feedbackType, message } = validatedFields.data;
  
  try {
    const db = getFirestore(app);
    // Save to Firestore collection 'contact-messages'
    const docRef = await addDoc(collection(db, 'contact-messages'), {
      name,
      email,
      feedbackType,
      message,
      status: 'unread',
      createdAt: serverTimestamp(),
    });

    console.log("Message saved to Firestore:", docRef.id);
    return { success: true, messageId: docRef.id };
  } catch (error) {
    console.error("Failed to save message:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: `Failed to save message: ${errorMessage}` };
  }
}
