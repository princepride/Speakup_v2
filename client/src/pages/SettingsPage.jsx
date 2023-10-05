import React from 'react'
import FriendsGroup from '../components/FriendsGroup'
import UserProfile from '../components/UserProfile'
import APISetting from '../components/APISetting'
import AchievementWall from '../components/AchievementWall'

function SettingsPage() {
  return (
    <div style={{display:'flex',flexDirection:'row'}}>
      <div style={{width:'74vw', flexDirection:'column', height: '92vh', margin: '2vh 1vw 2vh 1vw'}}>
        <div style={{height:'40%', display:'flex',flexDirection: 'row'}} >
          <UserProfile />
          <APISetting />
        </div>
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
