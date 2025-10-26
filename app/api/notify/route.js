import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { success } from "zod";

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const connection = client.connect()

export async function PUT(request) {

    const body = await request.json()
    console.log(body)

    const {_id, joined} = body
    const newly = (await connection).db('LinkUp').collection('Eventing')
    const updatedata = await newly.updateOne({_id : new ObjectId(_id)}, {$set : {joined : joined}})
    return NextResponse.json({success: 'Hey got this one', updatedata})


}