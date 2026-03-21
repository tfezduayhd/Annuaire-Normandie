'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

const CELL_SIZE = 60
const LINE_COLOR = 'rgba(0, 51, 102, 0.08)'
const DISTORTION_RADIUS = 150
const DISTORTION_STRENGTH = 8

type GridDistortionProps = {
  containerRef: React.RefObject<HTMLElement>
}

export function GridDistortion({ containerRef }: GridDistortionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationRef = useRef<number>(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)

    const cols = Math.ceil(width / CELL_SIZE) + 1
    const rows = Math.ceil(height / CELL_SIZE) + 1
    const mx = mouseRef.current.x
    const my = mouseRef.current.y

    ctx.strokeStyle = LINE_COLOR
    ctx.lineWidth = 1

    // Draw horizontal lines
    for (let r = 0; r < rows; r++) {
      ctx.beginPath()
      for (let c = 0; c <= cols; c++) {
        const baseX = c * CELL_SIZE
        const baseY = r * CELL_SIZE

        const dx = baseX - mx
        const dy = baseY - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - dist / DISTORTION_RADIUS)
        const offsetY = influence * DISTORTION_STRENGTH * Math.sin(dist * 0.02)

        if (c === 0) {
          ctx.moveTo(baseX, baseY + offsetY)
        } else {
          ctx.lineTo(baseX, baseY + offsetY)
        }
      }
      ctx.stroke()
    }

    // Draw vertical lines
    for (let c = 0; c < cols; c++) {
      ctx.beginPath()
      for (let r = 0; r <= rows; r++) {
        const baseX = c * CELL_SIZE
        const baseY = r * CELL_SIZE

        const dx = baseX - mx
        const dy = baseY - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - dist / DISTORTION_RADIUS)
        const offsetX = influence * DISTORTION_STRENGTH * Math.sin(dist * 0.02)

        if (r === 0) {
          ctx.moveTo(baseX + offsetX, baseY)
        } else {
          ctx.lineTo(baseX + offsetX, baseY)
        }
      }
      ctx.stroke()
    }

    animationRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motionQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    motionQuery.addEventListener('change', handleChange)
    return () => motionQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container || reducedMotion) return

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.scale(dpr, dpr)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    // Listen on the parent container — canvas stays pointer-events-none
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    animationRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationRef.current)
      observer.disconnect()
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [draw, reducedMotion, containerRef])

  if (reducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      aria-hidden="true"
    />
  )
}
