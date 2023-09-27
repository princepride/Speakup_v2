import React from 'react'
import styled from '@emotion/styled';

const Container = styled.div`
    height: 96%; 
    width: 96%;
    margin:4%;
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
function FriendProfile() {
  return (
    <Container>
      FriendProfile
    </Container>
  )
}

export default FriendProfile
