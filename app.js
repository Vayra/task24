const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 8080

let rawData = fs.readFileSync('data.json')
const data = JSON.parse(rawData)

app.get('/data', (req, res) => res.send(data))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(process.env.PORT || 8080)