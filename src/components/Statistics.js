import React, { useState, useEffect } from 'react'
import { getPrimaryLocation, getFavorites, removeFavorite } from '../services/user.service'
import { getCurrentUser } from '../services/auth.service'
import DeathsGraph from './DeathsGraph'
import CasesGraph from './CasesGraph'
import MaterialTable from "material-table";


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
    const [dayFilter, setDayFilter] = useState(30)
    const [gridData, setGridData] = useState({
        data: [
            { name: "John", email: "john@gmail.com", age: 12, gender: "Male",},
            { name: "Bren", email: "bren@gmail.com", age: 24, gender: "Male" },
            { name: "Marry", email: "marry@gmail.com", age: 18, gender: "Female" },
            { name: "Shohail", email: "shohail@gmail.com", age: 25, gender: "Male" },
            { name: "Aseka", email: "aseka@gmail.com", age: 19, gender: "Female" },
            { name: "Meuko", email: "meuko@gmail.com", age: 12, gender: "Female" },
          ],
        columns: [
            {
            title: "Name",
            field: "name",
            },
            {
            title: "Email",
            field: "email",
            },
            {
            title: "Age",
            field: "age",
            },
            {
            title: "Gender",
            field: "gender",
            },
        ],
        resolve: () => {}
    })

    const onChangeDayFilter = (event, val) => {
        setDayFilter(val)
        console.log(dayFilter)
    }


    const onRowDelete = oldData =>
        new Promise((resolve, reject) => {
            const dataID = oldData._id
            removeFavorite(dataID).then(response => {
                console.log(response)
            })
            console.log(dataID)
            let data = [...gridData.data];
            const index = data.indexOf(oldData);
            data.splice(index, 1);
            const updatedAt = new Date();
            setGridData({ ...gridData, data, updatedAt, resolve });
    });

    // Get primary location and set the primary location state
    useEffect(() => {
        getPrimaryLocation()
        .then(response => {
            setPrimaryLocation(response)
        })
    }, [])

    //Run resolve for table
    useEffect(() => {
        gridData.resolve()

    }, [gridData])

    // Get favorites
    useEffect(() => {
        getFavorites().then(response => {
            setGridData({
                data: response,
                columns: [
                    {
                        title: "id",
                        field: "_id",
                        hidden: true,
                    },
                    {
                        title: "City",
                        field: "city",
                    },
                    {
                        title: "County",
                        field: "county",
                    },
                    {
                        title: "State",
                        field: "state",
                    },
                    {
                        title: "Country",
                        field: "country",
                    },
                ],
                resolve: () => {}
            })
        })
    },[])
    

    useEffect(()=> {
        if(primaryLocation.county !== undefined) {
            axios.get(`https://disease.sh/v3/covid-19/jhucsse/counties/${primaryLocation.county}`)
            .then(response => {
                response.data.forEach(data=> {
                    if(primaryLocation.state === data.province) {
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
    }, [primaryLocation])


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
        <div>
            Statistics
            <p>Country: {country}</p>
            <p>County: {county}</p>
            <p>State: {region}</p>
            <p>Confirmed Cases: {confirmedCases}</p>
            <p>Deaths: {deaths}</p>
            <p>Recovered: {recovered}</p>
            <p>Last Updated: {updatedAt}</p>
            <h3>Filters: </h3>
            <ul>
                <button onClick={e => onChangeDayFilter(e, 7)}>7 Days</button>
                <button onClick={e => onChangeDayFilter(e, 30)}>30 Days</button>
                <button onClick={e => onChangeDayFilter(e, "all")}>All</button>
            </ul>

            <CasesGraph dates={historicalDates} cases={historicalCases} />
            <DeathsGraph dates={historicalDates} deaths={historicalDeaths} />

            <MaterialTable
                title="Favorited Locations"
                data={gridData.data}
                columns={gridData.columns}
                editable={{
                    deletable: rowData => true,
                    onRowDelete: onRowDelete
                }}
                options={{ search: true, paging: false, filtering: true, exportButton: true }}
            />
        </div>
    )

}

export default Statistics