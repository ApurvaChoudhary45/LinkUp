// app/api/events/route.js  (Next.js App Router)
export async function GET() {
  const token = process.env.EVENTBRITE_TOKEN; // store in .env
  const res = await fetch(
    `https://www.eventbriteapi.com/v3/events/search/?q=startup&location.address=Delhi`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
