import { NextResponse } from "next/server";

import { MongoClient, ObjectId } from "mongodb";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const connection = client.connect()

export async function POST(request) {
    const currentDate = new Date(Date.now()).getDate()
    const currentMonth = new Date(Date.now()).getMonth()
    const currentYear = new Date(Date.now()).getFullYear()
    const now = new Date();
const currentTime = now.toLocaleTimeString('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = await request.json()

        const newly = (await connection).db('LinkUp').collection('Notified')
        await newly.insertOne({
            ...body,
            date: currentDate,
            month: currentMonth,
            year: currentYear, 
            time: currentTime
        }
        )
        return NextResponse.json({ status: 'Success' })
    } catch (error) {
        return NextResponse.json({ status: 'Error' })
    }

}