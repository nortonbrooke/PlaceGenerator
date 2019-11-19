const express = require('express')
const router = express.Router()

const GOOGLE_API_KEY = 'AIzaSyCcySEml6U46lKz4hDaBCKy9cY447auFF0'

const googleMapsClient = require('@google/maps').createClient({
    key: GOOGLE_API_KEY
});

router.get('/nearby', (req, res) => {
    const query = JSON.parse(req.query.query)
    googleMapsClient.placesNearby(query, (error, response) => {
        if (error) {
            res.send(error)
        }
        if (response) {
            res.send(response.json)
        }
    })
})

router.get('/place', (req, res) => {
    googleMapsClient.place({
        placeid: req.query.placeId
    }, (error, response) => {
        if (error) {
            res.send(error)
        }
        if (response) {
            res.send(response.json)
        }
    })
})

router.get('/distance', (req, res) => {
    googleMapsClient.distanceMatrix({
        origins: [req.query.location],
        destinations: 'place_id:' + req.query.placeId,
        units: 'imperial'
    }, (error, response) => {
        if (error) {
            res.send(error)
        }
        if (response) {
            res.send(response.json)
        }
    })
})

module.exports = router