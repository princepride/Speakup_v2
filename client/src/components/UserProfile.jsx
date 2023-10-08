import React from 'react'
import styled from '@emotion/styled';

const Container = styled.div`
    height:97%;
    margin-bottom:3%;
    margin-right:0.5%;
    width:49.5%;
    border: 1px solid #ccc;
    border-radius: 40px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    @media (max-width: 1080px) {
        margin-left:0;
        width:100%;
    }
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

function UserProfile() {
    return (
        <Container>
            <TextStyle>UserProfile</TextStyle>
        </Container>
    )
}

export default UserProfile
