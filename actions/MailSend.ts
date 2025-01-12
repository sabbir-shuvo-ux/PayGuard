"use server";

import { mailOptions, transporter } from "@/config/nodemailer";

export const SendMail = async (email: string): Promise<{ sucess: boolean }> => {
  try {
    await transporter.sendMail({
      ...mailOptions,
      to: email,
      subject: "My Applications Contact Form",
      text: "Hello there",
      html: `
            <h2>PayGuard Mailing System</h2>
            <h2>Payment Request Approved</h2>
            <p>
            Dear User,
            We are pleased to inform you that your payment request has been approved. 🎉
            If you have any questions or need further assistance, feel free to reach out.

            Best regards,
            Admin
            </p>
              `,
    });

    return {
      sucess: true,
    };
  } catch (err) {
    console.log(err);
    return {
      sucess: false,
    };
  }
};
