import { useEffect } from 'react'
import markup from './cicada/cicadaMarkup.html?raw'
import './cicada/style.sass'
import './cicada/frameShowcases.css'
import { initCicadaAnimations } from './cicada/initCicadaAnimations'
import { initFrameShowcases } from './cicada/initFrameShowcases'

function HomePage() {
  useEffect(() => {
    let cleanupAnim
    let cleanupShow

    try {
      cleanupAnim = initCicadaAnimations()
      cleanupShow = initFrameShowcases()
    } catch (error) {
      console.error('[Frame] animation init failed', error)
    }

    return () => {
      cleanupAnim?.()
      cleanupShow?.()
    }
  }, [])

  return (
    <div
      className="cicada-page"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}

export default HomePage
