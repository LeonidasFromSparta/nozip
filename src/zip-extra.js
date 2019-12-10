const isDirectory = (entry) => (entry.externalFileAttrs & 0x10) === 0x10
const isEmpty = (entry) => entry.inflatedSize === 0
const isDeflated = (entry) => entry.method !== 0

export default {
    isDirectory,
    isEmpty,
    isDeflated
}
