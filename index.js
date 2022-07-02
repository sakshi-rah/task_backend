const express = require('express');
const app = express();
const PORT = 5000;
app.use(express.json())

//temp database
let tasks = []

//create a Task
app.post('/tasks', (req, res) => {
    const task = {
        'id': req.body.id,
        'title': req.body.title,
        'description': req.body.description,
        'priority': req.body.priority,
        'emoji': req.body.emoji
    }

    tasks.push(task);

    res.json({
        'status': 'success',
        'massage' : 'task added successfully',
        'data': task
    })
})
//to read all tasks
app.get('/tasks', (req, res) => {
    res.json({
        'status': 'success',
        'data': tasks
    })
})
//read specific task
app.post('/get_task', (req, res) => {
    const id = req.body.id;

    let resultTask;
    tasks.map((task) => {
        if (task.id === id) {
            resultTask = task;
        }
    })
    res.json({
        'status': 'success',
        'data': resultTask
    })
})
//detele all tasks
app.post('/delete_tasks', (req, res) => {
    tasks = []
    res.json({
        'status': 'success',
        'massage' : 'successfully deleted all task',
        'data': tasks
    })
})
//delete specific task
app.post('/delete_task', (req, res) => {
    const id = req.body.id;

    let index = -1;

    tasks.map((task, i) => {
        if (id === task.id) {
            index = i;
        }
    })
    tasks.splice(index, 1)
    res.json({
        'status': 'success',
        'massage' : 'successfully deleted task with id : ${id}',
        'data': tasks
    })


})
//update task

app.post('/update_task',(req,res)=>{
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const emoji = req.body.emoji;

    let index = -1;

    tasks.map((task, i) => {
        if (id === task.id) {
            index = i;
        }
    })
    tasks[index] = {
        id : id,
        title : title,
        description : description,
        priority : priority,
        emoji : emoji
    }
    res.json({
        'status' : 'success',
        'massage' : ' Task updated successfully ',
        'data': tasks
    })
})


app.listen(PORT, () => {
    console.log('server started runing on port', PORT);
})