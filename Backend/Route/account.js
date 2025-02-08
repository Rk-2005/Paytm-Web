import express from "express";
import db from "../Database/db.js"; // Import default export
const { User, Account } = db; // Destructure User and Account from the imported object
 // Make sure the file extension is included
import { authmiddleware } from "../middlewares/usermiddle.js"; // Ensure .js is included if needed
import mongoose from "mongoose";
const router = express.Router();

router.get("/balance", authmiddleware, async (req, res) => {
  try {
    const userAccount = await Account.findOne({ userId: req.userId });
    if (!userAccount) {
      return res.status(404).json({ msg: "Account not found" });
    }
    res.json({ balance: userAccount.balance });
  } catch (err) {
    console.error("Error fetching balance:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/transfer", authmiddleware, async (req, res) => {
  try {
    const session=await mongoose.startSession();
    session.startTransaction();
    const { to, amount } = req.body;
    console.log(to)
    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ msg: "Invalid amount" });
    }

    // Find sender's account
    const senderAccount = await Account.findOne({ userId: req.userId });
    if (!senderAccount || senderAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "Insufficient balance" });
    }

    // Find recipient's account
    const recipientAccount = await Account.findOne({ userId: to });
    if (!recipientAccount) {
      await session.abortTransaction();
      return res.status(404).json({ msg: "Recipient not found" });
    }

    // Perform the transaction
    senderAccount.balance -= amount;
    recipientAccount.balance += amount;

    await senderAccount.save();
    await recipientAccount.save();
    await session.commitTransaction();
    res.json({ msg: "Transfer successful" });
  } catch (err) {
    console.error("Error during transfer:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});


export default router;
