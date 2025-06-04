const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Función para enviar el correo electrónico
async function sendEmail(email, registrationLink) {
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_SERVICE,
    port: process.env.NODEMAILER_PORT,
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: process.env.NODEMAILER_EMAIL_ADDRESS,
      pass: process.env.NODEMAILER_EMAIL_PWD,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL_ADDRESS,
    to: email,
    subject: "Completa tu registro con Rapidpago",
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; text-align: center;">
        <div style="max-width: 500px; margin: auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333; text-align: center;">Bienvenido a Rapidpago</h2>
            <p style="color: #555; font-size: 16px; text-align: center;">
                Para completar tu registro, haz clic en el siguiente botón:
            </p>
            <div style="margin: 20px 0;">
                <a href="${registrationLink}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
                    Completar Registro
                </a>
            </div>
            <p style="margin-top: 20px; font-size: 14px; color: #777; text-align: center;">
                Si el botón no funciona, también puedes copiar y pegar el siguiente enlace en tu navegador:
            </p>
            <p style="word-wrap: break-word; font-size: 14px; color: #007bff; text-align: center;">
                <a href="${registrationLink}" style="color: #007bff; text-decoration: none;">${registrationLink}</a>
            </p>
        </div>
    </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

async function sendPaymentEmail(email) {
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_SERVICE,
    port: process.env.NODEMAILER_PORT,
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: process.env.NODEMAILER_EMAIL_ADDRESS,
      pass: process.env.NODEMAILER_EMAIL_PWD,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL_ADDRESS,
    to: email,
    subject: "Se ha registrado su pago correctamente",
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; text-align: center;">
        <div style="max-width: 500px; margin: auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333; text-align: center;">Bienvenido a Rapidpago</h2>
            <p style="color: #555; font-size: 16px; text-align: center;">
                Para completar tu registro, haz clic en el siguiente botón:
            </p>
            <div style="margin: 20px 0;">
                <a href="${registrationLink}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
                    Completar Registro
                </a>
            </div>
            <p style="margin-top: 20px; font-size: 14px; color: #777; text-align: center;">
                Si el botón no funciona, también puedes copiar y pegar el siguiente enlace en tu navegador:
            </p>
            <p style="word-wrap: break-word; font-size: 14px; color: #007bff; text-align: center;">
                <a href="${registrationLink}" style="color: #007bff; text-decoration: none;">${registrationLink}</a>
            </p>
        </div>
    </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

async function resendLink(req, res) {
  const { email } = req.body;

  const user = await db("users").where({ email }).first();

  if (!user) {
    return res.status(400).send("Correo electrónico no encontrado");
  }

  const token = generateToken();
  const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 horas

  await db("users").where({ email }).update({ token, tokenExpiry });

  await sendEmail(email, token);

  res.status(200).send("Nuevo enlace enviado");
}

module.exports = { sendEmail, sendPaymentEmail, resendLink };
