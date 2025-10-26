import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";


let URI = process.env.MONGO_URI
let client = new MongoClient(URI)
let connection = client.connect()
export async function GET(request, {params}) {

    const {city} =  params
    console.log(city)

    const cityData = (await connection).db('LinkUp').collection('CategoriesEvent')
    const cityEvent = await cityData.find({city : {$regex: city, $options: "i" }}).toArray()

    return NextResponse.json({success: 'Hey! Got it', cityEvent})

}
