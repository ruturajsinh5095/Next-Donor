import clientPromise from "../../lib/mongodb";
var ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  switch (req.method) {
    case "POST":
        let bodyObject = JSON.parse(req.body);
        let myPost = await db.collection("donors").insertOne(bodyObject);
        res.json(myPost.ops);
       break;
    case "GET":
      const donations = await db.collection("donors").find({}).toArray();
      res.json({ status: 200, data: donations });
      break;
    case "DELETE":
      let bodyObject1 = req.body;
      const {id} = bodyObject1;
      let newobj = await db.collection("donors").deleteOne({id});
      res.json(newobj);
      break;
    case "PUT":
      let bodyObject2 = req.body;
      const { id1, donor, receipt, amount, type, fund, status1, date } = bodyObject2;
      let newobj1 = await db.collection("donors").updateOne({ _id: new ObjectId(id1),},{
        $set: { donor: donor, receipt: receipt, amount: amount, type: type, fund: fund, status1: status1, date: date }
      });
      res.json(newobj1);
      console.log(newobj1);
      break;
  }
}