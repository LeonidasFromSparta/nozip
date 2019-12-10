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

        if (zipe.isDeflated(entry))
            return zlibe.inflateSync(buffer)

        return buffer
    }

    const content = getContent()
    const crc32 = calcCRC32(content)

    if (crc32 !== entry.checksum)
        throw ('crc error')

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

        if (zipe.isDeflated(entry))
            return await zlibe.inflate(buffer)

        return buffer
    }

    const content = await getContent()
    const crc32 = calcCRC32(content)

    if (crc32 !== entry.checksum)
        throw ('crc error')

    await fse.writeFile(name, content)
}
