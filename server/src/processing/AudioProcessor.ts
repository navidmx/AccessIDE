import CommandRunner from "../runCommand";
import speech from '@google-cloud/speech';
import fs from 'fs';
import fetch from 'node-fetch';
import httprequest from 'request';
import ffmpeg from 'ffmpeg';
import path from 'path';
import f_ffmpeg from 'fluent-ffmpeg';
import {resolve} from "url";

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
            encoding: 'LINEAR16',
            sampleRateHertz: 44100,
            languageCode: 'en-US'
        };
    }

    async processAudio(base64 : string) { // console.log(base64);
        fs.writeFileSync('video.webm', base64, {encoding: 'base64'});
        try {
            const process = new ffmpeg('video.webm');
            const video = await process;

            video.fnExtractSoundToMP3('audio.mp3', err => {
                console.log(err)
            });
            let track = './audio.mp3';

            const conversion = await this.convert(track, 1, 'wav');
            return await this.transcribeAudio(track)
        } catch (e) {
            console.log(e.code);
            console.log(e.msg);
            return 'errors'
        }

    }
    convert(track, channels, format) {
        return new Promise((resolve, reject) => {
            let trackConvert = f_ffmpeg(track)
                .audioChannels(channels)
                .toFormat(format)
                .on('progress', (progress) => {
                    console.log('Processing: ' + progress.targetSize + ' KB converted');
                })
                .on('end', resolve())
                .on('error', reject());
        })
    }

    async transcribeAudio(fileName : string) {
        // Reads a local audio file and converts it to base64
        const file = fs.readFileSync(fileName);
        const audioBytes = file.toString('base64');

        const request = {
            audio: {
                content: audioBytes
            },
            config: this.config
        }

        console.log('transcribing');
        const responses = await this
            .client
            .recognize(request);
        console.log(responses);
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