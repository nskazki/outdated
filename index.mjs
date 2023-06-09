import readCurrentVersions from './readCurrentVersions.mjs'
import fetchWantedVersions from './fetchWantedVersions.mjs'
import formatTable from './formatTable.mjs'

const packages = await readCurrentVersions()
const results = await fetchWantedVersions(packages)

console.info(formatTable(results))
