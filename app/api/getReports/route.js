import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const connection = client.connect()
export async function GET(request) {
    try {
        const getData = (await connection).db('LinkUp').collection('ReportIssue')
        const seeEvents = await getData.find({}).toArray()
        return NextResponse.json({success : 'See the cards', seeEvents})
    } catch (error) {
        return NextResponse.json({error : 'Unable to fetch'})
    }
}