import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Connected to DB successfully');
        })
        connection.on('error', (err) => {
            console.log('Some error has occured during connection to db :: ');
            console.log(err);
            process.exit(1);
        })
    } catch (error) {
        console.log('Something went wrong Internal Server Error :: ');
        console.log(error);
    }
}