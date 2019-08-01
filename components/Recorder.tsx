let RecorderStyle = {
    width: '40vw'
}

const Recorder = (props) => {
    if (typeof window !== 'undefined') {
        const ReactMic = require('react-mic').ReactMic;
        return <ReactMic style={RecorderStyle} {...props}/>
    }

    return null;
}

export default Recorder;