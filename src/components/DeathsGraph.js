import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";



const CasesGraph = ({dates, deaths}) => {
    const data = {
        labels: dates,
        datasets: [
          {
            label: "Confirmed Deaths",
            data: deaths,
            fill: true,
            backgroundColor: "rgba(255,0,0,0.2)",
            borderColor: "rgba(255,0,0,1)"
          }
        ]
      };
    
    const options = {
        title: {
            display: true,
            text: "Confirmed Cases"
          }
    }

    return(
        <div className="cases-graph">
            <Line data={data} options={options}/>
        </div>
    )
}

export default CasesGraph