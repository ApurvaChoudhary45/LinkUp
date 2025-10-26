import { NextResponse } from "next/server";

import { MongoClient, ObjectId } from "mongodb";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const connection = client.connect()

export async function PUT(request) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        console.log(user)

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = await request.json()
        const {_id} = body
        console.log(_id)

        const newly = (await connection).db('LinkUp').collection('ReportIssue')
        await newly.updateOne({_id : new ObjectId(_id)}, {$set : {resolved : true}})
        return NextResponse.json({ status: 'Success' })
    } catch (error) {
        return NextResponse.json({ status: 'Error' })
    }

}