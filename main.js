import express from "express";
import fs from "fs/promises";
import path from "path"

const app = express();

app.get('/', async (req,res) => {
    const data = await fs.readFile('expenses.json', 'utf-8')
    const expenses = await JSON.parse(data);
    res.send(expenses)
})

app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})