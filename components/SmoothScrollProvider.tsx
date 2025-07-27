"use client"

import { useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Register GSAP ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger)

      // Initialize Lenis
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      })

      // Expose Lenis to window for other components
      window.lenis = lenisRef.current

      // Connect Lenis to GSAP ScrollTrigger
      lenisRef.current.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time) => {
        lenisRef.current?.raf(time * 1000)
      })

      gsap.ticker.lagSmoothing(0)

      return () => {
        lenisRef.current?.destroy()
        gsap.ticker.remove(lenisRef.current?.raf)
      }
    }
  }, [])

  return <>{children}</>
} 