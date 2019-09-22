import React, { KeyboardEvent } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import fetch from 'node-fetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { OutputCommand } from '../server/src/runCommand';
import Config from '../server/src/config';
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

type CommandProps = {
    run: (commands: OutputCommand[]) => void,
    tabs: number,
    currLine: number,
    lines: string[],
    recording: boolean,
    languageIdx: Number,
    onEnter: (returnToEditor: boolean) => void
}

class Command extends React.Component<CommandProps> {
    private command: any;

    constructor(props: CommandProps) {
        super(props);
        this.command = React.createRef();
    }

    commandEntered = async (event: KeyboardEvent) => {
        if (this.props.recording) this.props.onEnter(false);
        if (event.charCode == 13) {
            event.preventDefault();
            const response = await fetch(`${Config.getURL()}/runCommand`, {
                method: 'POST',
                body: JSON.stringify({
                    command: this.command.current.value,
                    tabs: this.props.tabs,
                    line: this.props.currLine,
                    editor: this.props.lines,
                    languageIdx: this.props.languageIdx
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json());
            this.props.run(response.finalCmd)
            this.command.current.value = '';
            this.props.onEnter(true);
        }
    }

    saveAudio = async (audio: RecordedBlob) => {
        const reader = new FileReader();
        const res: { finalCmd: OutputCommand[], originalText: string } = await new Promise((resolve, reject) => {
            reader.onload = async () => {
                try {
                    const raw = reader.result;
                    const b64 = raw.toString().replace(/^data:.+;base64,/, '');
                    const body = {
                        audio: b64,
                        tabs: this.props.tabs,
                        line: this.props.currLine,
                        editor: this.props.lines
                    }
                    const response = await fetch(`${Config.getURL()}/voiceCommand`, {
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json());
                    resolve(response)
                } catch (err) {
                    console.log(err);
                }
            };
            reader.readAsDataURL(audio.blob);
        });
        this.props.run(res.finalCmd);
    }

    componentDidUpdate = () => {
        if (this.props.recording) {
            this.command.current.focus();
        }
    }

    render() {
        return (
            <Form inline style={MaxWidth}>
                <InputGroup style={MaxWidth}>
                    <InputGroup.Prepend>
                        <InputGroup.Text
                            style={CommandPrefixStyle}>
                            <FontAwesomeIcon
                                style={{ margin: 'auto' }}
                                icon={faCode} />
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
                        record={this.props.recording}
                        className='sound-wave'
                        onStop={this.saveAudio}
                        mimeType='video/webm'
                        width={98}
                        height={48}
                        strokeColor='#CCC'
                        backgroundColor='#131313' />
                </InputGroup>
            </Form>
        )
    }
};

export default Command;