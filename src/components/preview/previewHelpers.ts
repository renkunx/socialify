import { toClipboard } from 'copee'

import type { CardDimensions } from '@/common/cardSizes'
import toaster from '@/src/components/toaster'

interface ConstructImageUrlProps {
  type: 'absolute' | 'relative'
  format: string
  currentPath: string
  searchParamsString: string
}

export function constructImageUrl({
  type,
  format,
  currentPath,
  searchParamsString,
}: ConstructImageUrlProps): string {
  const imageUrl = `${currentPath}/${format}${searchParamsString ? `?${searchParamsString}` : ''}`

  if (type === 'absolute') {
    return `${window.location.origin}${imageUrl}`
  } else {
    return imageUrl
  }
}

export function copyImageUrl(absoluteImageUrl: string): void {
  const success = toClipboard(absoluteImageUrl)
  if (success) {
    toaster.success('Copied image url to clipboard')
  } else {
    window.open(absoluteImageUrl, '_blank')
  }
}

export function copyMarkdown({
  absoluteImageUrl,
  repoName,
}: {
  absoluteImageUrl: string
  repoName: string
}): void {
  const ogTag = `![${repoName}](${absoluteImageUrl})`
  const success = toClipboard(ogTag)
  if (success) {
    toaster.success('Copied markdown to clipboard')
  }
}

export function copyImageTag({
  absoluteImageUrl,
  repoName,
  dimensions,
}: {
  absoluteImageUrl: string
  repoName: string
  dimensions: CardDimensions
}): void {
  const ogTag = `<img src="${absoluteImageUrl}" alt="${repoName}" width="${dimensions.width}" height="${dimensions.height}" />`
  const success = toClipboard(ogTag)
  if (success) {
    toaster.success('Copied image tag to clipboard')
  }
}

export function copyOpenGraphTags(
  absoluteImageUrl: string,
  dimensions: CardDimensions
): void {
  const ogTag = `
<meta property="og:image" content="${absoluteImageUrl}" />
<meta property="og:image:width" content="${dimensions.width}" />
<meta property="og:image:height" content="${dimensions.height}" />
  `.trim()
  const success = toClipboard(ogTag)
  if (success) {
    toaster.success('Copied open graph tags to clipboard')
  }
}

interface HandleDownloadProps {
  customRelativeImageUrl: string
  fallbackRelativeImageUrl: string
  fileType: string
  repoName: string
  dimensions: CardDimensions
}

export function handleDownload({
  customRelativeImageUrl,
  fallbackRelativeImageUrl,
  fileType,
  repoName,
  dimensions,
}: HandleDownloadProps): () => Promise<void> {
  return async function () {
    toaster.info('Downloading...')

    if (['svg', 'png'].includes(fileType)) {
      // If the file type is svg or png, use the browser's download feature.
      const link = document.createElement('a')
      link.download = `${repoName}.${fileType}`
      link.href = customRelativeImageUrl
      link.click()
    } else {
      // Otherwise use canvas to convert default image to desired format.
      try {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = dimensions.width
          canvas.height = dimensions.height
          const context = canvas.getContext('2d')
          if (context && img) {
            context.drawImage(img, 0, 0, canvas.width, canvas.height)
            const dataUrl = canvas.toDataURL(`image/${fileType}`)
            const link = document.createElement('a')
            link.download = `${repoName}.${fileType}`
            link.href = dataUrl
            link.click()
          }
        }
        img.src = fallbackRelativeImageUrl
      } catch (error) {
        toaster.error('Download failed: Please use a modern browser.')
        console.error(error)
      }
    }
  }
}
