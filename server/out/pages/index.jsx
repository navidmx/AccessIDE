import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const Index = () => (<div>
        <Header />
        <Head>
            <title>AccessIDE</title>
            <link href="/static/assets/bootstrap.min.css" rel="stylesheet"/>
        </Head>
        <Container fluid={true}>
            <Row noGutters={true}>
                <Col>1</Col>
                <Col>2</Col>
            </Row>
        </Container>
    </div>);
export default Index;
