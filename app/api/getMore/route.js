import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";


let URI = process.env.MONGO_URI
let client = new MongoClient(URI)
let connection = client.connect()
export async function GET(request) {

        const { searchParams } = new URL(request.url);
        const total = parseInt(searchParams.get("size"))
        console.log(total)

    const cityData = (await connection).db('LinkUp').collection('CategoriesEvent')
    const seeEvents = await cityData.find().limit(total).toArray()

    return NextResponse.json({success: 'Hey! Got it', seeEvents})

}
