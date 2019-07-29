const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.argv[2] || 80;
