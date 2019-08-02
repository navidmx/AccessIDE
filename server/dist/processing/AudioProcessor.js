var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CommandRunner from "../runCommand";
import speech from '@google-cloud/speech';
import fetch from 'node-fetch';
class AudioProcessor {
    constructor() {
        this.client = new speech.SpeechClient();
        this.config = {
            encoding: 'LINEAR16',
            sampleRateHertz: 128000,
            languageCode: 'en-US',
        };
    }
    processAudio(audioStream) {
        return __awaiter(this, void 0, void 0, function* () {
            audioStream = audioStream.replace('blob:', '');
            // console.log(audioStream);
            // httprequest(audioStream);
            // const file = fs.readFileSync('audio.mp3').toString('base64');
            // console.log('Audio Content');
            // console.log(file);
            // console.log('end content');
            const base64 = yield fetch(audioStream).then((res) => res.buffer()).then((buffer) => buffer.toString('base64'));
            const request = {
                audio: { content: base64 },
                config: this.config
            };
            console.log('transcribing');
            const [response] = yield this.client.recognize(request);
            const transcription = response.results
                .map((result) => result.alternatives[0].transcript)
                .join('\n');
            CommandRunner.runCommand(transcription);
            console.log('transcription done');
            console.log(transcription);
            return transcription;
        });
    }
}
export default new AudioProcessor();