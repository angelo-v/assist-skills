#!/usr/bin/env node

require('dotenv').config()

const { program } = require("../dist/index.js");
program.parse(process.argv);