const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()

//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes

app.use('/api/tasks', tasks)

const PORT = 3000


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, console.log(`server is listening on port ${PORT}...`))

    } catch (err) {
        console.log(err)
    }
}

start()
