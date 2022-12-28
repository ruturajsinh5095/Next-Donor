import clientPromise from "../../lib/mongodb";
var ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  switch (req.method) {
    case "POST":
        let bodyObject = JSON.parse(req.body);
        let myPost = await db.collection("donations").insertOne(bodyObject);
        res.json(myPost.ops);
       break;
    case "GET":
      const donations = await db.collection("donations").find({}).toArray();
      res.json({ status: 200, data: donations });
      break;
    case "DELETE":
      let bodyObject1 = req.body;
      const {id} = bodyObject1;
      let newobj = await db.collection("donations").deleteOne({id});
      res.json(newobj);
      break;
    case "PUT":
      let bodyObject2 = JSON.parse(req.body);
      const { donor, amount, type, fund, status1, date } = bodyObject2;
      let newobj1 = await db.collection("donations").updateOne(
        {
          _id: new ObjectId(bodyObject2.id)
        },{ $set: { donor: donor, amount: amount, type: type, fund: fund, status1: status1, date: date }}
      );
      res.json(newobj1);
      console.log(newobj1);
      break;
  }
}