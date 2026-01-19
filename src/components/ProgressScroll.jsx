import { useEffect, useRef } from 'react'

function ProgressScroll() {
  const progressPathRef = useRef(null)
  const progressWrapRef = useRef(null)

  useEffect(() => {
    const progressPath = progressPathRef.current
    if (!progressPath) return

    const pathLength = progressPath.getTotalLength()
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none'
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength
    progressPath.style.strokeDashoffset = pathLength
    progressPath.getBoundingClientRect()
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear'

    const updateProgress = () => {
      const scroll = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = pathLength - (scroll * pathLength / height)
      progressPath.style.strokeDashoffset = progress
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress)

    const handleScroll = () => {
      if (window.scrollY > 150) {
        progressWrapRef.current?.classList.add('active-progress')
      } else {
        progressWrapRef.current?.classList.remove('active-progress')
      }
    }

    window.addEventListener('scroll', handleScroll)

    const handleClick = (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    progressWrapRef.current?.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('scroll', handleScroll)
      progressWrapRef.current?.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className="progress-wrap cursor-pointer" ref={progressWrapRef}>
      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path ref={progressPathRef} d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
    </div>
  )
}

export default ProgressScroll

