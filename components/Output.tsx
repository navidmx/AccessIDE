import {CSSProperties} from "react";

let OutputStyle : CSSProperties;

OutputStyle = {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    backgroundColor: 'black',
    color: 'white',
    padding: '20px',
    fontSize: '18px',
    height: 'calc(100vh - 70px)',
    overflow: 'scroll'
}

const Output = () => (
    <div style={OutputStyle}></div>
);

export default Output;