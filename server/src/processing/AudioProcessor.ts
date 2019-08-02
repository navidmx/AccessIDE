import CommandRunner from "../runCommand";
import speech from '@google-cloud/speech';
import fs from 'fs';
import fetch from 'node-fetch';
import httprequest from 'request';
import ffmpeg from 'ffmpeg';
class AudioProcessor {
    private client : any;
    private config : {
        encoding: string;
        sampleRateHertz: number;
        languageCode: string
    };

    constructor() {
        this.client = new speech.SpeechClient();

        this.config = {
            encoding: 'OGG_OPUS',
            sampleRateHertz: 16000,
            languageCode: 'en-US'
        };
    }

    async processAudio(base64 : string) {
        // console.log(base64);
        fs.writeFileSync('video.webm', base64, {encoding: 'base64'});
        try {
            const process = new ffmpeg('video.webm');
            process.then(function (video) {
                // Video metadata
                console.log(video.metadata);
                // FFmpeg configuration
                console.log(video.info_configuration);

                video.fnExtractSoundToMP3('audio.mp3', err => { console.log(err) });
            }, function (err) {
                console.log('Error: ' + err);
            });
        } catch (e) {
            console.log(e.code);
            console.log(e.msg);
        }
        const request = {
            audio: {
                content: base64
            },
            config: this.config
        }
        // console.log('transcribing');
        const responses = await this
            .client
            .recognize(request);
        // console.log(responses);
        const [response] = responses;
        const transcription = response
            .results
            .map((result) : string => result.alternatives[0].transcript)
            .join('\n');
        CommandRunner.runCommand(transcription);
        console.log('transcription done');
        console.log(transcription);
        return transcription;
    }
}

export default new AudioProcessor();