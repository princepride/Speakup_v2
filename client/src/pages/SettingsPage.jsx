import React from 'react'
import FriendsGroup from '../components/FriendsGroup'
import UserProfile from '../components/UserProfile'
import AchievementWall from '../components/AchievementWall'

function SettingsPage() {
  return (
    <div style={{display:'flex',flexDirection:'row'}}>
      <div style={{width:'67vw', flexDirection:'column', height: '100vh'}}>
        <div style={{height:'50%'}} >
          <UserProfile />
        </div>
        <div style={{height:'50%'}} >
        <AchievementWall />
        </div>
      </div>
      <div style={{width:'26vw', height: '96vh',margin: '2vh 2vw 2vh 2vw'}}>
        <FriendsGroup />
      </div>
    </div>
  )
}

export default SettingsPage
