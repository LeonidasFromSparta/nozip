export const isDirectory = (entry) => (entry.externalFileAttrs & 0x10) === 0x10
export const isEmpty = (entry) => entry.inflatedSize === 0
export const isDeflated = (entry) => entry.method !== 0
