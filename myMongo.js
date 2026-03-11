import { MongoClient, ServerApiVersion } from "mongodb";
import { MDBURI } from "./config.js";


const client = new MongoClient(MDBURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

const sampleDB = client.db("sample_airbnb")
const listingsCollection = sampleDB.collection("listingsAndReviews")



export { listingsCollection }