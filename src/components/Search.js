// import React from "react"
import React, { useRef, useEffect } from "react";
// import useSWR from "swr";

//import component
import SearchForm from "./SearchForm";


const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');


mapboxgl.accessToken = 'pk.eyJ1IjoiYmluYXJ5YmVhc3QiLCJhIjoiY2tpbTU3cW8xMHE1ZTJycXJkemdjZThmMSJ9.LUCLnUpyYjcUF48GPUEUVQ';

const Search = () => {
    
    const mapboxElRef = useRef(null);
    
    useEffect(() => {
        // You can store the map instance with useRef too
        const map = new mapboxgl.Map({
          container: mapboxElRef.current,
          // temperory styling
          style: "mapbox://styles/binarybeast/ckjbvkxi151ce1ao2552nc7bn",
          center: [16, 27], // initial geo location
          zoom: 1.5 // initial zoom
        });

        map.addControl(new mapboxgl.NavigationControl());
  
    }, []);

    
    return (
        <div className="App">
            <div>
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
export default Search

