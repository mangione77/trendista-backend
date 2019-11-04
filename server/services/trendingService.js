const axios = require('axios')
const utf8 = require('utf8')
const getWOEID = require('../helpers/getWOEID')
const twitterService = require('./twitterService')
const googleService = require('./googleService')
const { getTrendingInLocation } = twitterService
const { NEWS_API_KEY } = process.env 

const trendingService = () => {

    const getTrendingForLocation = async (location) => {
        try {
            const { city, country } = location
            const woeid = getWOEID(city, country)
            const trending = await getTrendingInLocation(woeid)
            return trending
        } catch (err) {
           throw err
        }
    }

    const getLatestTweetsForKeyword = async (location, keyword) => {
        try {
            const { city } = location 
            const cityDataURL = `http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false&address=${city}`
            const { data } = await axios.get(cityDataURL)
            const { results } = data
            const { lat, lng } = results[0].geometry.location
            const cityLatLngStr = `${lat},${lng}`
            return await twitterService.getLatestTweetsForKeyword(cityLatLngStr, keyword)
        } catch (err) {
            throw err
        }
    }

    const getInterestOverTime = async (countryCode, keyword, range) => {
        try {
            keyword = keyword.replace('#', '')
            const interest = await googleService.getInterestOverTime(keyword, countryCode)
            return interest
        } catch (err) {
            throw err
        }
    }

    const getLatestNews = async (keyword) => {
        try {
            keyword = keyword.replace('#', '')
            const { data } = await axios.get(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${NEWS_API_KEY}`)
            return data.articles
        } catch (err) {
            throw err
        }
    }

    return {    
        getTrendingForLocation,
        getLatestTweetsForKeyword,
        getInterestOverTime,
        getLatestNews
    }
}

module.exports = trendingService()