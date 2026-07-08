const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authroutes = require('./routes/auth')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authroutes)  

app.listen(5000, () => {
    console.log('hello')
})