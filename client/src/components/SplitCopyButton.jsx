import React, { useState, useRef, useEffect } from 'react';
import { Button, ButtonGroup, Grow, Paper, ClickAwayListener, Popper, MenuItem, MenuList, TextField} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import config_data from '../assets/data/config_data.json';
import { useStateContext } from '../contexts/ContextProvider';
import styled from "@emotion/styled";
import { chatGPT } from "../utils/connect.js"

const StyledContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

const StyledContainer2 = styled.div`
    display: flex;
    flex-direction: column;
`

const copy_button_config = config_data.copy_button_config

export default function SplitButton(props) {
  const {disclickable} = props
  const [open, setOpen] = useState(false);
  const [extraInfo, setExtraInfo] = useState("");
  const [inputValue, setInputValue] = useState();
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {
    userId,
    subSubtitles, 
    subSubtitlesIndex, 
    userSubSubtitles, 
    chatGPTResponse, 
    setChatGPTResponse, 
    model,
    setVisible,
    setLoopBody,
    setLoopIndex} = useStateContext()

useEffect(() => {
    setExtraInfo(copy_button_config[selectedIndex].extra_info)
}, [selectedIndex])

const handleInputChange = (event) => {
    setInputValue(event.target.value);
};

const handleClick = async () => {
    let systemContent = copy_button_config[selectedIndex].prompts;

    let promptText = [
        {"role": "system", "content": extraInfo === "" ? systemContent: systemContent.replace(`{{${extraInfo}}}`,inputValue)},
    ]
    if(copy_button_config[selectedIndex].has_memory){
        for(let i = Math.max(0, userSubSubtitles[subSubtitlesIndex].length - 3); i < userSubSubtitles[subSubtitlesIndex].length; i++) {
            promptText.push({"role": "user", "content": userSubSubtitles[subSubtitlesIndex][i].text})
            if(i < userSubSubtitles[subSubtitlesIndex].length - 1) {
                promptText.push({"role": "assistant", "content": chatGPTResponse[subSubtitlesIndex][i].text});
            }
        }
    }
    else{
        if(copy_button_config[selectedIndex].use_original_text) {
            promptText.push({"role": "user", "content": `Original Text: ${subSubtitles[subSubtitlesIndex].text}\n\n${copy_button_config[selectedIndex].output_key_words}: ${userSubSubtitles[subSubtitlesIndex][userSubSubtitles[subSubtitlesIndex].length-1].text}`})
        }
        else {
            promptText.push({"role": "user", "content": userSubSubtitles[subSubtitlesIndex][userSubSubtitles[subSubtitlesIndex].length-1].text})
        }
    }
    // model: gpt-4, gpt-3.5-turbo, text-moderation-playground
    setVisible(true);
    setLoopBody(["Generating","Generating.","Generating..","Generating..."]);
    setLoopIndex(0);
    if(userSubSubtitles[subSubtitlesIndex].length > chatGPTResponse[subSubtitlesIndex].length) {
        //const id = chatGPTResponse[subSubtitlesIndex][chatGPTResponse[subSubtitlesIndex].length-1].id
        const sub_subtitle_id = subSubtitles[subSubtitlesIndex].id
        const mission_type = copy_button_config[selectedIndex].button_name
        chatGPT(userId, 'insert', 0, sub_subtitle_id, mission_type, model, promptText)
        .then(data => {
            setVisible(false);
            const newChatGPTResponse = [...chatGPTResponse]
            newChatGPTResponse[subSubtitlesIndex].push({'id':data.id, 'text':data.text})
            setChatGPTResponse(newChatGPTResponse)
        })
        .catch(error => {
            console.error(error);
        })
    } 
    else {
        const id = chatGPTResponse[subSubtitlesIndex][chatGPTResponse[subSubtitlesIndex].length-1].id
        const sub_subtitle_id = subSubtitles[subSubtitlesIndex].id
        const mission_type = copy_button_config[selectedIndex].button_name
        chatGPT(userId, 'update', id, sub_subtitle_id, mission_type, model, promptText)
        .then(data => {
            setVisible(false);
            const newChatGPTResponse = [...chatGPTResponse]
            newChatGPTResponse[subSubtitlesIndex][newChatGPTResponse[subSubtitlesIndex].length-1]={'id':data.id, 'text':data.text}
            setChatGPTResponse(newChatGPTResponse)
        })
        .catch(error => {
            console.error(error);
        })
    }
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
//
return (
    <StyledContainer2>
    <StyledContainer>
    {
        userSubSubtitles[subSubtitlesIndex] !== "" &&
        <React.Fragment>
        <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
            {/* <Button size="small" title={copy_button_config[selectedIndex].button_name} onClick={handleClick} disabled={disclickable}>{copy_button_config[selectedIndex].button_name}</Button>
             */}
            <Button style={{width: "7rem",fontSize:"0.8rem"}} title={copy_button_config[selectedIndex].button_name} onClick={handleClick} disabled={disclickable}>{copy_button_config[selectedIndex].button_name}</Button>
            <Button
                size="small"
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}
            >
            <ExpandMoreIcon />
            </Button>
        </ButtonGroup>
        <Popper
            sx={{
            zIndex: 1,
            }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
        >
            {({ TransitionProps, placement }) => (
            <Grow
                {...TransitionProps}
                style={{
                    transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
            >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                        {copy_button_config.map((option, index) => (
                        <MenuItem
                            key={index}
                            //disabled={index === 2}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                            style={{fontSize:"0.8rem"}}
                        >
                            {option.button_name.toUpperCase()}
                        </MenuItem>
                        ))}
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Grow>
            )}
        </Popper>
        </React.Fragment>
    }
    </StyledContainer>
        {
            extraInfo !== "" && 
            <TextField
                label = {extraInfo}
                variant="outlined"
                value={inputValue}
                onChange={handleInputChange}
                size="small"
            />
        }
    </StyledContainer2>
    );
}