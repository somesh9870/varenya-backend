import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";
dotenv.config();

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

export const uploadFile = async (file) => {
  try {
    const uploadParams = {
      ACL: "public-read",
      Bucket: "varenya-platform",
      Key: "abc/" + file.originalname,
      Body: file.buffer,
    };

    const command = new PutObjectCommand(uploadParams);
    const data = await s3Client.send(command);
    if (data) {
      //console.log("File uploaded successfully");
      const s3ObjectUrl = `https://varenya-platform.s3.ap-south-1.amazonaws.com/abc/${encodeURIComponent(
        file.originalname
      )}`;

      return s3ObjectUrl;
    }
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
};
