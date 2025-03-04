'use client'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

export default function Typing() {
  const el = useRef(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Learn and Thrive', 'Get a Mentor', 'Become a Mentor', 'Prepare for an Interview'],
      typeSpeed: 150,
      loop: true,
      cursorChar: ' _',
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <>
      <span ref={el} />
    </>
  )
}
