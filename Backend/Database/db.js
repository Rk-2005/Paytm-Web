import mongoose from "mongoose";

// Destructure required components from mongoose
const { connect, Schema, model } = mongoose;

// Connect to MongoDB
try {
  await connect("mongodb+srv://ronakkriplani9:Ronak123456789@cluster0.ctnht.mongodb.net/paytm");
  console.log("Connected to MongoDB");
} catch (err) {
  console.error("Error connecting to MongoDB:", err);
}

// User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 50,
  },
});

// Account Schema
const accountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, // Reference to User model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

// Create Models
const User = model("User", userSchema);
const Account = model("Account", accountSchema);

// Export Models as a default object
export default {
  User,
  Account,
};
