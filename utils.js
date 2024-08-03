import childProcess from 'node:child_process'
import { promisify } from 'node:util'
import chalk from 'chalk'

const execFile = promisify(childProcess.execFile)
const shortFiller = chalk.bold.greenBright('*')
const filler = new Array(20 + 2).fill(shortFiller).join('')
let message = []

export const logLines = (lines) => {
  console.log(filler)
  for (const line of lines) {
    console.log(shortFiller + chalk.yellowBright(line.padStart(10).padEnd(20)) + shortFiller)
  }
  console.log(filler)
}

export const writeToDisplay = async (lines) => {
  const { stdout } = await execFile('python3-venv/bin/python3', ['display_control.py', ...lines])

  message = stdout
    .replace(/(\r\n|\r|\n)$/, '')
    .split('\n\r')
}

