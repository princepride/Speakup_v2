import React from 'react'
import { useStateContext } from "../contexts/ContextProvider"
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const StyledContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

function CopyButton() {
    const {subSubtitles, subSubtitlesIndex, userSubSubtitles} = useStateContext()

    const handleCopyClick = async () => {
        const originalText = `Original Text: ${subSubtitles[subSubtitlesIndex].text}`;
        const paraphraseText = `Target Text: ${userSubSubtitles[subSubtitlesIndex]}`;
        const promptText = `${originalText}\n\n${paraphraseText}\n\nPlease provide a score for the paraphrase, and explain your rating considering various dimensions such as accuracy, grammatical complexity and coherence. Please answer the question by Chinese`;
        try {
            await navigator.clipboard.writeText(promptText)
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    return (
        <StyledContainer>
            {
                userSubSubtitles[subSubtitlesIndex] !== "" &&
                <Button 
                style={{'marginTop': '8px','width': '6rem', 'marginLeft': 'auto'}}
                variant="contained" 
                onClick={handleCopyClick}>
                    Copy
                </Button>
            }
        </StyledContainer>
    )
}

export default CopyButton