export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_SERVER = MAILCHIMP_API_KEY.split("-")[1];
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;

    const response = await fetch(
      `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
        }),
      }
    );

    if (response.status === 200) {
      return new Response("Email submitted successfully!", {
        status: 200,
      });
    } else {
      const errorData = await response.json();
      return new Response(errorData.title || "Failed to submit email!", {
        status: response.status,
        statusText: response.statusText,
      });
    }
  } catch (error) {
    return new Response("Internal server error", {
      status: 500,
    });
  }
}