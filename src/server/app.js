// DOTENV for .env file
const dotenv = require('dotenv')
dotenv.config()

const fetch = (...args) => import('node-fetch')
  .then(({default: fetch}) => fetch(...args))

// Express
const express = require('express')
const app = express()

// Body-Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors
const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.sendFile('dist/index.html')
})

// API KEYS
const geonames_key = process.env.GEO_KEY
const weatherbit_key = process.env.W_BIT_KEY
const pixabay_api = process.env.P_IMAGES_KEY

const dataForUI = {}

app.post('/data', async (req, res) => {
  const destination = req.body.destination

  // Data from Geonames API
  const geonamesReply = await (fetch(`http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${geonames_key}`, { method: 'GET' }))
  const geonamesData = await geonamesReply.json()

  // Data from weatherbit.io API
  const weatherbitReply = await (fetch(`https://api.weatherbit.io/v2.0/current?lat=${geonamesData.geonames[0].lat}&lon=${geonamesData.geonames[0].lng}&key=${weatherbit_key}`, { method: 'GET' }))
  const weatherbitData = await weatherbitReply.json()

  // Data from pixabay.com API
  const pixabayReply = await (fetch(`https://pixabay.com/api/?key=${pixabay_api}&q=${geonamesData.geonames[0].name}&image_type=photo`, { method: 'GET' }))
  
  try {
    const pixabayData = await pixabayReply.json()

    dataForUI.tripDuration = req.body.tripDuration
    dataForUI.cityInputName = destination
    dataForUI.cityName = geonamesData.geonames[0].name
    dataForUI.countryName = geonamesData.geonames[0].countryName
    dataForUI.temperature = weatherbitData.data[0].temp
    dataForUI.description = weatherbitData.data[0].weather.description
    dataForUI.iconImg = weatherbitData.data[0].weather.icon
    dataForUI.cityImage = pixabayData.hits[0].webformatURL

  } catch(error) {
    console.log(error)
    dataForUI.cityImage = 'none'
  }  
    console.log(dataForUI)
    res.send(dataForUI)
})

module.exports = app
