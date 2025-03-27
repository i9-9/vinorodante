import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  frequency: string;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { shippingInfo, cartItems, total } = await request.json() as {
      shippingInfo: ShippingInfo;
      cartItems: CartItem[];
      total: number;
    };

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'Nueva Orden - Vino Rodante',
      html: `
        <h2>Nueva Orden Recibida</h2>
        <h3>Información de Envío:</h3>
        <p>Nombre: ${shippingInfo.firstName} ${shippingInfo.lastName}</p>
        <p>Email: ${shippingInfo.email}</p>
        <p>Teléfono: ${shippingInfo.phone}</p>
        <p>Dirección: ${shippingInfo.address}</p>
        <p>Ciudad: ${shippingInfo.city}</p>
        <p>Provincia: ${shippingInfo.state}</p>
        <p>Código Postal: ${shippingInfo.zipCode}</p>
        
        <h3>Productos:</h3>
        ${cartItems.map((item) => `
          <div>
            <p>Producto: ${item.name}</p>
            <p>Cantidad: ${item.quantity}</p>
            <p>Precio: $${item.price}</p>
          </div>
        `).join('')}
        
        <h3>Total: $${total}</h3>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
} 