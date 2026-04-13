import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DATABASE_URL;
const dbName = process.env.DB_NAME;

//products-----
export const collection = {
  USERS: "users",
  SERVICE: "services",
  BOOKING: "booking",
  INVOICES: "invoices"
};

//! Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const dbConnect = async (cname) => {
  return client.db(dbName).collection(cname);
};
