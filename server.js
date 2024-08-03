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
  res.json({ message })
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
