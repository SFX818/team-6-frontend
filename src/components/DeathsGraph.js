import React from 'react'
import { Line } from "react-chartjs-2";

import '../css/CasesGraph.css'

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
            text: "Confirmed Deaths"
          },
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 4
    }

    return(
        <div className="cases-graph col s12">
            <Line data={data} options={options}/>
        </div>
    )
}

export default CasesGraph