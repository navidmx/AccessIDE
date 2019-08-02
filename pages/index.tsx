import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Head from 'next/head';
import Header from '../components/Header';
import Editor from '../components/Editor';
import Output from '../components/Output';

class Index extends React.Component {
    updateEditor(newValue : String) {
        console.log(newValue);
    }

    render() {
        return (
            <div style={{backgroundColor: '#2a2a2a'}}>
                <Head>
                    <title>AccessIDE</title>
                    <link href="/static/assets/bootstrap.min.css" rel="stylesheet"/>
                    <link href="/static/assets/style.css" rel="stylesheet"/>
                </Head>
                <Container fluid>
                    <Row noGutters>
                        <Header/>
                    </Row>
                    <Row noGutters>
                        <Col md={9}>
                            <Editor
                                id="editor"
                                mode="javascript"
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
