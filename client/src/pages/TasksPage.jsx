import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import { Tabs, Tab } from '@mui/material';
import TaskBlock from '../components/TaskBlock';
import { getTasks } from '../utils/connect';
import { useStateContext } from '../contexts/ContextProvider';

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

const FooterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 12vh;
    left: 0;
    width: 100%;
    height: 50px;
    font-style: italic;
    color: #aaaaaa
`

const TasksPage = () => {
    const [value, setValue] = useState(0);
    const language = 'En';
    const [tasks, setTasks] = useState({});
    const { userId } = useStateContext();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchStatisticData = async () => {
            try {
                const response = await getTasks(userId);
                console.log(response)
                setTasks(response.tasks);
            } catch(error) {
                console.error(error);
            }
        };
        fetchStatisticData();
    }, []);

    return (
        <MainContainer>
        <Tabs value={value} onChange={handleChange} aria-label="Tasks tabs">
            <Tab label="Daily Tasks" />
            <Tab label="Weekly Tasks" />
        </Tabs>
        {value === 0 && <div>
            {tasks.dailyTasks && tasks.dailyTasks.map((item, index) => {
                let unit = "minutes"
                if(item.task_id === "D000") {
                    unit=""
                }
                if(language === 'Zh') {
                    return <TaskBlock key={index} title={item.name_zh} text={item.description_zh} completed={item.completed} total={item.total} exp={item.exp} isFinish={item.isFinish} unit={unit}/>
                }
                else if(language === 'En'){
                    return <TaskBlock key={index} title={item.name_en} text={item.description_en} completed={item.completed} total={item.total} exp={item.exp} isFinish={item.isFinish} unit={unit}/>
                }
                else {
                    return <TaskBlock key={index} title={item.name_en} text={item.description_en} completed={item.completed} total={item.total} exp={item.exp} isFinish={item.isFinish} unit={unit}/>
                }
            })}
            <FooterContainer>
                Update tasks every day at 0:00 a.m.
            </FooterContainer>
            </div>}
        {value === 1 && <div>
            {tasks.weeklyTasks && tasks.weeklyTasks.map((item, index) => {
                if(language === 'Zh') {
                    return <TaskBlock key={index} title={item.name_zh} text={item.description_zh} completed={item.completed} total={item.total} exp={item.exp} isFinish={item.isFinish} unit=""/>
                }
                else {
                    return <TaskBlock key={index} title={item.name_en} text={item.description_en} completed={item.completed} total={item.total} exp={item.exp} isFinish={item.isFinish} unit=""/>
                }
            })}
            <FooterContainer>
            Update tasks every Monday at 0:00 a.m.
            </FooterContainer>
            </div>}
        </MainContainer>
    );
}

export default TasksPage
