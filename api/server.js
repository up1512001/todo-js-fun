const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(express.json());
app.use(cors())

// pass = 'CbmMMXGIJDRFS4ED'
// username = 'up1512'

// mongodb + srv://up1512:<password>@cluster0.mwqewwr.mongodb.net/?retryWrites=true&w=majority
mongoose.set('strictQuery',false);
mongoose.connect('mongodb+srv://up1512:CbmMMXGIJDRFS4ED@cluster0.mwqewwr.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MongoDB Connected")
    }
})

// mongoose.connect("mongodb + srv://up1512:CbmMMXGIJDRFS4ED@cluster0.mwqewwr.mongodb.net/?retryWrites=true&w=majority")
// .then(()=> console.log("connected to DB"))
// .catch(console.error)

const Todo = require('./models/Todo')

app.get('/todos',async (req,res)=>{
    const todos = await  Todo.find();
    res.json(todos);
})

app.post('/todo/new',(req,res)=>{
    const todo = new Todo({
        text:req.body.text
    })
    todo.save();
    res.json(todo);
})

app.delete('/todo/delete/:id',async(req,res)=>{
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result);
})

app.get('/todo/complete/:id',async(req,res)=>{
    const todo = await Todo.findById(req.params.id)
    todo.complete = !todo.complete
    todo.save()
    res.json(todo)
})

app.listen(3001,()=>console.log("server started on port 3001"));


