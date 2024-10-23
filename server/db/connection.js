// Used to create a MongoDB client and allows you to define a api version.
import { MongoClient, ServerApiVersion } from "mongodb";

// Sets up MongoDB URI(Uniform Resource Identifier).
const uri = process.env.ATLAS_URI || "";

// Sets up MongoDB client. 
const client = new MongoClient(uri, {
    serverApi: {
        // Specifies that version 1 of the server API should be used.
        version: ServerApiVersion.v1,
        // Ensures that any API calls must conform to the API version specified.
        strict: true,
        // Causes MongoDB to throw errors if deprecated features are used.
        deprecationErrors: true,
    },
});

try {
    // Connects the client to the server.
    await client.connect();
    // Connects to the admin database and sends a ping to confirm a successful connection.
    await client.db("admin").command({ ping : 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch(err) {
    console.log(err);
}

// Gets the pets database, will create one if there isn't one already.
let db = client.db("pets");

// Exports the database creates above ^ so other parts of the application can interact with it.
export default db;