"use client";

import { useEffect, useRef } from "react";

export function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        // Custom Particle Interface
        interface Particle {
            x: number;
            y: number;
            baseX: number;
            baseY: number;
            size: number;
            color: string;
            density: number;
            angle: number;      // For smooth swaying
            speed: number;      // Oscillation speed
            amplitude: number;  // Sway distance
        }

        let particles: Particle[] = [];

        // Mouse config
        const mouse = { x: -1000, y: -1000, radius: 350 };

        // Theme Colors: Violet & Indigo
        const colors = ["#8b5cf6", "#6366f1", "#a855f7"];

        const initParticles = () => {
            particles = [];
            const spacing = 40; // Grid spacing

            // Create grid of particles
            for (let y = 0; y < canvas.height; y += spacing) {
                for (let x = 0; x < canvas.width; x += spacing) {
                    // Add some randomness to initial position for organic feel
                    const xPos = x + (Math.random() * 20 - 10);
                    const yPos = y + (Math.random() * 20 - 10);

                    particles.push({
                        x: xPos,
                        y: yPos,
                        baseX: xPos,
                        baseY: yPos,
                        size: 1.5,
                        // Select random theme color
                        color: colors[Math.floor(Math.random() * colors.length)],
                        density: (Math.random() * 30) + 1,
                        angle: Math.random() * Math.PI * 1,
                        speed: 0.001 + Math.random() * 0.01,
                        amplitude: 1 + Math.random() * 5
                    });
                }
            }
        };

        const resizeCanvas = () => {
            // Fullscreen canvas
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];

                // Sway logic: Update angles for gentle movement
                p.angle += p.speed;
                const swayX = Math.cos(p.angle) * p.amplitude;
                const swayY = Math.sin(p.angle) * p.amplitude;

                // Target Position = Base + Sway
                const targetX = p.baseX + swayX;
                const targetY = p.baseY + swayY;

                // Distance from mouse
                let dx = mouse.x - p.x;
                let dy = mouse.y - p.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;

                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * p.density;
                    let directionY = forceDirectionY * force * p.density;

                    // Repel!!
                    p.x -= directionX;
                    p.y -= directionY;
                    p.size = 0.5;
                    ctx.globalAlpha = 1;
                } else {
                    // Return to sway target (Elastic effect)
                    if (p.x !== targetX) {
                        let dx = p.x - targetX;
                        p.x -= dx / 15; // Slower restoration for fluidity
                    }
                    if (p.y !== targetY) {
                        let dy = p.y - targetY;
                        p.y -= dy / 15;
                    }
                    p.size = 1.5;
                    ctx.globalAlpha = 0.5;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-50 h-full w-full pointer-events-none opacity-40 mix-blend-screen"
        />
    );
}

