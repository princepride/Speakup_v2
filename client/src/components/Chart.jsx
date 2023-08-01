import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Chart = ({ type, data, title }) => {
  const options = {
    chart: {
      type: type,
    },
    title: {
      text: title,
    },
    series: [
      {
        data: data,
      },
    ],
  };

  return (
      <HighchartsReact highcharts={Highcharts} options={options} />
  );
};

export default Chart;