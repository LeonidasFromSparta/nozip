import {
    END_HDR,
    END_SIG,
    END_CDC,
    END_CDS,
    END_OFF,
    END_ZCL,
    ELO_SPO,
    ELO_SIG,
    ELO_OFF
} from './constants'

export const readZip32Record = (buffer, fileSize) => {

    const findZip32Offset = (buffer) => {

        for (let offset = buffer.length - (END_HDR - 4); offset !== -1; offset--)
            if (buffer.readUInt32LE(offset) === END_SIG)
                return offset

        throw ('Zip32 end of central directory record signature could not be found')
    }

    const offset = findZip32Offset(buffer)

    return {
        cenDirsCount: buffer.readUInt16LE(offset + END_CDC),
        cenDirsSize: buffer.readUInt32LE(offset + END_CDS),
        cenDirsOffset: buffer.readUInt32LE(offset + END_OFF),
        headerOffset: fileSize - offset,
        headerLength: END_HDR + buffer.readUInt16LE(offset + END_ZCL)
    }
}

import {CEN_SIG} from './constants'
import {CEN_HDR} from './constants'
import {CEN_MTD} from './constants'
import {CEN_CRC} from './constants'
import {CEN_SIC} from './constants'
import {CEN_SIU} from './constants'
import {CEN_FLE} from './constants'
import {CEN_ELE} from './constants'
import {CEN_CLE} from './constants'
import {CEN_ATX} from './constants'
import {CEN_OFF} from './constants'

export const readCentralFileHeader = (buffer) => {

    if (buffer.readUInt32LE(0) !== CEN_SIG)
        throw new Error('Bad central file header signature')

    const header = {}
    header.checksum = buffer.readUInt32LE(CEN_CRC)
    header.method = buffer.readUInt16LE(CEN_MTD)
    header.inflatedSize = buffer.readUInt32LE(CEN_SIU)
    header.deflatedSize = buffer.readUInt32LE(CEN_SIC)
    header.externalFileAttrs = buffer.readUInt32LE(CEN_ATX)
    header.localOffset = buffer.readUInt32LE(CEN_OFF)

    const nameLen = buffer.readUInt16LE(CEN_FLE)
    const extraLen = buffer.readUInt16LE(CEN_ELE)
    const commentLen = buffer.readUInt16LE(CEN_CLE)

    header.fileName = buffer.toString('utf8', CEN_HDR, CEN_HDR + nameLen)
    header.length = CEN_HDR + nameLen + extraLen + commentLen

    const extraBuf = Buffer.alloc(extraLen)
    buffer.copy(extraBuf, 0, CEN_HDR + nameLen, CEN_HDR + nameLen + extraLen)

    return header
}

import {LOC_SIG} from './constants'
import {LOC_HDR} from './constants'
import {LOC_FLE} from './constants'
import {LOC_ELE} from './constants'

export const readLocalFileHeader = (buffer) => {

    if (buffer.readUInt32LE(0) !== LOC_SIG)
        throw new Error('Bad local file header signature')

    const nameLen = buffer.readUInt16LE(LOC_FLE)
    const extraLen = buffer.readUInt16LE(LOC_ELE)

    const header = {}
    header.length = LOC_HDR + nameLen + extraLen

    return header
}
