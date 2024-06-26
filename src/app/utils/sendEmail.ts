import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    //host: 'smtp.gmail.com.',
    //port: 587,
    //secure: config.NODE_ENV === 'development',
    service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "mdhmaktaruzzaman9101@gmail.com",
      pass: "mopgvxmusxutzubs",
    },
  });

  await transporter.sendMail({
    from: 'University email', // sender address
    to, // list of receivers
    subject: 'Reset your password within ten mins!', // Subject line
    text: 'Please Forgot Your Password',
    html: `${html}`,
  });
};