import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";


let URI = process.env.MONGO_URI
let client = new MongoClient(URI)
let connection = client.connect()
export async function GET(request, {params}) {

    const {category} =  params
    console.log(category)

    const cityData = (await connection).db('LinkUp').collection('CategoriesEvent')
    const categoryEvent = await cityData.find( { category: { $regex: category, $options: "i" }}).toArray()

    return NextResponse.json({success: 'Hey! Got it', categoryEvent})

}
