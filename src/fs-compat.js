import fs from 'fs'
import {promisify} from './utils'

const readSync = (fd, pos, len) => {

    const buff = Buffer.alloc(len)
    fs.readSync(fd, buff, 0, len, pos)
    return buff
}

export const sync = {
    openSync: fs.openSync,
    closeSync: fs.closeSync,
    fstatSync: fs.fstatSync,
    readSync,
    mkdirSync: fs.mkdirSync,
    writeFileSync: fs.writeFile
}

const open = promisify(fs.open)
const close = promisify(fs.close)
const fstat = promisify(fs.fstat)
const read = promisify(fs.read)
const mkdir = promisify(fs.mkdir)
const writeFile = promisify(fs.writeFile)

export const promise = {
    open,
    close,
    fstat,
    read,
    mkdir,
    writeFile
}

const createReadStream = (fd, pos, len) =>
    fs.createReadStream(null, {fd, start: pos, end: pos + len - 1})

export const stream = {
    createReadStream,
    createWriteStream: fs.createWriteStream
}
