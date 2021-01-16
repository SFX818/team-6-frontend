import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import SearchForm from "./SearchForm";
import SearchPopup from './SearchPopup'
import axios from "axios";
import Loading from './common/Loading';
import useSWR from "swr";
import { getOneLocation } from '../services/location.services'



mapboxgl.accessToken = 'pk.eyJ1IjoiYmluYXJ5YmVhc3QiLCJhIjoiY2tpbTU3cW8xMHE1ZTJycXJkemdjZThmMSJ9.LUCLnUpyYjcUF48GPUEUVQ'


  function Search(id, city) {
    const [searchTerm, setSearchTerm] = useState(null)
    const [zoom, setZoom] = useState(2.5)
    const [center, setCenter] = useState([-104.9876, 39.7405])

    const [searchCountry, setSearchCountry] = useState('')
    const [searchRegion, setSearchRegion] = useState('')
    const [searchCounty, setSearchCounty] = useState('')
    const [searchCity, setSearchCity] = useState(city)
    const [searchId, setSearchId] = useState(id)
    const [searchLocation, setSearchLocation] = useState('')
    const [searchUrl, setSearchUrl] = useState('https://disease.sh/v3/covid-19/jhucsse')
    
    const [message, setMessage] = useState('')

    const mapContainerRef = useRef(null);
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))

    useEffect(() => {
        if(id.id !== null){
          getOneLocation(id.id).then(response => {
            setSearchLocation(response.data)
            setSearchUrl(`https://disease.sh/v3/covid-19/jhucsse/counties/${response.data.county}`)
            },
            (error) => {
                setMessage(error)
                setSearchLocation(error)
            }
        )} else {
          setSearchUrl('https://disease.sh/v3/covid-19/jhucsse')
        }
    },[id])

    const fetcher = (url,city,state,county,country) => 
    fetch(url) 
      .then(r => r.json())
      .then(data => {
        if(id.id === null) {
          return data.map((point, index) => ({
                      type: "Feature",
                      geometry: {
                        type: "Point",
                        coordinates: [
                          point.coordinates.longitude,
                          point.coordinates.latitude
                        ]
                      },
                      properties: {
                        id: index,
                        country: point.country,
                        province: point.province,
                        county: point.county,
                        cases: point.stats.confirmed,
                        deaths: point.stats.deaths,
                        recovered: point.stats.recovered
                      }
          }))
        } else {
          // console.log(data)
          // data.forEach(point => {
          //   if (searchLocation.state === point.province) {
          let filteredData = data.filter(point => point.province === searchLocation.state)
              // console.log(point) // it's pulling the right thing // why isn't it formatting?
              return filteredData.map((point, index) => ({
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [
                    point.coordinates.longitude,
                    point.coordinates.latitude
                  ]
                },
                properties: {
                  id: index,
                  country: point.country,
                  province: point.province,
                  county: point.county,
                  cases: point.stats.confirmed,
                  deaths: point.stats.deaths,
                  recovered: point.stats.recovered
                }
            }))
          }

        })
      // }
    // })

  // Fetching our data with swr package
  const { data } = useSWR(searchUrl, fetcher);

    // const mapPoints = async () => {
    //     const newFeaturesList = [];
    //     function newList() {
    //         const promise = axios.get("https://disease.sh/v3/covid-19/jhucsse")
    //         const dataPromise = promise.then((response) => 
    //         response.data)
    //         return dataPromise
    //     }
    //     newList()
    //         .then(data => {
    //             data.map((point, index) => {
    //                 newFeaturesList.push(point)
    //                 console.log("Loading")
    //                 // console.log("@@@@@%^", newFeaturesList[0])
    //                 // console.log("data here", point) 
                    
    //                  return {
                         
    //                      type: "Feature",
    //                      geometry: {
    //                        type: "Point",
    //                        coordinates: [
    //                          point.coordinates.longitude,
    //                          point.coordinates.latitude
    //                        ]
    //                      },
    //                      properties: {
    //                        id: index, // unique identifier in this case the index
    //                        country: point.country,
    //                        province: point.province,
    //                        county: point.county,
    //                        cases: point.stats.confirmed,
    //                        deaths: point.stats.deaths,
    //                        recovered: point.stats.recovered
    //                      }
    //                  }
     
    //              })
    //         })
        // }
        // const newFeaturesList = axios.get("https://disease.sh/v3/covid-19/jhucsse")
        // .then(response => {

            // response.data.map((point, index) => {
            //    console.log("data here", point) 
            //    console.log("@@@@@@", newFeaturesList)
            //     return {
                    
            //         type: "Feature",
            //         geometry: {
            //           type: "Point",
            //           coordinates: [
            //             point.coordinates.longitude,
            //             point.coordinates.latitude
            //           ]
            //         },
            //         properties: {
            //           id: index, // unique identifier in this case the index
            //           country: point.country,
            //           province: point.province,
            //           county: point.county,
            //           cases: point.stats.confirmed,
            //           deaths: point.stats.deaths,
            //           recovered: point.stats.recovered
            //         }
            //     }

            // })
        // })
        // console.log("we got mail", newFeatureList)
        // return  await newFeaturesList
    

    useEffect(() => {
        if(data && data.length === 1) {
          setCenter([data[0].geometry.coordinates[0], data[0].geometry.coordinates[1]]) // this all works, it's just very slow
          setZoom(12)
          // console.log(data[0].geometry.coordinates)
        }
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            // See style options here: https://docs.mapbox.com/api/maps/#styles
            style: 'mapbox://styles/binarybeast/ckjdljfpu6smv1ao028dmjh4r',
            center: center,
            zoom: zoom,
          });


        // add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

        map.on('load', async () => {
            // add the data source for new a feature collection with no features
            map.addSource('Country-data', {
                type: 'geojson',
                data: {
                    type: "FeatureCollection",
                    features: data
                },
            });
           
            // now add the layer, and reference the data source above by name
            map.addLayer({
              id: 'country-data-layer',
              source: 'Country-data',
              type: 'symbol',
              layout: {
                // full list of icons here: https://labs.mapbox.com/maki-icons
                'icon-image': 'marker-15',
                'icon-padding': 0,
                'icon-allow-overlap': true,
              },
            });
          });

          map.on('moveend', async () => {
            // get new center coordinates
            const { lng, lat } = map.getCenter();
            // fetch new data
            const results = await fetcher(lng, lat);
            // update "random-points-data" source with new data
            // all layers that consume the "random-points-data" data source will be updated automatically
            console.log("---testing---", results)
            map.getSource('Country-data').setData({
              type: 'FeatureCollection',
              features: results});
          });

          map.on("click", "country-data-layer", e => {
            if (e.features.length) {
              const feature = e.features[0];
              // create popup node
              const popupNode = document.createElement("div");
              ReactDOM.render(<SearchPopup feature={feature} />, popupNode);
              // set popup on map
              popUpRef.current
                .setLngLat(feature.geometry.coordinates)
                .setDOMContent(popupNode)
                .addTo(map);
            }
          })

        // clean up on unmount
    return () => map.remove();
    }, [data])
    



    return (
      <>
      <div className="map-container" ref={mapContainerRef} />
      </>
      );
  }

export default Search



// // import React from "react"
// import React, { useRef, useEffect, useState } from "react";
// import useSWR from "swr";
// //import component
// import SearchForm from "./SearchForm";

// //CSS
// // import '../css/Search.css'

// const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

// mapboxgl.accessToken = 'pk.eyJ1IjoiYmluYXJ5YmVhc3QiLCJhIjoiY2tpbTU3cW8xMHE1ZTJycXJkemdjZThmMSJ9.LUCLnUpyYjcUF48GPUEUVQ';

// function Search() {
//     const [searchTerm, setSearchTerm] = useState(null)
//     const mapboxElRef = useRef(null);

    
//     const fetcher = (url,city,state,county,country) =>
//     fetch(url) 
     
//       .then(r => r.json())
//       .then(data =>
        
//         data.map((point, index) => {
//             // console.log(point)
//             // i need to another if statement to check if the search terms matches
//             if(searchTerm) {
//                 return {
//                     type: "Feature",
//                     geometry: {
//                       type: "Point",
//                       coordinates: [
//                         point.coordinates.longitude,
//                         point.coordinates.latitude
//                       ]
//                     },
//                     properties: {
//                       id: index, // unique identifier in this case the index
//                       country: point.country,
//                       province: point.province,
//                       county: point.county,
//                       cases: point.stats.confirmed,
//                       deaths: point.stats.deaths,
//                       recovered: point.stats.recovered
//                     }
//             }
//          } else {
//                 return {
//                     type: "Feature",
//                     geometry: {
//                       type: "Point",
//                       coordinates: [
//                         point.coordinates.longitude,
//                         point.coordinates.latitude
//                       ]
//                     },
//                     properties: {
//                       id: index, // unique identifier in this case the index
//                       country: point.country,
//                       province: point.province,
//                       county: point.county,
//                       cases: point.stats.confirmed,
//                       deaths: point.stats.deaths,
//                       recovered: point.stats.recovered
//                     }
//             }
            
//         }})
//       );

//   // Fetching our data with swr package
//   const { data } = useSWR("https://disease.sh/v3/covid-19/jhucsse", fetcher);
    
//     useEffect(() => {
//         if (data) {
//         // You can store the map instance with useRef too
//         const map = new mapboxgl.Map({
//           container: mapboxElRef.current,
//           style: "mapbox://styles/binarybeast/ckjdljfpu6smv1ao028dmjh4r",
//           center: [16, 27], // initial geo location
//           zoom: 1.5 // initial zoom
//         });

//         map.addControl(new mapboxgl.NavigationControl());
        
//      // Call this method when the map is loaded
//      map.once("load", function() {
//         // Add our SOURCE
//         // with id "points"
//         map.addSource("points", {
//           type: "geojson",
//           data: {
//             type: "FeatureCollection",
//             features: data
//           }
//         });

//         // Add our layer
//         map.addLayer({
//           id: "circles",
//           source: "points", // this should be the id of the source
//           type: "circle",
//           // paint properties
//           paint: {
//             "circle-opacity": 0.75,
//             "circle-stroke-width": 1,
//             "circle-radius": 4,
//             "circle-color": "#FFEB3B"
//           }
//         });
//         // Create a mapbox popup
// const popup = new mapboxgl.Popup({
//     closeButton: true,
//     closeOnClick: true
//   });
  
//   // Variable to hold the active country/province on hover
//   let lastId;
  
//   // Mouse move event
//   map.on("mousemove", "circles", e => {
//     // Get the id from the properties
//     const id = e.features[0].properties.id;
  
//     // Only if the id are different we process the tooltip
//     if (id !== lastId) {
//       lastId = id;
  
//       // Change the pointer type on move move
//       map.getCanvas().style.cursor = "pointer";
  
//       const { cases, deaths, country, province,county,recovered } = e.features[0].properties;
//       const coordinates = e.features[0].geometry.coordinates.slice();
  
//       // Get all data for the tooltip
//       // const countryISO =
//       //   lookup.byCountry(country)?.iso2 || lookup.byInternet(country)?.iso2;
  
//       const provinceHTML =
//         province !== "null" ? `<p>Province: <b>${province}</b></p>` : "";
  
//         const cityHTML =
//         county !== "null" ? `<p>City: <b>${county}</b></p>` : "";
//       const mortalityRate = ((deaths / cases) * 100).toFixed(2);
  
//       // const countryFlagHTML = Boolean(countryISO)
//       //   ? `<img src="https://www.countryflags.io/flat/${countryISO}/64.png"></img>`
//       //   : "";
  
//       const HTML = `<p>Country: <b>${country}</b></p>
//                 ${provinceHTML}
//                 ${cityHTML}
//                 <p>Cases: <b>${cases}</b></p>
//                 <p>Recovered: <b>${recovered}</b></p>
//                 <p>Deaths: <b>${deaths}</b></p>
//                 <p>Mortality Rate: <b>${mortalityRate}%</b></p>
//                `;
  
//       // Ensure that if the map is zoomed out such that multiple
//       // copies of the feature are visible, the popup appears
//       // over the copy being pointed to.
//       while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//       }
  
//       popup
//         .setLngLat(coordinates)
//         .setHTML(HTML)
//         .addTo(map);
//     }
//   });
  
//   // Mouse leave event
//   map.on("mouseleave", "circles", function() {
//     // Reset the last Id
//     lastId = undefined;
//     map.getCanvas().style.cursor = "";
//     popup.remove();
//   });
//       });
//     }

    
//   }, [data]);

    
//     return (
//       <>
//             <div className='container'>
//                 <h1>Covid-19 Cases</h1>
//                 < SearchForm />
//             </div>
//         <div className="App container">
//           <div className="mapContainer">
//             {/* Assigned Mapbox container */}
//             <div className="mapBox" ref={mapboxElRef} />
//           </div>
//         </div>
//       </>
//       );
//     }

// export default Search