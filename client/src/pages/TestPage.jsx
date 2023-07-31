import React from 'react'
import SuperInput from '../components/SuperInput.jsx'
import VideoCard from '../components/VideoCard'
import GitHubActivityGraph from '../components/GitHubActivityGraph'

function TestPage() {
    return (
        <>
        <div style={{border:'2px solid #91C8E4', padding:'4px', width:'400px',borderRadius:'4px'}}>
            <SuperInput />
        </div>
        <GitHubActivityGraph />
        </>
    )
}

export default TestPage
