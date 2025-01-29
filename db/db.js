import mongoose from "mongoose"
import 'dotenv/config'

export default async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to db')
    } catch (error) {
        console.log('could not connect to db')
    }
}