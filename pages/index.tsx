import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Head from 'next/head';
import Header from '../components/Header';
import Editor from '../components/Editor';
import Output from '../components/Output';
import {Language} from '../server/src/languageRegistry';

class Index extends React.Component {
    public state : {
        language: Language
    }

    constructor(props : any) {
        super(props);
        this.state = {
            // Default language
            language: {
                name: 'JavaScript',
                syntax: 'javascript',
                id: 'javascript-es6',
                extension: '.js',
                version: 'ECMAScript 2015',
                exec: 'node',
                display: null,
                writer: null,
                reader: null,
                navigator: null
            }
        }
    }

    updateEditor(newValue : string) {
        console.log(newValue);
    }

    updateLanguage(newLang : Language) {
        this.setState({
            language: newLang
        });
    }

    render() {
        return (
            <div>
                <Head>
                    <title>AccessIDE</title>
                    <link href="/static/assets/bootstrap.min.css" rel="stylesheet"/>
                    <link href="/static/assets/style.css" rel="stylesheet"/>
                </Head>
                <Container fluid style={{
                    padding: 0
                }}>
                    <Row noGutters>
                        <Header/>
                    </Row>
                    <Row noGutters>
                        <Col md={9}>
                            <Editor
                                id="editor"
                                mode={this.state.language.syntax}
                                theme="twilight"
                                fontSize="18px"
                                value="const foo = 42;"
                                onChange={this.updateEditor}/>
                        </Col>
                        <Col md={3}>
                            <Output/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Index;
