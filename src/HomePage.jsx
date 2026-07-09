import { useEffect } from 'react'
import markup from './cicada/cicadaMarkup.html?raw'
import './cicada/style.sass'
import { initCicadaAnimations } from './cicada/initCicadaAnimations'
import { waitForGsap } from './cicada/waitForGsap'

function HomePage() {
  useEffect(() => {
    let cleanup
    let active = true

    waitForGsap().then(() => {
      if (!active) return
      cleanup = initCicadaAnimations()
    })

    return () => {
      active = false
      cleanup?.()
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
