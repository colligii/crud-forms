import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.STMP_HOST,
    port:+(process.env.STMP_PORT ?? 0),
    secure: Boolean(process.env.STMP_SECURE), // true for 465, false for other ports
    auth: {
      user: process.env.STMP_USER, // generated ethereal user
      pass: process.env.STMP_PASS, // generated ethereal password
    },
  });

  export default transporter;