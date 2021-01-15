import React from "react";

const SearchPopup = ({ feature }) => {
  const { id, country, province, county, cases, deaths, recovered } = feature.properties;  

  return (
    <div id={`popup-${id}`}>
      <>
      {/* yes, apparently 'null' is a string here */}
        {county!='null' ? (
            <h6>{county}, {province}, {country}</h6>
        ) : (
            <h6>{province}, {country}</h6>
        )}
      <p>Cases: {cases}</p>
      <p>Deaths: {deaths}</p>
      </>
    </div>
  );
};

export default SearchPopup;