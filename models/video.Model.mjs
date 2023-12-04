import { Schema, model } from "mongoose";

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      // unique: true,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    tags: [String],
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    dislikes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    uploader: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["pending", "verified"],
      default: "verified",
    },
  },
  { timestamps: true }
);

const Video = model("Video", videoSchema);

export default Video;
