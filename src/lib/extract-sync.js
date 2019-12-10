import fs from 'fs'
import path from 'path'
import zipExtra from './../zip-extra'
import fsExtra from './../fs-extra'
import {readLocalFileHeader} from './../headers'
import {calcCRC32} from './../crc32'
import {inflateSync} from './../zlib-extra'
import {
    LOC_HDR
} from './../constants'

export const extractSync = (fd, entry, where) => {

    const name = path.join(where, entry.fileName)

    if (zipExtra.isDirectory(entry))
        return fs.mkdirSync(name)

    if (zipExtra.isEmpty(entry))
        return fs.writeFileSync(name, Buffer.alloc(0))

    const locHeader = readLocalFileHeader(fsExtra.readSync(fd, entry.localOffset, LOC_HDR))
    
    const content = !zipExtra.isDeflated(entry) ?
        fsExtra.readSync(fd, entry.localOffset + locHeader.length, entry.deflatedSize) :
        inflateSync(fsExtra.readSync(fd, entry.localOffset + locHeader.length, entry.deflatedSize))

    const crc32 = calcCRC32(content)

    if (crc32 !== entry.checksum)
        throw ('crc error')

    fs.writeFileSync(name, content)
}
