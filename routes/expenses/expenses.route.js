import { Router } from "express";
import { createExpense, deleteExpenseById, getAllExpenses, getExpenseById, updateExpenseById } from "./expenses.service.js";
import { apiKeyCheck } from "../../middlewares/apiKeyCheck.middleware.js";

const expensesRouter = Router();

expensesRouter.get('/', getAllExpenses)

expensesRouter.get('/:id', getExpenseById)

expensesRouter.post('/', createExpense)

expensesRouter.put('/:id', updateExpenseById)


expensesRouter.delete('/:id', apiKeyCheck ,deleteExpenseById)

export {expensesRouter}