export const END_SIG = 0x06054B50
export const END_SPO = 0
export const END_DNU = 4  // disk number
export const END_DCS = 6
export const END_CND = 8
export const END_CDC = 12
export const END_CDS = 12
export const END_OFF = 16
export const END_ZCL = 20
export const END_HDR = 22
export const END_MAX = END_HDR + 0xFFFF

export const ELO_SIG = 0x07064B50
export const ELO_SPO = 0
export const ELO_DCS = 4
export const ELO_OFF = 8
export const ELO_TDN = 16

/**
 *  Zip64 end of central directory locator length
 */
export const ELO_HDR = 20

export const E64_SIG = 0x06064B50
export const E64_SPO = 0  // signature
export const E64_SIZ = 4  // size of end of zip64 directory record
export const E64_VEM = 12 // version made by
export const E64_PLM = 13 // platform made by
export const E64_VER = 14 // version needed
export const E64_PLT = 15 // platform needed
export const E64_DSK = 16 // disk number
export const E64_DCD = 20 // disk number with start of central directories
export const E64_CDD = 24 // central directories number on disk
export const E64_CDN = 32 // central directories number
export const E64_CDS = 40 // central directories size
export const E64_OFF = 48 // central directories offset to starting disk
export const E64_HDR = 56

/**
 * Central directory header signature
 */
export const CEN_SIG = 0x02014B50

export const CEN_SPO = 0
export const CEN_VEM = 4
export const CEN_PLM = 5
export const CEN_VER = 6
export const CEN_PLT = 7
export const CEN_FLG = 8
export const CEN_MTD = 10
export const CEN_TIM = 12
export const CEN_DAT = 14
export const CEN_CRC = 16
export const CEN_SIC = 20
export const CEN_SIU = 24
export const CEN_FLE = 28
export const CEN_ELE = 30
export const CEN_CLE = 32
export const CEN_DSK = 34
export const CEN_ATT = 36
export const CEN_ATX = 38
export const CEN_OFF = 42

/**
 * Central directory header fixed length
 */
export const CEN_HDR = 46

export const CEN_MAX = CEN_HDR + 0xFFFF + 0xFFFF + 0xFFFF

export const LOC_SIG = 0x04034B50
export const LOC_SPO = 0
export const LOC_VER = 4
export const LOC_PLT = 5
export const LOC_FLG = 6
export const LOC_MTD = 8
export const LOC_TIM = 10
export const LOC_DAT = 12
export const LOC_CRC = 14
export const LOC_SIC = 18
export const LOC_SIU = 22
export const LOC_FLE = 26
export const LOC_ELE = 28

/**
 * Local file header fixed length
 */
export const LOC_HDR = 30

export const LOC_MAX = LOC_HDR + 0xFFFF + 0xFFFF

export const ZIP_32 = 32
export const ZIP_64 = 64

export const NTFS_MOD_TIME = 12
export const NTFS_ACC_TIME = 20
export const NTFS_CRE_TIME = 28

export const CEN_INCONSTANT_OFFSET = [CEN_FLE, CEN_ELE, CEN_CLE]
export const LOC_INCONSTANT_OFFSET = [LOC_FLE, LOC_ELE]