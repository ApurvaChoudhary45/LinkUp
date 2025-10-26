import { NextResponse } from "next/server";


export async function GET(request) {
    // default
  const TickAPI = process.env.TickAPI

  const data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TickAPI}&size=6`)

  const tickEvent = await data.json()
  return NextResponse.json({tickEvent})



}