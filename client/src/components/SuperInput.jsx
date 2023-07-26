//import React, { useRef, useEffect } from 'react'

//const SuperInput = () => {
//    const divRef = useRef(null);

//    const adjustHeight = () => {
//        if (divRef.current) {
//            divRef.current.style.height = 'auto';
//            divRef.current.style.height = `${divRef.current.scrollHeight}px`;
//        }
//    };

//    useEffect(() => {
//        adjustHeight();
//    });

//    return (
//        <div
//            rows = "1"
//            contentEditable
//            ref={divRef}
//            style={{
//                minHeight: '1em', // 设置最小高度以确保 div 至少有一行的高度
//                fontSize: '16px',
//                overflowY: 'hidden',
//                resize: 'none',
//                whiteSpace: 'pre-wrap', // 保证换行和空格可以被正确显示
//                border: '1px solid black', // 添加边框
//                padding: '2px', // 添加内边距
//            }}
//            onInput={adjustHeight}
//        />
//    );
//}

//export default SuperInput

//import React, { useState, useRef, useEffect } from 'react';
//import { Editor, EditorState, RichUtils, CompositeDecorator, convertToRaw, convertFromRaw, ContentBlock, ContentState, Modifier } from 'draft-js';

//const ButtonComponent = (props) => {
//    const { url, name } = props.contentState.getEntity(props.entityKey).getData();
//    return <button 
//                style={{margin: '0 2px'}} // 添加左右间距
//                onClick={() => window.open(url, '_blank')}
//            >
//                {name}
//            </button>;
//    };

//    const findButtonEntities = (contentBlock, callback, contentState) => {
//    contentBlock.findEntityRanges(
//        (character) => {
//        const entityKey = character.getEntity();
//        return (
//            entityKey !== null &&
//            contentState.getEntity(entityKey).getType() === 'BUTTON'
//        );
//        },
//        callback
//    );
//};

//const decorators = new CompositeDecorator([
//    {
//        strategy: findButtonEntities,
//        component: ButtonComponent,
//    },
//]);

//const SuperInput = () => {
//    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorators));
//    const editorRef = useRef();

//    const handleDrop = (e) => {
//        e.preventDefault();
//        if (e.dataTransfer.items) {
//        for (let i = 0; i < e.dataTransfer.items.length; i++) {
//            if (e.dataTransfer.items[i].kind === 'file') {
//            let file = e.dataTransfer.items[i].getAsFile();
//            let url = URL.createObjectURL(file);
//            let contentState = editorState.getCurrentContent();
//            let contentStateWithEntity = contentState.createEntity(
//                'BUTTON',
//                'IMMUTABLE',
//                { url, name: file.name.slice(0,3) }
//            );
//            let entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//            let newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
//            newEditorState = RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey);
//            let selectionState = newEditorState.getSelection();
//            let contentStateWithText = Modifier.insertText(
//                newEditorState.getCurrentContent(),
//                selectionState,
//                file.name.slice(0,3)+"...",
//                newEditorState.getCurrentInlineStyle(),
//                entityKey
//            );
//            let newState = EditorState.push(newEditorState, contentStateWithText, 'insert-characters');
            
//            // 移动光标到按钮之后
//            let newSelectionState = newState.getSelection().merge({
//                anchorOffset: selectionState.getStartOffset() + file.name.slice(0,3).length + 3,
//                focusOffset: selectionState.getStartOffset() + file.name.slice(0,3).length + 3
//            });
//            newState = EditorState.forceSelection(newState, newSelectionState);

            
//            setEditorState(newState);
//            break;
//            }
//        }
//        }
//    };

//    useEffect(() => {
//        editorRef.current.addEventListener('drop', handleDrop);
//        return () => {
//        editorRef.current.removeEventListener('drop', handleDrop);
//        };
//    }, [editorState]);

//    return (
//        <div
//        ref={editorRef}
//        style={{
//            minHeight: '1em', 
//            fontSize: '16px',
//            overflowY: 'hidden',
//            resize: 'none',
//            whiteSpace: 'pre-wrap', 
//            border: '1px solid black', 
//            padding: '10px', 
//        }}
//        >
//        <Editor
//            editorState={editorState}
//            onChange={setEditorState}
//        />
//        </div>
//    );
//}

//export default SuperInput;

import React, { useState, useRef, useEffect } from 'react';
import { Editor, EditorState, Modifier, RichUtils, CompositeDecorator } from 'draft-js';
import isUrlHttp from 'is-url-http';

// 确定文件类型并返回相应的颜色
const colorByFileType = (fileType) => {
    switch(fileType) {
        case 'image': return '#FF9B9B'; // 红色
        case 'document': return '#FFD6A5'; // 绿色
        case 'video': return '#FFFEC4'; // 蓝色
        case 'audio': return '#CBFFA9'; // 紫色
        default: return '#4E4FEB'; // 黑色
    }
};

const determineFileType = (file) => {
    console.log(file)
    const fileType = file.type;
    if (fileType.startsWith('image/')) {
        return 'image';
    } else if (fileType.startsWith('text/') || 
                fileType === 'application/pdf' || 
                fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
                fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        return 'document';
    } else if (fileType.startsWith('video/')) {
        return 'video';
    } else if (fileType.startsWith('audio/')) {
        return 'audio';
    } else {
        return 'other';
    }
}

const Link = (props) => {
    const { file } = props.contentState.getEntity(props.entityKey).getData();
    let url = URL.createObjectURL(file);
    let fileType = determineFileType(file);
    const color = colorByFileType(fileType);
    return (
        <button 
            title={file.name}
            style={{margin:'0 2px', border:`2px solid ${color}`,borderRadius:'3px', height:'24px'}}
            onClick={() => window.open(url, '_blank')}>
            {props.children}
        </button>
    );
};

const findLinkEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
};

const URLLink = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();

    const handleClick = (event) => {
        if (event.ctrlKey) {
            window.open(url, '_blank');
        }
    };

    return (
        <span 
            title={`ctrl+click ${url}`}
            onClick={handleClick} 
            style={{color: 'blue', fontStyle: 'italic', textDecoration: 'underline', cursor: 'pointer'}}
        >
            {props.children}
        </span>
    );
};

const findURLEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'URL'
            );
        },
        callback
    );
};

const decorator = new CompositeDecorator([
    {
        strategy: findLinkEntities,
        component: Link,
    },
    {
        strategy: findURLEntities,
        component: URLLink,  // Use the URLLink component for URL entities
    },
]);

const MyEditor = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator));
    const editor = useRef(null);

    useEffect(() => {
        editor.current.addEventListener('drop', handleDrop);
        return () => {
            editor.current.removeEventListener('drop', handleDrop);
        };
    }, [editorState]);

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.items) {
            for (let i = 0; i < e.dataTransfer.items.length; i++) {
                if (e.dataTransfer.items[i].kind === 'file') {
                    let file = e.dataTransfer.items[i].getAsFile();
                    let contentState = editorState.getCurrentContent();
                    let contentStateWithEntity = contentState.createEntity(
                        'LINK',
                        'IMMUTABLE',
                        { file }
                    );
                    let entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                    let newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
                    let selectionState = editorState.getSelection();
                    let contentStateWithLink = Modifier.insertText(
                        newEditorState.getCurrentContent(),
                        selectionState,
                        file.name.slice(0,3) + '...',
                        newEditorState.getCurrentInlineStyle(),
                        entityKey
                    );
                    let finalEditorState = EditorState.push(newEditorState, contentStateWithLink, 'insert-characters');
                    setEditorState(finalEditorState);
                    break;
                }
            }
        }
    };

    const onChange = (newEditorState) => {
        const originalSelection = newEditorState.getSelection();
        const blockKey = originalSelection.getStartKey();
        const blockText = newEditorState.getCurrentContent().getBlockForKey(blockKey).getText();
        const words = blockText.split(' ');
    
        for (let i = 0; i < words.length; i++) {
            if (isUrlHttp(words[i])) {
                const start = blockText.indexOf(words[i]);
                const end = start + words[i].length;
                let contentState = newEditorState.getCurrentContent();
                let contentStateWithEntity = contentState.createEntity(
                    'URL',
                    'MUTABLE',
                    { url: words[i] }
                );
                let entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                let contentStateWithLink = Modifier.applyEntity(
                    contentStateWithEntity,
                    originalSelection.merge({
                        anchorOffset: start,
                        focusOffset: end,
                    }),
                    entityKey
                );
                newEditorState = EditorState.push(newEditorState, contentStateWithLink, 'apply-entity');
                break;
            }
        }
    
        // Reset the selection to the original position
        newEditorState = EditorState.forceSelection(newEditorState, originalSelection);
    
        setEditorState(newEditorState);
    };

    return (
        <div ref={editor}>
            <Editor
                editorState={editorState}
                onChange={onChange}
            />
        </div>
    );
};

export default MyEditor;