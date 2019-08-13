import React from 'react';
import {Language} from '../server/src/languageRegistry';

let EditorStyle = {
    width: '100%',
    height: 'calc(100vh - 80px)'
}

type EditorProps = {
    id: string,
    mode: string,
    theme: string,
    fontSize: string,
    value: string,
    onLoad: Function,
    onChange: Function,
    language: Language
}

class Editor extends React.Component < EditorProps > {
    constructor(props : EditorProps) {
        super(props);
    }

    render() {
        if (typeof window !== 'undefined') {
            const Ace = require('react-ace').default;
            require('brace');
            require('brace/mode/' + (this.props.language
                ? this.props.language.syntax
                : 'javascript'));
            require('brace/theme/twilight');
            return <Ace style={EditorStyle} {...this.props}/>
        }

        return null;
    }
}

export default Editor;