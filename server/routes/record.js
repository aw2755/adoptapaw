// This is used to define routes.
import express from "express";

// This will help us connect to the server.
import db from "../db/connection.js";

// This will help convert string from id to ObjectId for the _id field.
import { ObjectId } from "mongodb";

// Router is an instance of the express router.
// We use it to define our routes.
// This router will be added to be our middleware and will 
//  take control of request starting with path /record.
const router = express.Router();

// This section will get all records and put it into a list.
router.get("/", async (req, res) => {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// This section will get a single record by id.
router.get("/:id", async (req, res) => {
    let collection = await db.collection("record");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) { 
        res.send("Not Found").status(404);
    } else {
        res.send(result).status(200);
    }
});

// This section will help create a new record by id.
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        };
        let collection = await db.collection("records");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch(err) {
        console.log(error);
        res.status(500).send("Error adding record");
    }
});

// This section will allow us to update a record by id.
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const update = {
            $set: {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
            }, 
        };

        let collection = await db.collection("records");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch(err) {
        console.log(err);
        res.status(500).send("Error updating record");
    }
});

// This section will delete a record by id.
router.delete("/:id", async(req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = db.collection.deleteOne(query);
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch(err) {
        console.log(err);
        res.status(500).send("Error deleting record")
    }
});

// Exports the router so it can be used in other parts of the application.
export default router;