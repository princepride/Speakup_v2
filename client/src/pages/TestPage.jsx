import React from 'react'
import SuperInput from '../components/SuperInput.jsx'
import VideoCard from '../components/VideoCard'
import GitHubActivityGraph from '../components/GitHubActivityGraph'
import TaskBlock from '../components/TaskBlock'

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
        //<>
        //<div style={{border:'2px solid #91C8E4', padding:'4px', width:'400px',borderRadius:'4px'}}>
        //    <SuperInput />
        //</div>
        //<GitHubActivityGraph values={randomn(365)}/>
        //<TaskBlock title={'熟能生巧'} text={'练习Paraphrase 15分钟'} exp={5} isFinish={true}/>
        //</>
        <div style={{border:'2px solid #91C8E4', padding:'4px', width:'250px',borderRadius:'4px'}}>
            <SuperInput />
        </div>
    )
}

export default TestPage
