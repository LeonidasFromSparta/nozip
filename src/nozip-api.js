import fs from 'fs'
import {getEntriesSync} from './lib/sync'
import {extractSync} from './lib/extract-sync'

export default class NoZip {

    constructor(path) {

        this.path = path
    }

    extractSync = (where) => {

        const fd = fs.openSync(this.path)

        debugger

        for (const entry of getEntriesSync(fd))
            extractSync(fd, entry, where)
    
        fs.closeSync(fd)
    }
}
