# AccessIDE
#### An IDE with accessibility in mind using audio input/output and defined commands to easily navigate, read, and even write code.

## Development
To set up the project, make sure you have Node.js and npm installed, then run: `npm install`

To start the development server, run: `npm run dev`

To start a production build, run: `npm start`

The server depends on ffmpeg to process audio, so that must be installed as well.

## Commands
The following commands can be run by hitting the `ESC` key to activate voice input, or simply typing into the command bar at the top of the page.

### Creation
Triggered with `create/make/write` keywords
- `create a function called (name) [with parameters (parameters)]`
- `create a for loop [from (start)] to (end) [with (flag)]`
- `create a variable/constant called (name) [with value (value)]`

### Reading
- `read line`
- `read line (line number)`

### Navigating
- `go to last line`
- `go to line (line number)`
- `go to function (function name)`

## Contributing

AcessIDE is an open source project and welcomes contributions from all developers.

If you have an idea that you think should be implemented, you can submit it through the [Issues Page](https://github.com/navidmx/AccessIDE/issues). 

### Feature Implementations and Pull Requests 

If you want to implement a new feature in AccessIDE, it is suggested that you first submit an issue to see if the idea is something that we would consider merging into the master branch. This way, you don't waste your time writing code for a feature that will never be added. Once the feature request is submitted, it will recieve feedback from our maintainers and they will give you the OK to start developing. 

For smaller fixes and changes, feel free to submit a PR and we will review and merge it, given that it is up to standards

### Adding a language

AccessIDE was designed to make implementing a new language an easy process. Support for a langueage requires a language folder that contains a config, nav, read, and write file.

#### Write.ts

All write files should export a class that is an extension of the `write` class found in [Languages.ts](https://github.com/navidmx/AccessIDE/blob/master/server/src/languages/language.ts)

Write files should implment all methods from the write class, and can have any number of other helper methods.

The methods should return a formatted string that will be inserted into the editor.

#### Read.ts

All read files should export a class that is an extension of the `read` class found in [Languages.ts](https://github.com/navidmx/AccessIDE/blob/master/server/src/languages/language.ts)

The read method should return a string that will be read out by a tts program ran client side.

#### Nav.ts

All Navigation files should export a class that is an extension of the `nav` class found in [Languages.ts](https://github.com/navidmx/AccessIDE/blob/master/server/src/languages/language.ts)

the nav method should return a row and column that the editor will move the cursor to. 

#### Config.json

Each language must contain a config.json file that allowes the language to be loaded by the editor. Here is an example language config.json file 
```json
{
    "id": "javascript-es6", // Language ID used to identify the language
    "syntax": "javascript", // Syntax highlighting for the ACE editor
    "extension": ".js", // File extension, used for saving and running the code 
    "version": "ECMAScript 2015", // Version of the language, used for client side informtation
    "exec": "node", // Runtime enviornment, used for executing code
    "display": { // Information that will be displayed to the user
        "name": "JavaScript",
        "version": "ES6",
        "runtime": "nodejs"
    },
    "parsers": { // language support files for use with AccessIDE, these should be files in the same directory as the config file
        "write": "write.js", // Write command support
        "read": "read.js", // Read command support
        "nav": "nav.js" // Navigation command support
    }
}
```

*Note that while the files in the folder are typescript files (Read.ts, Write.ts, Nav.ts), any files referenced in the configuration must have a .js extentin. This is because the language folder gets pre-processed by gulp, and converts all typescript files to javascript files*
