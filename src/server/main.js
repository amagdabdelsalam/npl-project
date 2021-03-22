const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch')
const mockAPIResponse = require('./mockAPI.js')

const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// app routes
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// api post route
app.post('/api', async (req, res) => {
    // let url = 'https://en.wikipedia.org/wiki/HMS_Princess_Royal_(1911)'
    // user articale 
    userArticale = req.body.url
    // api init url
    const domain = 'https://api.meaningcloud.com/sentiment-2.1?'
    const apiUrl = `${domain}&key=${process.env.API_KEY}&url=${userArticale}&lang=en`

    const response = await fetch(apiUrl)
    const resData = await response.json()
    console.log(resData)
    res.send(resData)
})
