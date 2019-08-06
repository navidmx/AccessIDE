import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Head from 'next/head';
import Header from '../components/Header';
import Editor from '../components/Editor';
import Output from '../components/Output';
import fetch from 'node-fetch';
import {Language} from '../server/src/languageRegistry';

class Index extends React.Component {
    public state : {
        languages: Language[],
        curr: Language
    }

    constructor(props : any) {
        super(props);
        this.state = {
            languages: [],
            curr: null
        }
    }

    updateEditor(newValue : string) {
        console.log(newValue);
        return newValue;
    }

    updateLanguage(newLang : any) {
        console.log(this.state.languages);
        this.setState({curr: newLang});
    }

    componentWillMount = async() => {
        let list = await fetch('/getLangs').then((res) => res.json());
        this.setState({languages: list, curr: list[0]});
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
                        <Header update={this.updateLanguage}/>
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
                                onChange={this.updateEditor}
                                language={this.state.curr}/>
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
