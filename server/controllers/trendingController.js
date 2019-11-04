const getCountryCode = require('../helpers/getCountryCode')
const trendingService = require('../services/trendingService')

const trendingController = () => {

    const getTrendingForLocation = async (req, res) => {
        try {
            const { location } = req.body 
            const trending = await trendingService.getTrendingForLocation(location)
            res.status(200).json({ location, trending })
        } catch (err) {
            console.log('Trending for location: ', err)
        }
    }

    const getKeywordInfo = async (req, res) => {
        try {
            const { location, keyword } = req.body 
            const { country } = location
            if (country === 'United States') country = 'United States of America'
            const countryCode  = await getCountryCode(country, false)
            const latestTweets = await trendingService.getLatestTweetsForKeyword(location, keyword)
            const interestOverTime = await trendingService.getInterestOverTime(location, keyword, countryCode)
            const latestNews = await trendingService.getLatestNews(keyword)
            res.status(200).json({ keyword, location, latestTweets, latestNews, interestOverTime: JSON.parse(interestOverTime).default.timelineData })
        } catch (err) {
            console.log('Latest tweets for kewyrord:', err)
        }
    }

    return {    
        getTrendingForLocation,
        getKeywordInfo
    }
}

module.exports = trendingController()