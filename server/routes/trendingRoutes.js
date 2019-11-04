const trendingRoutes = require('express')()
const trendingController = require('../controllers/trendingController')

trendingRoutes.post('/location', trendingController.getTrendingForLocation)
trendingRoutes.post('/keyword', trendingController.getKeywordInfo)

module.exports = trendingRoutes