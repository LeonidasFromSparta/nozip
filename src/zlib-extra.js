import {inflateRawSync} from 'zlib'

export const inflateSync = (deflated) => inflateRawSync(deflated)
