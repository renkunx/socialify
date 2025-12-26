import { JSX } from 'react'

import { getCardDimensions } from '@/common/cardSizes'
import { getHeroPattern } from '@/common/helpers'
import { getSimpleIconsImageURI } from '@/common/icons'
import type Configuration from '@/common/types/configType'
import { CardSize } from '@/common/types/configType'
import Badge from '@/src/components/preview/badge'

export default function Card(config: Configuration): JSX.Element {
  const { width, height } = getCardDimensions(config.size)
  const cardWidth = width / 2
  const cardHeight = height / 2
  const backgroundPatternStyles = getHeroPattern(config.pattern, config.theme)
  const isWeChatCover = config.size === CardSize.wechat

  const languageIconImageURI =
    config.language?.state &&
    getSimpleIconsImageURI(config.language.value, config.theme)

  const displayName = [
    config.owner?.state && config.owner?.value,
    config.name?.state && config.name?.value,
  ]
    .filter((value) => typeof value === 'string')
    .join('/')
  const nameLength = displayName.length
  const nameFontSize =
    nameLength > 55
      ? '17px'
      : nameLength > 45
        ? '20px'
        : nameLength > 35
          ? '24px'
          : nameLength > 25
            ? '30px'
            : '40px'

  // Calculate if we need tighter spacing for wechat cover mode
  const hasDescription = config.description?.state
  const hasBadges =
    config.stargazers?.state ||
    config.forks?.state ||
    config.issues?.state ||
    config.pulls?.state
  const needsCompactLayout = isWeChatCover && hasDescription && hasBadges

  return (
    <div
      className={`card-wrapper theme-${config.theme.toLowerCase()}`}
      style={{
        width: cardWidth,
        height: cardHeight,
        padding: needsCompactLayout ? '8px 30px' : '10px 30px',
        fontFamily: config.font,
        fontWeight: 400,
        ...backgroundPatternStyles,
        color: config.theme.match(/dark/i) ? '#fff' : '#000',
        textAlign: 'center',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'scale(2)',
        transformOrigin: 'top left',
      }}
    >
      {/* Logo */}
      <div
        className="card-logo-wrapper"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: isWeChatCover ? 5 : 10,
        }}
      >
        <img
          src={config.logo || getSimpleIconsImageURI('GitHub', config.theme)}
          alt="Logo"
          width={100}
          height={100}
          style={{
            objectFit: 'contain',
          }}
        />
        {languageIconImageURI && (
          <p
            className="card-logo-divider"
            style={{
              color: '#bbb',
              fontSize: 30,
              margin: '0 20px',
              fontFamily: 'Jost',
            }}
          >
            +
          </p>
        )}
        {languageIconImageURI && (
          <img
            src={languageIconImageURI}
            alt={config?.language?.value}
            width={85}
            height={85}
            style={{
              objectFit: 'contain',
            }}
          />
        )}
      </div>

      {/* Name */}
      <p
        className="card-name-wrapper"
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: isWeChatCover ? 8 : 15,
          marginBottom: 0,
          fontWeight: 500,
          fontSize: nameFontSize,
          lineHeight: '1.4',
        }}
      >
        <span
          className="card-name-owner"
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            fontWeight: 200,
          }}
        >
          {config.owner?.state
            ? `${config.owner.value}${config.name?.state ? '/' : ''}`
            : ''}
        </span>
        <span
          className="card-name-name"
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
          }}
        >
          {config.name?.state ? `${config.name.value}` : ''}
        </span>
      </p>

      {/* Description */}
      {config.description?.state && (
        <p
          className="card-description-wrapper"
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: isWeChatCover ? 5 : 10,
            marginBottom: 0,
            fontSize: isWeChatCover ? 15 : 17,
            lineHeight: '1.4',
            maxHeight: isWeChatCover ? '2.5em' : '3em',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
          }}
        >
          {config.description.value}
        </p>
      )}

      {/* Badges */}
      {(config.stargazers?.state ||
        config.forks?.state ||
        config.issues?.state ||
        config.pulls?.state) && (
        <div
          className="card-badges-wrapper"
          style={{
            marginTop: isWeChatCover ? 10 : 25,
            marginBottom: 0,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: isWeChatCover ? '4px' : '0',
          }}
        >
          {config.stargazers?.state && (
            <Badge
              name="stars"
              value={`${config.stargazers.value}`}
              color="#dfb317"
            />
          )}
          {config.forks?.state && (
            <Badge
              name="forks"
              value={`${config.forks.value}`}
              color="#97ca00"
            />
          )}
          {config.issues?.state && (
            <Badge
              name="issues"
              value={`${config.issues.value}`}
              color="#007ec6"
            />
          )}
          {config.pulls?.state && (
            <Badge
              name="pulls"
              value={`${config.pulls.value}`}
              color="#fe7d37"
            />
          )}
        </div>
      )}
    </div>
  )
}
