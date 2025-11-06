
'use server';

import * as z from 'zod';
import { Resend } from 'resend';
import { saveContactMessage } from './actions-firestore';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  feedbackType: z.enum(['suggestion', 'bug', 'feedback']),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// Initialize Resend with the SERVER-SIDE environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: ContactFormValues) {
  const validatedFields = contactSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid form data." };
  }

  const { name, email, feedbackType, message } = validatedFields.data;

  // Always save to Firestore first as backup
  const firestoreResult = await saveContactMessage(formData);
  
  if (!firestoreResult.success) {
    console.error('Failed to save to Firestore:', firestoreResult.error);
  }

  // Check for the Resend API key on the server
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes("paste_your")) {
      console.error('RESEND_API_KEY is not set on the server. Message saved to Firestore only.');
      return { 
        success: true, 
        message: "Votre message a été enregistré. Nous vous contacterons bientôt !",
        firestoreOnly: true 
      };
  }
  
  try {
    const data = await resend.emails.send({
      from: 'IAIA Contact Form <onboarding@resend.dev>',
      to: ['contact.initiation.ia@gmail.com'],
      subject: `New Feedback from IAIA: ${feedbackType}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Feedback Type:</strong> ${feedbackType}</p>
        <hr>
        <h2>Message:</h2>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Firestore ID: ${firestoreResult.messageId || 'N/A'}</small></p>
      `,
    });

    if (data.error) {
        console.error("Resend error:", data.error);
        // Email failed but saved to Firestore
        return { 
          success: true, 
          message: "Votre message a été enregistré. Nous vous contacterons bientôt !",
          warning: `Email not sent: ${data.error.message}`,
          firestoreOnly: true 
        };
    }

    console.log("Email sent successfully:", data);
    return { success: true, message: "Message envoyé avec succès !", emailSent: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    // Email failed but saved to Firestore
    return { 
      success: true, 
      message: "Votre message a été enregistré. Nous vous contacterons bientôt !",
      warning: error instanceof Error ? error.message : "Email sending failed",
      firestoreOnly: true 
    };
  }
}
