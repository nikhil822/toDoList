require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const port = process.env.PORT || 5000


mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err))

require('./models/task')
app.use(bodyParser.json())
app.use(cors())

app.use('/api', require('./routes/tasks'))
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})