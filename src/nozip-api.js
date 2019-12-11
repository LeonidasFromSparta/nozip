import fse from './fs-extra'
import {getZipEntriesSync, getZipEntries} from './entry'
import {extractSync, extract} from './extract'
import {normalize} from 'path'

export default class NoZip {

    constructor(path) {

        debugger

        this.path = path
    }

    extractSync = (where) => {

        where = normalize(where)

        const fd = fse.openSync(this.path, 'r')

        for (const zipEntry of getZipEntriesSync(fd))
            extractSync(fd, zipEntry, where)

        fse.closeSync(fd)
    }

    extract = async (where, bufferLimit = 65536) => {

        where = normalize(where)

        const fd = await fse.open(this.path, 'r')

        for (const zipEntry of await getZipEntries(fd))
            await extract(fd, zipEntry, where, bufferLimit)

        await fse.close(fd)
    }
}
