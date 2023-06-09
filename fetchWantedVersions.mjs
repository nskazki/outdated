import NpmApi from 'npm-api'

import attempt from './attempt.mjs'
import parallelMap from './parallelMap.mjs'
import compareVersions from './compareVersions.mjs'

export default function fetchWantedVersions(packages) {
  return parallelMap(30, packages, ([name]) => attempt(3, getWantedVersion, name)).then((rawResults) => {
    return filterResults(formatResults(rawResults))
  })
}

function formatResults(rawResults) {
  return rawResults.map(({ arg: [name, current], val: wanted, err }) => {
    if (err) {
      return { name, current, err: true }
    } else {
      return { name, current, wanted, ...compareVersions(current, wanted) }
    }
  })
}

function filterResults(results) {
  return results.filter(({ err, isAnyBump }) => {
    return err || isAnyBump
  })
}

function getWantedVersion(name) {
  const npm = new NpmApi()
  return npm.repo(name).package().then(({ version }) => version)
}

