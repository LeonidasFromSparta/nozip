import fs from 'fs'
import fsExtra from './../fs-extra'
import {readZip32Record, readCentralFileHeader} from '../headers'
import {
    END_MAX,
    CEN_HDR,
    CEN_SIG,
    CEN_INCONSTANT_OFFSET
} from '../constants'

export const getEntriesSync = (fd) => {

    const fileSize = fsExtra.fileSize(fd)

    const header32Pos = (fileSize - END_MAX) < 0 ? 0 : fileSize - END_MAX
    const header32 = readZip32Record(fsExtra.readSync(fd, header32Pos, END_MAX), fileSize)

    const cenDirsPos = header32.cenDirsOffset
    const cenDirsLen = header32.cenDirsSize

    let buffer = fsExtra.readSync(fd, cenDirsPos, cenDirsLen)
    const headers = []

    while (CEN_HDR < buffer.length) {

        const length = CEN_INCONSTANT_OFFSET.reduce((acc, pos) => acc + buffer.readUInt16LE(pos), CEN_HDR)
        const signature = buffer.readUInt32LE(0)

        if (signature !== CEN_SIG)
            throw new Error('cen dir sig err')

        const headerBuffer = buffer.slice(0, length)
        const header = readCentralFileHeader(headerBuffer)
        headers.push(header)

        buffer = buffer.slice(length)
    }

    return headers
}
