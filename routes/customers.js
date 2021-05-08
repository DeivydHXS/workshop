const { MongoClient, ObjectId } = require('mongodb');
async function connect() {
  if (global.db) return global.db;
    const conn = await MongoClient
    .connect("mongodb+srv://db-user:2XizZqmUqMXZhpsC@blogapp-prod.who5i.mongodb.net/blogapp-prod?retryWrites=true&w=majority",
    {useUnifiedTopology: true});
    if (!conn) return new Error("Can't connect");
  global.db = await conn.db("workshop");
  return global.db;
}

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const db = await connect();
    res.json(await db.collection("customers").find().toArray());
  } catch (ex) {
    console.log(ex);
    res.status(400).json({erro: `${ex}`});
  }
});

router.get('/:id?', async function(req, res, next) {
  try {
    const db = await connect();
    if(req.params.id)
      res.json(await db.collection("customers").findOne({ _id: new ObjectId(req.params.id) }));
    else
    res.json(await db.collection("customers").find().toArray());
  } catch (ex) {
    console.log(ex);
    res.status(400).json({erro: `${ex}`});
  }
});

router.post('/', async function(req, res, next) {
  try {
    const customer = req.body;
    const db = await connect();
    res.json(await db.collection("customers").insert(customer));
  } catch (ex) {
    console.log(ex);
    res.status(400).json({erro: `${ex}`});
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    const customer = req.body;
    const db = await connect();
    res.json(await db.collection("customers").update({ _id: new ObjectId(req.params.id) }, customer));
  } catch (ex) {
    console.log(ex);
    res.status(400).json({erro: `${ex}`});
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    const customer = req.body;
    const db = await connect();
    res.json(await db.collection("customers").deleteOne({ _id: new ObjectId(req.params.id) }));
  } catch (ex) {
    console.log(ex);
    res.status(400).json({erro: `${ex}`});
  }
});

module.exports = router;
