"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Linkedin, Mail } from "lucide-react"
import { useState } from "react"

export default function AboutSection() {
  const [selectedTab, setSelectedTab] = useState("alex")

  return (
    <section id="about" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center lg:ml-16 lg:mr-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 lg:pl-8"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Meet the Duo
              </span>
            </h2>

            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900/50 border border-gray-800">
                <TabsTrigger
                  value="alex"
                  className="data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400"
                  data-interactive
                >
                  Tapan Patel
                </TabsTrigger>
                <TabsTrigger
                  value="sarah"
                  className="data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400"
                  data-interactive
                >
                  Sarah Kim
                </TabsTrigger>
              </TabsList>

              <TabsContent value="alex" className="mt-6">
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-semibold text-cyan-400">Full-Stack Developer</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Passionate about modern web technologies and building scalable applications. Specializes in React, Node.js, and cloud infrastructure with a focus on clean code and performance optimization. Always eager to learn and adapt to new technologies.
                  </p>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-cyan-400/50 text-cyan-400 bg-transparent hover:bg-cyan-400/10"
                      data-interactive
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-cyan-400/50 text-cyan-400 bg-transparent hover:bg-cyan-400/10"
                      data-interactive
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="sarah" className="mt-6">
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-semibold text-cyan-400">UI/UX Designer & Frontend Developer</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Creative designer with strong frontend development skills. Creates beautiful, user-centered interfaces using Figma, React, and modern CSS frameworks. Passionate about accessibility and delivering exceptional user experiences.
                  </p>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-cyan-400/50 text-cyan-400 bg-transparent hover:bg-cyan-400/10"
                      data-interactive
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-cyan-400/50 text-cyan-400 bg-transparent hover:bg-cyan-400/10"
                      data-interactive
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            className="relative w-full lg:w-[600px] xl:w-[400px] aspect-square bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl overflow-hidden lg:ml-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full lg:w-[600px] xl:w-[400px] aspect-square bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm" />
              <div className="absolute inset-0">
                <motion.div
                  key={selectedTab}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full relative"
                >
                  <img 
                    src={selectedTab === "alex" ? "/profile.jpeg" : "/placeholder.svg?height=384&width=400"}
                    alt={selectedTab === "alex" ? "Tapan Patel" : "Sarah Kim"}
                    className="w-full h-full object-contain rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedTab === "alex" ? "Tapan Patel" : "Sarah Kim"}
                    </h3>
                    <p className="text-cyan-400 font-medium">
                      {selectedTab === "alex" ? "Full-Stack Developer" : "UI/UX Designer & Frontend Developer"}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
