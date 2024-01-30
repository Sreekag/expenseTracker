// const express=require('express')
// const app = express()
// const port =7000
// app.get('/expenses',(req,res)=>
// {
//     res.send(`<h1>Hello Sree</h1>`)
// })
// app.post('/expenses',(req,res)=>
// {
//     res.send(`<h1>Hi Sree</h1>`)
// })
// app.listen(port,()=>
// {
//     console.log(`listening the port ${port}`)
// })
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Expense = require('./expense')

mongoose.connect('mongodb+srv://sreekag21aid:eAQYEisui9U9MFnM@cluster0.snuujqj.mongodb.net/?retryWrites=true&w=majority',{
    useUnifiedTopology: true
});
app.use(express.json());
app.get('/expense',async(req,res)=>
{
    const expenses=await Expense.find();
    res.send(expenses)
})
// app.get('/expense/:id',async(req,res)=>
// {
//     const id= req.params.id;
//     const result =await Expense.findById(id);
//     res.send(result)
//     // console.log(req.params)
//     // // const expenses=await Expense.find();
//     // // res.send(expenses)
//     // res.send(req.params)
// })


app.get('/expense/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'Invalid ObjectId format' });
        }

        const result = await Expense.findById(id);

        if (!result) {
            return res.status(404).send({ error: 'Expense not found' });
        }

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
});
app.delete('/expensedel/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'Invalid ObjectId format' });
        }

        const result = await Expense.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({ error: 'Expense not found' });
        }

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
});



app.post('/expense',async(req,res)=>
{
   console.log(req.body);
   const newExpense=req.body;
   await Expense.create(newExpense)
   res.send("inserted")
})
app.put('/expense/:id',async(req,res)=>
{
    const id = req.params.id;
   
   const updateObject=req.body;
   const updated=await Expense.findByIdAndUpdate(id,{$set:updateObject},{
    new:true

   })
   res.send(updateObject)

})
const port = process.env.PORT || 8000
app.listen(port,()=>
{
    console.log(`listening the port ${port}`)
})
