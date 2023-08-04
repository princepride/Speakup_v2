import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import { Tabs, Tab } from '@mui/material';
import TaskBlock from '../components/TaskBlock';
import { getTasks } from '../utils/connect';

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
    const [value, setValue] = useState(0);
    const language = 'En';
    const [tasks, setTasks] = useState({
        //dailyTasks:[
        //    {"task_id": "D000", "name_en": "Dawn's Blessing", "name_zh": "黎明祝福", "description_en": "First practice of the day", "description_zh": "每日第一次练习", "exp": 5, "completed":7, "total": 15, "isFinish":false},
        //    {"task_id": "D001", "name_en": "Paraphrase Oracle", "name_zh": "释义神谕", "description_en": "15 minutes of Paraphrase practice", "description_zh": "练习Paraphrase 15分钟", "exp": 5, "completed":7, "total": 15, "isFinish":false},
        //    {"task_id": "D002", "name_en": "Seque Sorcery", "name_zh": "顺接巫术", "description_en": "15 minutes of Seque practice", "description_zh": "练习Seque 15分钟", "exp": 5, "completed":15, "total": 15, "isFinish":true},
        //],
        //weeklyTasks:[
        //    {"task_id": "W000", "name_en": "Week of the Phoenix", "name_zh": "凤凰之周", "description_en": "Practicing every day of the week", "description_zh": "一周每天都练习过", "exp": 30, "completed":2, "total": 7, "isFinish":false},
        //    {"task_id": "W001", "name_en": "Gauntlet of the Griffin", "name_zh": "狮鹫试炼", "description_en": "Completing all daily tasks in a week", "description_zh": "完成一周所有的每日任务", "exp": 100, "completed":7, "total": 21, "isFinish":false},
        //]
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchStatisticData = async () => {
            try {
                const response = await getTasks();
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
                if(language == 'Zh') {
                    return <TaskBlock key={index} title={item.name_zh} text={item.description_zh} completed={item.completed} total={item.total} exp={item.exp} isFinish={item.isFinish} unit={unit}/>
                }
                else if(language == 'En'){
                    return <TaskBlock key={index} title={item.name_en} text={item.description_en} completed={item.completed} total={item.total} exp={item.exp} isFinish={item.isFinish} unit={unit}/>
                }
                else {
                    return <TaskBlock key={index} title={item.name_en} text={item.description_en} completed={item.completed} total={item.total} exp={item.exp} isFinish={item.isFinish} unit={unit}/>
                }
            })}
            </div>}
        {value === 1 && <div>
            {tasks.weeklyTasks && tasks.weeklyTasks.map((item, index) => {
                if(language == 'Zh') {
                    return <TaskBlock key={index} title={item.name_zh} text={item.description_zh} completed={item.completed} total={item.total} exp={item.exp} isFinish={item.isFinish} unit=""/>
                }
                else {
                    return <TaskBlock key={index} title={item.name_en} text={item.description_en} completed={item.completed} total={item.total} exp={item.exp} isFinish={item.isFinish} unit=""/>
                }
            })}
            </div>}
        </MainContainer>
    );
}

export default TasksPage
