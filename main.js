import express from "express";
import { apiRouter } from "./routes/router.js";

const app = express();
app.use(express.json())
app.use('/api', apiRouter)


app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})