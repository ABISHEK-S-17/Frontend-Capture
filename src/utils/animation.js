export function initAnimations() {
  // Initialize WOW.js
  try {
    if (window.WOW) {
      new window.WOW({
        animateClass: 'animated',
        offset: 100
      }).init()
    }
  } catch (e) {
    console.warn('WOW.js initialization failed:', e)
  }

  // Initialize Splitting.js
  try {
    if (window.Splitting) {
      window.Splitting()
    }
  } catch (e) {
    console.warn('Splitting.js initialization failed:', e)
  }

  // Background images
  const pageSections = document.querySelectorAll('.bg-img, section')
  pageSections.forEach((section) => {
    const bg = section.getAttribute('data-background')
    if (bg) {
      section.style.backgroundImage = `url(${bg})`
    }
  })

  // Reveal effect
  const revealElements = document.querySelectorAll('.reveal-effect')
  const observerOptions = {
    threshold: 0,
    rootMargin: '0px 0px -100px 0px'
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated')
        revealObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  revealElements.forEach((element) => {
    revealObserver.observe(element)
  })

  // Portfolio fade-in
  const faders = document.querySelectorAll('.fade-in')
  const sliders = document.querySelectorAll('.slide-in')
  const imageAnimations = document.querySelectorAll('.image-in')

  const appearOptions = {
    threshold: 0,
    rootMargin: '0px 0px -100px 0px'
  }

  const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear')
        appearOnScroll.unobserve(entry.target)
      }
    })
  }, appearOptions)

  faders.forEach((fader) => appearOnScroll.observe(fader))
  sliders.forEach((slider) => appearOnScroll.observe(slider))
  imageAnimations.forEach((image) => appearOnScroll.observe(image))
}

