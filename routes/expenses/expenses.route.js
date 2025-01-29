import { Router } from "express";
import { createExpense, deleteExpenseById, addExpense, getAllExpenses, getExpenseById, updateExpenseById, updateExpensePage } from "./expenses.service.js";
import { apiKeyCheck } from "../../middlewares/apiKeyCheck.middleware.js";

const expensesRouter = Router();

expensesRouter.get('/', getAllExpenses)
expensesRouter.get('/add', addExpense)
expensesRouter.get('/:id', getExpenseById)
expensesRouter.post('/', createExpense)
expensesRouter.get('/update/:id', updateExpensePage)
expensesRouter.put('/:id', updateExpenseById)
expensesRouter.delete('/:id', apiKeyCheck ,deleteExpenseById)

export {expensesRouter}