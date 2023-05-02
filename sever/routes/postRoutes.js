import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
});

router.route("/").post(async (req, res) => {
  try {
    // const image = "./testimages/tree-736885_960_720 (1).jpg";
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader
      .upload(photo)
      .then((response) => response);

    // const url = photoUrl.url("olympic_flag", {
    //   width: 100,
    //   height: 150,
    //   Crop: "fill",
    // });

    // console.log("success", photoUrl);

    const newPost = Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
    console.log(error, process.env.CLOUDINARY_API_KEY);
  }
});

export default router;
