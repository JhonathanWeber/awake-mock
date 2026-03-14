"use client"

import * as THREE from 'three'
import { useMemo, useState, useRef, useEffect } from 'react'
import { createPortal, useFrame } from '@react-three/fiber'
import { useFBO } from '@react-three/drei'
import './shaders/simulationMaterial'
import './shaders/dofPointsMaterial'
import { MaterialNode } from '@react-three/fiber'
import { SimulationMaterial } from './shaders/simulationMaterial'
import { DofPointsMaterial } from './shaders/dofPointsMaterial'

// Adiciona tipos das tags JSX customizadas (`simulationMaterial` e `dofPointsMaterial`) ao React Three Fiber.
declare module '@react-three/fiber' {
    interface ThreeElements {
        simulationMaterial: MaterialNode<any, typeof SimulationMaterial>;
        dofPointsMaterial: MaterialNode<any, typeof DofPointsMaterial>;
    }
}

/**
 * Propriedades injetadas no construtor de Partículas FBO
 */
interface ParticlesProps {
    speed?: number      // Multiplicador do Time na animação FBO
    fov?: number        // Fator do Field of View usado pela câmera
    aperture?: number   // Input original de desfoque/DOF do material (não essencial agora pós customização visual, mantido para cálculos dinâmicos)
    focus?: number      // Foco base onde a profundidade de campo acontece no shader
    curl?: number       // Frequência de Curl Noise do compute shader
    size?: number       // Raiz quadrada da quantidade total de partículas (padrão FBO = 512x512)
    radius?: number     // Multiplicador local do volume
    opacity?: number    // Transparência passada pro Material
    isMobile?: boolean  // Detectar comportamento responsivo
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

/**
 * Particles Componente
 *
 * É o maestro da simulação baseada em GPU usando FBO (Frame Buffer Object). Renderiza milhares
 * (literalmente cientos de milhares) de partículas com custo baixo de CPU.
 * 
 * Como Funciona a renderização de Duplo Passe (Double-Pass Rendering - FBO):
 * 1. Simulação: O componente cria uma câmera Orthográfica e uma cena escondida (`createPortal`) que desenha em um RenderTarget fora da tela (`useFBO`).
 *    Este target ("SimulationMaterial") é um "Compute Shader", gravando as "Posições" XYZ nas cores RGB dos pixels virtuais baseados no algoritmo Curl Noise GLSL.
 * 2. Renderização: Na hora de desenhar na tela, ele usa uma geometria de pontos (`<points>`) vazia, mas lê
 *    as posições de XY a partir da "imagem/textura" computada no primeiro passo e as usa para posicionar/renderizar cada pontinho de luz com o `dofPointsMaterial`.
 */
export function Particles({ speed = 12, fov = 20, aperture = 1.8, focus = 5.1, curl = 0.25, size = 512, radius = 1, opacity = 0.06, isMobile = false, ...props }: ParticlesProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const simRef = useRef<any>(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderRef = useRef<any>(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pointsRef = useRef<any>(null)

    const [scene] = useState(() => new THREE.Scene())
    const [camera] = useState(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1))
    const [positions] = useState(() => new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]))
    const [uvs] = useState(() => new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]))

    // Guardar a posição global do cursor
    const mouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const target = useFBO(size, size, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType
    })

    const particles = useMemo(() => {
        const length = size * size
        const particlesArray = new Float32Array(length * 3)
        for (let i = 0; i < length; i++) {
            const i3 = i * 3
            particlesArray[i3 + 0] = (i % size) / size
            particlesArray[i3 + 1] = i / size / size
        }
        return particlesArray
    }, [size])

    useFrame((state) => {
        state.gl.setRenderTarget(target)
        state.gl.clear()
        state.gl.render(scene, camera)
        state.gl.setRenderTarget(null)

        if (renderRef.current) {
            renderRef.current.uniforms.positions.value = target.texture
            renderRef.current.uniforms.uTime.value = state.clock.elapsedTime
            renderRef.current.uniforms.uFocus.value = THREE.MathUtils.lerp(renderRef.current.uniforms.uFocus.value, focus, 0.1)
            renderRef.current.uniforms.uFov.value = THREE.MathUtils.lerp(renderRef.current.uniforms.uFov.value, fov, 0.1)
            renderRef.current.uniforms.uBlur.value = THREE.MathUtils.lerp(renderRef.current.uniforms.uBlur.value, (5.6 - aperture) * 9, 0.1)
            // Atualiza a opacidade
            if (renderRef.current.uniforms.uOpacity) {
                renderRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(renderRef.current.uniforms.uOpacity.value, opacity, 0.1)
            }
        }

        if (simRef.current) {
            simRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed
            simRef.current.uniforms.uCurlFreq.value = THREE.MathUtils.lerp(simRef.current.uniforms.uCurlFreq.value, curl, 0.1)
        }

        if (pointsRef.current) {
            if (!isMobile) {
                // Efeito Parallax (Apenas Desktop) - Rotacionar a nuvem baseada na posição do mouse 
                const targetX = (mouse.current.y * Math.PI) / 8
                const targetY = (mouse.current.x * Math.PI) / 8
                pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetX, 0.05)
                pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetY, 0.05)
            } else {
                // No mobile, retorna a esfera suavemente para o eixo neutro e ignora o touch/paralax excessivo
                pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, 0, 0.05)
                pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, 0, 0.05)
            }
        }
    })

    return (
        <>
            {createPortal(
                <mesh>
                    <simulationMaterial ref={simRef} />
                    <bufferGeometry>
                        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
                        <bufferAttribute attach="attributes-uv" count={uvs.length / 2} array={uvs} itemSize={2} />
                    </bufferGeometry>
                </mesh>,
                scene
            )}
            <points ref={pointsRef} scale={[radius, radius, radius]} {...props}>
                <dofPointsMaterial ref={renderRef} />
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
                </bufferGeometry>
            </points>
        </>
    )
}
