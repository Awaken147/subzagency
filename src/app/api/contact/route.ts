import { NextRequest, NextResponse } from 'next/server';

const TO_EMAIL = 'subzagency99@gmail.com';
const FROM_EMAIL = 'SubzAgency <onboarding@resend.dev>';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, businessType, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const emailSubject = 'New Website Inquiry — SubzAgency';

    const emailHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a1a; border: 1px solid rgba(57,255,20,0.2); border-radius: 16px; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, rgba(57,255,20,0.1), rgba(0,240,255,0.1)); padding: 24px 32px; border-bottom: 1px solid rgba(57,255,20,0.15);">
          <h1 style="margin: 0; font-size: 22px; color: #39ff14;">New Client Inquiry</h1>
          <p style="margin: 6px 0 0; font-size: 14px; color: #8888aa;">Received from SubzAgency website</p>
        </div>

        <!-- Body -->
        <div style="padding: 28px 32px;">
          <h2 style="font-size: 16px; color: #e8e8f0; margin: 0 0 20px;">Client Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #8888aa; font-size: 14px; width: 140px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; color: #e8e8f0; font-size: 14px; font-weight: 600;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8888aa; font-size: 14px; vertical-align: top;">Email</td>
              <td style="padding: 10px 0; color: #00f0ff; font-size: 14px; font-weight: 600;"><a href="mailto:${escapeHtml(email)}" style="color: #00f0ff; text-decoration: none;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8888aa; font-size: 14px; vertical-align: top;">Phone</td>
              <td style="padding: 10px 0; color: #e8e8f0; font-size: 14px; font-weight: 600;">${phone ? escapeHtml(phone) : 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8888aa; font-size: 14px; vertical-align: top;">Business Type</td>
              <td style="padding: 10px 0; color: #e8e8f0; font-size: 14px; font-weight: 600;">${businessType ? escapeHtml(businessType) : 'Not specified'}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08);">
            <h2 style="font-size: 16px; color: #e8e8f0; margin: 0 0 12px;">Project Message</h2>
            <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 16px;">
              <p style="margin: 0; color: #e8e8f0; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 16px 32px; background: rgba(57,255,20,0.03); border-top: 1px solid rgba(255,255,255,0.06);">
          <p style="margin: 0; font-size: 12px; color: #8888aa;">This inquiry was submitted through the SubzAgency contact form.</p>
        </div>
      </div>
    `;

    const emailText = `New Website Inquiry — SubzAgency

CLIENT DETAILS:
• Name: ${name}
• Email: ${email}
• Phone: ${phone || 'Not provided'}
• Business Type: ${businessType || 'Not specified'}

PROJECT MESSAGE:
${message}

---
This inquiry was submitted through the SubzAgency contact form.`;

    // Check if Resend API key is configured
    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      // Dynamically import Resend only when API key is available
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);

      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject: emailSubject,
        html: emailHtml,
        text: emailText,
        replyTo: email,
      });

      if (error) {
        console.error('Resend API error:', error);
        return NextResponse.json(
          { error: 'Failed to send email. Please try again later.' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200 }
      );
    } else {
      // No API key — log and return success for development
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 NEW CONTACT FORM SUBMISSION (Dev Mode)');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`Name: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Phone: ${phone || 'N/A'}`);
      console.log(`Business Type: ${businessType || 'N/A'}`);
      console.log(`Message: ${message}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('ℹ️  Set RESEND_API_KEY in .env to send real emails');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      return NextResponse.json(
        { success: true, message: 'Form submission received (dev mode)' },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
