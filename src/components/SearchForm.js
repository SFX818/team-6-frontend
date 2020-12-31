import React, { useState } from 'react'

import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

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
            <button class="btn waves-effect waves-light" type="submit" name="action">
                <i class="material-icons right">search</i>
            </button>
    
        </div>
    )
}

export default SearchForm