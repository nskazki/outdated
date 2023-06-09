import { readPackageUp } from 'read-pkg-up'

import minVersion from './minVersion.mjs'

export default async function readCurrentVersions() {
  const { packageJson: { dependencies, devDependencies } } = await readPackageUp()
  return Object.entries({ ...dependencies, ...devDependencies }).map(([name, version]) => {
    return [name, minVersion(version)]
  }).filter(([_name, version]) => {
    return !!version
  })
}
