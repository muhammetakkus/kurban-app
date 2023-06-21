import mongoose from 'mongoose'

class connectDB {
    static mongoClient;
    static async connection  () {
        try {
            if (this.mongoClient !== undefined) return this.mongoClient;
                                                        // process.env.MONGO_URI
            this.mongoClient = await mongoose.connect("mongodb+srv://mehmetakkus:9KUmTHOgNZGIDoty@my-first-mongodb.mztkz.mongodb.net/?retryWrites=true&w=majority", {})
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