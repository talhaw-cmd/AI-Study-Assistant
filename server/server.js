const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const playerRoutes = require('./routes/playerroutes')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use("/", playerRoutes)  

app.listen(5000, () => {
    console.log('hello')
})