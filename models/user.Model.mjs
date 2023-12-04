import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String, // URL or reference to user's profile picture
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    subscriptions: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    likedVideos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    dislikedVideos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    playlists: [
      {
        name: String,
        videos: [
          {
            type: Schema.Types.ObjectId,
            ref: "Video",
          },
        ],
      },
    ],
    likedComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    dislikedComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

// const User = model("User", userSchema);
const UserModel = model("User", userSchema);

export default UserModel;
