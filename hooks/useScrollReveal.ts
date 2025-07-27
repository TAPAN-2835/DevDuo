"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function useScrollReveal() {
  const elementsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    const elements = document.querySelectorAll("[data-animate]")
    elementsRef.current = Array.from(elements) as HTMLElement[]

    elementsRef.current.forEach((element, index) => {
      const animationType = element.getAttribute("data-animate")

      let animation = {}

      switch (animationType) {
        case "fade-up":
          gsap.set(element, { opacity: 0, y: 50 })
          animation = { opacity: 1, y: 0 }
          break
        case "fade-in":
          gsap.set(element, { opacity: 0 })
          animation = { opacity: 1 }
          break
        case "slide-left":
          gsap.set(element, { opacity: 0, x: 50 })
          animation = { opacity: 1, x: 0 }
          break
        case "slide-right":
          gsap.set(element, { opacity: 0, x: -50 })
          animation = { opacity: 1, x: 0 }
          break
        case "scale":
          gsap.set(element, { opacity: 0, scale: 0.8 })
          animation = { opacity: 1, scale: 1 }
          break
        default:
          gsap.set(element, { opacity: 0, y: 30 })
          animation = { opacity: 1, y: 0 }
      }

      ScrollTrigger.create({
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        animation: gsap.to(element, {
          ...animation,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.1,
        }),
        toggleActions: "play none none reverse",
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return elementsRef
}

export function useStaggerAnimation(selector: string, delay = 0.1) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)

    gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elements[0],
          start: "top 80%",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [selector, delay])
}
