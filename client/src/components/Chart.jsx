import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Chart = ({ type, data, title, categories, seriesNames, yAxisTitle }) => {
  const options = {
    chart: {
      type: type,
    },
    title: {
      text: title,
      align: 'left'
    },
    plotOptions: {
      bar: {
          borderRadius: '50%',
          dataLabels: {
          enabled: true
          },
          groupPadding: 0.1
      },
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
    shadow: true
    },
    credits: {
    enabled: false
    },
    series: data.map((dataItem, index) => ({
      name: seriesNames[index],
      data: dataItem,
    })),
  };

  if (type !== 'pie') {
    options.xAxis = {
      categories: categories,
      title: {
        text: null
      },
      gridLineWidth: 1,
      lineWidth: 0
    };
    options.yAxis = {
      min: 0,
      title: {
        text: yAxisTitle,
        align: 'high',
        //textAlign: 'center'
      },
      labels: {
        overflow: 'justify'
      },
      gridLineWidth: 0
    };
    options.tooltip = {
      valueSuffix: ' millions'
    };
  }

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
};

export default Chart;