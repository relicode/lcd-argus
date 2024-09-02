import os from 'node:os'

import chalk from 'chalk'
import express from 'express'

import { logLines, writeToDisplay } from './utils.js'

const app = express()

const PORT = parseInt(process.env.PORT, 10) || 3000

const initialMessage = [
  '[:]  Tervehdys   [:]',
  '--------------------',
  new Date().toLocaleString(),
  `  *** ${os.hostname} ***`,
]

await writeToDisplay(initialMessage)
logLines(initialMessage)

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: `
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
  `, })
})

app.post('/', async (req, res) => {
  const { lines } = req.body
  await writeToDisplay(lines)
  logLines(lines)
  res.json({ lines })
})

app.listen(PORT, () => {
  const ifaces = os.networkInterfaces()
  console.log(chalk.yellow('Server running at:'))
  for (const dev of Object.keys(ifaces)) {
    for (const details of ifaces[dev].filter((i) => i.family === 'IPv4')) {
      console.log(chalk.bold.yellow(`http://${details.address}:${PORT}`))
    }
  }
})
