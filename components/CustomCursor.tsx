"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let animationFrame: number

    const updateMousePosition = (e: MouseEvent) => {
      animationFrame = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
        setIsVisible(true)
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)
    const handleMouseOut = () => setIsVisible(false)

    // Add event listeners
    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseout", handleMouseOut)

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "button, a, [data-interactive], input, textarea, [role='button']",
      )

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter)
        el.addEventListener("mouseleave", handleMouseLeave)
      })

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnter)
          el.removeEventListener("mouseleave", handleMouseLeave)
        })
      }
    }

    // Initial setup and observer for dynamic content
    const cleanup = addHoverListeners()

    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseout", handleMouseOut)
      cancelAnimationFrame(animationFrame)
      cleanup()
      observer.disconnect()
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <div className="w-6 h-6 bg-cyan-400 rounded-full" />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.3 : 0.1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <div className="w-10 h-10 bg-cyan-400 rounded-full blur-md" />
      </motion.div>
    </>
  )
}
