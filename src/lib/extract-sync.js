import fs from 'fs'
import path from 'path'
import {isDirectory, isEmpty, isDeflated} from './../zip-extra'
import fsExtra from './../fs-extra'
import {readLocalFileHeader} from './../headers'
import {calcCRC32} from './../crc32'
import {inflateSync} from './../zlib-extra'
import {
    LOC_HDR
} from './../constants'

export const extractSync = (fd, entry, where) => {

    const name = path.join(where, entry.fileName)

    if (isDirectory(entry))
        return fs.mkdirSync(name)

    if (isEmpty(entry))
        return fs.writeFileSync(name, Buffer.alloc(0))

    const locHeader = readLocalFileHeader(fsExtra.readSync(fd, entry.localOffset, LOC_HDR))

    const content = !isDeflated(entry) ?
        fsExtra.readSync(fd, entry.localOffset + locHeader.length, entry.deflatedSize) :
        inflateSync(fsExtra.readSync(fd, entry.localOffset + locHeader.length, entry.deflatedSize))

    const crc32 = calcCRC32(content)

    if (crc32 !== entry.checksum)
        throw ('crc error')

    fs.writeFileSync(name, content)
}
