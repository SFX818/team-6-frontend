import React, { useState, useEffect } from 'react'
import { getFavorites, removeFavorite } from '../services/user.service'
import MaterialTable from "material-table";

const axios = require('axios')


const StatisticsTable = () => {
    const [gridTable, setGridTable] = useState({
        resolve: () => {}
    })
    const [gridData, setGridData] = useState([])

    const onRowDelete = oldData =>
        new Promise((resolve, reject) => {
            const dataID = oldData._id
            removeFavorite(dataID).then(response => {
                console.log(response)
            })
            console.log(dataID)
            let data = [...gridTable.data];
            const index = data.indexOf(oldData);
            data.splice(index, 1);
            const updatedAt = new Date();
            setGridTable({ ...gridTable, data, updatedAt, resolve });
        })
    
    const onRowEdit = oldData =>
    new Promise((resolve, reject) => {
        const dataID = oldData._id
        console.log(dataID)
        // let data = [...gridTable.data];
        // const index = data.indexOf(oldData);
        // data.splice(index, 1);
        // const updatedAt = new Date();
        // setGridTable({ ...gridTable, data, updatedAt, resolve });
    })


    //Get favorites and set state
    useEffect(() => {
        let localGridData
        //Get Favorites data
        getFavorites().then(response => {
            localGridData = response
            response.forEach((favoritesData, index) => {
                console.log(favoritesData)
                const favoritesRegion = favoritesData.state
                console.log(favoritesRegion)
                //Make API call with favorites data county
                axios.get(`https://disease.sh/v3/covid-19/jhucsse/counties/${favoritesData.county}`)
                .then(response => {
                    // Loop through API response and get the data for the county
                    response.data.forEach((countyData) => {
                        //Check if favorites state matches returned array of API response state
                        if(countyData.province === favoritesRegion) {
                            //merges the favorite location object with API response data
                            let merged = Object.assign({}, localGridData[index], countyData.stats)
                            setGridData(prevArray => [...prevArray, merged])
                        }
                    })
                })

            })
        })
    },[])

    useEffect(()=> {
        console.log("FINALY GRID DATA:", gridData)
        setGridTable({
            data: gridData,
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
                {
                    title: "Confirmed Cases",
                    field: "confirmed",
                },
                {
                    title: "Confirmed Deaths",
                    field: "deaths",
                },
            ],
            resolve: () => {}

        })
    }, [gridData])

    //Run resolve for table
    useEffect(() => {
        gridTable.resolve()
    }, [gridData, gridTable])

    return (
        <div>
            <MaterialTable
                title="Favorited Locations"
                data={gridTable.data}
                columns={gridTable.columns}
                editable={{
                    deletable: rowData => true,
                    onRowDelete: onRowDelete,
                }}
                options={{ search: true, paging: false, filtering: true, exportButton: true }}
                localization={{
                    header: {
                        actions: "Actions"
                    },
                    body: {
                        editRow: {
                            deleteText: "Are you sure you want to remove this favorited location?"
                        },
                        deleteTooltip: "Remove from favorite location",
                    },
                }}
                onRowClick={(event, rowData,) => console.log(rowData)}
            />
        </div>
    )
}

export default StatisticsTable