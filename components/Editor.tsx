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
    onChange: Function
}

class Editor extends React.Component {
    public state : {
        
    }

    if (typeof window !== 'undefined') {
        const Ace = require('react-ace').default;
        require('brace');
        require('brace/mode/javascript');
        require('brace/theme/twilight');
        return <Ace style={EditorStyle} {...props}/>
    }

    return null;

    render() {
        return (

        )
    }
}

export default Editor;