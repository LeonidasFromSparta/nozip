import path from 'path'
import zipe from './zip-extra'
import fse from './fs-extra'
import {readLocalFileHeader} from './headers'
import {calcCRC32} from './crc32'
import zlibe from './zlib-extra'
import {
    LOC_HDR
} from './constants'

export const extractSync = (fd, entry, where) => {

    const name = path.join(where, entry.fileName)

    if (zipe.isDirectory(entry))
        return fse.mkdirSync(name)

    if (zipe.isEmpty(entry))
        return fse.writeFileSync(name, Buffer.alloc(0))

    const locHeader = readLocalFileHeader(fse.readSync(fd, entry.localOffset, LOC_HDR))

    const getContent = () => {

        const buffer = fse.readSync(fd, entry.localOffset + locHeader.length, entry.deflatedSize)
        return zipe.isDeflated(entry) ? zlibe.inflateSync(buffer) : buffer
    }

    const content = getContent()
    checkCRC(content, locHeader.checksum)

    fse.writeFileSync(name, content)
}

export const extract = async (fd, entry, where) => {

    const name = path.join(where, entry.fileName)

    if (zipe.isDirectory(entry))
        return await fse.mkdir(name)

    if (zipe.isEmpty(entry))
        return await fse.writeFile(name, Buffer.alloc(0))

    const locHeader = readLocalFileHeader(await fse.read(fd, entry.localOffset, LOC_HDR))

    const getContent = async () => {

        const buffer = await fse.read(fd, entry.localOffset + locHeader.length, entry.deflatedSize)
        return zipe.isDeflated(entry) ? await zlibe.inflate(buffer) : buffer
    }

    const content = await getContent()
    checkCRC(content, locHeader.checksum)

    await fse.writeFile(name, content)
}

const checkCRC = (content, crc32) => {

    if (calcCRC32(content) !== crc32)
        throw ('Bad file checksum')
}
