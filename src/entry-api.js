import {extractSync} from './lib/zip-entry-sync'
import File from './file'

export default class Entry {

    constructor(header, file) {

        this.header = header
        this.file = file
    }

    extractSync = (path) => {

        extractSync(path, this.header, this.file)
    }
}
