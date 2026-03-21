'use client'

import { useEffect, useRef, useCallback } from 'react'

const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform float uTime;
  uniform vec2 uResolution;

  // Simplex-style noise helper
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i), f), dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // Caustics pattern — light refraction through water
  float caustics(vec2 uv, float time) {
    float c = 0.0;
    // Layer 1
    vec2 p1 = uv * 3.0 + vec2(time * 0.04, time * 0.03);
    c += abs(noise(p1));
    // Layer 2 — rotated and scaled
    vec2 p2 = uv * 5.0 + vec2(-time * 0.03, time * 0.05);
    p2 = vec2(p2.x * 0.866 - p2.y * 0.5, p2.x * 0.5 + p2.y * 0.866);
    c += abs(noise(p2)) * 0.5;
    // Layer 3 — finer detail
    vec2 p3 = uv * 8.0 + vec2(time * 0.02, -time * 0.04);
    c += abs(noise(p3)) * 0.25;
    return c;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    float c = caustics(uv, uTime);

    // Normalize and create light caustics pattern
    c = smoothstep(0.3, 1.2, c);
    c = pow(c, 2.0);

    // Bleu Profond (#003366) tint mixed with neutral light
    vec3 lightColor = mix(
      vec3(0.0, 0.2, 0.4),   // Deep blue tint
      vec3(0.95, 0.95, 0.97), // Near-white light
      c
    );

    // Very subtle effect — 12% opacity at maximum
    float alpha = c * 0.12;

    gl_FragColor = vec4(lightColor, alpha);
  }
`

function initWebGL(canvas: HTMLCanvasElement): {
  gl: WebGLRenderingContext
  program: WebGLProgram
} | null {
  const gl = canvas.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: false,
    antialias: false,
    powerPreference: 'low-power',
  })
  if (!gl) return null

  const vs = gl.createShader(gl.VERTEX_SHADER)
  const fs = gl.createShader(gl.FRAGMENT_SHADER)
  if (!vs || !fs) return null

  gl.shaderSource(vs, VERTEX_SHADER)
  gl.compileShader(vs)
  if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) return null

  gl.shaderSource(fs, FRAGMENT_SHADER)
  gl.compileShader(fs)
  if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) return null

  const program = gl.createProgram()
  if (!program) return null

  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null

  // Fullscreen quad
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  )

  const positionLoc = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(positionLoc)
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

  return { gl, program }
}

export function CausticsShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const contextRef = useRef<{
    gl: WebGLRenderingContext
    program: WebGLProgram
  } | null>(null)

  const render = useCallback((startTime: number) => {
    const ctx = contextRef.current
    if (!ctx) return

    const { gl, program } = ctx
    const time = (performance.now() - startTime) / 1000

    gl.useProgram(program)

    const uTime = gl.getUniformLocation(program, 'uTime')
    const uResolution = gl.getUniformLocation(program, 'uResolution')

    gl.uniform1f(uTime, time)
    gl.uniform2f(uResolution, gl.canvas.width, gl.canvas.height)

    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

    animationRef.current = requestAnimationFrame(() => render(startTime))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Respect prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5)
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
    }

    resize()

    const result = initWebGL(canvas)
    if (!result) return

    contextRef.current = result
    const startTime = performance.now()

    animationRef.current = requestAnimationFrame(() => render(startTime))

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        cancelAnimationFrame(animationRef.current)
        const { gl } = result
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
      } else {
        const newStart = performance.now()
        animationRef.current = requestAnimationFrame(() => render(newStart))
      }
    }
    motionQuery.addEventListener('change', handleMotionChange)

    return () => {
      cancelAnimationFrame(animationRef.current)
      observer.disconnect()
      motionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [render])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
