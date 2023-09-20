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

    const getTitleForValue = (value) => {
        if (value) {
            return `${value.date.toISOString().split('T')[0]}: ${value.totalDuration} minutes`;
        }
        return '';
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
                return `color-github-${Math.ceil(value.totalDuration/10)}`;
            }}
            titleForValue={getTitleForValue} // 添加这一行
            onClick={handleClick}
        />
    );
}