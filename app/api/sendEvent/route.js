import { NextResponse } from "next/server";

import { MongoClient, ObjectId } from "mongodb";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const connection = client.connect()

export async function POST(request) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = await request.json()

        const newly = (await connection).db('LinkUp').collection('UserEvent')
        await newly.insertOne({
            ...body,
            userId: user.id
        })
        return NextResponse.json({ status: 'Success' })
    } catch (error) {
        return NextResponse.json({ status: 'Error' })
    }

}