export const runtime = "nodejs";
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function isEmail(x: unknown) { return typeof x === 'string' && /.+@.+\..+/.test(x); }

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, role, topic, email, recipients, honey } = body || {};

    if (typeof honey === 'string' && honey.trim() !== '') {
      return NextResponse.json({ ok: true }); // honeypot
    }
    if (!isEmail(email)) return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });

    const to: string[] = Array.isArray(recipients) ? recipients.filter(isEmail) : [];
    if (to.length === 0) return NextResponse.json({ ok: false, error: 'No recipients' }, { status: 400 });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const subject = `New contact • ${name || 'Someone'} (${role || '—'})`;
    const text = [
      `Name: ${name || '—'}`,
      `Role: ${role || '—'}`,
      `Topic: ${topic || '—'}`,
      `Email: ${email || '—'}`,
      `Sent at: ${new Date().toISOString()}`,
    ].join('\n');

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'no-reply@localhost',
      to,
      subject,
      text,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('contact/send error', e);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
