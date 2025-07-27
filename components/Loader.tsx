"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Animate progress
    const tl = gsap.timeline()

    tl.to(
      {},
      {
        duration: 3,
        onUpdate: function () {
          setProgress(Math.round(this.progress() * 100))
        },
        onComplete: () => {
          setIsComplete(true)
          setTimeout(onComplete, 500)
        },
      },
    )

    // Animate loader elements
    gsap.fromTo(
      ".loader-logo",
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" },
    )

    gsap.to(".loader-logo", {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: "none",
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated Logo */}
          <div className="loader-logo mb-8">
            <div className="w-20 h-20 border-4 border-cyan-400 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20" />
              <span className="text-2xl font-bold text-cyan-400 z-10">DD</span>
            </div>
          </div>

          {/* Loading Text */}
          <motion.h2
            className="text-2xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Initializing Experience
          </motion.h2>

          {/* Progress Bar */}
          <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress Text */}
          <motion.p
            className="text-cyan-400 text-lg font-mono"
            key={progress}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {progress}%
          </motion.p>

          {/* Loading Messages */}
          <motion.div
            className="mt-8 text-center text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {progress < 30 && "Loading 3D models..."}
            {progress >= 30 && progress < 60 && "Initializing animations..."}
            {progress >= 60 && progress < 90 && "Preparing experience..."}
            {progress >= 90 && "Almost ready!"}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
