import {inflateRawSync} from 'zlib'

export const inflaterSync = (deflated) => inflateRawSync(deflated)