// import React from "react"
import React, { useRef, useEffect, useState } from "react";
import useSWR from "swr";
//import component
import SearchForm from "./SearchForm";

//CSS
// import '../css/Search.css'

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiYmluYXJ5YmVhc3QiLCJhIjoiY2tpbTU3cW8xMHE1ZTJycXJkemdjZThmMSJ9.LUCLnUpyYjcUF48GPUEUVQ';

function Search() {
    const [searchTerm, setSearchTerm] = useState(null)
    const mapboxElRef = useRef(null);

    
    const fetcher = (url,city,state,county,country) =>
    fetch(url) 
     
      .then(r => r.json())
      .then(data =>
        
        data.map((point, index) => {
            // console.log(point)
            // i need to another if statement to check if the search terms matches
            if(searchTerm) {
                return {
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: [
                        point.coordinates.longitude,
                        point.coordinates.latitude
                      ]
                    },
                    properties: {
                      id: index, // unique identifier in this case the index
                      country: point.country,
                      province: point.province,
                      county: point.county,
                      cases: point.stats.confirmed,
                      deaths: point.stats.deaths,
                      recovered: point.stats.recovered
                    }
            }
         } else {
                return {
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: [
                        point.coordinates.longitude,
                        point.coordinates.latitude
                      ]
                    },
                    properties: {
                      id: index, // unique identifier in this case the index
                      country: point.country,
                      province: point.province,
                      county: point.county,
                      cases: point.stats.confirmed,
                      deaths: point.stats.deaths,
                      recovered: point.stats.recovered
                    }
            }
            
        }})
      );

  // Fetching our data with swr package
  const { data } = useSWR("https://disease.sh/v3/covid-19/jhucsse", fetcher);
    
    useEffect(() => {
        if (data) {
        // You can store the map instance with useRef too
        const map = new mapboxgl.Map({
          container: mapboxElRef.current,
          style: "mapbox://styles/binarybeast/ckjdljfpu6smv1ao028dmjh4r",
          center: [16, 27], // initial geo location
          zoom: 1.5 // initial zoom
        });

        map.addControl(new mapboxgl.NavigationControl());
        
     // Call this method when the map is loaded
     map.once("load", function() {
        // Add our SOURCE
        // with id "points"
        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: data
          }
        });

        // Add our layer
        map.addLayer({
          id: "circles",
          source: "points", // this should be the id of the source
          type: "circle",
          // paint properties
          paint: {
            "circle-opacity": 0.75,
            "circle-stroke-width": 1,
            "circle-radius": 4,
            "circle-color": "#FFEB3B"
          }
        });
        // Create a mapbox popup
const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: true
  });
  
  // Variable to hold the active country/province on hover
  let lastId;
  
  // Mouse move event
  map.on("mousemove", "circles", e => {
    // Get the id from the properties
    const id = e.features[0].properties.id;
  
    // Only if the id are different we process the tooltip
    if (id !== lastId) {
      lastId = id;
  
      // Change the pointer type on move move
      map.getCanvas().style.cursor = "pointer";
  
      const { cases, deaths, country, province,county,recovered } = e.features[0].properties;
      const coordinates = e.features[0].geometry.coordinates.slice();
  
      // Get all data for the tooltip
      // const countryISO =
      //   lookup.byCountry(country)?.iso2 || lookup.byInternet(country)?.iso2;
  
      const provinceHTML =
        province !== "null" ? `<p>Province: <b>${province}</b></p>` : "";
  
        const cityHTML =
        county !== "null" ? `<p>City: <b>${county}</b></p>` : "";
      const mortalityRate = ((deaths / cases) * 100).toFixed(2);
  
      // const countryFlagHTML = Boolean(countryISO)
      //   ? `<img src="https://www.countryflags.io/flat/${countryISO}/64.png"></img>`
      //   : "";
  
      const HTML = `<p>Country: <b>${country}</b></p>
                ${provinceHTML}
                ${cityHTML}
                <p>Cases: <b>${cases}</b></p>
                <p>Recovered: <b>${recovered}</b></p>
                <p>Deaths: <b>${deaths}</b></p>
                <p>Mortality Rate: <b>${mortalityRate}%</b></p>
               `;
  
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
  
      popup
        .setLngLat(coordinates)
        .setHTML(HTML)
        .addTo(map);
    }
  });
  
  // Mouse leave event
  map.on("mouseleave", "circles", function() {
    // Reset the last Id
    lastId = undefined;
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
      });
    }

    
  }, [data]);

    
    return (
        <div className="App container">
            <div className='container'>
                <h1>Covid-19 Cases</h1>
                < SearchForm />
            </div>
          <div className="mapContainer">
            {/* Assigned Mapbox container */}
            <div className="mapBox" ref={mapboxElRef} />
          </div>
        </div>
      );
    }

export default Search

// class Search extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         lng: 5,
//         lat: 34,
//         zoom: 2
//         };
//     }



    // componentDidMount() {
    //     const map = new mapboxgl.Map({
    //     container: this.mapContainer,
    //     style: 'mapbox://styles/mapbox/streets-v11',
    //     center: [16, 27], // initial geo location
    //     zoom: 2
    //     });
    //     map.on('move', () => {
    //         this.setState({
    //         lng: map.getCenter().lng.toFixed(4),
    //         lat: map.getCenter().lat.toFixed(4),
    //         zoom: map.getZoom().toFixed(2)
    //         });
    //         });
    //     }
    //     render() {
    //         return (
    //         <div>
    //             <h1>Covid Results</h1>
    //         <div className='sidebarStyle'>
    //         <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
    //         </div>
    //         <div ref={el => this.mapContainer = el} className='mapContainer' />
    //         </div>
    //         )
    //         }
    //         }