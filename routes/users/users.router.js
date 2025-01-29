import { Router } from "express";
import { createUser, deleteUserById, getUserById, getUsers, updateUserById } from "./users.service.js";



const usersRouter = Router();

usersRouter.get('/', getUsers)
usersRouter.post('/', createUser)
usersRouter.get('/:id', getUserById)
usersRouter.delete('/:id', deleteUserById)
usersRouter.put('/:id', updateUserById)

export default usersRouter