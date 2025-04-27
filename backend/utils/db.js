import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://jaivisweshcloud:TUW2g1W7rvl6v3w8@cluster0.jafieif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('mongodb connected successfully.');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;