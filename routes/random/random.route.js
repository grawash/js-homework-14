import { Router } from "express";
import { permitRandomizer } from "../../middlewares/permitRandomizer.middleware.js";
const randomRouter = Router();


randomRouter.get('/', permitRandomizer ,(req,res) => {
    res.json({"message": "request passed"})
})

export {randomRouter}