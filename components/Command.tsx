import React, {KeyboardEvent} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCode} from '@fortawesome/free-solid-svg-icons';
import Recorder from '../components/Recorder';

let CommandPrefixStyle = {
    backgroundColor: '#272727',
    borderColor: '#ccc',
    width: '50px'
}

let CommandStyle = {
    fontSize: '24px',
    width: 'calc(100% - 150px)',
    color: 'white',
    backgroundColor: '#131313',
    display: 'block'
}

let MaxWidth = {
    width: '100%',
    maxWidth: '700px'
}

type RecordedBlob = {
    blobURL: string
}

class Command extends React.Component {
    public state : {
        record: boolean;
    }

    constructor(props : any) {
        super(props);
        this.state = {
            record: false
        }
    }

    voiceShortcut = (event : any) => {
        if (event.keyCode === 27) {
            // Toggle recording status with ESC
            this.state.record
                ? this.stopRecording()
                : this.startRecording();
        }
    }

    commandEntered = (event : KeyboardEvent) => {
        if (event.charCode == 13) {
            // Enter key pressed in command bar
            event.preventDefault();
            // BACKEND TODO
            console.log("Entered!");
        }
    }

    componentDidMount = () => {
        document.addEventListener('keydown', this.voiceShortcut, false);
    }

    componentWillUnmount = () => {
        document.removeEventListener('keydown', this.voiceShortcut, false);
    }

    startRecording = () => {
        this.setState({record: true});
    }

    stopRecording = () => {
        this.setState({record: false});
    }

    saveAudio = (audio : RecordedBlob) => {
        // BACKEND TODO
        console.log('File at: ', audio.blobURL);
    }

    render() {
        return (
            <Form inline style={MaxWidth}>
                <InputGroup style={MaxWidth}>
                    <InputGroup.Prepend>
                        <InputGroup.Text style={CommandPrefixStyle}>
                            <FontAwesomeIcon
                                style={{margin: 'auto'}}
                                icon={faCode}/>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        style={CommandStyle}
                        className='command-bar'
                        onKeyPress={this.commandEntered}
                        placeholder="Enter a command..."
                        type="text"></Form.Control>
                    <Recorder
                        record={this.state.record}
                        className='sound-wave'
                        onStop={this.saveAudio}
                        width={98}
                        height={48}
                        strokeColor="#CCC"
                        backgroundColor="#131313"/>
                </InputGroup>
            </Form>
        )
    }
};

export default Command;