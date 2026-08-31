import { NextRequest, NextResponse } from 'next/server';
import { createEnquiry } from '@/lib/supabase/admin';
import { checkRateLimit, getClientIp, hashClientIp } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    // Rate limit: Max 3 form submissions per IP per 15 minutes
    const rateCheck = await checkRateLimit('enquiry_submit', ip, 3, 15);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          error: `Rate limit reached. You can only submit 3 enquiries every 15 minutes. Please try again in ${rateCheck.resetMinutes} minute(s).`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, phone, service_requested, message } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 });
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a message with at least 10 characters.' },
        { status: 400 }
      );
    }

    const newEnquiry = await createEnquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : undefined,
      service_requested: service_requested || 'General Consultation',
      message: message.trim(),
      ip_hash: hashClientIp(ip),
      status: 'new',
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
      enquiryId: newEnquiry.id,
      remainingAttempts: rateCheck.remaining,
    });
  } catch (error: any) {
    console.error('Enquiry submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please try again later or reach us directly on WhatsApp.' },
      { status: 500 }
    );
  }
}
