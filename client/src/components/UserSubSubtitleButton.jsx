import React, {useState} from 'react'
import styled from "@emotion/styled";

const StyledContainer = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
    padding: 10px;
    border: 1px solid #B2B2B2;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    border-radius: 10px; // 增加圆角
    font-style: italic; // 设置字体为斜体
    font-size: 1em; // 设置字体大小
    font-family: Georgia, serif; // 设置字体家族
    color: #000000;
`;

const UserSubSubtitleButton = (props) => {
    const {title, text, index} = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(text);

    const textToSpeech = (text) => {
        const match = text.match(/^[^\u4e00-\u9fa5]*/);
        const newText = match ? match[0] : '';
    
        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[0]; // 注意: 一些浏览器可能需要稍微等待语音列表加载完毕
        msg.text = newText;
        speechSynthesis.speak(msg);
    }

    const handleLeftClick = () => {
        textToSpeech(text)
    }

    const handleRightClick = (e) => {
        e.preventDefault(); // Prevent the browser context menu from showing up
    }

    const handleDoubleClick = () => {
        setIsEditing(true);
      };
    
      const handleBlur = () => {
        setIsEditing(false);
        // 可以在这里执行保存编辑后的文本的操作
      };
    
      const handleInputChange = (e) => {
        setEditedText(e.target.value);
      };

    return (
        text !== "" &&
        <StyledContainer
            style={{ cursor: 'pointer', whiteSpace: 'pre-line' }}
            onClick={handleLeftClick}
            onContextMenu={handleRightClick}
            onDoubleClick={handleDoubleClick}
            >
            {isEditing ? (
                <textarea
                style={{"width":"100%"}}
                value={editedText}
                onChange={handleInputChange}
                onBlur={handleBlur}
                autoFocus
                />
            ) : (
                <div>
                {title}
                <br />
                {text}
                </div>
            )}
        </StyledContainer>
    )
}

export default UserSubSubtitleButton