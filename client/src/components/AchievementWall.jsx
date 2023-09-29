import React from 'react'
import styled from '@emotion/styled';
import { Grid, Box } from "@mui/material";
import { useStateContext } from '../contexts/ContextProvider';
import Achievement from './Achievement';

const Container = styled.div`
    height:100%;
    width:100%;
    border: 1px solid #ccc;
    border-radius: 40px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
`

const TextStyle = styled.div`
    background-image: linear-gradient(90deg,#2e4f8b 0%,#3e589d 35%,#8f619b 60%,#d0718f 70%);
    height:auto;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 2vh;
    margin-top: 2vh;
`;

const ScrollBox = styled(Box)({
  height: "100%",
  width: "100%",
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

function AchievementWall() {
  const { achievementList } = useStateContext();
  return (
    <Container>
      <TextStyle>AchievementWall</TextStyle>
      <ScrollBox>
        <Grid container spacing={2}>
        {achievementList.map((achievement, index) => (
          <Grid item xs={6} md={4} lg={3} key={index}>
            <Achievement 
              achievement = {achievement}
            />
          </Grid>
        ))}
      </Grid>
      </ScrollBox>
    </Container>
  )
}

export default AchievementWall
