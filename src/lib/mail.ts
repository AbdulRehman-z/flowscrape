import { Resend } from 'resend';

const resend = new Resend();


export const send2FAToken = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [`${email}`],
    subject: `Your 2FA token`,
    html: `<p>Here is your 2FA token:${token}</p>`,
  })
}

export const sendResetPasswordMail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [`${email}`],
    subject: `Reset your password`,
    html: `<p>click <a href="${resetLink}">here</a> to verify email.</p>`,
  });
}


export const sendVerificationMail = async (email: string, token: string) => {
  const verificationLink = `http://localhost:3000/auth/verification?token=${token}`

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [`${email}`],
    subject: `Confirm your email`,
    html: `<p>click <a href="${verificationLink}">here</a> to verify email.</p>`,
  });
}
