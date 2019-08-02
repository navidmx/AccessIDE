const Recorder = (props) => {
    if (typeof window !== 'undefined') {
        const ReactMic = require('react-mic').ReactMic;
        return <ReactMic {...props}/>
    }

    return null;
}

export default Recorder;