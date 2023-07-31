import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

function randomn(n) {
  let rnd = [];
  for (let i = 0; i < n; i++) {
    rnd.push({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 4),
    });
  }
  return rnd;
}

export default function GitHubActivityGraph() {
  return (
    <CalendarHeatmap
      startDate={new Date('2023-01-01')}
      endDate={new Date('2023-12-31')}
      values={randomn(365)}
      classForValue={(value) => {
        if (!value) {
          return 'color-empty';
        }
        return `color-github-${value.count}`;
      }}
    />
  );
}