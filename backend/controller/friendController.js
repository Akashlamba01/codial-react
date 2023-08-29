const Friendship = require("../models/friendship");
const User = require("../models/user");

const addFriends = async (req, res) => {
  try {
    if (req.userData.id == req.params.id) {
      return res.status(402).json({
        message: "you can not send req to yourself!",
      });
    }

    let user = await User.findOne(req.userData._id);
    let isFriend = await Friendship.findOne({ to_user: req.params.id });
    let newFriend;

    if (isFriend) {
      if (isFriend.friendRequest != "accept") {
        isFriend.deleteOne();
        user.friends.pull(req.params.id);
        user.save();
      }
      return res.status(200).json({
        message: "req removed!",
      });
    }

    newFriend = await Friendship.findOne({ to_user: req.user.id });

    if (!newFriend) {
      newFriend = await Friendship.create({
        from_user: req.userData.id,
        to_user: req.query.id,
      });

      return res.status(201).json({
        message: "new req sent to new friend!",
        data: newFriend,
      });
    }

    newFriend = await Friendship.findOneAndUpdate(
      { to_user: userData.id },
      {
        $set: {
          friendRequest: "accept",
        },
      }
    );

    if (newFriend.friendRequest !== "accept") {
      let userFriend = await User.findById(req.params.id);

      userFriend.friends.push(newFriend.to_user);
      userFriend.save();

      user.friends.push(newFriend.from_user);
      user.save();
    }

    return res.status(200).json({
      message: "req sent or accept!",
      data: newFriend,
    });
  } catch (e) {
    console.log(e);
    return res.status(505).json({
      message: "internal server err!",
    });
  }
};

const addFriend = async (req, res) => {
  try {
    // console.log(req.query.user_id);
    let user = await User.findById(req.userData._id);

    let isFriend = await Friendship.findOne({
      $or: [{ to_user: req.query.user_id }, { from_user: req.query.user_id }],
    });

    // console.log(isFriend);

    if (!isFriend) {
      let friend = await Friendship.create({
        to_user: req.userData.id,
        from_user: req.query.user_id,
      });

      user.friends.push(req.query.user_id);
      user.save();

      return res.status(200).json({
        message: "Make Friends Successfully!",
        success: true,
        data: user,
      });
    }

    return res.status(400).json({
      message: "Allready Friend!",
      success: false,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(505).json({
      message: error.message,
      success: false,
    });
  }
};

const removeFriend = async (req, res) => {
  try {
    // console.log(req.query.user_id);
    let user = await User.findById(req.userData._id);

    let isFriend = await Friendship.findOne({
      $or: [{ to_user: req.query.user_id }, { from_user: req.query.user_id }],
    });

    if (!isFriend) {
      return res.status(400).json({
        message: "Not Friend!",
        success: false,
      });
    }

    isFriend.deleteOne();

    user.friends.pull(req.query.user_id);
    user.save();

    return res.status(200).json({
      message: "Make Friends Successfully!",
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(505).json({
      message: error.message,
      success: false,
    });
  }
};

// const getFriend = async (req, res) => {
//   try {
//     let friends = await Friendship.find({ to_user: req.userData._id });
//     console.log(friends);

//     return res.status(200).json({
//       message: "Get Friend Successfully!",
//       success: true,
//       data: friends,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(505).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };

module.exports = {
  addFriend,
  removeFriend,
  // friendToggle,
  // getFriend,
};
