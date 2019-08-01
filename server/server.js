const express = require('express');
const fs = require('fs');
const {exec} = require('child_process');
const path = require('path');
const bodyParser = require('body-parser');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app
    .prepare()
    .then(() => {
        const server = express()

        server.use('/static', express.static(path.join(__dirname + "/static")));

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) 
                throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })


async function audio(){
    import speech from '@google-cloud/speech';
    import fs from 'fs';
    
    const client = new speech.SpeechClient();
    
}


async function main() {
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');

// Creates a client
const client = new speech.SpeechClient();

// The name of the audio file to transcribe
const fileName = './resources/audio.raw';

// Reads a local audio file and converts it to base64
const file = fs.readFileSync(fileName);
const audioBytes = file.toString('base64');

// The audio file's encoding, sample rate in hertz, and BCP-47 language code
const audio = {
    content: audioBytes,
};
const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
};
const request = {
    audio: audio,
    config: config,
};

// Detects speech in the audio file
const [response] = await client.recognize(request);
const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
console.log(`Transcription: ${transcription}`);
}
