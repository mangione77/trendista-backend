const axios = require('axios')

const getCountryCode = async (country, returnLanguage) => {
    try {
        const countryCodeResponse = await axios.get(`https://restcountries.eu/rest/v2/name/${country}`) 
        const { alpha2Code: countryCode } = countryCodeResponse.data[0]
        const language = countryCodeResponse.data[0].languages[0].iso639_1
        if (returnLanguage) {
            return { countryCode, language }
        } 
        return countryCode
    } catch (err) {
        throw err
    }
}

module.exports = getCountryCode