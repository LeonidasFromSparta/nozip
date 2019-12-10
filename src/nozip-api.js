import fs from 'fs'
import {getEntriesSync} from './lib/sync'
import {extractSync} from './lib/extract-sync'
import {normalize} from 'path'

export default class NoZip {

    constructor(path) {

        this.path = path
    }

    extractSync = (where) => {

        debugger

        where = normalize(where)

        const fd = fs.openSync(this.path)

        for (const entry of getEntriesSync(fd))
            extractSync(fd, entry, where)

        fs.closeSync(fd)
    }
}
