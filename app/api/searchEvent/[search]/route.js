import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI;
const client = new MongoClient(URI);
const connection = client.connect();

export async function GET(request, {params}) {
  try {
    const {search} = params
    const { searchParams } = new URL(request.url);
   
   
    const size = parseInt(searchParams.get("size")) || 10;
    console.log(search)

    const db = (await connection).db("LinkUp");
    const events = db.collection("CategoriesEvent");

    const seeEvents = await events
      .find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
          { city: { $regex: search, $options: "i" } },
        ],
      })
      .limit(size)
      .toArray();

    return NextResponse.json({ success: true, seeEvents });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to fetch" });
  }
}
