import React from 'react'
import SuperInput from '../components/SuperInput.jsx'
import VideoCard from '../components/VideoCard'
import GitHubActivityGraph from '../components/GitHubActivityGraph'

function randomn(n) {
    let rnd = [];
    for (let i = 0; i < n; i++) {
        rnd.push({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
        count: Math.floor(Math.random() * 4),
        });
    }
    return rnd;
}

function TestPage() {
    return (
        <>
        <div style={{border:'2px solid #91C8E4', padding:'4px', width:'400px',borderRadius:'4px'}}>
            <SuperInput />
        </div>
        <GitHubActivityGraph values={randomn(365)}/>
        </>
    )
}

export default TestPage
