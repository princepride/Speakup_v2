import styled from '@emotion/styled';
import React from 'react';

const ProgressBarContainer = styled.div`
    width: 100%;
    background-color: #eee;
    border-radius: 10px;   
    height: 20px;
    position: relative;
`;

const Progress = styled.div`
    background-image: linear-gradient(90deg,#2e4f8b 0%,#3e589d 35%,#8f619b 60%,#d0718f 70%);
    height: 100%;
    width: ${props => (props.completed / props.total) * 100}%;
    border-radius: 10px;   
`;

const ProgressText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    font-weight: bold;
`;

const ProgressBar = ({ completed, total, unit }) => (
    <ProgressBarContainer>
        <Progress completed={completed} total={total} />
        <ProgressText>{`${completed}/${total} ${unit}`}</ProgressText>
    </ProgressBarContainer>
);

export default ProgressBar