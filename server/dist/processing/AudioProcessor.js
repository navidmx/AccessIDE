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
class AudioProcessor {
    constructor() {
        this.client = new speech.SpeechClient();
        this.config = {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
        };
    }
    processAudio(audioStream) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = {
                audio: audioStream,
                config: this.config
            };
            const [response] = yield this.client.recognize(request);
            const transcription = response.results
                .map((result) => result.alternatives[0].transcript)
                .join('\n');
            CommandRunner.runCommand(transcription);
        });
    }
}
export default new AudioProcessor();