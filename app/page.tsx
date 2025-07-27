"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Code2,
  Palette,
  Smartphone,
  Zap,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  ArrowRight,
  Star,
  Users,
  Coffee,
  Rocket,
} from "lucide-react"
import CustomCursor from "@/components/CustomCursor"
import Loader from "@/components/Loader"
import ProjectCard from "@/components/ProjectCard"
import AboutSection from "@/components/AboutSection"
import Footer from "@/components/Footer"
import { useScrollReveal, useStaggerAnimation } from "@/hooks/useScrollReveal"

// Custom cursor component
function CustomCursorComponent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateMousePosition = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }

      const handleMouseEnter = () => setIsHovering(true)
      const handleMouseLeave = () => setIsHovering(false)

      window.addEventListener("mousemove", updateMousePosition)

      const interactiveElements = document.querySelectorAll("button, a, [data-interactive]")
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter)
        el.addEventListener("mouseleave", handleMouseLeave)
      })

      return () => {
        window.removeEventListener("mousemove", updateMousePosition)
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnter)
          el.removeEventListener("mouseleave", handleMouseLeave)
        })
      }
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference"
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
    />
  )
}

// Typing Animation Component
function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }
      },
      delay + currentIndex * 50,
    )

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay])

  return (
    <span>
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-6 bg-cyan-400 ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
      />
    </span>
  )
}

// Floating Elements Background
function FloatingElements() {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
      
      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight })
      }
      
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            y: [null, Math.random() * dimensions.height],
            x: [null, Math.random() * dimensions.width],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}

// 3D CSS Laptop Component
function CSSLaptop() {
  return (
    <div className="relative w-full h-96 flex items-center justify-center perspective-1000">
      <motion.div
        className="relative transform-gpu"
        animate={{
          rotateY: [0, 5, 0, -5, 0],
          rotateX: [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {/* Laptop Base */}
        <div className="w-80 h-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-2xl transform rotateX-60" />

        {/* Laptop Screen */}
        <div className="w-80 h-48 bg-gradient-to-b from-gray-900 to-black rounded-t-lg border-4 border-gray-700 relative -mt-2 transform-gpu">
          {/* Screen Content */}
          <div className="absolute inset-2 bg-black rounded overflow-hidden">
            {/* Terminal Window */}
            <div className="bg-gray-900 p-2 text-xs">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-gray-400 ml-2">terminal</span>
              </div>
              <div className="text-green-400 font-mono">
                <div className="mb-1">$ npm run dev</div>
                <div className="mb-1 text-cyan-400">{"> Ready on http://localhost:3000"}</div>
                <div className="mb-1">$ git commit -m "✨ Amazing features"</div>
                <div className="text-yellow-400">{"> Building the future..."}</div>
                <motion.div
                  className="inline-block w-2 h-4 bg-green-400 ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </div>
          </div>

          {/* Screen Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 to-transparent rounded" />
        </div>
      </motion.div>
    </div>
  )
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isLoading, setIsLoading] = useState(true)
  useScrollReveal()
  useStaggerAnimation(".project-card", 0.2)

  // Scroll spy functionality
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const sections = ["home", "services", "projects", "about", "contact"]
        const scrollPosition = window.scrollY + 100

        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const offsetTop = element.offsetTop
            const offsetHeight = element.offsetHeight

            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section)
              break
            }
          }
        }
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const services = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Full-Stack Development",
      description: "End-to-end web applications with modern frameworks and scalable architecture.",
      tech: ["React", "Next.js", "Node.js", "TypeScript"],
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that convert visitors into customers.",
      tech: ["Figma", "Framer", "Adobe XD", "Principle"],
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Development",
      description: "Native and cross-platform mobile apps that perform flawlessly.",
      tech: ["React Native", "Flutter", "Swift", "Kotlin"],
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Optimization",
      description: "Lightning-fast websites that rank higher and convert better.",
      tech: ["Lighthouse", "WebVitals", "CDN", "Caching"],
    },
  ]

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack marketplace with real-time inventory and payments",
      tech: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
      image: "/placeholder.svg?height=200&width=300",
      link: "#",
    },
    {
      title: "SaaS Analytics Dashboard",
      description: "Real-time data visualization with interactive charts",
      tech: ["React", "D3.js", "Node.js", "MongoDB"],
      image: "/placeholder.svg?height=200&width=300",
      link: "#",
    },
    {
      title: "Mobile Banking App",
      description: "Secure financial app with biometric authentication",
      tech: ["React Native", "Firebase", "Plaid API", "Face ID"],
      image: "/placeholder.svg?height=200&width=300",
      link: "#",
    },
  ]

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "50+", label: "Happy Clients" },
    { icon: <Rocket className="w-6 h-6" />, value: "100+", label: "Projects Delivered" },
    { icon: <Coffee className="w-6 h-6" />, value: "1000+", label: "Cups of Coffee" },
    { icon: <Star className="w-6 h-6" />, value: "5.0", label: "Average Rating" },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <CustomCursor />
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <FloatingElements />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-gray-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            DevDuo
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {["Home", "Services", "Projects", "About", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-cyan-400 transition-colors relative"
                whileHover={{ y: -2 }}
                data-interactive
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(item.toLowerCase())
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400"
                    layoutId="activeSection"
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-interactive
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="container mx-auto px-6 py-4 space-y-4">
                {["Home", "Services", "Projects", "About", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-gray-300 hover:text-cyan-400 transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsMenuOpen(false)
                      const element = document.getElementById(item.toLowerCase())
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    data-interactive
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]" />

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <motion.div
                className="inline-block px-4 py-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-cyan-400 text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                ✨ Available for Projects
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">We Build</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Digital Dreams
                </span>
              </h1>

              <p className="text-xl text-gray-400 max-w-lg">
                <TypingText
                  text="Two developers, one vision: crafting exceptional web experiences that push the boundaries of what's possible."
                  delay={500}
                />
              </p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 group"
                data-interactive
                onClick={() => {
                  const element = document.getElementById('contact')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 px-8 py-3 rounded-full transition-all duration-300 bg-transparent"
                data-interactive
                onClick={() => {
                  const element = document.getElementById('projects')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                View Our Work
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-cyan-400 mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Scene with Fallback */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="h-96 lg:h-[500px] relative">
              {/* Fallback CSS Laptop - Always visible */}
              <div className="relative w-full h-full flex items-center justify-center perspective-1000">
                <motion.div
                  className="relative transform-gpu"
                  animate={{
                    rotateY: [0, 5, 0, -5, 0],
                    rotateX: [0, 2, 0, -2, 0],
                    y: [0, -10, 0, -10, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  {/* Laptop Base */}
                  <div className="w-80 h-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-2xl transform rotateX-60" />

                  {/* Laptop Screen */}
                  <div className="w-80 h-48 bg-gradient-to-b from-gray-900 to-black rounded-t-lg border-4 border-gray-700 relative -mt-2 transform-gpu">
                    {/* Screen Content */}
                    <div className="absolute inset-2 bg-black rounded overflow-hidden">
                      {/* Terminal Window */}
                      <div className="bg-gray-900 p-2 text-xs">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full" />
                          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                          <span className="text-gray-400 ml-2">terminal</span>
                        </div>
                        <div className="text-green-400 font-mono">
                          <div className="mb-1">$ npm run dev</div>
                          <div className="mb-1 text-cyan-400">{"> Ready on http://localhost:3000"}</div>
                          <div className="mb-1">$ git commit -m "✨ Amazing features"</div>
                          <div className="text-yellow-400">{"> Building the future..."}</div>
                          <div className="text-white mt-2 text-xs">
                            We craft performant, animated,
                            <br />
                            and futuristic web experiences.
                          </div>
                          <motion.div
                            className="inline-block w-2 h-4 bg-green-400 ml-1"
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Screen Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 to-transparent rounded" />
                  </div>

                  {/* Floating Elements Around Laptop */}
                  <motion.div
                    className="absolute -top-10 -left-10 w-4 h-4 bg-cyan-400/30 rounded-full"
                    animate={{
                      y: [0, -20, 0],
                      x: [0, 10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute -top-5 -right-15 w-3 h-3 bg-blue-500/40 rounded-full"
                    animate={{
                      y: [0, -15, 0],
                      x: [0, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-5 left-5 w-2 h-2 bg-cyan-300/50 rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      x: [0, 15, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Our Expertise
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We combine cutting-edge technology with creative design to deliver solutions that exceed expectations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                data-animate="scale"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm p-6 h-full hover:border-cyan-400/50 transition-all duration-300 relative overflow-hidden">
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-cyan-400/10 text-cyan-400 border-cyan-400/20 text-xs hover:bg-cyan-400/20 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A showcase of our recent work, each project tells a story of innovation and excellence.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={project.title} className="project-card">
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tech={project.tech}
                  image={project.image}
                  liveUrl={project.link}
                  githubUrl="#"
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black" />

        <AboutSection />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Let's Create Together
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Ready to bring your vision to life? We'd love to hear about your project.
            </p>
          </motion.div>

          <motion.div className="max-w-2xl mx-auto" data-animate="fade-up">
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm p-8 relative overflow-hidden">
              {/* Background Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-500/5"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              <form className="space-y-6 relative z-10">
                <motion.div className="grid md:grid-cols-2 gap-6">
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <Input
                      className="bg-gray-800/50 border-gray-700 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300"
                      placeholder="Your name"
                      data-interactive
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <Input
                      type="email"
                      className="bg-gray-800/50 border-gray-700 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300"
                      placeholder="your@email.com"
                      data-interactive
                    />
                  </motion.div>
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
                  <Input
                    className="bg-gray-800/50 border-gray-700 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300"
                    placeholder="Web App, Mobile App, Design, etc."
                    data-interactive
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tell us about your project</label>
                  <Textarea
                    className="bg-gray-800/50 border-gray-700 focus:border-cyan-400 focus:ring-cyan-400/20 min-h-[120px] transition-all duration-300"
                    placeholder="Describe your vision, goals, and any specific requirements..."
                    data-interactive
                  />
                </motion.div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105 group"
                  data-interactive
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Message
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
