mongoose.connect('mongodb://localhost:27017/houseofmit_designs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));




import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected"),
    );
    await mongoose.connect(`${process.env.MONGODB_URI}`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
