import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Editor from '../components/Editor';
import Output from '../components/Output';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Index = () => (
    <div>
        <Head>
            <title>AccessIDE</title>
            <link href="/static/assets/bootstrap.min.css" rel="stylesheet" />
        </Head>
        <Container fluid style={{ padding: 0 }}>
            <Header />
            <Row noGutters>
                <Col md={9}>
                    <Editor
                        id="editor"
                        mode="javascript"
                        theme="twilight"
                        fontSize="18px"
                        value="const foo = 42;"
                    />
                </Col>
                <Col md={3}>
                    <Output />
                </Col>
            </Row>
        </Container>
    </div>
);

export default Index;
