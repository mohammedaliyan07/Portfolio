import React, { Suspense, useRef, useState } from "react"; import { Canvas, useFrame, useThree } from "@react-three/fiber"; import { OrbitControls, Html, Float, useTexture } from "@react-three/drei";

// Single-file 3D portfolio component // Usage: drop into a React app (Vite / Create React App), ensure Tailwind is available. // Dependencies: react, react-dom, three, @react-three/fiber, @react-three/drei

export default function Portfolio3D() { const certs = [ { title: "Prompt Engineering", url: "https://raw.githubusercontent.com/mohammedaliyan07/Portfolio/refs/heads/main/mohammed-aliyan-certificate(1).jpg", }, { title: "Digital Skills AI", url: "https://raw.githubusercontent.com/mohammedaliyan07/Portfolio/refs/heads/main/artificial-intelligence_certificate_of_achievement_5pqp7nh%20(1)(1).jpg", }, { title: "Reliance Security", url: "https://raw.githubusercontent.com/mohammedaliyan07/Portfolio/refs/heads/main/Reliance%20certificate.jpg" }, { title: "Infosys Gen-AI", url: "https://raw.githubusercontent.com/mohammedaliyan07/Portfolio/refs/heads/main/Infosys%20Generative%20AI.jpg" }, { title: "Intel AI Entrepreneur", url: "https://raw.githubusercontent.com/mohammedaliyan07/Portfolio/refs/heads/main/intel%20AI%20for%20entrepreneurship(1).jpg" }, ];

const photo = "https://raw.githubusercontent.com/mohammedaliyan07/Portfolio/refs/heads/main/Photo.jpg";

const [lightbox, setLightbox] = useState({ open: false, url: null, title: null });

return ( <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center p-6"> <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 w-full"> {/* Left: 3D canvas */} <div className="rounded-2xl bg-black/40 p-4 shadow-2xl"> <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ height: 520 }}> <ambientLight intensity={0.6} /> <directionalLight position={[5, 5, 5]} intensity={1} /> <Suspense fallback={null}> <Float floatIntensity={2} rotationIntensity={0.6}> <PhotoCard photo={photo} /> </Float>

<FloatingCerts certs={certs} onOpen={(c) => setLightbox({ open: true, url: c.url, title: c.title })} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>

    {/* Right: Info and cert gallery */}
    <div className="rounded-2xl bg-black/40 p-6 flex flex-col gap-4 shadow-2xl">
      <h1 className="text-3xl font-semibold">Mohammed Aliyan — Portfolio</h1>
      <p className="text-sm opacity-80">Brutally honest intro, no fluff.</p>

      <section className="mt-2">
        <h2 className="text-lg font-medium">Who I am</h2>
        <p className="text-sm mt-1 opacity-80">
          19-year-old B.Com Computer Applications student. Still learning. No real projects yet — but I have focused
          certifications in AI, prompt engineering, and security. I build fast, honest, minimal solutions.
        </p>
      </section>

      <section className="mt-3">
        <h2 className="text-lg font-medium">Highlights</h2>
        <ul className="list-disc list-inside text-sm mt-1 opacity-80">
          <li>Prompt Engineering — certificate</li>
          <li>Digital Skills: Artificial Intelligence</li>
          <li>Infosys Generative AI</li>
          <li>Intel AI for Entrepreneurship</li>
          <li>Reliance Security Analyst</li>
        </ul>
      </section>

      <section className="mt-3">
        <h2 className="text-lg font-medium">Certifications — click to view</h2>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {certs.map((c) => (
            <button
              key={c.url}
              onClick={() => setLightbox({ open: true, url: c.url, title: c.title })}
              className="rounded p-2 bg-white/5 hover:bg-white/10 text-xs text-left"
            >
              {c.title}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-3">
        <h2 className="text-lg font-medium">Quick truth</h2>
        <p className="text-sm mt-1 opacity-80">You have no projects. That's okay. Add one small, useful thing and it's enough.</p>
      </section>

      <div className="mt-auto flex gap-3">
        <a
          className="px-4 py-2 rounded bg-white text-black text-sm font-medium"
          href="#certs"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
          }}
        >
          View certs
        </a>

        <a
          className="px-4 py-2 rounded border border-white/20 text-sm"
          href="https://github.com/mohammedaliyan07/Portfolio"
          target="_blank"
          rel="noreferrer"
        >
          Repo
        </a>
      </div>
    </div>
  </div>

  {/* Lightbox */}
  {lightbox.open && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={() => setLightbox({ open: false, url: null, title: null })}
    >
      <div className="max-w-3xl w-full p-4">
        <img src={lightbox.url} alt={lightbox.title} className="w-full rounded shadow-lg" />
        <div className="mt-2 text-center">
          <button
            onClick={() => setLightbox({ open: false, url: null, title: null })}
            className="px-4 py-2 rounded bg-white text-black mt-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )}
</div>

); }

// --- 3D components ---

function PhotoCard({ photo = "" }) { const ref = useRef(); const tex = useTexture(photo); useFrame((state) => { ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2; ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05; });

return ( <group ref={ref} rotation={[0.2, 0.6, 0]}> <mesh position={[0, 0.2, 0]} castShadow> <boxGeometry args={[2.2, 3, 0.06]} /> <meshStandardMaterial map={tex} metalness={0.2} roughness={0.6} /> </mesh>

<Html position={[0, -2, 0]} center>
    <div className="backdrop-blur-sm bg-white/5 rounded p-2 text-center w-44">
      <div className="text-xs opacity-80">Click certs on the right to open</div>
    </div>
  </Html>
</group>

); }

function FloatingCerts({ certs = [], onOpen = () => {} }) { return ( <group> {certs.map((c, i) => ( <CertCard key={c.url} cert={c} index={i} onOpen={onOpen} /> ))} </group> ); }

function CertCard({ cert, index, onOpen }) { const ref = useRef(); const posX = -2 + (index % 3) * 1.8; const posY = 1.5 - Math.floor(index / 3) * 1.2; const tex = useTexture(cert.url);

useFrame((state) => { const t = state.clock.elapsedTime; ref.current.rotation.y = Math.sin(t * 0.6 + index) * 0.2; ref.current.position.y = posY + Math.sin(t * 0.8 + index) * 0.08; });

return ( <group ref={ref} position={[posX, posY, -1.2]}> <mesh onClick={() => onOpen(cert)} scale={[0.9, 0.6, 0.02]} castShadow onPointerOver={(e) => (e.stopPropagation(), (document.body.style.cursor = "pointer"))} onPointerOut={() => (document.body.style.cursor = "")} > <planeGeometry args={[1.6, 1]} /> <meshStandardMaterial map={tex} metalness={0.1} roughness={0.6} /> </mesh>

<Html distanceFactor={6} position={[0, -0.75, 0]} center>
    <div className="text-xs p-1 rounded bg-black/50">{cert.title}</div>
  </Html>
</group>

); }
