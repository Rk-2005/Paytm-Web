import { Router } from "express";
import db from "../Database/db.js"; // Import default object from db.js

const { User, Account } = db; // Destructure User and Account models
import { userschema } from "../Inputvalidation/Usercheck.js";
import config from "../config.js";
const { jwtscrect } = config;
import jwt from "jsonwebtoken"; // Default import from jsonwebtoken
const { sign } = jwt; // Destructure sign from the imported module
import { authmiddleware } from "../middlewares/usermiddle.js";
import updatebody from "../Inputvalidation/UpdateCheck.js"; // Default import

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const { username } = body;
    console.log(body.username);
    console.log(body.firstname)
    console.log(body.lastName)
    console.log(body.password)
    // Validate input using safeParse
    const check = userschema.safeParse(body);
    if (!check.success) {
      return res
        .status(400)
        .json({ msg: "Invalid input", error: check.error.errors });
    }

    // Check if user already exists
    const user = await User.findOne({ username:username });
    if (user) {
      return res.status(409).json({ msg: "User already exists" });
    }

    // Create the new user
    const newUser = await User.create(body);
    const userId = newUser._id;
    await Account.create({
      userId: userId,
      balance: 1 + 1000000 * Math.random(),
    });
    
    // Generate a JWT token
    const token = jwt.sign({ userId : newUser._id }, jwtscrect);

    // Respond with success
    res.status(201).json({
      msg: "User created successfully",
      token,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
   
    const data = req.body;
    console.log(data)
    const existingUser = await User.findOne({ username: data.username ,password:data.password});
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    console.log(existingUser._id);
    const token = sign({ userId: existingUser._id }, jwtscrect, {
      expiresIn: "1h",
    });
    res.status(200).json({
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while logging in",
    });
  }
});

router.put("/update", authmiddleware, async (req, res) => {
  const body = req.body;

  const check = updatebody.safeParse(body);
  if (!check) {
    res.status(404).json({
      msg: "Invalid",
    });
  }

  await User.updateOne(req.body, {
    id: req.userId,
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      { firstname: { "$regex": filter, "$options": "i" } }, // "i" makes it case-insensitive
      { lastName: { "$regex": filter, "$options": "i" } },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

export default router;
