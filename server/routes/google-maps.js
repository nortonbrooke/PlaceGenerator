const express = require('express')
const router = express.Router()

const GOOGLE_API_KEY = 'AIzaSyBCX3ZtKczRMVhKQFUwrIQm_2cV2z6U_t8'

const googleMapsClient = require('@google/maps').createClient({
    key: GOOGLE_API_KEY
});

const MILES_TO_METERS = 1609.34

router.get('/nearby', (req, res) => {
    const {
        location,
        type,
        keyword,
        radius,
        minprice,
        maxprice,
    } = req.query

    let query = {
        opennow: true,
        location: location,
        type: type,
        keyword: keyword,
    }

    // Add radius
    if (radius) {
        query = {
            ...query,
            radius: parseInt(radius) * MILES_TO_METERS
        }
    } else {
        query = {
            ...query,
            rankby: 'distance'
        }
    }

    // Add price level
    if (minprice && maxprice) {
        query = {
            ...query,
            minprice: parseInt(minprice),
            maxprice: parseInt(maxprice)
        }
    }

    // Get data
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
    const { placeId } = req.query

    const query = {
        placeid: placeId
    }

    googleMapsClient.place(query, (error, response) => {
        if (error) {
            res.send(error)
        }
        if (response) {
            res.send(response.json)
        }
    })
})

router.get('/distance', (req, res) => {
    const {
        location,
        placeId
    } = req.query

    const query = {
        origins: [location],
        destinations: 'place_id:' + placeId,
        units: 'imperial'
    }

    googleMapsClient.distanceMatrix(query, (error, response) => {
        if (error) {
            res.send(error)
        }
        if (response) {
            res.send(response.json)
        }
    })
})

module.exports = router