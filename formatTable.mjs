import { table, getBorderCharacters } from 'table'
import chalk from 'chalk'

export default function formatTable(entries) {
  if (entries.length === 0) {
    return chalk.green('Everything is up-to-date')
  }

  const rows = entries.concat().sort(comparator).map(toRow)
  return table(rows, {
    border: getBorderCharacters('void'),
    columnDefault: { paddingLeft: 0, paddingRight: 2 },
    drawHorizontalLine: () => false
  })
}

function toRow(entry) {
  const color = chooseColor(entry)

  return [
    entry.name,
    color(entry.current),
    entry.err ? 'ERR' : entry.wanted
  ]
}

function comparator(a, b) {
  const aWidth = calcWeight(a)
  const bWidth = calcWeight(b)
  if (aWidth === bWidth) {
    return a.name.localeCompare(b.name)
  } else {
    return aWidth - bWidth
  }
}

function calcWeight(entry) {
  return (entry.isPatchBump ? 1 : 0) + (entry.isMinorBump ? 10 : 0) + (entry.isMajorBump ? 100 : 0) + (entry.err ? 1000 : 0)
}

function chooseColor(entry) {
  if (entry.isPatchBump) {
    return chalk.green
  } else if (entry.isMinorBump) {
    return chalk.yellow
  } else if (entry.isMajorBump) {
    return chalk.magenta
  } else if (entry.err) {
    return chalk.red
  } else {
    return (v) => v
  }
}
