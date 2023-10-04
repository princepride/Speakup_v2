import React from 'react'
import { Select, MenuItem } from '@mui/material';
import styled from '@emotion/styled';
import {useStateContext} from '../contexts/ContextProvider';
import DeleteSubSubtitleButton from './DeleteSubSubtitleButton'
import SubSubtitleButton from './SubSubtitleButton'
import UserSubtitleButton from './UserSubSubtitleButton'
import SplitCopyButton from './SplitCopyButton'

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 66vh;
    overflow-y: auto;
    padding-top: 1rem;

    @media screen and (max-width: 1080px) {
        height: 50vh;
    }
`

const StyledSelect = styled(Select)`
    width: 10rem;
    height: 2.5rem;
`;

const StyledController = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledModel = styled.div`
    display:flex;
    justify-content: space-between;
    margin-top:0.5rem;
`

const StyledModelSelect = styled(Select)`
    width: 9rem;
    height: 2.5rem;
`

function SubtitleSelector() {
    const {subSubtitles, subSubtitlesIndex, setSubSubtitlesIndex, userSubSubtitles, chatGPTResponse, model, setModel} = useStateContext();
    const handleChange = (event) => {
        setSubSubtitlesIndex(event.target.value);
    };

    const handleModelChange = (event) => {
        setModel(event.target.value);
    }

    return (
        <>
            <StyledController>
                <StyledSelect
                    value={subSubtitlesIndex}
                    onChange={handleChange}
                >
                    {
                    subSubtitles.map((item, index) => 
                    (<MenuItem key={index} value={index}>Sub-Subtitle {index + 1}</MenuItem>)
                    )}
                </StyledSelect>
                <DeleteSubSubtitleButton />
            </StyledController>
            <StyledContainer>
                <SubSubtitleButton />
                {userSubSubtitles[subSubtitlesIndex].map((subtitle, i) => (
                    <React.Fragment key={i}>
                        <UserSubtitleButton title="Your Record :" text={subtitle.text} index={i}/>
                        {chatGPTResponse[subSubtitlesIndex][i] && (
                        <UserSubtitleButton
                            title="AI Response :"
                            text={chatGPTResponse[subSubtitlesIndex][i].text}
                            index={i}
                        />
                        )}
                    </React.Fragment>
                ))}
            </StyledContainer>
                {
                    userSubSubtitles[subSubtitlesIndex].length > 0 &&
                    <StyledModel>
                        <StyledModelSelect
                            value={model}
                            onChange={handleModelChange}
                        >
                            <MenuItem value={"gpt-3.5-turbo"}>gpt-3.5-turbo</MenuItem>
                            <MenuItem value={"gpt-4"}>gpt-4</MenuItem>
                            {/*<MenuItem value={"text-moderation-playground"}>text-moderation-playground</MenuItem>*/}
                            {/*<MenuItem value={"text-davinci-002-render-sha"}>text-davinci-002-render-sha</MenuItem>*/}
                        </StyledModelSelect>
                        <SplitCopyButton />
                    </StyledModel>
                }
        </>
    )
}

export default SubtitleSelector