
import emailjs from 'emailjs-com';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendOrderEmail({ to_name, to_email, codigo_pedido, senha_pedido }) {
  try {
    const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      to_name, to_email, codigo_pedido, senha_pedido
    }, PUBLIC_KEY);
    return res;
  } catch (err) {
    console.error('Erro EmailJS:', err);
    throw err;
  }
}
