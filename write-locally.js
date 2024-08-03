#!/usr/bin/env node

import chalk from 'chalk'

import { logLines, writeToDisplay } from './utils.js'

const lines = process.argv.slice(2)
await writeToDisplay(lines)
logLines(lines)
