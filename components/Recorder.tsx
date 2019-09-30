import React from 'react';

type RecorderProps = {
    record: boolean;
    className: string;
    onStop: any;
    mimeType: string;
    width: number;
    height: number;
    strokeColor: string;
    backgroundColor: string;
};

const Recorder = (props: RecorderProps) => {
    if (typeof window !== 'undefined') {
        const ReactMic = require('react-mic').ReactMic;
        return <ReactMic {...props} />;
    }

    return null;
};

export default Recorder;
