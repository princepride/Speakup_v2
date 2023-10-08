import React from 'react'
import FriendsGroup from '../components/FriendsGroup'
import UserProfile from '../components/UserProfile'
import APISetting from '../components/APISetting'
import AchievementWall from '../components/AchievementWall'
import styled from "@emotion/styled";

const StyledProfileAPI = styled.div`
  height: 40%;
  display: flex;
  flex-direction: row;
  @media (max-width: 1080px) {
    flex-direction: column;
  }
`

function SettingsPage() {
  return (
    <div style={{display:'flex',flexDirection:'row'}}>
      <div style={{width:'74vw', flexDirection:'column', height: '92vh', margin: '2vh 1vw 2vh 1vw'}}>
        <StyledProfileAPI>
          <UserProfile />
          <APISetting />
        </StyledProfileAPI>
        <div style={{height:'60%'}} >
        <AchievementWall />
        </div>
      </div>
      <div style={{width:'17vw', height: '92vh',margin: '2vh 1vw 2vh 1vw'}}>
        <FriendsGroup />
      </div>
    </div>
  )
}

export default SettingsPage
