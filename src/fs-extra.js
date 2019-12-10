import fs from 'fs'
import util from 'util'

const fileSize = async (fd) => (await util.promisify(fs.fstat)(fd)).size
const fileSizeSync = (fd) => fs.fstatSync(fd).size

const read = async (fd, pos, len) => {

    return (await util.promisify(fs.read)(fd, Buffer.alloc(len), 0, len, pos)).buffer
}

const readSync = (fd, pos, len) => {

    const buff = Buffer.alloc(len)
    fs.readSync(fd, buff, 0, len, pos)
    return buff
}

export default {
    fileSize,
    fileSizeSync,
    read,
    readSync,
    open: util.promisify(fs.open),
    openSync: fs.openSync,
    close: util.promisify(fs.close),
    closeSync: fs.closeSync,
    writeFile: util.promisify(fs.writeFile),
    writeFileSync: fs.writeFileSync,
    mkdir: util.promisify(fs.mkdir),
    mkdirSync: fs.mkdirSync
}
