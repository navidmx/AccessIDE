import React, {KeyboardEvent, InputHTMLAttributes} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import fetch from 'node-fetch';
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
    blob: Blob;
    blobURL: string;
}

type CommandProps = {}

class Command extends React.Component {
    private command : any;

    public state : {
        record: boolean;
    }

    constructor(props : CommandProps) {
        super(props);
        this.command = React.createRef();
        this.state = {
            record: false
        }
    }

    commandEntered = (event : KeyboardEvent) => {
        if (event.charCode == 13) {
            event.preventDefault();
            console.log(this.command.current.value);
            // BACKEND: Use this.command.current.value to do something!
            this.command.current.value = '';
        }
    }

    voiceShortcut = (event : any) => {
        if (event.keyCode === 27) {
            this.state.record
                ? this.stopRecording()
                : this.startRecording();
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

    saveAudio = async(audio : RecordedBlob) => {
        const reader = new FileReader();
        const res = await new Promise((resolve, reject) => {
            reader.onload = async function () {
                try {
                    const raw = reader.result;
                    const b64 = raw
                        .toString()
                        .replace(/^data:.+;base64,/, '');
                    const body = {
                        audio: b64
                    }
                    const response = await fetch('/voiceCommand', {
                        method: 'post',
                        body: JSON.stringify(body),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json());
                    resolve(response)
                } catch (err) {
                    reject(err);
                }
            };
            reader.readAsDataURL(audio.blob);
        });
        console.log(res);
    }

    render() {
        return (
            <Form inline style={MaxWidth}>
                <InputGroup style={MaxWidth}>
                    <InputGroup.Prepend>
                        <InputGroup.Text style={CommandPrefixStyle}>
                            <FontAwesomeIcon
                                style={{
                                margin: 'auto'
                            }}
                                icon={faCode}/>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        style={CommandStyle}
                        className='command-bar'
                        onKeyPress={this.commandEntered}
                        placeholder='Enter a command...'
                        type="text"
                        ref={this.command}></Form.Control>
                    <Recorder
                        record={this.state.record}
                        className='sound-wave'
                        onStop={this.saveAudio}
                        mimeType='video/webm'
                        width={98}
                        height={48}
                        strokeColor='#CCC'
                        backgroundColor='#131313'/>
                </InputGroup>
            </Form>
        )
    }
};

export default Command;