"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectDB } from "../mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  image,
  bio,
  path,
}: Params): Promise<void> {
  await connectDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, image, bio, onboarded: true },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error("Failed to create/update user: " + error.message);
  }
}

export async function fetchUser(userId: string) {
  try {
    await connectDB();
    const user = await User.findOne({ id: userId });
    return user;
    // .populate()
  } catch (error: any) {
    throw new Error(`Failed to fetch user:  ${error.message}`);
  }
}

export async function fetchUserposts(userId: string) {
  try {
    await connectDB();

    // TODO: populate Community

    const user = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: "Thread",
      populate: {
        path: "children",
        model: "Thread",
        populate: {
          path: "author",
          model: "User",
          select: "name image id",
        },
      },
    });

    return user;
  } catch (error: any) {
    throw new Error(`Failed to fetch user:  ${error.message}`);
  }
}
