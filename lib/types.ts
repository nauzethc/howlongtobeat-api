/*
 * Parsed results from search
 */
export type GameResult = {
  id: number
  name: string
  imageUrl: string
  gameplayMain?: number
  gameplayExtended?: number
  gameplayCompletionist?: number
  gameplayMulti?: number
}

/*
 * Parsed data from requested game by ID
 */
export type GameDetail = {
  id: number
  name: string
  description?: string
  imageUrl?: string
  stats: {
    playing?: string
    backlogs?: string
    replays?: string
    retired?: number
    rating?: number
    beat?: string
  }
  platforms?: string[]
  genres?: string[]
  developers?: string[]
  publishers?: string[]
  releaseDates?: {
    NA?: string
    EU?: string
    JP?: string
  }
  gameplays: {
    single?: any[]
    multi?: any[]
    dlc?: any[]
    mainGame?: any[]
    speedrun?: any[]
    platforms?: any[]
  }
}

export const SINGLE_PLAYER_FIELDS: string[] = [
  'type',
  'polled',
  'average',
  'median',
  'rushed',
  'leisure'
]
export const MULTI_PLAYER_FIELDS: string[] = [
  'type',
  'polled',
  'average',
  'median',
  'least',
  'most'
]
export const RELATED_CONTENT_FIELDS: string[] = [
  'name',
  'polled',
  'rated',
  'main',
  'extended',
  'completionist',
  'all'
]
export const SPEEDRUN_FIELDS: string[] = [
  'type',
  'polled',
  'average',
  'median',
  'fastest',
  'slowest'
]
export const PLATFORM_FIELDS: string[] = [
  'platform',
  'polled',
  'main',
  'extended',
  'completionist',
  'fastest',
  'longest'
]

/*
 * Query data format
 */
export type Query = {
  search?: string
  page?: number
  lengthType?: LengthType
  lengthMin?: string
  lengthMax?: string
  platform?: Platform
  sortBy?: SortBy
  sortOrder?: SortOrder
  perspective?: Perspective
  flow?: Flow
  genre?: Genre
  modifier?: Modifier
  randomize?: boolean
}

/*
 * Some enums to check if input params are valid
 */
export enum LengthType {
  Main = 'main',
  Extended = 'mainp',
  Completionist = 'comp',
  Average = 'averagea'
}
export enum SortBy {
  Name = 'name',
  Main = 'main',
  Extended = 'mainp',
  Completionist = 'comp',
  AverageTime = 'averagea',
  TopRated = 'rating',
  MostPopular = 'popular',
  MostBacklogs = 'backlog',
  MostSubmissiones = 'usersp',
  MostPlayed = 'playing',
  MostSpeedruns = 'speedrun',
  ReleaseDate = 'release'
}
export enum SortOrder {
  Ascending = 1,
  Descending = 0
}
export enum Modifier {
  None = '',
  HideDLC = 'hide_dlc',
  OnlyDLC = 'only_dlc'
}
export enum Perspective {
  All = '',
  FirstPerson = 'First-Person',
  Isometric = 'Isometric',
  Side = 'Side',
  Text = 'Text',
  ThirdPerson = 'Third-Person',
  TopDown = 'Top-Down',
  VirtualReality = 'VirtualReality'
}
export enum Flow {
  All = '',
  Incremental = 'Incremental',
  MassivelyMutiplayer = 'Massively Mutiplayer',
  Multidirectional = 'Multidirectional',
  OnRails = 'On-Rails',
  PointAndClick = 'Point-and-Click',
  RealTime = 'Real-Time',
  Scrolling = 'Scrolling',
  TurnBased = 'Turn-Based'
}
export enum Genre {
  All = '',
  Action = 'Action',
  Adventure = 'Adventure',
  Arcade = 'Arcade',
  BattleArena = 'Battle Arena',
  BeatEmUp = "Beat 'em Up",
  BoardGame = 'Board Game',
  Breakout = 'Breakout',
  CardGame = 'Card Game',
  CityBuilding = 'City-Building',
  Compilation = 'Compilation',
  Educational = 'Educational',
  Fighting = 'Fighting',
  Fitness = 'Fitness',
  Flight = 'Flight',
  FMV = 'Full Motion Video (FMV)',
  HackAndSlash = 'Hack and Slash',
  HiddenObject = 'Hidden Object',
  Horror = 'Horror',
  InteractiveArt = 'Interactive Art',
  Management = 'Management',
  MusicRhythm = 'Music/Rhythm',
  OpenWorld = 'Open World',
  Party = 'Party',
  Pinball = 'Pinball',
  Platform = 'Platform',
  Puzzle = 'Puzzle',
  RacingDriving = 'Racing/Driving',
  Roguelike = 'Roguelike',
  RolePlaying = 'Role-Playing',
  Sandbox = 'Sandbox',
  Shooter = 'Shooter',
  Simulation = 'Simulation',
  Social = 'Social',
  Sports = 'Sports',
  Stealth = 'Stealth',
  StrategyTactical = 'Strategy/Tactical',
  Survival = 'Survival',
  TowerDefense = 'Tower Defense',
  Trivia = 'Trivia',
  VehicularCombat = 'Vehicular Combat',
  VisualNovel = 'Visual Novel'
}
export enum Platform {
  All = '',
  ThreeDO = '3DO',
  AcornArchimedes = 'Acorn Archimedes',
  Amiga = 'Amiga',
  AmigaCD32 = 'Amiga CD32',
  AmstradCPC = 'Amstrad CPC',
  Android = 'Android',
  AppleII = 'Apple II',
  Arcade = 'Arcade',
  Atari8bit = 'Atari 8-bit Family',
  Atari2600 = 'Atari 2600',
  Atari5200 = 'Atari 5200',
  Atari7800 = 'Atari 7800',
  AtariJaguar = 'Atari Jaguar',
  AtariJaguarCD = 'Atari Jaguar CD',
  AtariLynx = 'Atari Lynx',
  AtariST = 'Atari ST',
  BBCMicro = 'BBC Micro',
  Browser = 'Browser',
  ColecoVision = 'ColecoVision',
  Commodore64 = 'Commodore 64',
  CommodorePET = 'Commodore PET',
  CommodoreVIC20 = 'Commodore VIC-20',
  Dreamcast = 'Dreamcast',
  Emulated = 'Emulated',
  FMTowns = 'FM Towns',
  GameAndWatch = 'Game & Watch',
  GameBoy = 'Game Boy',
  GameBoyAdvance = 'Game Boy Advance',
  GameBoyColor = 'Game Boy Color',
  GearVR = 'Gear VR',
  Gizmondo = 'Gizmondo',
  GoogleStadia = 'Google Stadia',
  Intellivision = 'Intellivision',
  InteractiveMovie = 'Interactive Movie',
  iOS = 'iOS',
  Linux = 'Linux',
  Mac = 'Mac',
  Mobile = 'Mobile',
  MSX = 'MSX',
  NGage = 'N-Gage',
  NECPC88 = 'NEC PC-88',
  NECPC98 = 'NEC PC-98',
  NECPCFX = 'NEC PC-FX',
  NeoGeo = 'Neo Geo',
  NeoGeoCD = 'Neo Geo CD',
  NeoGeoPocket = 'Neo Geo Pocket',
  NES = 'NES',
  Nintendo3DS = 'Nintendo 3DS',
  Nintendo64 = 'Nintendo 64',
  NintendoDS = 'Nintendo DS',
  NintendoGameCube = 'Nintendo GameCube',
  NintendoSwitch = 'Nintendo Switch',
  OculusGo = 'Oculus Go',
  OculusQuest = 'Oculus Quest',
  Odyssey = 'Odyssey',
  Odyssey2 = 'Odyssey 2',
  OnLive = 'OnLive',
  Ouya = 'Ouya',
  PC = 'PC',
  PCVR = 'PC VR',
  PhilipsCDi = 'Philips CD-i',
  PlayStation = 'PlayStation',
  PlayStation2 = 'PlayStation 2',
  PlayStation3 = 'PlayStation 3',
  PlayStation4 = 'PlayStation 4',
  PlayStation5 = 'PlayStation 5',
  PlayStationMobile = 'PlayStation Mobile',
  PlayStationNow = 'PlayStation Now',
  PlayStationPortable = 'PlayStation Portable',
  PlayStationVita = 'PlayStation Vita',
  PlayStationVR = 'PlayStation VR',
  PlugAndPlay = 'Plug & Play',
  Sega32X = 'Sega 32X',
  SegaCD = 'Sega CD',
  SegaGameGear = 'Sega Game Gear',
  SegaMasterSystem = 'Sega Master System',
  SegaMegaDrive = 'Sega Mega Drive/Genesis',
  SegaPico = 'Sega Pico',
  SegaSaturn = 'Sega Saturn',
  SG1000 = 'SG-1000',
  SharpX1 = 'Sharp X1',
  SharpX68000 = 'Sharp X68000',
  SuperNintendo = 'Super Nintendo',
  TigerHandheld = 'Tiger Handheld',
  TurboGrafx16 = 'TurboGrafx-16',
  TurboGrafxCD = 'TurboGrafx-CD',
  VirtualBoy = 'Virtual Boy',
  Wii = 'Wii',
  WiiU = 'Wii U',
  WindowsPhone = 'Windows Phone',
  WonderSwan = 'WonderSwan',
  Xbox = 'Xbox',
  Xbox360 = 'Xbox 360',
  XboxOne = 'Xbox One',
  XboxSeries = 'Xbox Series X/S',
  Zeebo = 'Zeebo',
  ZXSpectrum = 'ZX Spectrum'
}
