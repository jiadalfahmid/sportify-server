const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@fahmid.iin7z.mongodb.net/?retryWrites=true&w=majority&appName=Fahmid`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {

    const db = client.db("EquipmentDB");
    const equipmentCollection = db.collection("equipment");

    
    app.post('/equipment', async (req, res) => {
      const newEquipment = req.body;
      const result = await equipmentCollection.insertOne(newEquipment);
      res.status(201).send(result);
    });

    
    app.get('/equipment', async (req, res) => {
      const equipment = await equipmentCollection.find().toArray();
      res.send(equipment);
    });

    
    app.get('/equipment/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const equipment = await equipmentCollection.findOne(query);
      res.send(equipment);
    });

    
    app.put('/equipment/:id', async (req, res) => {
      const id = req.params.id;
      const updatedEquipment = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: updatedEquipment,
      };
      const result = await equipmentCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    
    app.delete('/equipment/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await equipmentCollection.deleteOne(query);
      res.send(result);
    });

    // Confirm successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } finally {
    // Optionally close the client
    // await client.close();
  }
}

run().catch(console.dir);

// Root route
app.get('/', (req, res) => {
  res.send('API for Equipment');
});


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
