const express = require('express');
const mongoose = require("mongoose")
const app = express();

const Task = require('./model/task')

require('dotenv').config()
const PORT = process.env.PORT || 5000;
app.use(express.json())

//temp database
//let tasks = [];

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log("connected to MongoDB Database.....")
})

//create a Task
app.post('/tasks', async (req, res) => {
    /* const task = {
         'id': req.body.id,
         'title': req.body.title,
         'description': req.body.description,
         'priority': req.body.priority,
         'emoji': req.body.emoji
     }
 
     tasks.push(task);
 
     res.json({
         'status': 'success',
         'massage': 'task added successfully',
         'data': task
     })*/

    const task = new Task({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        emoji: req.body.emoji

    })
    const saveTask = await task.save();

    res.json({
        'status': 'success',
        'data': saveTask
    })
})
//to read all tasks
app.get('/tasks', async (req, res) => {
    const allTasks = await Task.find();
    res.json({
        'status': 'success',
        'data': allTasks
    })
})
//read specific task
app.post('/get_task', async (req, res) => {
    const id = req.body.id;

    const specificTask = await Task.findOne({ id: id });

    /*let resultTask;
    tasks.map((task) => {
        if (task.id === id) {
            resultTask = task;
        }
    })*/
    res.json({
        'status': 'success',
        // 'data': resultTask
        'data': specificTask
    })
})
//detele all tasks
app.post('/delete_tasks', async (req, res) => {
    //tasks = []
    const result = await Task.deleteMany();
    res.json({
        'status': 'success',
        'massage': 'successfully deleted all task',
        // 'data': tasks
        'data': result
    })
})
//delete specific task
app.post('/delete_task', async (req, res) => {
    const id = req.body.id;
    const results = await Task.deleteOne({ id: id });

    /*let index = -1;

    tasks.map((task, i) => {
        if (id === task.id) {
            index = i;
        }
    })
    tasks.splice(index, 1)*/

    res.json({
        'status': 'success',
        'massage': `successfully deleted task with id : ${id}`,
        'data': results
    })


})
//update task

app.post('/update_task', async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const emoji = req.body.emoji;

    const updateResult = await Task.updateOne({ id: id }, {
        $set: {
            title: title,
            description: description,
            priority: priority,
            emoji: emoji
        }
    })
    /*let index = -1;

    tasks.map((task, i) => {
        if (id === task.id) {
            index = i;
        }
    })
    tasks[index] = {
        id: id,
        title: title,
        description: description,
        priority: priority,
        emoji: emoji
    }*/
    res.json({
        'status': 'success',
        'massage': ' Task updated successfully ',
        'data': updateResult
    })
})


app.listen(PORT, () => {
    console.log('server started runing on port', PORT);
})