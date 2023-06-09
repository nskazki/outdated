import semver from 'semver'

export default function minVersion(version) {
  try {
    return semver.minVersion(version).toString()
  } catch (_err) {
    return null
  }
}
