import { NextResponse } from "next/server";


export async function GET(request) {
    const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "music"; // default
  const TickAPI = process.env.TickAPI

  const data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TickAPI}&keyword=${query}&size=6`)

  const tickEvent = await data.json()
  return NextResponse.json({tickEvent})



}