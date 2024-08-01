import childProcess from 'node:child_process'
import os from 'node:os'
import { promisify } from 'node:util'

import chalk from 'chalk'
import express from 'express'

import { logLines } from './utils.js'

const app = express()

const PORT = parseInt(process.env.PORT, 10) || 3000
const execFile = promisify(childProcess.execFile)

let message = [
  '[:]  Tervehdys   [:]',
  '--------------------',
  new Date().toLocaleString(),
  `  *** ${os.hostname} ***`,
]

const writeToDisplay = async (lines) => {
  const { stdout } = await execFile('python3-venv/bin/python3', ['display_control.py', ...lines])

  message = stdout
    .replace(/(\r\n|\r|\n)$/, '')
    .split('\n\r')
  
  logLines(message)
}

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message })
})

app.post('/', async (req, res) => {
  await writeToDisplay(req.body.lines)
  res.json({ message })
})

await writeToDisplay(message)
console.log()

app.listen(PORT, () => {
  const ifaces = os.networkInterfaces()
  console.log(chalk.yellow('Server running at:'))
  for (const dev of Object.keys(ifaces)) {
    for (const details of ifaces[dev].filter((i) => i.family === 'IPv4')) {
      console.log(chalk.bold.yellow(`http://${details.address}:${PORT}`))
    }
  }
})
