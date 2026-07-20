const FAVICON_ZOOM = 1.45

export function createSquareIcon(src, size = 512) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')

      const scale = Math.max(size / img.width, size / img.height) * FAVICON_ZOOM
      const width = img.width * scale
      const height = img.height * scale
      const x = (size - width) / 2
      const y = (size - height) / 2

      ctx.drawImage(img, x, y, width, height)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = reject
    img.src = src
  })
}

export function setLinkIcon(rel, href) {
  let link = document.querySelector(`link[rel="${rel}"]`)
  if (!link) {
    link = document.createElement('link')
    link.rel = rel
    document.head.appendChild(link)
  }
  link.type = 'image/png'
  link.href = href
}
