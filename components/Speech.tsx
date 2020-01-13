import React from 'react';

type SpeechProps = {
    audio: string;
    clear: Function;
};

const synth = window.speechSynthesis;

class Speech extends React.Component<SpeechProps> {
    private command: any;

    constructor(props: SpeechProps) {
        super(props);
    }

    speakAudio = (text: SpeechSynthesisUtterance) => {
        synth.speak(text);
        this.props.clear();
    };

    componentDidMount = () => {
        this.speakAudio(new SpeechSynthesisUtterance(this.props.audio));
    };

    componentDidUpdate = () => {
        this.speakAudio(new SpeechSynthesisUtterance(this.props.audio));
    };

    render() {
        return <div></div>;
    }
}

export default Speech;
