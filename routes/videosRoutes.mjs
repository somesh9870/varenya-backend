import express from "express";
import { authentication } from "../middlewares/auth.mjs";
import {
  getAllVideos,
  getUserAllVideos,
  getUserUploads,
  getUservideo,
  uploadVideo,
} from "../controllers/videosController.mjs";
const videoRouter = express.Router();

videoRouter.post("/postVideo", authentication, uploadVideo);
videoRouter.get("/getVideo", getAllVideos);
videoRouter.get("/getuservideos/:uploader", getUserUploads);
videoRouter.get("/getUserAllVideos", authentication, getUserAllVideos);
videoRouter.get("/getUserVideo/:videoId", getUservideo);

export default videoRouter;
