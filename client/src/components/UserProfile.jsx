import React from 'react'
import styled from '@emotion/styled';

const Container = styled.div`
    height:98%;
    margin-bottom:2%;
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
function UserProfile() {
    return (
        <Container>
            UserProfile
        </Container>
    )
}

export default UserProfile
