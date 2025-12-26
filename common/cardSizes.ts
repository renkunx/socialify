import { CardSize } from '@/common/types/configType'

export type CardDimensions = {
  width: number
  height: number
}

const DEFAULT_CARD_WIDTH = 1280

export const CARD_SIZE_DIMENSIONS: Record<CardSize, CardDimensions> = {
  [CardSize.standard]: { width: DEFAULT_CARD_WIDTH, height: 640 },
  [CardSize.wechat]: {
    width: DEFAULT_CARD_WIDTH,
    height: Math.round(DEFAULT_CARD_WIDTH / 2.35),
  },
  [CardSize.portrait]: {
    width: DEFAULT_CARD_WIDTH,
    height: Math.round((DEFAULT_CARD_WIDTH * 4) / 3),
  },
}

export function getCardDimensions(size?: CardSize | string): CardDimensions {
  const sizes = Object.values(CardSize)
  if (size && sizes.includes(size as CardSize)) {
    return CARD_SIZE_DIMENSIONS[size as CardSize]
  }
  return CARD_SIZE_DIMENSIONS[CardSize.standard]
}
