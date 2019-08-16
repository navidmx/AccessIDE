import fs from 'fs';
import ffmpeg from 'ffmpeg';
import f_ffmpeg from 'fluent-ffmpeg';
import speech from '@google-cloud/speech';

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
            const conversion = await this.convert(track, 1, 'wav');
            output = await this.transcribeAudio(conversion);
        } catch (err) {
            console.log(err);
            output = 'error processing audio';
        }
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

        const responses = await this
            .client
            .recognize(request);
        const [response] = responses;
        const transcription = response
            .results
            .map((result) : string => result.alternatives[0].transcript)
            .join('\n');
        // .runCommand(transcription);
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