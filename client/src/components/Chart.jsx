import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styled from '@emotion/styled';

const ChartContainer = styled.div`
  height: 80vh; 
  border: 2px solid #000;
  border-radius: 40px;
  overflow: hidden;
`;

const Chart = ({ type, data }) => {
  const options = {
    chart: {
      type: type,
      backgroundColor: '#333333',
      height: '56%',
    },
    title: {
      text: 'My chart',
    },
    series: [
      {
        data: data,
      },
    ],
  };

  return (
    <ChartContainer>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartContainer>
  );
};

export default Chart;