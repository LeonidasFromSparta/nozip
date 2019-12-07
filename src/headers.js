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
    
        throw (`Zip32 end of central directory record signature could not be found`)
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

const readFileHeaders = (buffer) => {

    const headers = []

    while (CEN_HDR < buffer.length) {

        const length = calculateHeaderLength(buffer, CEN_INCONSTANT_OFFSET, CEN_HDR)

        const signature = buffer.readUInt32LE(0)
        verifySignature(signature, CEN_SIG, 'cen dir sig err')

        const headerBuffer = buffer.slice(0, length)
        const header = cenDecoder(headerBuffer, 0)
        headers.push(header)

        buffer = buffer.slice(length)
    }

    return headers
}