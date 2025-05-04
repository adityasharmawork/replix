// "use client";

// import { useEffect, useRef } from 'react';

// const ParticlesBackground = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     let particles: Particle[] = [];
//     let animationFrameId: number;

//     // Configure canvas size
//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       initParticles();
//     };

//     // Particle class
//     class Particle {
//       x: number;
//       y: number;
//       size: number;
//       speedX: number;
//       speedY: number;
//       opacity: number;

//       constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.size = Math.random() * 1.5 + 0.5;
//         this.speedX = (Math.random() - 0.5) * 0.2;
//         this.speedY = (Math.random() - 0.5) * 0.2;
//         this.opacity = Math.random() * 0.5 + 0.1;
//       }

//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;

//         // Wrap particles around screen
//         if (this.x < 0) this.x = canvas.width;
//         if (this.x > canvas.width) this.x = 0;
//         if (this.y < 0) this.y = canvas.height;
//         if (this.y > canvas.height) this.y = 0;
//       }

//       draw() {
//         if (!ctx) return;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
//         ctx.fill();
//       }
//     }

//     // Initialize particles
//     const initParticles = () => {
//       particles = [];
//       const numberOfParticles = Math.min(
//         Math.floor((canvas.width * canvas.height) / 15000),
//         100
//       );

//       for (let i = 0; i < numberOfParticles; i++) {
//         particles.push(new Particle());
//       }
//     };

//     // Connect particles with lines if they're close enough
//     const connectParticles = () => {
//       const maxDistance = 100;
//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x;
//           const dy = particles[i].y - particles[j].y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           if (distance < maxDistance) {
//             const opacity = 1 - distance / maxDistance;
//             ctx.beginPath();
//             ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.1})`;
//             ctx.lineWidth = 0.2;
//             ctx.moveTo(particles[i].x, particles[i].y);
//             ctx.lineTo(particles[j].x, particles[j].y);
//             ctx.stroke();
//           }
//         }
//       }
//     };

//     // Animation loop
//     const animate = () => {
//       if (!ctx || !canvas) return;
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       for (const particle of particles) {
//         particle.update();
//         particle.draw();
//       }

//       connectParticles();
//       animationFrameId = requestAnimationFrame(animate);
//     };

//     // Set up canvas and start animation
//     resizeCanvas();
//     window.addEventListener('resize', resizeCanvas);
//     animate();

//     // Clean up
//     return () => {
//       window.removeEventListener('resize', resizeCanvas);
//       if (animationFrameId) {
//         cancelAnimationFrame(animationFrameId);
//       }
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed inset-0 z-[-1] opacity-20 pointer-events-none"
//       aria-hidden="true"
//     />
//   );
// };

// export default ParticlesBackground; 











"use client";

import { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.5 + 0.5;
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap particles around screen
        if (this.x < 0) this.x = canvasWidth;
        if (this.x > canvasWidth) this.x = 0;
        if (this.y < 0) this.y = canvasHeight;
        if (this.y > canvasHeight) this.y = 0;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // context.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        context.fillStyle = `rgba(255, 255, 255, 1)`;
        context.fill();
      }
    }

    // Configure canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.min(
        Math.floor((canvas.width * canvas.height) / 15000),
        100
      );

      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    // Connect particles with lines if they're close enough
    const connectParticles = () => {
      const maxDistance = 100;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.1})`;
            ctx.lineWidth = 0.2;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      }

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Set up canvas and start animation
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] opacity-20 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ParticlesBackground;