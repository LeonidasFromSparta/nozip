import NoZip from 'index'
import rimraf from 'rimraf'
import fs from 'fs'

const ASSETS_PATH = './tests/integration/assets'
const EXTRACT_PATH = './tests/integration/assets/tested'

beforeEach(() => {

    fs.mkdirSync(EXTRACT_PATH)
})

afterEach(() => {

    rimraf.sync(EXTRACT_PATH)
})

test('should assert extract archive - sync api', () => {

    new NoZip(ASSETS_PATH + '/algorithms/win-7z-64w.zip').extractSync(EXTRACT_PATH)
})

test('should assert extract archive - promise api', async () => {

    await new NoZip(ASSETS_PATH + '/algorithms/win-7z-64w.zip').extract(EXTRACT_PATH)
})
