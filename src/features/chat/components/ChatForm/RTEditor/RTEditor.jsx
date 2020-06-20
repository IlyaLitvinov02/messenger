import React from 'react';
import { Editor, RichUtils, getDefaultKeyBinding } from 'draft-js';
import { useRef } from 'react';
import styles from './styles.module.css';


export const RTEditor = ({
    editorState,
    onChange,
    onCtrlEnter,
    onBlur,
    placeholder
}) => {
    const rte = useRef();

    const bindCtrlEnter = event => {
        if (event.ctrlKey && event.key === 'Enter') return 'ctrlEnter';
        return getDefaultKeyBinding(event);
    }

    const handleKeyCommand = command => {
        if (command === 'ctrlEnter') {
            onCtrlEnter();
            return 'handled';
        }
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState)
            return 'handled';
        }
        return 'not-handled';
    }

    return (
        <div
            onClick={() => rte.current.editor.focus()}
            className={styles.rteContainer}
        >
            <Editor
                ref={rte}
                editorState={editorState}
                onChange={onChange}
                keyBindingFn={bindCtrlEnter}
                handleKeyCommand={handleKeyCommand}
                placeholder={placeholder}
                onBlur={onBlur}
            />
        </div>
    );
}