import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import SearchForm from './SearchForm'

import '../css/SearchPractice.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiYmluYXJ5YmVhc3QiLCJhIjoiY2tpbTU3cW8xMHE1ZTJycXJkemdjZThmMSJ9.LUCLnUpyYjcUF48GPUEUVQ'

const axios = require('axios')

const SearchPractice = () => {
    const mapContainerRef = useRef(null)

    useEffect(() => {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/light-v10',
          center: [0, 0],
          zoom: 2,
        });

        

        // add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

        // clean up on unmount
        return () => map.remove();
      }, [])

    return(
        <>
            <SearchForm />
            <div className="map-container" ref={mapContainerRef} />
        </>
    )
}

export default SearchPractice