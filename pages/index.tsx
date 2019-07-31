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
            <div>
                <Head>
                    <title>AccessIDE</title>
                    <link href="/static/assets/bootstrap.min.css" rel="stylesheet"/>
                </Head>
                <Container fluid style={{
                    padding: 0
                }}>
                    <Header/>
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
