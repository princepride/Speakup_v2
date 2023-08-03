import React from 'react';
import styled from '@emotion/styled';
import { Tabs, Tab } from '@mui/material';
import TaskBlock from '../components/TaskBlock';

const MainContainer = styled.div`
    height: 80vh; 
    margin-top:4vh;
    margin-left:8vw;
    margin-right:8vw;
    border: 1px solid #ccc;
    border-radius: 40px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
`

const TasksPage = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainContainer>
        <Tabs value={value} onChange={handleChange} aria-label="Tasks tabs">
            <Tab label="Daily Tasks" />
            <Tab label="Weekly Tasks" />
        </Tabs>
        {value === 0 && <div>
            <TaskBlock title={'熟能生巧'} text={'练习Paraphrase 15分钟'} completed={7} total={15} exp={5} isFinish={false}/>
            <TaskBlock title={'轻车简从'} text={'练习Zh-En 15分钟'} completed={15} total={15} exp={5} isFinish={true}/>
            </div>}
        {value === 1 && <div>
            <TaskBlock title={'金石可镂'} text={'一周全勤'} completed={3} total={7} exp={30} isFinish={false}/>
            </div>}
        </MainContainer>
    );
}

export default TasksPage
