require('dotenv').config()
const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const trendingRoutes = require('./routes/trendingRoutes')
const { PORT } = process.env 

app.use(cors())
app.use(bodyParser.json())
app.use('/trending', trendingRoutes)

app.listen(PORT, () => {
    console.log(`Trending backend listening on ${PORT}`)
})