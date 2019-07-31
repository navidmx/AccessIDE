const express = require('express');
const fs = require('fs');
const {exec} = require('child_process');
const path = require('path');
const bodyParser = require('body-parser');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app
    .prepare()
    .then(() => {
        const server = express()

        server.use('/static', express.static(path.join(__dirname + "/static")));

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) 
                throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })