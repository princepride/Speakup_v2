import React from 'react'
import styled from '@emotion/styled';

const Container = styled.div`
    height:98%;
    margin-bottom:2%;
    width:50%;
    border: 1px solid #ccc;
    border-radius: 40px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
`

const TextStyle = styled.div`
    background-image: linear-gradient(90deg,#2e4f8b 0%,#3e589d 35%,#8f619b 60%,#d0718f 70%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 36px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    margin-bottom: 2vh;
    margin-top: 2vh;
`;

function APISetting() {
  return (
    <Container>
        <TextStyle>APISetting</TextStyle>
    </Container>
  )
}

export default APISetting
