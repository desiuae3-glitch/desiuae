import User from "./models/User.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const checkUser = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");

    const user = await User.findOne({ email: "admin@desilocks.com" }).select(
      "+password",
    );

    if (user) {
      console.log("✅ User found:");
      console.log(`   Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Password Hash: ${user.password}`);
    } else {
      console.log("❌ User not found");
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

checkUser();
