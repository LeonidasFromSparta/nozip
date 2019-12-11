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

    if (zipe.isDirectory(entry)) {

        try {

            fse.mkdirSync(name)
        } catch (ex) {}

        return
    }

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

export const extract = async (fd, entry, where, bufferLimit) => {

    const name = path.join(where, entry.fileName)

    if (zipe.isDirectory(entry)) {

        try {

            await fse.mkdir(name)
        } catch (ex) {}

        return
    }

    if (zipe.isEmpty(entry))
        return await fse.writeFile(name, Buffer.alloc(0))

    const locHeader = readLocalFileHeader(await fse.read(fd, entry.localOffset, LOC_HDR))

    const buffered = async () => {

        const getContent = async () => {

            const buffer = await fse.read(fd, entry.localOffset + locHeader.length, entry.deflatedSize)
            return zipe.isDeflated(entry) ? await zlibe.inflate(buffer) : buffer
        }

        const content = await getContent()
        checkCRC(content, locHeader.checksum)

        await fse.writeFile(name, content)
    }

    const streaming = async () => {

        const contentStream = fse.createReadStream(fd, entry.localOffset + locHeader.length, entry.deflatedSize)

        if (zipe.isDeflated(entry)) {

            return await new Promise((resolve, reject) => {

                const pipe = contentStream.pipe(zlibe.streamingInflate()).pipe(fse.createWriteStream(name))

                pipe.on('finish', resolve)
                pipe.on('error', reject)
            })
        }

        await new Promise((resolve, reject) => {

            const pipe = contentStream.pipe(fse.createWriteStream(name))

            pipe.on('finish', resolve)
            pipe.on('error', reject)
        })
    }

    if (entry.deflatedSize > bufferLimit)
        return await streaming()

    await buffered()
}

const checkCRC = (content, crc32) => {

    if (calcCRC32(content) !== crc32)
        throw ('Bad file checksum')
}
