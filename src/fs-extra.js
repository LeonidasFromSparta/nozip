import fs from 'fs'
import util from 'util'

const fileSize = async (fd) => (await util.promisify(fs.fstat)(fd)).size
const fileSizeSync = (fd) => fs.fstatSync(fd).size

const read = async (fd, pos, len) => {

    return (await util.promisify(fs.read)(fd, Buffer.alloc(len), 0, len, pos)).buffer
}

const createReadStream = (fd, start, len) => {

    const autoClose = false
    const end = start + len - 1
    return fs.createReadStream(null, {fd, start, end, autoClose})
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
    createReadStream,
    readSync,
    open: util.promisify(fs.open),
    openSync: fs.openSync,
    close: util.promisify(fs.close),
    closeSync: fs.closeSync,
    writeFile: util.promisify(fs.writeFile),
    createWriteStream: fs.createWriteStream,
    writeFileSync: fs.writeFileSync,
    mkdir: util.promisify(fs.mkdir),
    mkdirSync: fs.mkdirSync,
}
