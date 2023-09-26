import User from '../model/User.js';
import mongoose from 'mongoose';

export const updateUser = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).send("Invalid User ID");
  }
  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User Not Found!! Cannot able to Delete");
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).send("Invalid User ID");
  }
  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User Not Found!! Cannot able to Delete");
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    console.log("Error");
    res.status(500).json(error);
  }
}

export const getUser = async (req, res) => {
  const id = req.id;
  // console.log(id);
  // if (!mongoose.isValidObjectId(id)) {
  //   return res.status(400).send("Invalid User ID");
  // }
  try {
    const user = await User.findById(id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
}

export const getAllUser = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}


export const getStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
}
