
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";


let URI = process.env.MONGO_URI
let client = new MongoClient(URI)
let connection = client.connect()
export async function GET(request, {params}) {

    const {_id} =  params
    console.log(_id)
    // console.log(city.city)

    const cityData = (await connection).db('LinkUp').collection('CategoriesEvent')
    const oneEvent = await cityData.findOne({_id : new ObjectId(_id)})

    return NextResponse.json({oneEvent})

}

