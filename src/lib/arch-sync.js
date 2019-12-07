import {sync} from './../fs-compat'
import {fileSize} from './../fs-extra'
import {readZip32Record} from './../headers'
import {
    END_MAX
} from './../constants'

export const getEntriesSync = (path) => {

    const fd = sync.openSync(path)
    const fileSize = fileSize(fd)

    const header32Pos = (fileSize - END_MAX) < 0 ? 0 : fileSize - END_MAX
    const header32 = readZip32Record(sync.readSync(header32Pos, END_MAX), fileSize)

    const cenDirsPos = header.cenDirsOffset
    const cenDirsLen = header.cenDirsSize

    const entries = readCenHeaders(file.readSync(fd, cenDirsPos, cenDirsLen))

    sync.closeSync(fd)

    return entries.map((obj) => new Entry(obj, file))
}
