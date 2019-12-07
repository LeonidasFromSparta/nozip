import {extractArchiveSync, getEntriesSync} from './lib/arch-sync'

export default class NoZip {

    constructor(path) {

        this.path = path
    }

    extractSync = () => {

        debugger
        
        this.getEntriesSync()
        extractArchiveSync(this.file, this.entries, path)
    }

    getEntriesSync = () => {

        if (!this.entries)
            this.entries = getEntriesSync(this.path)

        return this.entries
    }
}
