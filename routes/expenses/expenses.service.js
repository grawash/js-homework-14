import fs from "fs/promises";


const getAllExpenses = async (req,res) => {
    let {page =1, take = 10} = req.query
    take>50? take=10 : take;
    const data = await fs.readFile('expenses.json', 'utf-8')
    const expenses = await JSON.parse(data);
    res.json(expenses.slice((page-1)*take, take*page))
}

const getExpenseById = async (req,res) => {
    const {id} = req.params
    const data = await fs.readFile('expenses.json', 'utf-8')
    const expenses = await JSON.parse(data);
    const foundExpense = expenses.find(el => el.id === Number(id))
    if(!foundExpense){
        return res.status(404).json({"message": "not found"})
    }
    res.json({"message": "success", "data": foundExpense})
}

const createExpense = async (req,res) => {
    const {category, price} = req.body
    if(!category || !price){
        return res.status(400).json({"message": "category and price required"})
    }
    const data = await fs.readFile('expenses.json', 'utf-8')
    const expenses = await JSON.parse(data);
    const lastId = expenses[expenses.length -1]?.id || 0;
    const newExpense = {
        id: lastId + 1,
        category,
        price,
        date: new Date().toISOString(),
    }
    expenses.push(newExpense);
    await fs.writeFile('expenses.json', JSON.stringify(expenses, null, 2));
    res.json({"message": "new expense added successfuly", "data": newExpense})
}

const updateExpenseById = async (req,res) => {
    const {category, price} = req.body
    const {id} = req.params
    const data = await fs.readFile('expenses.json', 'utf-8')
    const expenses = await JSON.parse(data);
    const foundExpense = expenses.find(el => el.id === Number(id))
    const index = expenses.indexOf(foundExpense)
    if(!foundExpense){
        return res.status(404).json({"message": "expense not found"})
    }
    const newExpense = {
        ...foundExpense,
        category: category || foundExpense.category,
        price: price || foundExpense.price,
        date: new Date().toISOString(),
    }
    expenses[index] = newExpense;
    await fs.writeFile('expenses.json', JSON.stringify(expenses, null, 2));
    res.json({"message": "expense updated successfuly", "data": newExpense})
}

const deleteExpenseById = async (req, res) => {
    const apiKey = req.headers['api-key']
    if(!apiKey){
        return res.status(403).json({"message": "unauthorized"})
    }
    const {id} = req.params
    const data = await fs.readFile('expenses.json', 'utf-8')
    const expenses = await JSON.parse(data);
    const foundExpense = expenses.find(el => el.id === Number(id))
    const index = expenses.indexOf(foundExpense)
    if(!foundExpense){
        return res.status(404).json({"message": "expense not found"})
    }
    expenses.splice(index, 1);
    await fs.writeFile('expenses.json', JSON.stringify(expenses, null, 2));
    res.json({"message":"expense deleted successfuly", "data": foundExpense})

}

export {getAllExpenses, getExpenseById, createExpense, updateExpenseById, deleteExpenseById}