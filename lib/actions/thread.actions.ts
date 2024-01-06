"use server";

import { connectDB } from "@/lib/mongoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  connectDB();

  try {
    // Create thread
    const createdThread = await Thread.create({
      text,
      author,
      community: null,
      path,
    });

    // Update user's threads
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    revalidatePath(path);
  } catch (e) {
    throw new Error(`Error creating thread: ${e}`);
  }
}

export async function fetchPosts(page = 1, size = 20) {
  connectDB();
  const skipAmount = size * (page - 1);
  try {
    const postsQuery = Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: -1 })
      .skip(skipAmount)
      .limit(size)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totalPostsCount = await Thread.find({
      parentId: { $in: [null, undefined] },
    });

    const posts = await postsQuery.exec();

    const isNext = totalPostsCount.length > skipAmount + size;

    return { posts, isNext };
  } catch (e) {
    throw new Error(`Error fetching posts: ${e}`);
  }
}

export async function fetchPostById(id: string) {
  connectDB();

  try {
    const thread = await Thread.findOne({ _id: id })
      .populate({
        path: "author",
        model: User,
        select: "_id name id image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id name id parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id name id parentId image",
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (e: any) {
    throw new Error(`Error fetching Post: ${e.message}`);
  }
}

export async function addCommentToThread(
  threadId: string,
  content: string,
  userId: string,
  path: string
) {
  connectDB();

  try {
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    const Comment = await Thread.create({
      text: content,
      author: userId,
      parentId: threadId,
      path: path,
    });

    const savedComment = await Comment.save();

    originalThread.children.push(savedComment._id); // Add comment to thread

    await originalThread.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding comment to thread: ${error.message}`);
  }
}
