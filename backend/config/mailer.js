import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const port = Number(process.env.SMTP_PORT) || 465;

// Por defecto usa Gmail; con SMTP_HOST/SMTP_PORT sirve cualquier proveedor SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port,
  secure: port === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const MAIL_FROM = `"Nuno Deportes" <${process.env.SMTP_USER}>`;

export default transporter;
