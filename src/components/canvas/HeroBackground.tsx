"use client"

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, CameraShake } from '@react-three/drei'
import { useControls } from 'leva'
import { Particles } from './Particles'

/**
 * HeroBackground Component
 * 
 * Componente principal que serve como fundo animado 3D interativo para a Landing Page (Hero Section).
 * Ele inicializa o WebGL Canvas do React Three Fiber e abriga a engine de partículas baseada em FBO.
 * 
 * Características:
 * - Ocupa 100% da tela de fundo usando classes utilitárias fixed do Tailwind (`fixed inset-0 -z-10`).
 * - Usa `pointer-events-auto` para garantir que eventos de mouse (parallax de partículas) funcionem.
 * - Suporta layout responsivo via hook de window resize (ajusta FOV e câmera para Dispositivos Móveis).
 * - Integra OrbitControls para permitir rotação de câmera interativa e constante (autoRotate).
 * - Integra CameraShake para dar uma sensação orgânica e fluida à câmera.
 * - Fornece um painel de tuning de variáveis via `leva` (useControls) para fins de desenvolvimento.
 */
export function HeroBackground() {
    // Estado para verificar o tamanho da tela (Responsividade / Mobile)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        handleResize() // Inicializa na montagem
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Painel e propriedades de controle visual em tempo real (Leva)
    const baseProps = useControls({
        focus: { value: 5.1, min: 3, max: 7, step: 0.01 }, // Foco estético da câmera
        speed: { value: 12, min: 0.1, max: 100, step: 0.1 }, // Velocidade da simulação Curl Noise
        aperture: { value: 1.8, min: 1, max: 5.6, step: 0.1 }, // Abertura virtual (impactava desfoque)
        fov: { value: 20, min: 0, max: 200 }, // Campo de Visão da Câmera (Field of View)
        curl: { value: 0.25, min: 0.01, max: 0.5, step: 0.01 }, // Frequência do distúrbio de Curl Noise
        radius: { value: 1, min: 0.1, max: 5, step: 0.01 }, // Escala/Raio do aglomerado de pontos
        opacity: { value: 0.06, min: 0, max: 1, step: 0.01 } // Nível de transparência das partículas
    })

    // Calcular propriedades responsivas dinâmicas (Mobile vs Desktop)
    const effectiveFov = isMobile ? baseProps.fov * 1.5 : baseProps.fov // Aumenta o campo de visão no mobile para caber melhor na vertical
    const effectiveRadius = isMobile ? baseProps.radius * 0.7 : baseProps.radius // Partículas um pouco menores no celular 
    const shakeIntensity = isMobile ? 0.05 : 0.2 // Menos tremida de câmera no Touch para evitar tontura

    return (
        <div className="fixed inset-0 -z-10 bg-black w-full h-full pointer-events-auto">
            {/* 
        pointer-events-auto é importante aqui, senão o OrbitControls não vai registrar 
        o pan/zoom do mouse caso vc use index -z-10 absoluto atrás de elementos 
        E lembre-se: `leva` por si só flutua em overlay absolute fora do canvas.
      */}
            <Canvas camera={{ position: [0, 0, 10], fov: effectiveFov }}>
                <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} zoomSpeed={0.1} enableZoom={!isMobile} enablePan={!isMobile} />
                <CameraShake
                    yawFrequency={1}
                    maxYaw={0.05}
                    pitchFrequency={1}
                    maxPitch={0.05}
                    rollFrequency={0.5}
                    maxRoll={0.5}
                    intensity={shakeIntensity}
                />
                <Particles {...baseProps} radius={effectiveRadius} isMobile={isMobile} />
            </Canvas>
        </div>
    )
}