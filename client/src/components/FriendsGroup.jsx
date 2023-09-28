import React from 'react'
import styled from '@emotion/styled';
import FriendProfile from './FriendProfile';
import { Grid, Box } from "@mui/material";
import { useStateContext } from '../contexts/ContextProvider';

const Container = styled.div`
    height:100%;
    width:100%;
    border: 1px solid #ccc;
    border-radius: 40px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
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
    font-size: 24px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    margin-bottom: 2vh;
    margin-top: 2vh;
`;

const ScrollBox = styled(Box)({
    height: "100%",
    width:"100%",
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
        width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: "2px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
        background: "#555",
    },
  });

function FriendsGroup() {
    const { friendList } = useStateContext();
    return (
        <Container>
            <TextStyle>FriendsGroup</TextStyle>
            <ScrollBox>
                {
                    friendList.map((friend,index) => 
                        <FriendProfile 
                            key={index}
                            name={friend.name}
                            title={friend.title}
                            status={friend.status}
                        />
                    )
                }
            </ScrollBox>
        </Container>
    )
}

export default FriendsGroup
