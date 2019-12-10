import zlib from 'zlib'
import util from 'util'

export default {
    inflate: util.promisify(zlib.inflateRaw),
    inflateSync: zlib.inflateRawSync
}
