import React, { useState, useEffect } from 'react'
import DeathsGraph from './DeathsGraph'
import CasesGraph from './CasesGraph'
import '../css/Statistics.css'

const axios = require('axios')


const Statistics = ({newCountry, newCounty, newRegion}) => {
    //Location states
    const [country, setCountry] = useState(newCountry)
    const [county, setCounty] = useState(newCounty)
    const [region, setRegion] = useState(newRegion)
    //API Stats states
    const [confirmedCases, setConfirmedCases] = useState('')
    const [deaths, setDeaths] = useState('')
    const [recovered, setRecovered] = useState('')
    const [updatedAt, setUpdatedAt] = useState('')
    const [historicalDates, setHistoricalDates] = useState([])
    const [historicalCases, setHistoricalCases] = useState([])
    const [historicalDeaths, setHistoricalDeaths] = useState([])
    const [dayFilter, setDayFilter] = useState(30)

    const onChangeDayFilter = (event, val) => {
        setDayFilter(val)
        console.log(dayFilter)
    }
    
    useEffect(()=> {
        if(newCounty !== undefined) {
            axios.get(`https://disease.sh/v3/covid-19/jhucsse/counties/${newCounty}`)
            .then(response => {
                response.data.forEach(data=> {
                    if(newRegion === data.province) {
                        setCountry(data.country)
                        setCounty(data.county)
                        setRegion(data.province)
                        setConfirmedCases(data.stats.confirmed)
                        setDeaths(data.stats.deaths)
                        setRecovered(data.stats.recovered)
                        setUpdatedAt(data.updatedAt)
                    }
                })
            })
        }
    }, [newCountry, newCounty, newRegion])


    useEffect(() => {
        if(region !== undefined) {
            axios.get(`https://disease.sh/v3/covid-19/historical/usacounties/${region.toLowerCase()}?lastdays=${dayFilter}`)
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
    }, [region, dayFilter])


    return(
        <div className='container'>
            <div className='row'>
                <div className='col s12'>
                    <div className='card'>
                        <p>Country: {country}</p>
                        <p>County: {county}</p>
                        <p>State: {region}</p>
                        <p>Confirmed Cases: {confirmedCases}</p>
                        <p>Deaths: {deaths}</p>
                        <p>Last Updated: {updatedAt}</p>
                    </div>
                </div>
            </div>

            <div className='row graph-container'>
                    <ul>
                        <button onClick={e => onChangeDayFilter(e, 7)} className='waves-effect waves-light btn-small'>7 Days</button>
                        <button onClick={e => onChangeDayFilter(e, 30)} className='waves-effect waves-light btn-small'>30 Days</button>
                        <button onClick={e => onChangeDayFilter(e, "all")} className='waves-effect waves-light btn-small'>All</button>
                    </ul>

                    <CasesGraph dates={historicalDates} cases={historicalCases} />
                    <DeathsGraph dates={historicalDates} deaths={historicalDeaths} />
            </div>
        </div>
    )

}

export default Statistics