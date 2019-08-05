var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import speech from '@google-cloud/speech';
import fs from 'fs';
import ffmpeg from 'ffmpeg';
import f_ffmpeg from 'fluent-ffmpeg';
class AudioProcessor {
    constructor() {
        this.client = new speech.SpeechClient();
        this.config = {
            encoding: 'LINEAR16',
            sampleRateHertz: 44100,
            languageCode: 'en-US'
        };
    }
    processAudio(base64) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cleanFiles();
            let output;
            fs.writeFileSync('video.webm', base64, { encoding: 'base64' });
            try {
                const process = new ffmpeg('video.webm');
                const video = yield process;
                video.fnExtractSoundToMP3('audio.mp3', err => {
                    console.log(err);
                });
                let track = './audio.mp3';
                console.log('converting audio');
                const conversion = yield this.convert(track, 1, 'wav');
                console.log('conversion: ', conversion);
                output = yield this.transcribeAudio(conversion);
            }
            catch (err) {
                console.log(err);
                output = 'error processing audio';
            }
            console.log(output);
            this.cleanFiles();
            return output;
        });
    }
    convert(track, channels, format) {
        return new Promise((resolve, reject) => {
            f_ffmpeg(track)
                .audioChannels(channels)
                .toFormat(format)
                .output(track.replace('.mp3', `.${format}`))
                .on('progress', (progress) => {
                console.log('Processing: ' + progress.targetSize + ' KB converted');
            })
                .on('end', () => {
                console.log('audio resolved');
                resolve(track.replace('.mp3', `.${format}`));
            })
                .on('error', (err) => {
                console.log(err);
                reject(err);
            })
                .run();
        });
    }
    transcribeAudio(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            // Reads a local audio file and converts it to base64
            const file = fs.readFileSync(fileName);
            const audioBytes = file.toString('base64');
            const request = {
                audio: {
                    content: audioBytes
                },
                config: this.config
            };
            console.log('transcribing');
            const responses = yield this
                .client
                .recognize(request);
            console.log(responses);
            const [response] = responses;
            const transcription = response
                .results
                .map((result) => result.alternatives[0].transcript)
                .join('\n');
            // .runCommand(transcription);
            console.log('transcription done');
            console.log(transcription);
            return transcription;
        });
    }
    cleanFiles() {
        const files = ['video.webm', 'audio.mp3', 'audio.wav'];
        files.forEach(file => {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            }
        });
    }
}
export default new AudioProcessor();