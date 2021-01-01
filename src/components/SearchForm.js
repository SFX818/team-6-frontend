import React, { useState } from 'react'
import { Button } from '@material-ui/core';

import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

// const API_URL_SEARCH = 'http://localhost:8080/search/'

export const SearchForm = () => {

    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
    const [city, setCity] = useState('')

    const onChangeCountry = (val) => {
        console.log(val)
        setCountry(val)
    }

    const onChangeRegion = (val) => {
        console.log(val)
        setRegion(val)
    }

    const onChangeCity = (e) => {
        const city = e.target.value
        console.log(city)
        setCity(city)
    }



    return (
        <div>
            <CountryDropdown
                value={country}
                onChange={(val) => onChangeCountry(val)} />
            <RegionDropdown
                country={country}
                value={region}
                onChange={(val) => onChangeRegion(val)} />
            <form text="city">
                <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={city}
                    onChange={onChangeCity}
                    
                />
            </form>
            <Button color="primary" type="submit" name="action">
                search
            </Button>
    
        </div>
    )
}

export default SearchForm