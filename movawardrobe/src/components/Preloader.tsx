'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [count, setCount] = useState(0)
  const [exit, setExit] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('mova-loaded')) {
      setHidden(true)
      return
    }
    const interval = setInterval(() => {
      setCount(c => {
        if (c >= 100) { clearInterval(interval); return 100 }
        return c + Math.floor(Math.random() * 8) + 3
      })
    }, 40)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (count >= 100) {
      setTimeout(() => {
        setExit(true)
        setTimeout(() => {
          setHidden(true)
          sessionStorage.setItem('mova-loaded', '1')
        }, 900)
      }, 300)
    }
  }, [count])

  if (hidden) return null

  return (
    <div className={`preloader${exit ? ' exit' : ''}`}>
      <div className="preloader-logo">MovaWardrobe</div>
      <div className="preloader-line" />
      <div className="preloader-count">{String(Math.min(count, 100)).padStart(3, '0')}</div>
    </div>
  )
}
