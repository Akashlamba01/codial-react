const Post = require("../models/post");

const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.userData.id,
    });

    if (!post) {
      return res.status(400).json({
        message: "Post not created!",
        success: false,
      });
    }

    return res.status(200).json({
      data: post,
      message: "Post Created Successfully!",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;
    console.log(limit);
    console.log(page);

    const posts = await Post.find().populate("user");

    let startIndex = (page - 1) * limit;
    let endIndex = startIndex + limit;

    const newData = posts.slice(startIndex, endIndex);

    return res.status(200).json({
      data: newData,
      message: "Post get Successfully!",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
};
