const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    // Post
    app.post("/equipment", async (req, res) => {
      const newEquipment = req.body;
      if (!newEquipment.userEmail) {
        return res.status(400).send({ message: "User email is required." });
      }
      const result = await equipmentCollection.insertOne(newEquipment);
      res.status(201).send(result);
    });

    // get
    app.get("/equipment", async (req, res) => {
      const equipment = await equipmentCollection.find().toArray();
      res.send(equipment);
    });

    // get sorted for price
    app.get("/equipment/sorted", async (req, res) => {
      try {
        const equipment = await equipmentCollection
          .find()
          .sort({ price: 1 })
          .toArray();
        res.json(equipment);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch equipment" });
      }
    });


    // get 6 data for the home page
    app.get('/equipment/six', async (req, res) => {
      try {
        const equipment = await equipmentCollection
          .find()
          .limit(6)
          .toArray();
        res.send(equipment);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch 6 items' });
      }
    });

    // get data using user email
    app.get("/equipment/user", async (req, res) => {
      const userEmail = req.query.email;
      if (!userEmail) {
        return res.status(400).send({ message: "User email is required." });
      }

      const equipment = await equipmentCollection
        .find({ userEmail })
        .toArray();

      res.send(equipment);
    });

    // get each product data
    app.get("/equipment/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const equipment = await equipmentCollection.findOne(query);
      res.send(equipment);
    });

    // update product data
    app.put("/equipment/:id", async (req, res) => {
      const id = req.params.id;
      const updatedEquipment = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: updatedEquipment,
      };
      const result = await equipmentCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // remove product data
    app.delete("/equipment/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await equipmentCollection.deleteOne(query);
      res.send(result);
    });

    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Sportify API");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
