import { useEffect, useRef } from 'react'

function Cursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseCurrent = { x: 0, y: 0 }
    let mouseLast = { x: 0, y: 0 }
    let rAF

    const lerp = (a, b, n) => (1 - n) * a + n * b

    const getMousePosition = (e) => {
      mouseCurrent = {
        x: e.clientX,
        y: e.clientY
      }
    }

    const run = () => {
      mouseLast.x = lerp(mouseLast.x, mouseCurrent.x, 0.2)
      mouseLast.y = lerp(mouseLast.y, mouseCurrent.y, 0.2)
      mouseLast.x = Math.floor(mouseLast.x * 100) / 100
      mouseLast.y = Math.floor(mouseLast.y * 100) / 100
      cursor.style.transform = `translate3d(${mouseLast.x}px, ${mouseLast.y}px, 0)`
      rAF = requestAnimationFrame(run)
    }

    window.addEventListener('mousemove', getMousePosition, false)
    rAF = requestAnimationFrame(run)

    const handleHover = (e) => {
      if (e.target.closest('.team .owl-theme .item, .services .owl-theme .item, .services2 .owl-theme .item, .portfolio .owl-theme .item, .testimonials .owl-theme .item, .gallery-item .item')) {
        cursor.classList.add('drag')
      } else {
        cursor.classList.remove('drag')
      }
    }

    document.addEventListener('mouseover', handleHover)

    return () => {
      window.removeEventListener('mousemove', getMousePosition)
      document.removeEventListener('mouseover', handleHover)
      cancelAnimationFrame(rAF)
    }
  }, [])

  return <div className="cursor js-cursor" ref={cursorRef}></div>
}

export default Cursor

