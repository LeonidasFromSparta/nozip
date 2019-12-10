import fse from './fs-extra'
import {getZipEntriesSync, getZipEntries} from './entry'
import {extractSync, extract} from './extract'
import {normalize} from 'path'

export default class NoZip {

    constructor(path) {

        this.path = path
    }

    extractSync = (where) => {

        debugger

        where = normalize(where)

        const fd = fse.openSync(this.path, 'r')

        for (const entry of getZipEntriesSync(fd))
            extractSync(fd, entry, where)

        fse.closeSync(fd)
    }

    extract = async (where) => {

        debugger

        where = normalize(where)

        const fd = await fse.open(this.path, 'r')

        for (const zipEntry of await getZipEntries(fd))
            await extract(fd, zipEntry, where)

        await fse.close(fd)
    }
}
