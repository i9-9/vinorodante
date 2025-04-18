import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface Order {
  id: string;
  user: {
    email: string;
  };
}

export async function sendOrderConfirmation(order: Order) {
  try {
    await resend.emails.send({
      from: 'Vino Rodante <orders@vinorodante.com>',
      to: order.user.email,
      subject: `Orden #${order.id.slice(0, 8)} Confirmada`,
      html: `
        <h1>¡Gracias por tu compra!</h1>
        <p>Tu orden ha sido confirmada...</p>
        // ... más detalles del email
      `
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
} 