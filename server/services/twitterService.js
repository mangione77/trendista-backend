const axios = require('axios')
const Twit = require('twit')

const {
    TW_API_KEY,
    TW_API_SECRET_KEY,
    TW_ACCESS_TOKEN,
    TW_ACCESS_TOKEN_SECRET
} = process.env

const Twitter = new Twit({
    consumer_key: TW_API_KEY,
    consumer_secret: TW_API_SECRET_KEY,
    access_token: TW_ACCESS_TOKEN,
    access_token_secret: TW_ACCESS_TOKEN_SECRET, 
})

const twitterService = () => {


    const getTrendingInLocation = (woeid) => {
        return new Promise((resolve, reject) => {
            Twitter.get('trends/place', { id: woeid }, (err, data) => {
                if (err) reject(err)

                const { trends } = data[0]
                resolve(trends)
            })
        })
    }

    const getLatestTweetsForKeyword = (cityLatLngStr, keyword) => {
        return new Promise((resolve,reject) => {
            if (keyword === undefined) {
                reject({ errorCode: 500, message: 'Supplied keyword is undefined' })
            }
            Twitter.get('search/tweets', { q: keyword, search_type: 'recent', geocode: `${cityLatLngStr},50km`, count: 100 }, (err, data) => {
                if (err) reject(err)
    
                resolve(data)
            })
        })
    
    }

    return {
        getTrendingInLocation,
        getLatestTweetsForKeyword
    }
}

module.exports = twitterService()