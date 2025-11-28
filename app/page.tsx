"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

import AnimatedWaveBackground from "@/components/animatedBackground";
import { WaveBackground } from "@/components/wave-background"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])!
  // var ref = useRef<(HTMLElement | null)[]>([])!


  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen  text-foreground relative">
      {/* <AnimatedWaveBackground /> */}
      <WaveBackground isDark={isDark} />
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "thoughts", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => { sectionsRef.current[0] = el }}
          className="min-h-screen flex items-center opacity-0"
        >
          <Card className="px-5 py-5 bg-background/80">
            <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
              <div className="lg:col-span-3 space-y-6 sm:space-y-8">
                <div className="space-y-3 sm:space-y-2">
                  <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                    Theodor
                    <br />
                    <span className="text-muted-foreground">Ionică</span>
                  </h1>
                </div>

                <div className="space-y-6 max-w-md">
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    Software Engineer creating digital solutions at the intersection of
                    <span className="text-foreground hover:text-yellow"> design</span>,<span className="text-foreground hover:text-chart-2"> technology</span>,
                    and
                    <span className="text-foreground hover:text-chart-4"> user experience</span>.
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Available for work
                    </div>
                    <div>EU - Romania</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                  <div className="space-y-2">
                    <div className="text-foreground">Software Engineer / Master Student</div>
                    <div className="text-muted-foreground">@ Self-employed / RTU</div>
                    <div className="text-xs text-muted-foreground">2021 — Present</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Node.js", "Python"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </header>

        <section
          id="work"
          ref={(el) => { sectionsRef.current[1] = el }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <Card className="px-5 py-5 bg-background/80">
            <div className="space-y-12 sm:space-y-16">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <h2 className="text-3xl sm:text-4xl font-light">What I did</h2>
                <div className="text-sm text-muted-foreground font-mono">2018 — 2025</div>
              </div>

              <div className="space-y-8 sm:space-y-12">
                {[
                  {
                    year: "2025",
                    role: "FullStack Developer",
                    company: "Treidee(e)",
                    description: "Created the fullstack architecture for the whole application. Managed containerization and deployment.",
                    tech: ["React", "TypeScript", "Node.js", "Supabase"],
                  },
                  {
                    year: "2022",
                    role: "Intern",
                    company: "HASS Web Design",
                    description: "Built performant scripts for automating mundane tasks.",
                    tech: ["React", "Python", "Java"],
                  },
                  {
                    year: "2020/24",
                    role: "Student",
                    company: "Technical University of Cluj-Napoca && Universidad Politencica de Cartagena",
                    description: "Studied as an electronic engineer in Romania and in Spain with an Erasmus scolarship.",
                    tech: ["Engineering", "Economics", "Management"],
                  },
                  {
                    year: "2018/19",
                    role: "WordPress Developer",
                    company: "Freelance",
                    description: "Developed e-commerce, portfolio and custom websites for various clients.",
                    tech: ["WordPress", "php", "MySQL"],
                  },
                  // {
                  //   year: "2019",
                  //   role: "Software Engineer",
                  //   company: "Airbnb",
                  //   description: "Created booking flow optimizations and host management tools.",
                  //   tech: ["React", "Node.js", "MySQL"],
                  // },
                ].map((job, index) => (
                  <div
                    key={index}
                    className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                  >
                    <div className="lg:col-span-2">
                      <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                        {job.year}
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                        <div className="text-muted-foreground">{job.company}</div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                    </div>

                    <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                      {job.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        <section
          id="thoughts"
          ref={(el) => { sectionsRef.current[2] = el }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <Card className="px-5 py-5 bg-background/80">
            <div className="space-y-12 sm:space-y-16">
              <h2 className="text-3xl sm:text-4xl font-light">Work In Progress</h2>

              <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                {[
                  {
                    title: "Experimental Clothing Using 3D Printers",
                    excerpt: "Lessons learned from building and maintaining design systems across multiple products.",
                    date: "Ongoing",
                    // readTime: "8 min",
                  },
                  {
                    title: "Tattoo Portfolio",
                    excerpt: "Simple tattoo portfolio website made for a renowned tatoo artist.",
                    date: "Ongoing",
                    url: "https://tattoo.treideee.ro"
                    // readTime: "8 min",
                  },
                  {
                    title: "Automated Motorised Hand for Light Switching",
                    excerpt: "Exploring how automation can help daily tasks.",
                    date: "Ongoing",
                    // readTime: "5 min",

                  },
                  {
                    title: "Package Delivery Solution",
                    excerpt: "Simple website to be used as package delivery representation. Part of bigger fleet management project.",
                    date: "Ongoing",
                    url: "https://trainsport.1.treideee.ro"
                    // readTime: "8 min",
                  },
                  {
                    title: "Treidee(e) - 3D Printing Web Application for Amateurs and Enthusiasts",
                    excerpt: "A 3D printing website with custom printing solutions.",
                    date: "Finished",
                    url: "https://treideee.ro"
                    // readTime: "6 min",
                  },
                  {
                    title: "Brain App - Cognitive improvement in your pocket",
                    excerpt: "Application meant to improve cognitive functions for users with mental defficiencies",
                    date: "Finished",
                    url: "https://github.com/crb3l/brain-app"
                    // readTime: "4 min",
                  },
                ].map((post, index) => (
                  <article
                    key={index}
                    className="group p-6 sm:p-8 border border-border rounded-lg hover:border-yellow/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                        <span>{post.date}</span>
                        {/* <span>{post.readTime}</span> */}
                      </div>

                      <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                        {post.title}
                      </h3>

                      <p className="text-justify text-muted-foreground leading-relaxed">{post.excerpt}</p>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-yellow transition-colors duration-300">
                        {/* <Link
                          href="mailto:test@example.com"> */}
                        <a href={post.url}>Read more</a>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                        {/* </Link> */}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Card>
        </section>

        <section id="connect" ref={(el) => { sectionsRef.current[3] = el }} className="py-20 sm:py-32 opacity-0">
          <Card className="px-5 py-5 bg-background/80">
            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

                <div className="space-y-6">
                  <p className="text-justify text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    Always interested in new opportunities, collaborations, and conversations about technology and science.
                  </p>

                  <div className="space-y-4">
                    <Link
                      href="mailto:test@example.com"
                      className="group flex items-center gap-3 text-foreground hover:text-yellow transition-colors duration-300"
                    >
                      <span className="text-base sm:text-lg">iotheodor@gmail.com</span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "GitHub", handle: "@crb3l", url: "https://github.com/crb3l" },
                    // { name: "v0.dev", handle: "@felixmacaspac", url: "#" },
                    // { name: "HubSpot Community", handle: "@felixmacaspac", url: "#" },
                    { name: "LinkedIn", handle: "theoio", url: "https://linkedin.com/in/theoio" },
                  ].map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      className="group p-4 border border-border rounded-lg hover:border-yellow/50 transition-all duration-300 hover:shadow-sm"
                    >
                      <div className="space-y-2">
                        <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                          {social.name}
                        </div>
                        <div className="text-sm text-muted-foreground">{social.handle}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Theodor Ionică. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">Borrowed from v0.dev</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
