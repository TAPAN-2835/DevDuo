"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Full-Stack Developer",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "With 8+ years of experience in modern web technologies, Alex specializes in building scalable applications with React, Node.js, and cloud infrastructure. Passionate about clean code and performance optimization.",
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "GraphQL"],
    social: {
      github: "#",
      linkedin: "#",
      email: "alex@devduo.com",
    },
  },
  {
    name: "Sarah Kim",
    role: "UI/UX Designer & Frontend Developer",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Sarah brings 6+ years of design expertise combined with frontend development skills. She creates beautiful, user-centered interfaces using Figma, React, and modern CSS frameworks. Always focused on accessibility and user experience.",
    skills: ["Figma", "React", "CSS", "Animation", "UX Research", "Prototyping"],
    social: {
      github: "#",
      linkedin: "#",
      email: "sarah@devduo.com",
    },
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div className="text-center mb-16" data-animate="fade-up">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Meet the Duo
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Two passionate developers united by a shared vision of creating exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {teamMembers.map((member, index) => (
            <motion.div key={member.name} data-animate={index === 0 ? "slide-right" : "slide-left"} className="group">
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm p-8 hover:border-cyan-400/50 transition-all duration-300 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Avatar and Basic Info */}
                  <div className="flex items-start gap-6 mb-6">
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
                      <Avatar className="w-20 h-20 border-2 border-cyan-400/50">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="bg-cyan-400/20 text-cyan-400 text-xl font-bold">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>

                    <div className="flex-1">
                      <motion.h3
                        className="text-2xl font-semibold text-white group-hover:text-cyan-400 transition-colors mb-2"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {member.name}
                      </motion.h3>
                      <p className="text-cyan-400 font-medium mb-4">{member.role}</p>

                      {/* Social Links */}
                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-cyan-400/50 text-cyan-400 bg-transparent hover:bg-cyan-400/10 p-2"
                          data-interactive
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-cyan-400/50 text-cyan-400 bg-transparent hover:bg-cyan-400/10 p-2"
                          data-interactive
                        >
                          <Linkedin className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-cyan-400/50 text-cyan-400 bg-transparent hover:bg-cyan-400/10 p-2"
                          data-interactive
                        >
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-400 leading-relaxed mb-6">{member.bio}</p>

                  {/* Skills */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: skillIndex * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-cyan-400/10 text-cyan-400 border-cyan-400/20 hover:bg-cyan-400/20 transition-colors"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timeline/Stats Section */}
        <motion.div className="mt-16 text-center" data-animate="fade-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "8+", label: "Years Experience" },
              { value: "100+", label: "Projects Completed" },
              { value: "50+", label: "Happy Clients" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
