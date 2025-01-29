import mongoose from "mongoose";


const expenseSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const expenseModel = mongoose.model('Expense', expenseSchema)

export default expenseModel