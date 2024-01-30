const mongoose = require('mongoose')
const expenseSchema = new mongoose.Schema({
    id: Number,
    title: String,
    desc: String,
})
const Expense = mongoose.model('Expense',expenseSchema)
module.exports = Expense