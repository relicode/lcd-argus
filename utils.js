import chalk from 'chalk'

export const logLines = (lines) => {
  const shortFiller = chalk.bold.greenBright('*')
  const filler = new Array(20 + 2).fill(shortFiller).join('')
  console.log(filler)
  for (const line of lines) {
    console.log(shortFiller + chalk.yellowBright(line.padStart(10).padEnd(20)) + shortFiller)
  }
  console.log(filler)
}

