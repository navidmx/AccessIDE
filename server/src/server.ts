import express from 'express';
import fs from 'fs';
import {
    exec
} from 'child_process';
import {
    join
} from 'path';
import bodyParser from 'body-parser';
import next from 'next';
import CommandRunner from './runCommand';
import Registry from './languageRegistry';
import AudioProcessor from './processing/AudioProcessor';
import languageRegistry from './languageRegistry';

const dev = process.env.NODE_ENV !== 'production'
const app = next({
    dev
})
const handle = app.getRequestHandler();


app.prepare()
    .then(async () => {
        const server = express();
        await Registry.findLanguages();

        console.log();

        server.use('/static', express.static(join(__dirname + "/static")));
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({
            extended: true
        }));

        server.post('/voiceCommand', (req, res) => {
            console.log('body');
            console.log(req.body);
            res.send(AudioProcessor.processAudio(req.body.audio));
        });

        server.get('/runCommand', (req, res) => {
            res.send(CommandRunner.runCommand(req.body.command));
        });

        server.get('/getLangs', (req, res) => {
            res.send(languageRegistry.getLanguages());
        });


        server.get('*', (req, res) => {
            return handle(req, res)
        });

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })