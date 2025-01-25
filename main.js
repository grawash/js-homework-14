import express from "express";
import fs from "fs/promises";
import path from "path"

const app = express();
app.use(express.json())

app.get('/api', async (req,res) => {
    const data = await fs.readFile('expenses.json', 'utf-8')
    const expenses = await JSON.parse(data);
    res.json(expenses)
})

app.get('/api/:id', async (req,res) => {
    const {id} = req.params
    const data = await fs.readFile('expenses.json', 'utf-8')
    const expenses = await JSON.parse(data);
    const foundExpense = expenses.find(el => el.id === Number(id))
    if(!foundExpense){
        return res.status(404).json({"message": "not found"})
    }
    res.json({"message": "success", "data": foundExpense})
})

app.post('/api', async (req,res) => {
    const {category, price} = req.body
    const data = await fs.readFile('expenses.json', 'utf-8')
    const expenses = await JSON.parse(data);
    const lastId = expenses[expenses.length -1]?.id || 0;
    const newExpense = {
        id: lastId,
        category,
        price,
        date: new Date().toISOString(),
    }
    expenses.push(newExpense);
    await fs.writeFile('expenses.json', JSON.stringify(expenses, null, 2));
    res.json({"message": "new expense added successfuly", "data": newExpense})
})

app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})