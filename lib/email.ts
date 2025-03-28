// Este archivo se usará más adelante cuando implementemos el envío de emails
/*
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(order: any) {
  try {
    await resend.emails.send({
      from: 'Vino Rodante <orders@vinorodante.com>',
      to: order.user.email,
      subject: `Orden #${order.id.slice(0, 8)} Confirmada`,
      html: `
        <h1>¡Gracias por tu compra!</h1>
        <p>Tu orden ha sido confirmada...</p>
      `
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
*/

// Placeholder for email functionality
export const sendOrderConfirmation = async () => {
  return Promise.resolve();
}; 