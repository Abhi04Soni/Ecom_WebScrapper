const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const amaQuotes = require('./AmazonScrap')
const flipQuotes = require('./FlipkartScrap')
const snapQuotes = require('./SnapdealScrap')



const server = express()
server.use(cors())
server.use(bodyparser.json())
const port = 3000
// const value = "";

server.post('/', async(req, res) => {
    console.log(req.body)
  const amazonData = await amaQuotes(req.body.item)
  const flipkartData = await flipQuotes(req.body.item)
  const SnapdealData = await flipQuotes(req.body.item)
    res.send(amazonData)
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

