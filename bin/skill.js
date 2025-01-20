#!/usr/bin/env node

require('dotenv').config()

const {program} = require("../dist/index.js");
const {say} = require("../dist/output/say");

program.parseAsync(process.argv).catch((err) => {
    // any uncaught exceptions will be communicated here
    say(err.message);
});
