import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

//function randomn(n) {
//    let rnd = [];
//    for (let i = 0; i < n; i++) {
//        rnd.push({
//        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
//        count: Math.floor(Math.random() * 4),
//        });
//    }
//    return rnd;
//}

export default function GitHubActivityGraph(props) {
    const { values, setDate } = props

    const handleClick = (value) => {
        if (value) {
            console.log(value.date);
            setDate(value.date);
        } else {
            console.log(new Date(0));
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