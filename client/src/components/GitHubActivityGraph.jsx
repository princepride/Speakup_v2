import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

export default function GitHubActivityGraph(props) {
    const { values, setDate} = props

    const handleClick = (value) => {
        if (value) {
            setDate(value.date);
        } else {
            setDate(new Date(0));
        }
    }

    return (
        <CalendarHeatmap
        startDate={new Date('2023-01-01')}
        endDate={new Date('2023-12-31')}
        values={values}
        classForValue={(value) => {
            if (!value) {
            return 'color-empty';
            }
            return `color-github-${value.count}`;
        }}
        onClick={handleClick}
        />
    );
}