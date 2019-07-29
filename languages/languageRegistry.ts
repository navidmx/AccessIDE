class LanguageRegistry{
    
}

interface Language{
    name: string; 
    language: string,
    extension: string,
    version: string,
    exec: string,
    display: Display;
    write: Write;
    read: Read;
    nav: Nav;
}

interface Display{
    name: String,
    version: String,
    runtime: String
}