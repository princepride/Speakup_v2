import React from 'react'
import FriendsGroup from '../components/FriendsGroup'
import UserProfile from '../components/UserProfile'
import AchievementWall from '../components/AchievementWall'

function SettingsPage() {
  return (
    <div style={{display:'flex',flexDirection:'row'}}>
      <div style={{width:'72vw', flexDirection:'column', height: '96vh', margin: '2vh 2vw 2vh 2vw'}}>
        <div style={{height:'40%'}} >
          <UserProfile />
        </div>
        <div style={{height:'60%'}} >
        <AchievementWall />
        </div>
      </div>
      <div style={{width:'15vw', height: '96vh',margin: '2vh 2vw 2vh 2vw'}}>
        <FriendsGroup />
      </div>
    </div>
  )
}

export default SettingsPage
