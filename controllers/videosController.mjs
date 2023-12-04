import UserModel from "../models/User.model.mjs";
import Video from "../models/video.Model.mjs";
import { uploadFile } from "../utils/aws/awsS3.mjs";

export const uploadVideo = async (req, res) => {
  console.log("kamal", req.body);
  try {
    let jsondata = JSON.parse(req.body.data);
    // let jsondata = req.body.data
    console.log("jsondata", jsondata);
    let { title, description, thumbnail, tags } = jsondata;

    let id = req.decodedToken.id;

    if (!thumbnail) {
      thumbnail = "";
    }

    // Validate required fields-------------------------------------
    if (!title || !description) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields." });
    }

    const files = req.files;

    if (files && files.length > 0) {
      let uploadedFileURL = await uploadFile(files[0]);
      if (files[1]) {
        thumbnail = await uploadFile(files[1]);
      }
      var uploadedVideoURL = uploadedFileURL;
      console.log("uploadedVideoURL", uploadedVideoURL);
    } else {
      console.log("error");
      return res.status(400).json({ msg: "No file found" });
    }

    const video = await Video.create({
      title,
      description,
      url: uploadedVideoURL,
      // thumbnail,
      tags,
      uploader: id,
    });

    return res.status(201).json({ message: true, data: video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const allVideos = await Video.find()
      .sort({ createdAt: -1 })
      .populate("uploader");

    return res.status(200).json({ data: allVideos, status: true });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error", error: err });
  }
};

// geting all data of specific useri id ---------------------------------
export const getUserUploads = async (req, res) => {
  try {
    const { uploader } = req.params;

    //const allUploadsVideos= await Video.findById({userId,type:"verified"});
    const allUploadsVideos = await Video.find({ uploader }).populate(
      "uploader"
    );
    return res.status(200).json({ data: allUploadsVideos, status: true });
  } catch (err) {
    res.status(500).json({ msg: "internal server error", error: err });
  }
};

// geting all videos of logged in user ---------------------------------
export const getUserAllVideos = async (req, res) => {
  let userId = req.decodedToken.id;
  try {
    //const allUploadsVideos= await Video.findById({userId,type:"verified"});
    const allUploadsVideos = await Video.find({ uploader: userId }).populate(
      "uploader"
    );
    return res.status(200).json({ data: allUploadsVideos, status: true });
  } catch (err) {
    res.status(500).json({ msg: "internal server error", error: err });
  }
};

// get a specific video  --------------------------------
export const getUservideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const getData = await Video.find({ _id: videoId }).populate("uploader");
    if (!getData) {
      return res.status(404).json({ status: false, message: "not found" });
    }
    return res.status(200).json({ data: getData });
  } catch (err) {
    return res.status(500).json({ msg: "internal server error", error: err });
  }
};

// update the content of the video
export const updateContent = async (req, res) => {
  try {
    const { text, description, thumbnail, tags } = req.body;
    const userId = req.decodedToken.id;
    const videoId = req.params.videoId; // Assuming you have the videoId in the URL params

    const updateData = await Video.findByIdAndUpdate(videoId, req.body, {
      new: true,
      upsert: true,
    });

    // Check if the video was found and updated
    if (!updateData) {
      return res.status(404).json({ msg: "Video not found" });
    }

    // Check if the user updating the content is the owner of the video
    if (updateData.uploader.toString() !== userId) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to update this video" });
    }

    return res
      .status(200)
      .json({ msg: "Video updated successfully", data: updateData });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

// to get a profile
export const getProfile = async (req, res) => {
  try {
  } catch (error) {}
};
