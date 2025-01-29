import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const userModel = mongoose.model('User', userSchema)

export default userModel