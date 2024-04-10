import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  console.log(email);
  if (!email) {
    return new NextResponse(JSON.stringify({ error: 'Email is required' }), { status: 400 });
  }
  
  try {
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_API_SERVER;
    const MAILCHIMP_AUDIENCE_ID= process.env.MAILCHIMP_AUDIENCE_ID;

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX || !MAILCHIMP_AUDIENCE_ID) {
      return new NextResponse(JSON.stringify({ error: 'Mailchimp configuration is missing' }), { status: 500 });
    }
    console.log('MAILCHIMP_API_KEY:', MAILCHIMP_API_KEY);
    console.log('MAILCHIMP_SERVER_PREFIX:', MAILCHIMP_SERVER_PREFIX);
    console.log('MAILCHIMP_AUDIENCE_ID:', MAILCHIMP_AUDIENCE_ID);
    
    const data = {
      email_address: email,
      status: 'subscribed',
    };
    
    const response = await fetch(
      `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        },
        body: JSON.stringify(data),
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      return new NextResponse(JSON.stringify({ error: errorData.title || "Failed to subscribe to the newsletter." }), { status: 400 });
    }
    
    return new NextResponse(JSON.stringify({ message: "Subscribed successfully" }), { status: 201 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message || "Internal server error" }), { status: 500 });
  }
}