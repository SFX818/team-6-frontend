// import React, { useRef, useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';


// mapboxgl.accessToken = 'pk.eyJ1IjoiYmluYXJ5YmVhc3QiLCJhIjoiY2tpbTU3cW8xMHE1ZTJycXJkemdjZThmMSJ9.LUCLnUpyYjcUF48GPUEUVQ';

// const Search = () => {
//   const mapContainerRef = useRef(null);

//   // initialize map when component mounts
//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       // See style options here: https://docs.mapbox.com/api/maps/#styles
//       style: 'mapbox://styles/binarybeast/ckjdljfpu6smv1ao028dmjh4r',
//       center: [-104.9876, 39.7405],
//       zoom: 12.5,
//     });

//     // add navigation control (the +/- zoom buttons)
//     map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

//     // clean up on unmount
//     return () => map.remove();
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   return <div 
//             className="map-container" ref={mapContainerRef} 
//         />;
// };

// export default Search;