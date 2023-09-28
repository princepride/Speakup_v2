import React from 'react'
import styled from '@emotion/styled';


const Container = styled.div`
    height: 12%; 
    width: 92%;
    margin:4%;
    border: 1px solid #ccc;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
`
function FriendProfile(props) {
  const { name, title, status } = props
  
  return (
    <Container>
        {name}
    </Container>
  )
}

export default FriendProfile
