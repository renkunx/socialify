enum Theme {
  light = 'Light',
  dark = 'Dark',
  auto = 'Auto',
}

enum Pattern {
  signal = 'Signal',
  charlieBrown = 'Charlie Brown',
  formalInvitation = 'Formal Invitation',
  plus = 'Plus',
  circuitBoard = 'Circuit Board',
  overlappingHexagons = 'Overlapping Hexagons',
  brickWall = 'Brick Wall',
  floatingCogs = 'Floating Cogs',
  diagonalStripes = 'Diagonal Stripes',
  solid = 'Solid',
  transparent = 'Transparent',
}

enum Font {
  inter = 'Inter',
  bitter = 'Bitter',
  raleway = 'Raleway',
  rokkitt = 'Rokkitt',
  sourceCodePro = 'Source Code Pro',
  jetBrainsMono = 'JetBrains Mono',
  koHo = 'KoHo',
  jost = 'Jost',
}

enum CardSize {
  standard = 'Default 1280x640 (2:1)',
  wechat = 'WeChat Cover 1280x545 (2.35:1)',
  portrait = 'Portrait 1280x1707 (3:4)',
}

type RequiredConfigs = {
  logo: string

  font: Font
  theme: Theme
  pattern: Pattern
  size: CardSize
}

const OptionalConfigKeyStrings = {
  owner: true,
  name: true,
  description: true,
  language: true,
}

const OptionalConfigKeyNumbers = {
  stargazers: true,
  forks: true,
  issues: true,
  pulls: true,
}

export const RequiredConfigsKeys = {
  logo: true,
  font: true,
  theme: true,
  pattern: true,
  size: true,
}

export const OptionalConfigsKeys = {
  ...OptionalConfigKeyStrings,
  ...OptionalConfigKeyNumbers,
}

type OptionalConfigStringElement = {
  [name in keyof typeof OptionalConfigKeyStrings]?: {
    state: boolean
    value: string
    editable?: boolean
  }
}
type OptionalConfigNumberElement = {
  [name in keyof typeof OptionalConfigKeyNumbers]?: {
    state: boolean
    value: number
    editable?: boolean
  }
}

export type OptionalConfigs = OptionalConfigStringElement &
  OptionalConfigNumberElement

type Configuration = RequiredConfigs & OptionalConfigs

export default Configuration

export { Theme, Pattern, Font, CardSize }
