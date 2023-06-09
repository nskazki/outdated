import semver from 'semver'

export default function compareVersions(a, b) {
  return {
    isAnyBump: isAnyBump(a, b),
    isPatchBump: isPatchBump(a, b),
    isMinorBump: isMinorBump(a, b),
    isMajorBump: isMajorBump(a, b)
  }
}

function isAnyBump(a, b) {
  return a !== b
}

function isPatchBump(a, b) {
  return semver.major(a) === semver.major(b) && semver.minor(a) === semver.minor(b) && semver.patch(a) !== semver.patch(b)
}

function isMinorBump(a, b) {
  return semver.major(a) === semver.major(b) && semver.minor(a) !== semver.minor(b)
}

function isMajorBump(a, b) {
  return semver.major(a) !== semver.major(b)
}

