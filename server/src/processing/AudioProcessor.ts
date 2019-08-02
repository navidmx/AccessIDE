import CommandRunner from "../runCommand";
import speech from '@google-cloud/speech';
import fs from 'fs';
import fetch from 'node-fetch';
import httprequest from 'request';


class AudioProcessor {
    private client: any;
    private config: { encoding: string; sampleRateHertz: number; languageCode: string };

    constructor() {
        this.client = new speech.SpeechClient();

        this.config = {
            encoding: 'LINEAR16',
            sampleRateHertz: 128000,
            languageCode: 'en-US',
        };
    }

    async processAudio(audioStream: string) {
        audioStream = audioStream.replace('blob:', '');
        // console.log(audioStream);
        // httprequest(audioStream);
        // const file = fs.readFileSync('audio.mp3').toString('base64');
        // console.log('Audio Content');
        // console.log(file);
        // console.log('end content');

        const base64 = await fetch(audioStream).then((res) => res.buffer()).then((buffer) => buffer.toString('base64'));

        const request = {
            audio: { content: base64 },
            config: this.config
        }
        console.log('transcribing');
        const [response] = await this.client.recognize(request);
        const transcription = response.results
            .map((result): string => result.alternatives[0].transcript)
            .join('\n');
        CommandRunner.runCommand(transcription);
        console.log('transcription done');
        console.log(transcription);
        return transcription;
    }
}

export default new AudioProcessor();