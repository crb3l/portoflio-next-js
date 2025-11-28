"use client"

import { useEffect, useRef, useCallback } from "react"

export function WaveBackground({ isDark }: { isDark: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const animationRef = useRef<number>(0)

    const draw = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const width = canvas.width
        const height = canvas.height
        const mouseX = mouseRef.current.x
        const mouseY = mouseRef.current.y
        const time = Date.now() * 0.002

        const bgColor = isDark ? "#000000" : "#f3f4f6"

        // Clear canvas with black
        ctx.fillStyle = bgColor//"#000000"
        ctx.fillRect(0, 0, width, height)

        // Wave parameters
        const waveCount = 12
        const baseAmplitude = 30
        const mouseInfluence = 150

        for (let i = 0; i < waveCount; i++) {
            ctx.beginPath()

            const waveOffset = (i / waveCount) * height
            const hue = 50 + i * 100 // Yellow hues (45-95) ### This modifies the colors of the waves
            const lightness = 50 + i * 3
            const alpha = 0.6 - i * 0.03

            ctx.strokeStyle = `hsla(${hue}, 100%, ${lightness}%, ${alpha})`
            ctx.lineWidth = 3

            for (let x = 0; x <= width; x += 5) {
                // Calculate distance from mouse
                const dx = x - mouseX
                const dy = waveOffset - mouseY
                const distance = Math.sqrt(dx * dx + dy * dy)

                // Mouse influence on wave
                const mouseEffect = Math.max(0, 1 - distance / mouseInfluence) * 80

                // Create wave with multiple frequencies
                const wave1 = Math.sin(x * 0.01 + time + i * 0.5) * baseAmplitude
                const wave2 = Math.sin(x * 0.02 + time * 1.5 + i * 0.3) * (baseAmplitude * 0.5)
                const wave3 = Math.sin(x * 0.005 + time * 0.5) * (baseAmplitude * 0.8)

                // Add mouse ripple effect
                const ripple = Math.sin(distance * 0.05 - time * 3) * mouseEffect

                const y = waveOffset + wave1 + wave2 + wave3 + ripple

                if (x === 0) {
                    ctx.moveTo(x, y)
                } else {
                    ctx.lineTo(x, y)
                }
            }

            ctx.stroke()
        }

        // Draw glowing particles near mouse
        const particleCount = 10
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2 + time
            const radius = 50 + Math.sin(time * 2 + i) * 30
            const px = mouseX + Math.cos(angle) * radius
            const py = mouseY + Math.sin(angle) * radius
            const size = 2 + Math.sin(time * 3 + i) * 1.5

            const gradient = ctx.createRadialGradient(px, py, 0, px, py, size * 3)
            gradient.addColorStop(0, "rgba(255, 220, 0, 0.8)")
            gradient.addColorStop(0.5, "rgba(255, 179, 0, 0.98)")
            gradient.addColorStop(1, "rgba(255, 150, 0, 0)")

            ctx.beginPath()
            ctx.fillStyle = gradient
            ctx.arc(px, py, size * 3, 0, Math.PI * 0) // add math pi * 2 if particles
            ctx.fill()
        }

        animationRef.current = requestAnimationFrame(draw)
    }, [isDark])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("touchmove", handleTouchMove)

        // Initialize mouse position to center
        mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

        animationRef.current = requestAnimationFrame(draw)

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("touchmove", handleTouchMove)
            cancelAnimationFrame(animationRef.current)
        }
    }, [draw])

    return <canvas ref={canvasRef} className="fixed inset-0 -z-10" /*style={{ background: "#000000" }} */ />
}
