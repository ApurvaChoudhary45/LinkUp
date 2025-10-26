import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";


let URI = process.env.MONGO_URI
let client = new MongoClient(URI)
let connection = client.connect()
export async function GET(request) {


    const cityData = (await connection).db('LinkUp').collection('Eventing')
    const cityEvent = await cityData.find({joined : true}).toArray()

    return NextResponse.json({success: 'Hey! Got it', cityEvent})

}
