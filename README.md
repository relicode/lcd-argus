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
DISPLAY_URL=<your server url> ./write-over-http.js 'first line' 'second line' 'third line' 'the last one'
```
