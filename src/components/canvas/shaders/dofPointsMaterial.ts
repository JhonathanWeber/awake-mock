import * as THREE from 'three'
import { extend } from '@react-three/fiber'

class DofPointsMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            vertexShader: `uniform sampler2D positions;
      uniform float uTime;
      uniform float uFocus;
      uniform float uFov;
      uniform float uBlur;
      varying float vDistance;
      void main() { 
        vec3 pos = texture2D(positions, position.xy).xyz;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        vDistance = abs(uFocus - -mvPosition.z);
        
        // Tamanho base das partículas atenuado pela distância (sem desfoque/DOF)
        gl_PointSize = 15.0 * (1.0 / -mvPosition.z) * (step(1.0 - (1.0 / uFov), position.x));
      }`,
            fragmentShader: `uniform float uOpacity;
      varying float vDistance;
      void main() {
        vec2 cxy = 2.0 * gl_PointCoord - 1.0;
        if (dot(cxy, cxy) > 1.0) discard;
        
        // Aplica a opacidade controlada pelo user (slider opacity) mantendo a cor branca
        gl_FragColor = vec4(vec3(1.0), uOpacity);
      }`,
            uniforms: {
                positions: { value: null },
                uTime: { value: 0 },
                uFocus: { value: 5.1 },
                uFov: { value: 50 },
                uBlur: { value: 30 },
                uOpacity: { value: 1.0 }
            },
            transparent: true,
            blending: THREE.NormalBlending,
            depthWrite: false
        })
    }
}

extend({ DofPointsMaterial })
export { DofPointsMaterial }
