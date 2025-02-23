import express from "express";
import { apiRouter } from "./routes/router.js";
import connectDb from './db/db.js'
const app = express();
connectDb();
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use('/api', apiRouter)

app.get('/', (req,res) => {
    res.render('pages/home.ejs')
})

app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})