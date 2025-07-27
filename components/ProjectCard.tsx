"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  tech: string[]
  image: string
  liveUrl?: string
  githubUrl?: string
  index: number
}

export default function ProjectCard({ title, description, tech, image, liveUrl, githubUrl, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group"
      data-animate="fade-up"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      whileHover={{
        y: -10,
        rotateY: 5,
        rotateX: 5,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm overflow-hidden hover:border-cyan-400/50 transition-all duration-300 relative">
        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative overflow-hidden">
          <motion.img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-48 object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Action Buttons */}
          <motion.div
            className="absolute top-4 right-4 flex gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
            transition={{ duration: 0.3 }}
          >
            {liveUrl && (
              <Button size="sm" className="bg-cyan-400 hover:bg-cyan-500 text-black rounded-full p-2" data-interactive>
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
            {githubUrl && (
              <Button
                size="sm"
                variant="outline"
                className="border-white/50 text-white bg-black/50 rounded-full p-2"
                data-interactive
              >
                <Github className="w-4 h-4" />
              </Button>
            )}
          </motion.div>
        </div>

        <div className="p-6 relative z-10">
          <motion.h3
            className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>

          <p className="text-gray-400 mb-4 text-sm leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2">
            {tech.map((techItem, techIndex) => (
              <motion.div
                key={techItem}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: techIndex * 0.1 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-cyan-400/10 text-cyan-400 border-cyan-400/20 text-xs hover:bg-cyan-400/20 transition-colors"
                >
                  {techItem}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
