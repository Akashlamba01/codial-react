const User = require("../models/user");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    console.log("j");
    const { email, password, username, confirmPassword } = req.body;
    console.log(req.body);

    console.log(req.body);

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists!",
        success: false,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords are not matched!",
        success: false,
      });
    }

    const newPassword = md5(password);

    const userData = await User.create({
      email,
      password: newPassword,
      username,
    });

    return res.status(200).json({
      data: userData,
      message: "User Created Successfully!",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);

    const user = await User.findOne({ email });

    if (!user || user.password !== md5(password)) {
      return res.status(400).json({
        message: "Invalid credentials!",
        success: false,
      });
    }

    const access_token = jwt.sign(
      {
        username: user.username,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const userData = await User.findOneAndUpdate(
      { email },
      {
        access_token,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      data: userData,
      message: "User Loged In Successfully!",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
        success: false,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "password and confirm password are not matched!",
        success: false,
      });
    }

    const access_token = jwt.sign({ email, username }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const newUser = await User.findOneAndUpdate(
      { email },
      {
        username,
        password: md5(password),
        access_token,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      data: newUser,
      message: "User Updated Successfully!",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.userData.email })
      .populate("friends", "-password -access_token -friends")
      .select("-password");

    // console.log(user);

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
        success: false,
      });
    }

    return res.status(200).json({
      data: user,
      message: "User Get Successfully!",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

// const getUserDetails = async (req, res) => {
//   console.log(req.userData, " uuuuuuuuuuuuuuuuuu");
//   try {
//     const user = await User.findById(req.userData._id);

//     if (!user) {
//       return res.status(400).json({
//         message: "User not found!",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       data: user,
//       message: "Get User Successfully!",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };

const getUserById = async (req, res) => {
  try {
    // console.log(req.params, " uuuuuuuuuuuuuuuuuu");

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
        success: false,
      });
    }

    return res.status(200).json({
      data: user,
      message: "Get User Successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  register,
  login,
  updateUser,
  getUserById,
  getUserDetails,
};
