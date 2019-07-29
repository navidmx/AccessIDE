const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.argv[2] || 80;
app.use('/public', express.static(path.join(__dirname + "/../public")));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/../../client/index.html"));
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
