import clientPromise from "../../lib/mongodb";


export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      const { Searchvalue } = bodyObject;
      const SearchResult = await db.collection('donations').find({donor:{$regex: Searchvalue,$options:'i'}}).toArray();
      res.json({ status: 200, data: SearchResult });
  }
}