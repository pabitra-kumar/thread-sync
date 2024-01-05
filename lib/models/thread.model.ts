import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    text: {type: String, required: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    },
    path: {type: String, required: true},
    parentId: {
        type: String,
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread"
        }
    ],
    // upvotes: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     }
    // ],
    // downvotes: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     }
    // ],
    createdAt: {type: Date, default: Date.now},
    // updatedAt: {type: Date, default: Date.now},
})

const Thread = mongoose.models.Thread ||  mongoose.model("Thread", threadSchema);

export default Thread;