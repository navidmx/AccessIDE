let EditorStyle = {
    'width': '100%',
    'height': 'calc(100vh - 70px)'
}

const Editor = (props) => {
    if (typeof window !== 'undefined') {
        const Ace = require('react-ace').default;
        require('brace');
        require('brace/mode/javascript');
        require('brace/theme/twilight');
        return <Ace style={EditorStyle} {...props}/>
    }

    return null;
}

export default Editor;