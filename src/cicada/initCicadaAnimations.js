export function initCicadaAnimations() {
  const listeners = []
  const hoverTimelines = []
  const addListener = (element, event, handler) => {
    element.addEventListener(event, handler)
    listeners.push({ element, event, handler })
  }

  const { gsap, ScrollTrigger, MotionPathPlugin, SplitText, DrawSVGPlugin, CustomEase } =
    window

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

  gsap.registerPlugin(
    SplitText,
    DrawSVGPlugin,
    MotionPathPlugin,
    ScrollTrigger,
    CustomEase,
  )

  CustomEase.create('yButterfly', '.17,.17,.43,1')
  CustomEase.create('butterflyShow', '.17,.17,.46,1')
  CustomEase.create('butterflyDown', '.53,0,.49,1')
  CustomEase.create('butterflyUp', '.73,0,.41,1')
  CustomEase.create('yButterflyDown', '.68,0,.43,1')
  CustomEase.create('butterflyHide', '.68,0,0,1')
  CustomEase.create('clip', '.57,0,.43,1')

  const TREE_ORIGINAL_WIDTH_REM = 19
  const TREE_CURRENT_WIDTH_REM = 12
  const TREE_SIZE_RATIO = TREE_CURRENT_WIDTH_REM / TREE_ORIGINAL_WIDTH_REM
  const TREE_LAYOUT = { transformOrigin: '50% 100%' }
  const TREE_SECTION_SCALE = 2.4 / TREE_SIZE_RATIO
  const TREE_SECTION_Y = 125 / TREE_SIZE_RATIO

  let hoverActive = false

  function initSplitText(elements) {
    const textWrappers = document.querySelectorAll(elements);
    if (!textWrappers.length) return false;
    new SplitText(elements, { type: 'lines', linesClass: 'fade-overflow' });

    textWrappers.forEach(textWrapper => {
      textWrapper.querySelectorAll('.fade-overflow').forEach((letterWrapp) => {
        const letter = letterWrapp.innerHTML;
        letterWrapp.innerText = '';
        letterWrapp.innerHTML = `<div class='fade-el'>${letter}</div>`;
      });
    });
  }

  initSplitText('.split');

  const sections = gsap.utils.toArray('.banner-slide');
  const wrap = gsap.utils.wrap(0, sections.length);
  const tree = document.querySelector('.banner-tree');

  if (tree) {
    gsap.set(tree, TREE_LAYOUT)
  }

  let currentIndex = 0;

  const tlAnimation = gsap.timeline({
    defaults: { duration: 1.2 },
    scrollTrigger: {
      trigger: 'main',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        hoverActive = false;
      },
    },
  });

  function gotoSection(index) {
    index = wrap(index);

    const currentSection = sections[currentIndex];
    const nextSection = sections[index];
    if (!currentSection || !nextSection) return;

    const textCurrent = currentSection.querySelectorAll('.fade-overflow');
    const textNext = nextSection.querySelectorAll('.fade-overflow');

    tlAnimation
      .to(currentSection, {
      scale: 0.7,
      opacity: 0,
      ease: 'power0.easeIn',
    })
      .to(textCurrent, {
      y: -350,
      stagger: {
        each: 0.02,
        from: 'start',
      },
      ease: 'power0.easeIn',
    }, '<')
      .to(tree, {
      ...TREE_LAYOUT,
      scale: index > 0 ? TREE_SECTION_SCALE : 1,
      yPercent: index > 0 ? TREE_SECTION_Y : 0,
      duration: 0.8,
      }, '<')
      .fromTo(textNext, {
      y: 400,
    }, {
      y: 0,
      stagger: {
        each: 0.02,
        from: 'start',
      },
      ease: 'power1.easeOut',
    }, '<0.4')
      .fromTo([nextSection], {
      scale: 0.7,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      ease: 'power1.easeOut',
    }, '<');

    currentIndex = index;
  }

  function treeAnimation() {
    tlAnimation
      .to('.banner-text', {
      y: '150%',
      opacity: 0,
      duration: 0.8,
    })
      .to(tree, {
      ...TREE_LAYOUT,
      scale: 1,
      yPercent: 0,
      duration: 0.8,
    }, '<')
      .to(tree, {
      opacity: 0,
      duration: 0.4,
    }, '>-=0.15')
      .set('.tree svg', {
      display: 'block',
    }, '<-=0.1')
      .fromTo('.tree-svg__bottom',
              {
      drawSVG: '0%',
      strokeWidth: 33,
    },
              {
      drawSVG: '100%',
      strokeWidth: 33,
      duration: 0.5,
    }, '<'
             )
      .fromTo('.tree-svg__top', {
      drawSVG: '0%',
      strokeWidth: 33,
    }, {
      drawSVG: '100%',
      strokeWidth: 33,
      duration: 0.5,
    })
      .fromTo('.tree-svg__left', {
      drawSVG: '0%',
      strokeWidth: 33,
      rotate: '25deg',
      transformOrigin: 'bottom right',
    }, {
      drawSVG: '75%',
      strokeWidth: 33,
      rotate: '25deg',
      transformOrigin: 'bottom right',
      duration: 0.5,
    }, '<')
      .fromTo('.tree-svg__right', {
      drawSVG: '0%',
      strokeWidth: 33,
      rotate: '-25deg',
      transformOrigin: 'bottom left',
    }, {
      drawSVG: '75%',
      strokeWidth: 33,
      rotate: '-25deg',
      transformOrigin: 'bottom left',
      duration: 0.5,
    }, '<')
      .fromTo('.tree-svg__right-top', {
      drawSVG: '0%',
      strokeWidth: 33,
      rotate: '-13deg',
      transformOrigin: 'bottom left',
    }, {
      drawSVG: '85%',
      strokeWidth: 33,
      rotate: '-13deg',
      transformOrigin: 'bottom left',
      duration: 0.5,
    }, '<')
      .fromTo('.tree-svg__left-top', {
      drawSVG: '0%',
      strokeWidth: 33,
      rotate: '13deg',
      transformOrigin: 'bottom right',
    }, {
      drawSVG: '85%',
      strokeWidth: 33,
      rotate: '13deg',
      transformOrigin: 'bottom right',
      duration: 0.5,
    }, '<')
      .to('.tree-svg__branches', {
      drawSVG: '100%',
      strokeWidth: 3,
      rotate: '0',
      duration: 0.5,
    })
      .to('.tree-svg__bottom', {
      strokeWidth: 3,
      duration: 0.5,
    }, '<')
      .to('.tree-circle', {
      scale: 0.65,
      duration: 0.5,
    }, '<')
      .set('.tree-circle__big', {
      boxShadow: '0 0 0 200px var(--color-fat-tuesday)',
    }, '<')
      .to('.tree-circle__big', {
      boxShadow: '0 0 0 1px var(--color-fat-tuesday)',
      ease: 'power1.easeIn',
      duration: 0.5,
    }, '<')
      .set('.tree-circle__small', {
      boxShadow: '0 0 0 200px var(--color-fat-tuesday)',
    }, '<')
      .to('.tree-circle__small', {
      boxShadow: '0 0 0 3px var(--color-fat-tuesday)',
      ease: 'power1.easeIn',
      duration: 0.5,
    }, '<')
      .to('.tree-circle__big', {
      scale: 1,
      duration: 0.4,
    })
      .fromTo('.tree-name', {
      y: '-100%',
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.4,
    }, '<')
      .fromTo('.tree-title span', {
      y: '100%',
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.4,
    })
      .to('.tree-ball', {
      opacity: 1,
      scale: 1,
      duration: 0.4,
    }, '<')
      .call(function () {
      hoverActive = true;
    });
  }

  sections.forEach((element, index) => {
    if (index != sections.length - 1) {
      gotoSection(index + 1);
    }
  });

  treeAnimation();

  ScrollTrigger.refresh()

  const onResize = () => ScrollTrigger.refresh()
  addListener(window, 'resize', onResize)

  const headerLogo = document.querySelector('.header-logo')
  if (headerLogo) {
    addListener(headerLogo, 'click', (e) => {
      e.preventDefault()
      location.reload()
    })
  }

  const tlCircles = gsap.timeline({
    paused: true,
  }).fromTo('.tree-circle__big', {
    boxShadow: '0 0 0 1px rgb(52 31 55)',
  }, {
    duration: 0.4,
    ease: 'power1.outIn',
    boxShadow: '0 0 0 3px rgb(52 31 55)',
  })
  .fromTo('.tree-circle__small', {
    boxShadow: '0 0 0 3px rgb(52 31 55)',
  }, {
    duration: 0.4,
    ease: 'power1.outIn',
    boxShadow: '0 0 0 1px rgb(52 31 55)',
  }, '<');

  document.querySelectorAll('.tree-title').forEach((element) => {
    const elementPosition = element.getAttribute('data-position');

    const timelineHover = gsap.timeline({
      paused: true,
    });

    let endSmallPos = 0.125, endBigPos = 0.535;

    if (elementPosition.includes('-top')) {
      endSmallPos = 0.155;
      endBigPos = 0.58;
    } else if (elementPosition.includes('top')) {
      endSmallPos = 0.175;
      endBigPos = 0.597;
    }

    timelineHover
      .to(`.tree-title[data-position="${elementPosition}"]`, {
      duration: 0.4,
      ease: 'power1.inOut',
      scale: 1.33,
      y: '-=30%',
    })
      .to(`.tree-ball[data-position="${elementPosition}"] .tree-ball__1`, {
      duration: 0.4,
      ease: 'power1.inOut',
      scale: 2.25,
    }, '<')
      .to(`.tree-svg__branches[data-position="${elementPosition}"]`, {
      duration: 0.4,
      ease: 'power1.inOut',
      strokeWidth: 9,
    }, '<')
      .set(`.tree-ball[data-position="${elementPosition}"] .tree-ball__2`, {
      opacity: 1,
    })
      .set(`.tree-ball[data-position="${elementPosition}"] .tree-ball__3`, {
      opacity: 1,
    })
      .to(`.tree-title[data-position="${elementPosition}"] .tree-title__decor.left`, {
      duration: 0.4,
      ease: 'power1.inOut',
      opacity: 1,
      x: '-100%',
    })
      .to(`.tree-title[data-position="${elementPosition}"] .tree-title__decor.right`, {
      duration: 0.4,
      ease: 'power1.inOut',
      opacity: 1,
      x: '100%',
    }, '<')
      .to(`.tree-ball[data-position="${elementPosition}"] .tree-ball__2`, {
      duration: 0.7,
      ease: 'power1.inOut',
      motionPath: {
        path: `.tree-svg__branches[data-position="${elementPosition}"]`,
        align: `.tree-svg__branches[data-position="${elementPosition}"]`,
        autoRotate: true,
        alignOrigin: [1, 0.5],
        start: 1,
        end: endSmallPos,
      },
    }, '<')
      .to(`.tree-ball[data-position="${elementPosition}"] .tree-ball__3`, {
      duration: 0.4,
      ease: 'power1.inOut',
      motionPath: {
        path: `.tree-svg__branches[data-position="${elementPosition}"]`,
        align: `.tree-svg__branches[data-position="${elementPosition}"]`,
        autoRotate: true,
        alignOrigin: [1, 0.5],
        start: 1,
        end: endBigPos,
      },
    }, '<0.3');

    hoverTimelines.push(timelineHover)

    addListener(element, 'mouseover', () => {
      if (hoverActive) {
        timelineHover.play()
        tlCircles.play()
      }
    })

    addListener(element, 'mouseout', () => {
      timelineHover.reverse()
      tlCircles.reverse()
    })

    const treeBall = document.querySelector(
      `.tree-ball[data-position="${elementPosition}"]`,
    )

    if (treeBall) {
      addListener(treeBall, 'mouseover', () => {
        if (hoverActive) {
          timelineHover.play()
        }
      })

      addListener(treeBall, 'mouseout', () => {
        timelineHover.reverse()
      })
    }
  });
  
  const tlSound = gsap.timeline({
    paused: true,
    yoyo: true,
    repeat: -1,
  })
  .to('.sound-item:nth-child(even)', {
    height: '0.15rem',
    duration: 0.5,    
  });
  
  const tlSound2 = gsap.timeline({
    paused: true,
    yoyo: true,
    repeat: -1,
  })
  .to('.sound-item:nth-child(odd)', {
    height: '0.10rem',
    duration: 0.45,
  })
  
  const audio = document.querySelector('#audio')
  const soundButton = document.querySelector('.sound')

  if (soundButton) {
    addListener(soundButton, 'click', function onSoundClick() {
      if (this.classList.contains('active')) {
        tlSound.pause()
        tlSound2.pause()
        this.classList.remove('active')
        audio?.pause()
      } else {
        tlSound.resume()
        tlSound2.resume()
        this.classList.add('active')
        audio?.play()
      }
    })
  }

  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    tlAnimation.kill()
    tlCircles.kill()
    tlSound.kill()
    tlSound2.kill()
    hoverTimelines.forEach((timeline) => timeline.kill())
    audio?.pause()
    listeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler)
    })
  }
}