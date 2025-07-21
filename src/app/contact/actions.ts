
'use server';

import * as z from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  feedbackType: z.enum(['suggestion', 'bug', 'feedback']),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// Initialize Resend with the correct environment variable
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function sendContactEmail(formData: ContactFormValues) {
  const validatedFields = contactSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: "Invalid form data." };
  }

  const { name, email, feedbackType, message } = validatedFields.data;

  // Check for the correctly prefixed API key
  if (!process.env.NEXT_PUBLIC_RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY.includes("paste_your")) {
      console.error('NEXT_PUBLIC_RESEND_API_KEY is not set. Email will not be sent.');
      return { error: "Server configuration error: cannot send email." };
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
      `,
    });

    if (data.error) {
        console.error("Resend error:", data.error);
        return { error: data.error.message };
    }

    return { success: "Email sent successfully!" };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { error: "An unexpected error occurred while sending the email." };
  }
}
