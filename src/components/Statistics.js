import React, { useState, useEffect } from 'react'
import { getPrimaryLocation } from '../services/user.service'
import { getCurrentUser } from '../services/auth.service'
import DeathsGraph from './DeathsGraph'
import CasesGraph from './CasesGraph'

const axios = require('axios')


const Statistics = () => {
    const [primaryLocation, setPrimaryLocation] = useState({})
    //Location states
    const [country, setCountry] = useState('')
    const [county, setCounty] = useState('')
    const [region, setRegion] = useState('')
    //API Stats states
    const [confirmedCases, setConfirmedCases] = useState('')
    const [deaths, setDeaths] = useState('')
    const [recovered, setRecovered] = useState('')
    const [updatedAt, setUpdatedAt] = useState('')
    const [historicalDates, setHistoricalDates] = useState([])
    const [historicalCases, setHistoricalCases] = useState([])
    const [historicalDeaths, setHistoricalDeaths] = useState([])


    useEffect(()=>{
        getPrimaryLocation()
        .then(response => {
            setPrimaryLocation(response)
        })
    }, [])

    useEffect(()=> {
        if(primaryLocation.county !== undefined) {
            axios.get(`https://disease.sh/v3/covid-19/jhucsse/counties/${primaryLocation.county}`)
            .then(response => {
                response.data.forEach(data=> {
                //Change state abbreviation to state name
                // const stateName = abbrState(state, 'name')
                if(primaryLocation.state === data.province)
                    setCountry(data.country)
                    setCounty(data.county)
                    setRegion(data.province)
                    setConfirmedCases(data.stats.confirmed)
                    setDeaths(data.stats.deaths)
                    setRecovered(data.stats.recovered)
                    setUpdatedAt(data.updatedAt)
                })
            })
        }
    }, [primaryLocation])

    //https://disease.sh/v3/covid-19/historical/usacounties/texas?lastdays=30

    useEffect(() => {
        if(region !== undefined) {
            axios.get(`https://disease.sh/v3/covid-19/historical/usacounties/${region.toLowerCase()}?lastdays=30`)
            .then(response => {
                response.data.forEach(data => {
                    if (data.county !== undefined && data.county === county.toLowerCase()) {
                        setHistoricalDates(Object.keys(data.timeline.cases))
                        setHistoricalCases(Object.values(data.timeline.cases))
                        setHistoricalDeaths(Object.values(data.timeline.deaths))
                    }
                })
            })
        }
    }, [region])


    // const getStatistics = async () => {
    //     await getPrimaryLocation()
    //     .then(response => {
    //         setPrimaryLocation(response)
    //     })
    // }

    return(
        <div>
            Statistics
            <p>Country: {country}</p>
            <p>County: {county}</p>
            <p>State: {region}</p>
            <p>Confirmed Cases: {confirmedCases}</p>
            <p>Deaths: {deaths}</p>
            <p>Recovered: {recovered}</p>
            <p>Last Updated: {updatedAt}</p>
        
            <CasesGraph dates={historicalDates} cases={historicalCases} />
            <DeathsGraph dates={historicalDates} deaths={historicalDeaths} />
        </div>
    )

}

export default Statistics