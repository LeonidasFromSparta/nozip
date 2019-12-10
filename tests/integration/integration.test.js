import NoZip from 'index'
import {readdirSync} from 'fs'
import rimraf from 'rimraf'

const ASSETS_PATH = './tests/integration/assets'
const EXTRACT_PATH = './tests/integration/assets/tmp'

beforeAll(() => {

   rimraf.sync(EXTRACT_PATH)
})

test('integration test should assert extract archive - sync api', () => {

    new NoZip(ASSETS_PATH + '/algorithms/win-7z-64w.zip').extractSync(EXTRACT_PATH + '/zip/sync')
})

test('integration test should assert extract archive - promise api', async () => {

    await new NoZip(ASSETS_PATH + '/algorithms/win-7z-64w.zip').extract(EXTRACT_PATH + '/zip/promise')
})
