const WOEID_LIST = require('../constants/WOEID_LIST')

const getWOEID = (location, country) => {
    const foundLocation = WOEID_LIST.filter(locationObj => {
        return locationObj.name === location && locationObj.country === country
    })
    if (foundLocation === undefined) {
        return ({ errorCode: 404, message: `No location was found by ${location}, ${country}`})
    } 
    return foundLocation[0].woeid
}

module.exports = getWOEID
