import userModel from "../../models/user.js";
import { isValidObjectId } from "mongoose";

const getUsers = async (req, res) => {
    let {page =1, take = 10} = req.query
    take>50? take=10 : take;
    const users = await userModel.find().skip((page-1)*take).limit(take)
    res.json(users)
}

const createUser = async (req,res) => {
    const {name, lastName, age} = req.body;
    if(!name || !lastName || !age){
        res.status(400).json({"message": "bad request"})
        return
    }
    const user = await userModel.create({name, lastName, age})
    res.status(201).json({message: "created successfuly", data: user})
}

const getUserById = async (req,res) => {
    const {id} = req.params;
    if(!isValidObjectId(id)){
        res.status(400).json({message: "not valid Mongodb id"})
        return
    }
    const user = await userModel.findById(id)
    if(!user){
        res.status(404).json({message: "user not found"})
        return
    }
    res.json(user)
}

const deleteUserById = async (req,res) => {
    const {id} = req.params;
    if(!isValidObjectId(id)){
        res.status(400).json({message: "not valid Mongodb id"})
        return
    }
    const deletedUser = await userModel.findByIdAndDelete(id)
    if(!deletedUser){
        res.status(404).json({message: "user could not be deleted"})
        return
    }
    res.json(deletedUser)
}

const updateUserById = async (req, res) => {
    const {id} = req.params;
    if(!isValidObjectId(id)){
        res.status(400).json({message: "not valid Mongodb id"})
        return
    }
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {new: true});
    if(!updatedUser){
        res.status(400).json({message: 'user could not pe updated'})
        return
    }
    res.status(201).json({message: "user updated successfuly", data: updatedUser})
}

export {getUsers, getUserById, createUser, deleteUserById, updateUserById}