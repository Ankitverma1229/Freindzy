import mongoose from "mongoose";

export const connectDB = async (DatabaseUrl: string) => {
  try {
    const response = await mongoose.connect(DatabaseUrl);
    console.log(
      "Database connected successfully with:",
      response.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
