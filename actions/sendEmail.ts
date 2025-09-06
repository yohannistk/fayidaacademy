"use server";

import axios from "axios";
export async function sendEmail({
  subject,
  text,
}: {
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    const response = await axios.post(
      "https://api.mailersend.com/v1/email",
      {
        from: {
          email: "no-reply@test-z0vklo6r307l7qrx.mlsender.net",
          name: "Fayida Academy",
        },
        to: [
          {
            email: process.env.EMAIL!,
            name: "Me",
          },
        ],
        subject: subject || "Test Email from MailerSend",
        text: text,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error(
      "❌ Error sending email:",
      error.response?.data || error.message
    );
    return { success: false, error: error.response?.data || error.message };
  }
}
