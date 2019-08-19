import express from 'express';
import {join} from 'path';
import bodyParser from 'body-parser';
import next from 'next';
import CommandRunner from './runCommand';
import Registry from './languageRegistry';
import AudioProcessor from './processing/AudioProcessor';
import languageRegistry from './languageRegistry';
import Config from './config';

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const reqURL = dev
    ? 'http://localhost:3000'
    : 'http://localhost:3000';
Config.setURL(reqURL);

app
    .prepare()
    .then(async() => {
        const server = express();
        await Registry.findLanguages();
        // console.log(Registry.getLanguages());
        CommandRunner.setLanguage(Registry.getLanguages()[0]);


        server.use('/static', express.static(join(__dirname + "/static")));
        server.use(bodyParser.json({limit: '50mb'}));
        server.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
        server.use(bodyParser.raw({limit: '5mb'}))

        server.post('/voiceCommand', async(req, res) => {
            const text = await AudioProcessor.processAudio(req.body.audio);
            const command = CommandRunner.runCommand(text, req.body.tabs, req.body.line);
            res.send({originalText: text, finalCmd: command});
        });

        server.post('/runCommand', (req, res) => {
            console.log(req);
            res.send({
                originalText: req.body.command,
                finalCmd: CommandRunner.runCommand(req.body.command, req.body.tabs, req.body.line)
            });
        });

        server.get('/getLangs', (req, res) => {
            res.send(languageRegistry.getLanguages());
        });

        server.get('*', (req, res) => {
            return handle(req, res)
        });

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