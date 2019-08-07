import CommandRunner from "../runCommand";
import speech from '@google-cloud/speech';
import fs from 'fs';
import ffmpeg from 'ffmpeg';
import path from 'path';
import f_ffmpeg from 'fluent-ffmpeg';

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

    async processAudio(base64 : string) : Promise < string > {
        this.cleanFiles();
        let output: string;
        fs.writeFileSync('video.webm', base64, {encoding: 'base64'});
        try {
            const process = new ffmpeg('video.webm');
            const video = await process;
            await new Promise((resolve, reject) => {
                video.fnExtractSoundToMP3('audio.mp3', (err, file) => {
                    if (err) 
                        reject(err);
                    if (file) 
                        resolve(file);
                    }
                );
            });
            let track = './audio.mp3';
            console.log('converting audio');
            const conversion = await this.convert(track, 1, 'wav');
            console.log('conversion: ', conversion);
            output = await this.transcribeAudio(conversion);
        } catch (err) {
            console.log(err);
            output = 'error processing audio';
        }
        console.log(output);
        this.cleanFiles();
        return output;
    }

    private convert(track : string, channels : number, format : string) : Promise < string > {
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
        })
    }

    private async transcribeAudio(fileName : string) {
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
        // .runCommand(transcription);
        console.log('transcription done');
        console.log(transcription);
        return transcription;
    }

    private cleanFiles() {
        const files = ['video.webm', 'audio.mp3', 'audio.wav'];
        files.forEach(file => {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            }
        });
    }

}

export default new AudioProcessor();