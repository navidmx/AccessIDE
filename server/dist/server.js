var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { join } from 'path';
import bodyParser from 'body-parser';
import next from 'next';
import CommandRunner from './runCommand';
import Registry from './languageRegistry';
import AudioProcessor from './processing/AudioProcessor';
import languageRegistry from './languageRegistry';
import Config from './config';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const reqURL = dev
    ? 'http://localhost:3000'
    : 'http://localhost:3000';
Config.setURL(reqURL);
app
    .prepare()
    .then(() => __awaiter(this, void 0, void 0, function* () {
    const server = express();
    yield Registry.findLanguages();
    // console.log(Registry.getLanguages());
    CommandRunner.setLanguage(Registry.getLanguages()[0]);
    console.log();
    server.use('/static', express.static(join(__dirname + "/static")));
    server.use(bodyParser.json({ limit: '50mb' }));
    server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    server.use(bodyParser.raw({ limit: '5mb' }));
    server.post('/voiceCommand', (req, res) => __awaiter(this, void 0, void 0, function* () {
        console.log(req.query);
        const text = yield AudioProcessor.processAudio(req.body.audio);
        const command = CommandRunner.runCommand(text, req.body.tabs, req.body.line);
        res.send({ originalText: text, finalCmd: command });
    }));
    server.get('/runCommand', (req, res) => {
        res.send(CommandRunner.runCommand(req.body.command, req.body.tabs, req.body.line));
    });
    server.get('/getLangs', (req, res) => {
        res.send(languageRegistry.getLanguages());
    });
    server.get('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(3000, (err) => {
        if (err)
            throw err;
        console.log('> Ready on http://localhost:3000');
    });
}))
    .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});