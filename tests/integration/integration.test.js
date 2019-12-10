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

/*
    SIGNATURES
*/
test('should assert bad Zip32 record signature', () => {

    const badSignature = () =>
        new NoZip(ASSETS_PATH + '/signatures/bad_zip32_record_signature.zip').extractSync(EXTRACT_PATH)

    expect(badSignature).toThrowError('Zip32 end of central directory record signature could not be found')
})

test('should assert bad central file header signature', () => {

    const badSignature = () =>
        new NoZip(ASSETS_PATH + '/signatures/bad_central_file_header_signature.zip').extractSync(EXTRACT_PATH)

    expect(badSignature).toThrowError('Bad central file header signature')
})

test('should assert bad local file header signature', () => {

    const badSignature = () =>
        new NoZip(ASSETS_PATH + '/signatures/bad_local_file_header_signature.zip').extractSync(EXTRACT_PATH)

    expect(badSignature).toThrowError('Bad local file header signature')
})

/*
    CHECKSUM
*/
test('should assert bad local file checksum', () => {

    const badChecksum = () =>
        new NoZip(ASSETS_PATH + '/checksum/bad_local_file_checksum.zip').extractSync(EXTRACT_PATH)

    expect(badChecksum).toThrowError('Bad file checksum')
})

test('should assert bad central file checksum', () => {

    const badChecksum = () =>
        new NoZip(ASSETS_PATH + '/checksum/bad_central_file_checksum.zip').extractSync(EXTRACT_PATH)

    expect(badChecksum).toThrowError('Bad file checksum')
})
