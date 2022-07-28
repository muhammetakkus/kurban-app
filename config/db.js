import mongoose from 'mongoose'

class connectDB {
    static mongoClient;
    static async connection  () {
        try {
            if (this.mongoClient !== undefined) return this.mongoClient;
            this.mongoClient = await mongoose.connect(process.env.MONGO_URI, {})
            console.log(`MongoDB Connected: ${this.mongoClient.connection.host}`)
            return this.mongoClient
        } catch (err) {
            console.log(err)
        }
    }
}

export default connectDB;

/*const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {})
        console.log(`MongoDB Connected: ${connect.connection.host}`);
        return connect
    } catch (err) {
        console.log(err)
    }
}

export default connectDB;*/