import CommandRunner from "../runCommand";
import speech from '@google-cloud/speech';


class AudioProcessor {
    private client: any;
    private config: { encoding: string; sampleRateHertz: number; languageCode: string };

    constructor() {
        this.client = new speech.SpeechClient();

        this.config = {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
        };
    }

    async processAudio(audioStream: string) {
        const request = {
            audio: audioStream,
            config: this.config
        }
        const [response] = await this.client.recognize(request);
        const transcription = response.results
            .map((result): string => result.alternatives[0].transcript)
            .join('\n');
        CommandRunner.runCommand(transcription);
    }
}

export default new AudioProcessor();