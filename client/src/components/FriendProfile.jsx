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
    padding: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
`

const NameContainer = styled.div`
  flex:1;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: lightblue;
`

function FriendProfile(props) {
  const { name, title, status } = props
  
  return (
    <Container>
      <div style={{width:'100%', display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <NameContainer>{name}</NameContainer>
        <div style={{flex:1, flexDirection:'column'}}>
          <div>{name}</div>
          <div>{title}</div>
        </div>
        <div style={{flex:1}}>
          {status}
        </div>
      </div>
    </Container>
  )
}

export default FriendProfile
