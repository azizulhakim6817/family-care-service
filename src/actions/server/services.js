"use server";

import { authOptions } from "@/lib/authOptions";
import { collection, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

// getServices------------
export const getServices = async () => {
  const collections = await dbConnect(collection.SERVICE);
  const result = await collections.find().toArray();

  const data = result?.map((items) => ({
    ...items,
    _id: items._id.toString(),
  }));

  return data;
};

// singleService-----------------
export const singleService = async (id) => {
  //* correct session handling
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user?.email) return [];

  const collections = await dbConnect(collection.SERVICE);

  const result = await collections.findOne({ _id: new ObjectId(id) });
  return result;
};
