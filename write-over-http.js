#!/usr/bin/env node

import chalk from 'chalk'

import { logLines } from './utils.js'

if (!process.env.DISPLAY_URL) throw new Error('No DISPLAY_URL env variable provided')

const { DISPLAY_URL } = process.env
const lines = process.argv.slice(2)

const response = await fetch(DISPLAY_URL, {
  body: JSON.stringify({ lines }, null),
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
})

if (!response.ok) throw new Error(response.statusText)

const body = await response.json()

logLines(body.message)
