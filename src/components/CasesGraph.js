import React from 'react'
import { Line } from "react-chartjs-2";

import '../css/CasesGraph.css'

const CasesGraph = ({dates, cases}) => {
    const data = {
        labels: dates,
        datasets: [
          {
            label: "Confirmed Cases",
            data: cases,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          }
        ]
      };
    
    const options = {
        title: {
            display: true,
            text: "Confirmed Cases"
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