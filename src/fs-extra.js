import {sync} from './fs-compat'

export const fileSize = (fd) => {

    return sync.fstatSync(fd).size
}