import { Router } from "express";
import { expensesRouter } from "./expenses/expenses.route.js";
import { randomRouter } from "./random/random.route.js";
import usersRouter from "./users/users.router.js";

const apiRouter = Router();

apiRouter.use('/expenses', expensesRouter)
apiRouter.use('/random', randomRouter)
apiRouter.use('/users', usersRouter)

export {apiRouter}