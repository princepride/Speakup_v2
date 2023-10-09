import React, { useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import styled from '@emotion/styled';

const StyledGithubGroup = styled.div`
    margin-top: 1vh;
    display: flex;
    flex-direction: row;
    @media (max-width: 1080px) {
        flex-direction: column;
    }
`

const StyledGithub = styled.div`
    width: calc(98% - 6rem);
    @media (max-width: 1080px) {
        width: 100%;
    }
`

const StyledSelect = styled(Select)`
    width: 6rem;
    height: 2.5rem;
`;

export default function GitHubActivityGraph(props) {
    const { values, setDate} = props
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleChangeYear = (event) => {
        setSelectedYear(event.target.value);
    }

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
        <StyledGithubGroup>
            <StyledSelect
                labelId="year-select-label"
                id="year-select"
                value={selectedYear}
                onChange={handleChangeYear}
            >
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
            </StyledSelect>
            <StyledGithub>
                <CalendarHeatmap
                    startDate={new Date(`${selectedYear}-01-01`)}
                    endDate={new Date(`${selectedYear}-12-31`)}
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
            </StyledGithub>
        </StyledGithubGroup>
    );
}