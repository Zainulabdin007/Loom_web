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
      opacity: 0,
    }, '<')
      .to('.tree-circle', {
      scale: 0.65,
      duration: 0.5,
    })
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

  const fadeEls = gsap.utils.toArray('.fade-up')
  if (fadeEls.length) {
    gsap.set(fadeEls, { opacity: 0, y: 40 })
    ScrollTrigger.batch(fadeEls, {
      start: 'top 88%',
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.08,
          overwrite: true,
        }),
    })
  }

  // Step numbers replay the tree's ink-collapse: a solid violet disc
  // that drains into a thin ring as each step enters the viewport.
  const stepNums = gsap.utils.toArray('.frame-step__num')
  if (stepNums.length) {
    stepNums.forEach((num) => {
      const step = num.closest('.frame-step')
      const isOrange = step?.classList.contains('frame-step--orange')
      const fill = isOrange ? 'rgba(232, 135, 74, 0.9)' : 'rgba(175, 80, 255, 0.9)'
      const ring = isOrange ? 'rgba(232, 135, 74, 0.7)' : 'rgba(175, 80, 255, 0.65)'

      gsap.set(num, { boxShadow: '0 0 0 1px rgba(0, 0, 0, 0)' })
      ScrollTrigger.create({
        trigger: num,
        start: 'top 85%',
        once: true,
        onEnter: () =>
          gsap.fromTo(
            num,
            { boxShadow: `0 0 0 40px ${fill}` },
            {
              boxShadow: `0 0 0 1px ${ring}`,
              duration: 0.9,
              ease: 'power2.out',
            },
          ),
      })
    })
  }

  // Privacy bullets wake up with a repeating sonar echo once seen.
  const privacyItems = gsap.utils.toArray('.frame-privacy__list li')
  if (privacyItems.length) {
    ScrollTrigger.batch(privacyItems, {
      start: 'top 85%',
      once: true,
      onEnter: (batch) =>
        batch.forEach((item, index) => {
          gsap.delayedCall(index * 0.35, () => item.classList.add('is-live'))
        }),
    })
  }

  // Edge arcs drift slowly against the scroll for parallax depth.
  gsap.utils.toArray('.frame .frame-arc').forEach((arc, index) => {
    const drift = 14 + (index % 3) * 8
    gsap.fromTo(
      arc,
      { yPercent: drift },
      {
        yPercent: -drift,
        ease: 'none',
        scrollTrigger: {
          trigger: arc.closest('.frame-section') || arc,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )
  })

  gsap.utils.toArray('.frame-rings').forEach((rings) => {
    gsap.fromTo(
      rings,
      { scale: 0.65, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: rings.closest('.frame-section') || rings,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )
  })

  const toolbar = document.querySelector('.toolbar')
  const frame = document.querySelector('.frame')
  if (toolbar && frame) {
    ScrollTrigger.create({
      trigger: frame,
      start: 'top top',
      end: 'bottom top',
      onToggle: (self) => {
        toolbar.classList.toggle('toolbar--over-dark', self.isActive)
      },
    })
  }

  ScrollTrigger.refresh()

  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    tlAnimation.kill()
    tlCircles.kill()
    tlSound.kill()
    tlSound2.kill()
    hoverTimelines.forEach((timeline) => timeline.kill())
    toolbar?.classList.remove('toolbar--over-dark')
    audio?.pause()
    listeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler)
    })
  }
}