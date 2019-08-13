import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Option } from 'react-dropdown';
import Head from 'next/head';
import fetch from 'node-fetch';
import { Language } from '../server/src/languageRegistry';
import Config from '../server/src/config';
import Header from '../components/Header';
import Editor from '../components/Editor';
import Output from '../components/Output';

type IndexProps = {}

class Index extends React.Component {
    editor: Editor;

    public state : {
        languages: Language[],
        curr: Language,
        code: string
    }

    constructor(props: IndexProps) {
        super(props);
        this.updateLanguage = this.updateLanguage.bind(this);
        this.state = {
            languages: [],
            curr: null,
            code: ''
        }
    }

    saveEditor(instance : Editor) {
        this.editor = instance;
    }

    updateEditor(newValue : string) {
        console.log(newValue);
        // this.setState({ code: newValue });
    }

    updateLanguage(newLang: Option) {
        // BACKEND - Send POST request with newLang.value to update language ID
        let selected = this
            .state
            .languages
            .filter(lang => lang.id == newLang.value)[0];
        this.setState({curr: selected});
    }

    componentWillMount = async () => {
        try {
            let list = await fetch(`${Config.getURL()}/getLangs`).then((res) => res.json());
            this.setState({ languages: list, curr: list[0] });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        console.log(this.state.languages);
        return (
            <div>
                <Head>
                    <title>AccessIDE</title>
                    <link href="/static/assets/bootstrap.min.css" rel="stylesheet" />
                    <link href="/static/assets/style.css" rel="stylesheet" />
                </Head>
                <Container fluid style={{
                    padding: 0
                }}>
                    <Row noGutters>
                        <Header update={this.updateLanguage} languages={this.state.languages} />
                    </Row>
                    <Row noGutters>
                        <Col md={9}>
                            <Editor
                                id="editor"
                                mode={this.state.curr
                                    ? this.state.curr.syntax
                                    : null}
                                theme="twilight"
                                fontSize="18px"
                                value="const foo = 42;"
                                onLoad={this.saveEditor}
                                onChange={this.updateEditor}
                                language={this.state.curr} />
                        </Col>
                        <Col md={3}>
                            <Output />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Index;
