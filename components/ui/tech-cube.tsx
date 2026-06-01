"use client"

import { useRef, useState, useMemo, useCallback, memo, Suspense, useEffect } from "react"
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber"
import * as THREE from "three"

const CYAN   = "#00e5b8"
const CYAN_C = new THREE.Color(CYAN)
type n = number

const TECHS = ["MySQL", "JavaScript", "HTML", "CSS", "React", "Next.js", "Node.js", "TypeScript"]

const NODES: [n, n][] = [
  [40.7,-74.0],[51.5,-0.1],[35.7,139.7],[-23.5,-46.6],
  [28.6,77.2],[1.3,103.8],[55.7,37.6],[-33.9,18.4],[48.9,2.3],[37.8,-122.4],
]

const ARC_PAIRS: [n, n][] = [
  [0,1],[1,8],[0,9],[2,5],[3,0],[4,5],[6,1],[7,8],[5,2],[9,3],[1,4],[6,4],
]

// ─── Geographic data ──────────────────────────────────────────────────────────
// Closed polygons for land fills + coastline strokes [lon, lat]
const LANDS: Array<Array<[n,n]>> = [
  // North America (Alaska + main body)
  [[-141,70],[-156,72],[-168,68],[-165,62],[-160,58],[-153,58],[-150,60],
   [-145,60],[-140,59],[-136,57],[-130,54],[-124,49],[-124,47],[-124,44],
   [-124,40],[-122,37],[-118,34],[-117,32],[-115,30],[-110,24],[-106,20],
   [-96,19],[-90,15],[-88,15],[-84,10],[-80,8],[-77,8],[-75,10],[-65,18],
   [-62,22],[-70,25],[-80,25],[-82,24],[-82,30],[-80,32],[-77,35],[-76,38],
   [-74,40],[-72,41],[-70,43],[-68,44],[-64,44],[-60,47],[-54,47],[-53,52],
   [-56,58],[-64,63],[-65,70],[-80,74],[-95,74],[-100,72],[-115,72],
   [-125,72],[-130,70],[-141,70]],
  // Greenland
  [[-44,60],[-20,60],[-18,65],[-15,72],[-20,78],[-30,83],[-45,82],[-55,80],[-58,76],[-52,72],[-44,60]],
  // Iceland
  [[-24,64],[-14,63],[-13,65],[-14,66],[-22,66],[-24,65]],
  // Cuba
  [[-74,20],[-82,22],[-85,22],[-84,20],[-74,20]],
  // South America
  [[-80,12],[-65,11],[-62,10],[-60,7],[-52,4],[-50,5],[-38,-4],[-35,-8],
   [-35,-10],[-39,-16],[-40,-22],[-44,-24],[-48,-28],[-52,-33],[-54,-34],
   [-58,-38],[-63,-42],[-66,-46],[-66,-55],[-68,-55],[-69,-52],[-70,-48],
   [-74,-42],[-74,-38],[-72,-32],[-70,-20],[-68,-14],[-76,-10],[-80,-3],
   [-80,2],[-78,8],[-76,10],[-80,12]],
  // UK
  [[-5,50],[2,51],[0,54],[-2,58],[-5,58],[-4,60],[-6,58],[-5,56],[-4,51],[-5,50]],
  // Ireland
  [[-10,52],[-6,52],[-6,54],[-8,55],[-10,54]],
  // Iberian Peninsula
  [[-9,36],[-5,36],[0,38],[4,40],[3,44],[-2,44],[-2,46],[0,46],[-4,44],[-8,44],[-10,38],[-9,36]],
  // France + Benelux
  [[-2,44],[3,44],[8,48],[8,50],[4,52],[2,51],[-2,50],[-2,48],[-2,46],[-2,44]],
  // Italy peninsula
  [[7,44],[10,44],[15,38],[16,37],[18,40],[16,42],[14,44],[12,46],[10,46],[8,46],[7,44]],
  // Central/Eastern Europe + Balkans
  [[8,55],[12,56],[14,54],[18,54],[20,55],[22,56],[24,57],[24,60],[26,65],[28,68],
   [30,70],[28,72],[18,72],[14,70],[6,62],[5,58],[5,56],[8,57],[9,55],[8,55]],
  // Scandinavia
  [[5,57],[8,57],[12,56],[18,57],[22,58],[24,62],[28,68],[28,72],[18,72],[14,70],[10,63],[5,62],[5,57]],
  // Finland
  [[22,60],[28,60],[30,65],[28,68],[24,62],[22,60]],
  // Africa
  [[-16,37],[-5,37],[12,34],[25,34],[32,31],[36,30],[42,12],[45,12],[50,12],
   [44,-12],[36,-22],[28,-35],[18,-35],[12,-35],[5,-5],[0,5],[-2,5],
   [-16,12],[-16,20],[-16,25],[-14,28],[-14,35],[-16,37]],
  // Madagascar
  [[44,-12],[48,-14],[50,-18],[48,-26],[44,-26],[44,-20]],
  // Arabian Peninsula
  [[36,30],[38,24],[44,12],[46,15],[50,12],[58,22],[56,22],[44,22],[36,28],[36,30]],
  // Asia main body
  [[26,42],[28,42],[32,36],[36,36],[36,30],[44,12],[46,15],[58,22],[62,24],[65,22],
   [68,22],[72,20],[76,8],[80,8],[80,14],[82,16],[88,22],[90,22],[92,22],[96,16],
   [100,4],[104,2],[104,-4],[108,2],[108,14],[104,20],[108,20],[110,22],[120,22],
   [122,30],[120,36],[124,40],[130,44],[132,48],[138,48],[142,48],[148,52],
   [155,58],[160,60],[162,64],[168,68],[168,72],[140,72],[100,74],[70,72],
   [52,70],[34,68],[32,68],[28,68],[26,55],[30,56],[36,47],[40,42],[36,36],
   [28,38],[26,42]],
  // Japan – Honshu
  [[130,30],[131,32],[133,34],[136,35],[138,36],[140,38],[142,38],[142,40],[140,42],[136,36],[132,34],[130,32]],
  // Hokkaido
  [[140,42],[142,42],[144,44],[142,46],[140,44]],
  // Sri Lanka
  [[80,6],[82,7],[82,8],[80,8]],
  // Indochina / SE Asia
  [[100,20],[104,5],[103,1],[104,-4],[108,2],[108,20]],
  // Borneo
  [[108,2],[116,6],[118,6],[118,2],[114,0],[110,-2],[108,0]],
  // Sumatra
  [[96,6],[100,4],[104,2],[106,-6],[104,-4],[100,-2],[96,2]],
  // Australia
  [[114,-22],[118,-18],[122,-18],[128,-14],[132,-12],[136,-14],[138,-14],[140,-14],
   [142,-14],[145,-18],[148,-22],[150,-26],[154,-28],[154,-32],[152,-38],[148,-38],
   [144,-38],[140,-38],[136,-36],[132,-34],[128,-34],[122,-34],[114,-28],[114,-22]],
  // Tasmania
  [[144,-40],[148,-40],[148,-44],[144,-44]],
  // New Zealand
  [[166,-34],[175,-40],[174,-42],[172,-46],[168,-44],[170,-38],[166,-34]],
  // Antarctica
  [[-180,-72],[180,-72],[180,-90],[-180,-90]],
]

// Open polylines for major country borders
const BORDERS: Array<Array<[n,n]>> = [
  // USA / Canada (49th parallel)
  [[-124,49],[-100,49],[-75,45],[-72,45],[-70,47]],
  // USA / Mexico
  [[-117,32],[-104,29],[-97,26]],
  // Brazil north (Colombia/Venezuela/Guianas)
  [[-80,2],[-72,8],[-62,8],[-52,4]],
  // Andes borders (Chile/Argentina/Bolivia/Peru)
  [[-66,-55],[-68,-46],[-70,-38],[-70,-28],[-70,-18],[-76,-10],[-80,-4],[-80,2]],
  // Bolivia / Brazil / Paraguay
  [[-62,-10],[-62,-20],[-58,-22],[-54,-24]],
  // Argentina / Brazil / Uruguay
  [[-54,-24],[-54,-34],[-58,-35]],
  // Pyrenees (Spain / France)
  [[-2,44],[3,42],[3,44]],
  // France / Germany
  [[7,44],[8,48],[8,50],[7,50]],
  // Italy / Slovenia / Austria
  [[7,44],[10,44],[12,46],[14,46]],
  // Germany / Poland
  [[14,54],[14,52],[18,52]],
  // Central Europe (Czech/Slovakia/Hungary)
  [[16,50],[18,50],[22,48],[24,48]],
  // Balkans
  [[16,44],[18,44],[20,42],[22,42]],
  // Romania / Ukraine / Moldova
  [[22,48],[24,48],[26,46],[28,46],[30,46]],
  // Ukraine / Russia
  [[30,48],[36,50],[40,48]],
  // Russia / Kazakhstan
  [[52,52],[60,52],[72,54],[80,52],[82,50]],
  // China / Mongolia
  [[82,50],[90,50],[100,50],[106,52],[118,50],[122,48]],
  // China / India (Himalayan)
  [[72,34],[78,36],[82,32],[88,28],[92,26]],
  // India / Pakistan
  [[70,24],[72,26],[74,32]],
  // India / Bangladesh
  [[88,22],[90,24],[92,26]],
  // North / South Korea (38th parallel)
  [[124,38],[126,38],[128,38],[130,38]],
  // Morocco / Algeria / Mali
  [[-2,34],[0,28],[0,20]],
  // Libya / Egypt
  [[24,32],[24,22]],
  // Sudan / Egypt
  [[32,22],[32,14]],
  // Sudan / Chad / Niger border
  [[24,14],[14,14],[14,8]],
  // East Africa (Ethiopia/Kenya/Somalia)
  [[36,12],[40,8],[42,4]],
  // DRC borders
  [[28,4],[30,0],[28,-6],[24,-8],[22,-4]],
  // Southern Africa
  [[18,-28],[22,-26],[26,-22],[32,-22]],
  // Iran / Iraq / Turkey
  [[36,36],[44,38],[46,32],[48,24]],
  // Saudi / Yemen / Oman
  [[44,16],[50,18],[56,22]],
  // China / Vietnam / Laos / Myanmar
  [[100,22],[100,20],[104,22]],
  // India / Myanmar
  [[92,24],[96,22],[98,18]],
]

// ─── Canvas Earth texture ─────────────────────────────────────────────────────

function makeEarthTexture(): THREE.CanvasTexture {
  const W = 1024, H = 512
  const canvas = document.createElement("canvas")
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext("2d")!
  ctx.clearRect(0, 0, W, H)

  const px = (lon: n) => ((lon + 180) / 360) * W
  const py = (lat: n) => ((90 - lat) / 180) * H

  const path = (pts: [n,n][]) => {
    ctx.beginPath()
    ctx.moveTo(px(pts[0][0]), py(pts[0][1]))
    for (let i = 1; i < pts.length; i++) ctx.lineTo(px(pts[i][0]), py(pts[i][1]))
  }

  // Very subtle fill pass
  ctx.fillStyle = "rgba(0,229,184,0.055)"
  LANDS.forEach(p => { path(p); ctx.closePath(); ctx.fill() })

  // Glow blur under strokes
  ctx.save()
  ctx.filter = "blur(2px)"
  ctx.fillStyle = "rgba(0,229,184,0.025)"
  LANDS.forEach(p => { path(p); ctx.closePath(); ctx.fill() })
  ctx.restore()

  // Coastline strokes (darker per user request)
  ctx.strokeStyle = "rgba(0,229,184,0.38)"
  ctx.lineWidth = 1.0
  LANDS.forEach(p => { path(p); ctx.closePath(); ctx.stroke() })

  // Country border lines (slightly more subtle than coast)
  ctx.strokeStyle = "rgba(0,229,184,0.28)"
  ctx.lineWidth = 0.7
  BORDERS.forEach(b => { path(b); ctx.stroke() })

  const tex = new THREE.CanvasTexture(canvas)
  tex.minFilter = THREE.LinearFilter
  return tex
}

// ─── Grid geometry ────────────────────────────────────────────────────────────

function makeGridGeo(R = 1.003): THREE.BufferGeometry {
  const pts: THREE.Vector3[] = []
  const S = 48
  for (let lat = -60; lat <= 60; lat += 30) {
    const phi = (90 - lat) * (Math.PI / 180)
    const y = R * Math.cos(phi), r = R * Math.sin(phi)
    for (let i = 0; i < S; i++) {
      const a1 = (i / S) * Math.PI * 2, a2 = ((i + 1) / S) * Math.PI * 2
      pts.push(new THREE.Vector3(r * Math.cos(a1), y, r * Math.sin(a1)),
               new THREE.Vector3(r * Math.cos(a2), y, r * Math.sin(a2)))
    }
  }
  for (let lon = 0; lon < 360; lon += 30) {
    const t = lon * (Math.PI / 180)
    for (let i = 0; i < S; i++) {
      const p1 = (i / S) * Math.PI, p2 = ((i + 1) / S) * Math.PI
      pts.push(new THREE.Vector3(R * Math.sin(p1) * Math.cos(t), R * Math.cos(p1), R * Math.sin(p1) * Math.sin(t)),
               new THREE.Vector3(R * Math.sin(p2) * Math.cos(t), R * Math.cos(p2), R * Math.sin(p2) * Math.sin(t)))
    }
  }
  return new THREE.BufferGeometry().setFromPoints(pts)
}

// ─── Batched internet nodes ───────────────────────────────────────────────────

const InternetNodes = memo(function InternetNodes({ vecs }: { vecs: THREE.Vector3[] }) {
  const coreGeo = useMemo(() => new THREE.SphereGeometry(0.015, 5, 5), [])
  const haloGeo = useMemo(() => new THREE.RingGeometry(0.017, 0.026, 10), [])
  const coreMats = useMemo(() => vecs.map(() => new THREE.MeshBasicMaterial({
    color: CYAN_C, transparent: true, opacity: 1, depthWrite: false, blending: THREE.AdditiveBlending,
  })), [vecs])
  const haloMats = useMemo(() => vecs.map(() => new THREE.MeshBasicMaterial({
    color: CYAN_C, transparent: true, opacity: 0.4,
    side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
  })), [vecs])
  const quats = useMemo(() => vecs.map(pos => {
    const n = pos.clone().normalize()
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), n)
  }), [vecs])
  const coreRefs = useRef<(THREE.Mesh | null)[]>([])
  const haloRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    for (let i = 0; i < vecs.length; i++) {
      const pulse = (Math.sin(t * 2.2 + i * 0.77) + 1) * 0.5
      coreMats[i].opacity = 0.7 + pulse * 0.3
      haloMats[i].opacity = (1 - pulse) * 0.55
      coreRefs.current[i]?.scale.setScalar(1 + pulse * 0.35)
      haloRefs.current[i]?.scale.setScalar(1 + pulse * 2.0)
    }
  })

  return (
    <>
      {vecs.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh ref={el => { haloRefs.current[i] = el }} geometry={haloGeo} material={haloMats[i]} quaternion={quats[i]} />
          <mesh ref={el => { coreRefs.current[i] = el }} geometry={coreGeo} material={coreMats[i]} />
        </group>
      ))}
    </>
  )
})

// ─── Batched arcs ─────────────────────────────────────────────────────────────

const Arcs = memo(function Arcs({ pairs, vecs }: { pairs: [n,n][]; vecs: THREE.Vector3[] }) {
  const { lines, mats } = useMemo(() => {
    const mats: THREE.LineDashedMaterial[] = []
    const lines: THREE.Line[] = []
    pairs.forEach(([a, b]) => {
      const p1 = vecs[a], p2 = vecs[b]
      const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(1.42)
      const geo = new THREE.BufferGeometry().setFromPoints(
        new THREE.QuadraticBezierCurve3(p1, mid, p2).getPoints(32)
      )
      const mat = new THREE.LineDashedMaterial({
        color: CYAN_C, transparent: true, opacity: 0.45,
        dashSize: 0.055, gapSize: 0.042, depthWrite: false, blending: THREE.AdditiveBlending,
      })
      const line = new THREE.Line(geo, mat)
      line.computeLineDistances()
      mats.push(mat); lines.push(line)
    })
    return { lines, mats }
  }, [pairs, vecs])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    for (let i = 0; i < mats.length; i++) {
      const d = i * 0.28
      ;(mats[i] as unknown as Record<string, number>).dashOffset = -(t * 0.22 + d * 0.5)
      mats[i].opacity = 0.14 + Math.abs(Math.sin(t * 0.85 + d)) * 0.36
    }
  })

  return <>{lines.map((l, i) => <primitive key={i} object={l} />)}</>
})

// ─── Scan band ────────────────────────────────────────────────────────────────

const ScanBand = memo(function ScanBand() {
  const ref = useRef<THREE.Mesh>(null)
  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color: CYAN_C, transparent: true, opacity: 0.04,
    side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
  }), [])
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.68) * 1.04
    mat.opacity = 0.015 + Math.abs(Math.cos(clock.elapsedTime * 0.68)) * 0.04
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[1.1, 36]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
})

// ─── Orbit particles ──────────────────────────────────────────────────────────

const OrbitParticles = memo(function OrbitParticles() {
  const N = 22
  const ref = useRef<THREE.Points>(null)
  const { positions, meta } = useMemo(() => {
    const positions = new Float32Array(N * 3)
    const meta = Array.from({ length: N }, () => ({
      theta: Math.random() * Math.PI * 2,
      phi:   Math.acos(2 * Math.random() - 1),
      r:     1.22 + Math.random() * 0.5,
      spd:   0.06 + Math.random() * 0.16,
    }))
    return { positions, meta }
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t   = clock.elapsedTime
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < N; i++) {
      const m = meta[i]
      const θ = m.theta + t * m.spd, φ = m.phi + t * m.spd * 0.35
      pos[i*3]   = Math.sin(φ) * Math.cos(θ) * m.r
      pos[i*3+1] = Math.cos(φ) * m.r
      pos[i*3+2] = Math.sin(φ) * Math.sin(θ) * m.r
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.016} color={CYAN} transparent opacity={0.38}
        sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
})

// ─── Main scene ───────────────────────────────────────────────────────────────

type EmitFn = (clientX: n, clientY: n, tech: string) => void

function Scene({ onEmit }: { onEmit: EmitFn }) {
  const globeGroup = useRef<THREE.Group>(null)
  const drag = useRef({ active: false, lastX: 0, lastY: 0, velX: 0, velY: 0, rotX: 0, rotY: 0 })
  const lastEmit = useRef(0)

  const earthTex = useMemo(() => makeEarthTexture(), [])
  const bodyMat  = useMemo(() => new THREE.MeshBasicMaterial({
    map: earthTex, transparent: true, opacity: 0.9, depthWrite: false,
  }), [earthTex])
  const gridGeo  = useMemo(() => makeGridGeo(), [])
  const gridMat  = useMemo(() => new THREE.LineBasicMaterial({
    color: CYAN_C, transparent: true, opacity: 0.07, depthWrite: false, blending: THREE.AdditiveBlending,
  }), [])
  const nodeVecs = useMemo(() => NODES.map(([lat, lon]) => latLonToVec3(lat, lon, 1.007)), [])

  useEffect(() => {
    const d = drag.current
    const onMove = (e: PointerEvent) => {
      if (!d.active) return
      const dx = e.clientX - d.lastX, dy = e.clientY - d.lastY
      d.lastX = e.clientX; d.lastY = e.clientY
      d.velX = dy * 0.006; d.velY = dx * 0.006
      d.rotX = Math.max(-0.7, Math.min(0.7, d.rotX + dy * 0.005))
      d.rotY += dx * 0.005
      const speed = Math.sqrt(dx * dx + dy * dy), now = Date.now()
      if (speed > 5 && now - lastEmit.current > 250) {
        lastEmit.current = now
        onEmit(e.clientX, e.clientY, TECHS[Math.floor(Math.random() * TECHS.length)])
      }
    }
    const onUp = () => { d.active = false }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp) }
  }, [onEmit])

  useFrame(({ clock }, dt) => {
    const d = drag.current
    if (!d.active) {
      d.velX *= 0.92; d.velY *= 0.92
      d.rotX = Math.max(-0.7, Math.min(0.7, d.rotX + d.velX))
      d.rotY += d.velY + dt * 0.14
    }
    if (globeGroup.current) {
      globeGroup.current.rotation.y = d.rotY
      globeGroup.current.rotation.x = d.rotX
      globeGroup.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.05
    }
  })

  const onPointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    const d = drag.current
    d.active = true; d.lastX = e.nativeEvent.clientX; d.lastY = e.nativeEvent.clientY
    d.velX = 0; d.velY = 0
  }, [])

  return (
    <>
      <ambientLight intensity={0.18} />
      <pointLight position={[3, 3, 3]}    intensity={1.8} color={CYAN} />
      <pointLight position={[-3,-2,-2]}   intensity={0.2} color="#002266" />
      <pointLight position={[0, 0, 4]}    intensity={1.2} color={CYAN} />
      <ScanBand />
      <OrbitParticles />
      <group ref={globeGroup} onPointerDown={onPointerDown}>
        <mesh>
          <sphereGeometry args={[1, 36, 36]} />
          <primitive object={bodyMat} attach="material" />
        </mesh>
        <lineSegments>
          <primitive object={gridGeo} attach="geometry" />
          <primitive object={gridMat} attach="material" />
        </lineSegments>
        {/* Equator ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.004, 1.016, 64]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.14}
            depthWrite={false} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
        </mesh>
        {/* Poles */}
        <mesh position={[0, 1.008, 0]}>
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[0, -1.008, 0]}>
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
        <InternetNodes vecs={nodeVecs} />
        <Arcs pairs={ARC_PAIRS} vecs={nodeVecs} />
      </group>
    </>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function latLonToVec3(lat: n, lon: n, r = 1): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  )
}

// ─── Tech particle overlay ────────────────────────────────────────────────────

type Particle = { id: number; x: n; y: n; tech: string }

function TechParticle({ particle, onDone }: { particle: Particle; onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const angle = Math.random() * Math.PI * 2
    const dist  = 44 + Math.random() * 50
    const dx = Math.cos(angle) * dist, dy = Math.sin(angle) * dist - 25
    const anim = el.animate([
      { opacity: 0,   transform: `translate(-50%,-50%) scale(0.5)` },
      { opacity: 1,   transform: `translate(calc(-50% + ${dx * 0.28}px),calc(-50% + ${dy * 0.28}px)) scale(1.1)`, offset: 0.25 },
      { opacity: 0,   transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(0.75)` },
    ], { duration: 1800, easing: "ease-out", fill: "forwards" })
    anim.onfinish = onDone
    return () => anim.cancel()
  }, [onDone])

  return (
    <div ref={ref} style={{
      position: "absolute", left: particle.x, top: particle.y,
      color: CYAN, fontSize: 11, fontFamily: "monospace", fontWeight: 700,
      pointerEvents: "none", userSelect: "none",
      textShadow: `0 0 8px ${CYAN}, 0 0 20px ${CYAN}99`,
      whiteSpace: "nowrap", zIndex: 20, opacity: 0,
    }}>
      {particle.tech}
    </div>
  )
}

// ─── Public export ────────────────────────────────────────────────────────────

export function TechCube() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const nextId = useRef(0)

  const handleEmit = useCallback((clientX: n, clientY: n, tech: string) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const id = nextId.current++
    setParticles(ps => [...ps.slice(-10), { id, x: clientX - rect.left, y: clientY - rect.top, tech }])
  }, [])

  const removePart = useCallback((id: number) => {
    setParticles(ps => ps.filter(p => p.id !== id))
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full relative" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 3.3], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene onEmit={handleEmit} />
        </Suspense>
      </Canvas>
      {particles.map(p => (
        <TechParticle key={p.id} particle={p} onDone={() => removePart(p.id)} />
      ))}
    </div>
  )
}
