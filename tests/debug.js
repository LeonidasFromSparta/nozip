import NoZip from './../src/index'

const ASSETS_PATH = './tests/integration/assets'

const func = async () => {

    // debugger

    //const nozip = new NoZip("C:\\Users\\Leon\\nozip\\tests\\integration\\assets\\hello.zip")
    //nozip.extractSync('c:\\keke')

    await new NoZip(ASSETS_PATH + '/algorithms/win-7z-64w.zip').extract('c:\\keke', 1300)
}

func()
