"use server";

import { collection, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  const collections = await dbConnect(collection.USERS);
  const { nidno, name, image, email, password, contact } = payload;
  //check-payload
  if (!email || !password) {
    return null;
  }
  //check-user
  const existingEmail = await collections.findOne({ email });
  if (existingEmail) {
    return null;
  }

  //create user
  const newUser = {
    provider: "credentials",
    nidno,
    name,
    image,
    email,
    password: await bcrypt.hash(password, 10),
    contact,
    role: "user",
    createdAt: new Date(),
  };
  //insert-user
  const result = await collections.insertOne(newUser);

  if (result.acknowledged) {
    return {
      ...result,
      insertedId: result.insertedId.toString(),
    };
  }
};

//! login-user----------------------
export const loginUser = async ({ email, password }) => {
  const usersCollection = await dbConnect(collection.USERS);
  if (!email || !password) return null;

  const user = await usersCollection.findOne({ email });
  if (!user) return null;

  const isMatchedPass = await bcrypt.compare(password, user.password);
  if (!isMatchedPass) return null;

  return user;
};
//! login-user----------------------
export const singleUser = async (email) => {
  if (!email) return null;
  const usersCollection = await dbConnect(collection.USERS);
  const user = await usersCollection.findOne({ email });

  if (!user) return null;

  return user;
};
