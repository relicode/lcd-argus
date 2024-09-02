# lcd-argus

Tiny Express-API for writing text into an 20x4 LCD display run by RaspberryPiZero.

## Prerequisites

* NodeJS v20.6.0
* Python3
* i2c-tools python3-smbus (availabel via apt)

## Installation

```bash
npm install
```

## Running

Run server with
```bash
npm start
```

Interact with server with
```bash
# Locally
DISPLAY_URL=<your server url> ./write-over-http.js 'first line' 'second line' 'third line' 'the last one'

# Retrieve example script
curl http://<your server url>

# Example
curl https://192.168.10.10

#!/usr/bin/env node

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
console.log(body.lines)
```
