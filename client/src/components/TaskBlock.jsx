import React from 'react'
import { Typography } from '@mui/material'
import styled from "@emotion/styled";
import ProgressBar from "../components/ProgressBar"
import ForwardIcon from '@mui/icons-material/Forward';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from "react-router-dom";

const TaskBlockWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    width: 60vw;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    margin: 20px;
`;

const TaskContent = styled.div`
    width: 30%;
    padding-left:2vw;
`;

const ProgressContent = styled.div`
    width: 40%;
`

const ExpContent = styled.div`
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ButtonWrapper = styled.div`
    width: 100px;
    height: 100%;
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color:white;
`;

function TaskBlock(props) {
    const navigate = useNavigate();
    const { title, text, completed, total, exp, isFinish, unit } = props;
    const handleClick = (isFinish) => {
        if(!isFinish) {
            navigate("/main");
        }
    }
    return (
        <TaskBlockWrapper style={{backgroundColor: isFinish ? '#AAAAAA' : '#FFFFFF'}}>
        <TaskContent>
            <Typography variant="h6">{title}</Typography>
            <Typography>{text}</Typography>
        </TaskContent>
        <ProgressContent>
            <ProgressBar  completed={completed} total={total} unit={unit}/>
        </ProgressContent>
        <ExpContent>
            <Typography variant="h8">{exp} EXP</Typography>
        </ExpContent>
        <ButtonWrapper style={{cursor: isFinish ? 'not-allowed' : 'pointer', backgroundColor: isFinish ? '#444444' : '#F3AA60'}} onClick={() => {handleClick(isFinish)}}>
                
                {isFinish ? 
                <>
                <CheckIcon fontSize="large"/>
                <div>Finished</div>
                </> : 
                <>
                    <ForwardIcon fontSize="large"/>
                    <div>GO TO</div>
                </>
                }
        </ButtonWrapper>
        </TaskBlockWrapper>
    );
}

export default TaskBlock
