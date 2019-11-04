const googleTrends = require('google-trends-api')

const googleService = () => {

    const getInterestOverTime = async (keyword, countryCode, start, end) => {
        try {
            let results
            if (!start && !end) {
                results = await googleTrends.interestOverTime({ keyword: keyword })
            }
            else if (start && !end) {
                let startDateObj = new Date(start)
                results = await googleTrends.interestOverTime({ keyword: keyword, startTime: startDateObj, geo: countryCode })
            }
            else if (start && end) {
                let startDateObj = new Date(start)
                let endDateObj = new Date(end)
                results = await googleTrends.interestOverTime({ keyword: keyword, startTime: startDateObj, endTime: endDateObj, geo: countryCode })
            }
            return results
        } catch (err) {
            throw err
        }
    }


    return {
        getInterestOverTime
    }
}

module.exports = googleService()