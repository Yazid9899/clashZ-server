'use strict'
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const router = require('./routes')
const errorHandling = require('./middleware/errorHandling')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use(router)
app.use(errorHandling)

app.listen(port, () => {
  console.log(`individual project in ${port}`)
})