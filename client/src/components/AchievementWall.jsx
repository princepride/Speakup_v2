import React from 'react'
import styled from '@emotion/styled';

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

function AchievementWall() {
  return (
    <Container>
      AchievementWall
    </Container>
  )
}

export default AchievementWall
