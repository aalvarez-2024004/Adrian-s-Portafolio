import express from "express";
import { Resend } from "resend";

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  const { titulo, mensaje, correo } = req.body;

  if (!titulo || !mensaje || !correo) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return res.status(400).json({ error: "Correo inválido" });
  }

  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_SENDER_EMAIL,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      reply_to: correo,
      subject: `Portafolio - ${titulo}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>Nuevo mensaje desde el portafolio</h2>
          <p><strong>Título:</strong> ${titulo}</p>
          <p><strong>Correo de contacto:</strong> ${correo}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${mensaje}</p>
        </div>
      `,
    });

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    return res.status(200).json({ success: true, id: data.data.id });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return res.status(500).json({ error: "Error interno al enviar el correo" });
  }
});

export default router;