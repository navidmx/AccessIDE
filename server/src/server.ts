import express from 'express';
import { join } from 'path';
import bodyParser from 'body-parser';
import next from 'next';
import CommandRunner from './runCommand';
import Registry from './languageRegistry';
import AudioProcessor from './processing/AudioProcessor';
import languageRegistry from './languageRegistry';
import Config from './config';
import CodeRunner from './runCode';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const reqURL = dev ? 'http://localhost:3000' : 'http://localhost:3000';
Config.setURL(reqURL);

app.prepare()
    .then(async () => {
        const server = express();
        await Registry.findLanguages();
        CommandRunner.setLanguage(Registry.getLanguages()[1]);

        server.use('/static', express.static(join(__dirname + '/static')));
        server.use(bodyParser.json({ limit: '50mb' }));
        server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
        server.use(bodyParser.raw({ limit: '50mb' }));

        server.post('/voiceCommand', async (req, res) => {
            const text = await AudioProcessor.processAudio(req.body.audio);
            CommandRunner.setLanguage(Registry.getLanguages()[req.body.languageIdx]);
            CodeRunner.setLanguage(Registry.getLanguages()[req.body.languageIdx]);
            const command = CommandRunner.runCommand(text, req.body.tabs, req.body.line, req.body.editor);
            res.send({ originalText: text, finalCmd: command });
        });

        server.post('/runCommand', (req, res) => {
            const text = req.body.command;
            CommandRunner.setLanguage(Registry.getLanguages()[req.body.languageIdx]);
            CodeRunner.setLanguage(Registry.getLanguages()[req.body.languageIdx]);
            const command = CommandRunner.runCommand(req.body.command, req.body.tabs, req.body.line, req.body.editor);
            res.send({ originalText: text, finalCmd: command });
        });

        server.post('/run', (req, res) => {
            const code = req.body.code;
        });

        server.get('/getLangs', (req, res) => {
            res.send(languageRegistry.getLanguages());
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
