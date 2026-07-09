export function waitForGsap() {
  return new Promise((resolve) => {
    const check = () => {
      if (
        window.gsap &&
        window.ScrollTrigger &&
        window.MotionPathPlugin &&
        window.SplitText &&
        window.DrawSVGPlugin &&
        window.CustomEase
      ) {
        resolve()
      } else {
        requestAnimationFrame(check)
      }
    }

    check()
  })
}
