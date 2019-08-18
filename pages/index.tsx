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

const Speech = dynamic(
    () => import('../components/Speech'),
    { ssr: false }
)

class Index extends React.Component {
    editor : AceEditorClass;

    public state : {
        recording: boolean,
        audio: string,
        languages: Language[],
        curr: Language,
        code: string
    }

    constructor(props : IndexProps) {
        super(props);
        this.runCommand = this.runCommand.bind(this);
        this.saveEditor = this.saveEditor.bind(this);
        this.updateLanguage = this.updateLanguage.bind(this);
        this.state = {
            recording: false,
            audio: 'Editor loaded.',
            languages: [],
            curr: null,
            code: ''
        }
    }

    runCommand(commands : OutputCommand[]) {
        for (const cmd of commands) {
            switch (cmd.type) {
                case 'write':
                    console.log('Write:', cmd);
                    this.editor.session.insert(this.editor.getCursorPosition(), cmd.contents.cmd);
                    this.speakAudio(cmd.contents.audio);
                    break;
                case 'read':
                    console.log('Read:', cmd.contents);
                    break;
                case 'nav':
                    console.log('Nav:', cmd.contents);
                    break;
                default:
                    console.log('Error:', cmd.contents);
            }
        }
    }

    saveEditor(instance : AceEditorClass) {
        this.editor = instance;
    }

    updateEditor(newValue : string) {
        // console.log(newValue);
        // this.setState({ code: newValue });
    }

    updateLanguage(newLang : Option) {
        // BACKEND - Send POST request with newLang.value to update language ID for compiler
        let selected = this.state.languages.filter(lang => lang.id == newLang.value)[0];
        this.setState({curr: selected});
    }

    voiceShortcut = (event : any) => {
        if (event.keyCode === 27) {
            this.state.recording
                ? this.stopRecording()
                : this.startRecording();
        }
    }

    speakAudio = (text : string) => {
        this.setState({audio: text})
    }

    startRecording = () => {
        this.setState({recording: true});
    }

    stopRecording = () => {
        this.setState({recording: false});
    }

    componentWillMount = async() => {
        try {
            let list = await fetch(`${Config.getURL()}/getLangs`).then((res) => res.json());
            this.setState({languages: list, curr: list[0]});
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
                            run={this.runCommand}
                            tabs={this.editor
                            ? this.editor.getCursorPositionScreen().column / 4
                            : null}
                            currLine={this.editor
                            ? this.editor.getCursorPosition().row + 1
                            : null}
                            lines={this.editor
                            ? this.editor.session.doc.getAllLines()
                            : null}
                            update={this.updateLanguage}
                            languages={this.state.languages}
                            recording={this.state.recording}/>
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
                                value="const foo = 42;"
                                onLoad={this.saveEditor}
                                onChange={this.updateEditor}
                                language={this.state.curr}/>
                        </Col>
                        <Col md={3}>
                            <Output/>
                        </Col>
                    </Row>
                </Container>
                <Speech audio={this.state.audio}/>
            </div>
        );
    }
}

export default Index;
