import React from 'react'
import SuperInput from '../components/SuperInput.jsx'
import VideoCard from '../components/VideoCard'

function TestPage() {
    return (
        <>
        <div style={{border:'2px solid #91C8E4', padding:'4px', width:'400px',borderRadius:'4px'}}>
            <SuperInput />
        </div>
        <VideoCard
            youtube_id="oLcjVwpsOrY"
            youtube_name="TestTestTest"
            youtube_duration="00:01:30"
        ></VideoCard>
        </>
    )
}

export default TestPage
