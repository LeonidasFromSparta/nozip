import fs from 'fs'

const fileSize = (fd) => {

    return fs.fstatSync(fd).size
}

const readSync = (fd, pos, len) => {

    const buff = Buffer.alloc(len)
    fs.readSync(fd, buff, 0, len, pos)
    return buff
}

export default {
    fileSize,
    readSync
}
