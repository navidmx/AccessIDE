import React from 'react';
import {AceEditorClass} from 'react-ace/lib/AceEditorClass';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Option} from 'react-dropdown';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import fetch from 'node-fetch';
import Config from '../server/src/config';
import {Language} from '../server/src/languageRegistry';
import {OutputCommand} from '../server/src/runCommand';
import Header from '../components/Header';
import Editor from '../components/Editor';
import Output from '../components/Output';

type IndexProps = {}

type IndexState = {
    recording: boolean,
    audio: string,
    languages: Language[],
    curr: Language,
    code: string,
    dropdown: {
        options: Option[],
        selected: Option
    }
}

const Speech = dynamic(
    () => import('../components/Speech'),
    { ssr: false }
)

class Index extends React.Component {
    private editor : AceEditorClass;
    public state : IndexState;

    constructor(props : IndexProps) {
        super(props);
        this.runCommand = this.runCommand.bind(this);
        this.saveEditor = this.saveEditor.bind(this);
        this.updateEditor = this.updateEditor.bind(this);
        this.updateLanguage = this.updateLanguage.bind(this);
        this.clearAudio = this.clearAudio.bind(this);
        this.state = {
            recording: false,
            audio: 'Editor loaded',
            languages: [],
            curr: null,
            code: '',
            dropdown: {
                options: [],
                selected: null
            }
        }
    }

    runCommand(commands : OutputCommand[]) {
        for (const cmd of commands) {
            switch (cmd.type) {
                case 'write':
                    console.log('Write:', cmd.contents);
                    this.setState({audio: cmd.contents.audio});
                    this.editor.session.insert(this.editor.getCursorPosition(), cmd.contents.cmd);
                    break;
                case 'read':
                    console.log('Read:', cmd.contents);
                    this.setState({audio: this.readCommand(cmd.contents.cmd)});
                    break;
                case 'nav':
                    console.log('Nav:', cmd.contents);
                    break;
                default:
                    if (cmd.contents.cmd.length != 0) {
                        console.log('Error:', cmd.contents);
                        this.setState({audio: cmd.contents.audio});
                    }
            }
        }
    }

    readCommand = (cmd : string) => {
        let row : number,
            audio = '',
            session = this.editor.getSession();
        if (/(this|current) line/.test(cmd)) {
            row = this.editor.getCursorPosition().row;
            audio = this.read(session.getLine(row));
        } else if (/line [0-9]+/.test(cmd)) {
            row = parseInt(cmd.substring(cmd.indexOf('line') + 5));
            audio = this.read(session.getLine(row));
        }
        return audio;
    }

    read = (cmd : string) => {
        return cmd;
    }

    saveEditor = (instance : AceEditorClass) => {
        this.editor = instance;
    }

    updateEditor = (newValue : string) => {
        this.setState({code: newValue});
    }

    updateLanguage = (newLang : Option) => {
        // BACKEND - Send POST request with newLang.value to update language ID for runtime
        let selected = this.state.languages.filter(lang => lang.id == newLang.value)[0];
        this.setState((prevState : IndexState) => ({
            curr: selected,
            dropdown: {
                ...prevState.dropdown,
                selected: newLang
            },
            audio: `Language set to ${newLang.label}`
        }));
    }

    voiceShortcut = (event : any) => {
        if (event.keyCode === 27) {
            this.state.recording ? this.stopRecording(true) : this.startRecording();
        }
    }

    startRecording = () => {
        this.setState({recording: true});
    }

    stopRecording = (returnToEditor : boolean) => {
        this.setState({recording: false});
        if (returnToEditor) this.editor.focus();
    }

    clearAudio = () => {
        if (this.state.audio != '') this.setState({audio: ''});
    }

    componentWillMount = async() => {
        try {
            let list = await fetch(`${Config.getURL()}/getLangs`).then((res) => res.json());
            let options = list.map((lang : Language) => ({
                'value': lang.id,
                'label': `${lang.display.name} (${lang.display.version})`
            }));
            let selected = options[0];
            this.setState({
                languages: list,
                curr: list[0],
                dropdown: {
                    options: options,
                    selected: selected
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount = () => {
        document.addEventListener('keydown', this.voiceShortcut, false);
    }

    componentWillUnmount = () => {
        document.removeEventListener('keydown', this.voiceShortcut, false);
    }

    render() {
        return (
            <div>
                <Head>
                    <title>AccessIDE</title>
                    <link href="/static/assets/bootstrap.min.css" rel="stylesheet"/>
                    <link href="/static/assets/style.css" rel="stylesheet"/>
                </Head>
                <Container fluid style={{padding: 0}}>
                    <Row noGutters>
                        <Header
                            recording={this.state.recording}
                            tabs={this.editor
                            ? this.editor.getCursorPositionScreen().column / 4
                            : null}
                            currLine={this.editor
                            ? this.editor.getCursorPosition().row + 1
                            : null}
                            lines={this.editor
                            ? this.editor.session.doc.getAllLines()
                            : null}
                            dropdown={this.state.dropdown}
                            run={this.runCommand}
                            update={this.updateLanguage}
                            onEnter={this.stopRecording}/>
                    </Row>
                    <Row noGutters>
                        <Col md={9}>
                            <Editor
                                id="editor"
                                mode={this.state.curr
                                ? this.state.curr.syntax
                                : "javascript"}
                                theme="twilight"
                                fontSize="18px"
                                value={this.state.code}
                                onLoad={this.saveEditor}
                                onChange={this.updateEditor}
                                language={this.state.curr}
                                editorProps={{$blockScrolling: true}}/>
                        </Col>
                        <Col md={3}>
                            <Output/>
                        </Col>
                    </Row>
                </Container>
                <Speech
                    audio={this.state.audio}
                    clear={this.clearAudio}/>
            </div>
        );
    }
}

export default Index;
