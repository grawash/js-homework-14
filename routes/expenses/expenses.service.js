import fs from "fs/promises";
import expenseModel from "../../models/expense.js";
import { isValidObjectId } from "mongoose";


const getAllExpenses = async (req,res) => {
    let {page =1, take = 10} = req.query
    take>50? take=10 : take;
    const expenses = await expenseModel.find().skip((page-1)*take).limit(take)
    res.render('pages/home.ejs', {expenses})
    // res.json(expenses)
}

const getExpenseById = async (req,res) => {
    const {id} = req.params
    if(!isValidObjectId(id)){
        res.status(400).json({message: "not valid Mongodb id"})
        return
    }
    const foundExpense = await expenseModel.findById(id)
    if(!foundExpense){
        return res.status(404).json({"message": "not found"})
    }
    res.render('pages/expense.ejs', {foundExpense})
}

const addExpense = async (req,res) => {
    res.render('pages/add.ejs')
}

const createExpense = async (req,res) => {
    const {category, price} = req.body
    if(!category || !price){
        return res.status(400).json({"message": "category and price required"})
    }
    const expense = await expenseModel.create({category,price})
    res.status(201).json({message: "created successfuly", data: expense})
    // res.render('pages/expense.ejs')
}

const updateExpensePage = async (req,res) => {
    const {id} = req.params
    const foundExpense = await expenseModel.findById(id)
    res.render('pages/update.ejs', {foundExpense})
}

const updateExpenseById = async (req,res) => {
    const {category, price} = req.body
    const {id} = req.params
    if(!isValidObjectId(id)){
        res.status(400).json({message: "not valid Mongodb id"})
        return
    }
    const newExpense = await expenseModel.findByIdAndUpdate(id, req.body, {new: true})
    if(!newExpense){
        return res.status(400).json({"message": "expense could not pe updated"})
    }
    res.status(201).json({"message": "expense updated successfuly", "data": newExpense})
}

const deleteExpenseById = async (req, res) => {
    const {id} = req.params
    if(!isValidObjectId(id)){
        res.status(400).json({message: "not valid Mongodb id"})
        return
    }
    const foundExpense = await expenseModel.findByIdAndDelete(id);
    if(!foundExpense){
        return res.status(404).json({"message": "expense not found"})
    }
    res.json({"message":"expense deleted successfuly", "data": foundExpense})
}

export {getAllExpenses, getExpenseById, addExpense, createExpense, updateExpensePage, updateExpenseById, deleteExpenseById}