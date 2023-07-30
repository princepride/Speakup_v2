import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Chart = ({ type, data }) => {
  const options = {
    chart: {
      type: type,
      backgroundColor: '#333333', 
    },
    title: {
      text: 'My chart'
    },
    series: [{
      data: data
    }]
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}

export default Chart