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
import fs from 'fs';
import ffmpeg from 'ffmpeg';
class AudioProcessor {
    constructor() {
        this.client = new speech.SpeechClient();
        this.config = {
            encoding: 'OGG_OPUS',
            sampleRateHertz: 16000,
            languageCode: 'en-US'
        };
    }
    processAudio(base64) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(base64);
            fs.writeFileSync('video.webm', base64, { encoding: 'base64' });
            try {
                const process = new ffmpeg('video.webm');
                process.then(function (video) {
                    // Video metadata
                    console.log(video.metadata);
                    // FFmpeg configuration
                    console.log(video.info_configuration);
                    video.fnExtractSoundToMP3('audio.mp3', err => { console.log(err); });
                }, function (err) {
                    console.log('Error: ' + err);
                });
            }
            catch (e) {
                console.log(e.code);
                console.log(e.msg);
            }
            const request = {
                audio: {
                    content: base64
                },
                config: this.config
            };
            // console.log('transcribing');
            const responses = yield this
                .client
                .recognize(request);
            // console.log(responses);
            const [response] = responses;
            const transcription = response
                .results
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