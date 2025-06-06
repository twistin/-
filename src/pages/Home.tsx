import React, { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let animationId: number;
    let startTime: number;
    const animationDuration = 3000; // 3 segundos

    // Puntos centrales para el símbolo φ final
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const phiSize = Math.min(dimensions.width, dimensions.height) * 0.08;

    // Generar puntos para el símbolo φ final
    const generatePhiShape = () => {
      const points: Point[] = [];
      
      // Círculo del φ
      for (let i = 0; i <= 32; i++) {
        const angle = (i / 32) * Math.PI * 2;
        points.push({
          x: centerX + Math.cos(angle) * phiSize,
          y: centerY + Math.sin(angle) * phiSize
        });
      }
      
      // Línea vertical del φ
      for (let i = 0; i <= 16; i++) {
        points.push({
          x: centerX,
          y: centerY - phiSize * 1.4 + (i / 16) * phiSize * 2.8
        });
      }
      
      return points;
    };

    const phiPoints = generatePhiShape();

    // Configuración del trazo serpenteante
    const numTrailPoints = 60; // Número de puntos que forman el trazo
    const trailPoints: Point[] = [];
    
    // Inicializar el trazo desde el borde izquierdo
    const startX = -50;
    const startY = dimensions.height / 2;
    
    for (let i = 0; i < numTrailPoints; i++) {
      trailPoints.push({
        x: startX - i * 8,
        y: startY
      });
    }

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (progress < 0.75) {
        // Fase 1: Movimiento serpenteante (75% del tiempo)
        const headProgress = progress / 0.75;
        
        // Posición de la cabeza del trazo (movimiento hacia el centro)
        const headX = startX + (centerX - startX) * headProgress;
        const headY = startY + (centerY - startY) * headProgress;
        
        // Actualizar posiciones del trazo con efecto serpiente
        for (let i = 0; i < numTrailPoints; i++) {
          const segmentProgress = Math.max(0, headProgress - (i * 0.02));
          
          if (segmentProgress > 0) {
            // Posición base en la trayectoria hacia el centro
            const baseX = startX + (centerX - startX) * segmentProgress;
            const baseY = startY + (centerY - startY) * segmentProgress;
            
            // Añadir ondulación serpenteante
            const waveFrequency = 3;
            const waveAmplitude = 30 * (1 - segmentProgress * 0.7); // Reducir amplitud cerca del centro
            const waveOffset = timestamp * 0.003 + i * 0.2;
            
            trailPoints[i] = {
              x: baseX + Math.sin(waveOffset * waveFrequency) * waveAmplitude,
              y: baseY + Math.cos(waveOffset * waveFrequency * 0.7) * waveAmplitude * 0.5
            };
          }
        }
        
        // Dibujar el trazo serpenteante
        ctx.beginPath();
        const visiblePoints = trailPoints.filter(point => point.x > -100);
        
        if (visiblePoints.length > 0) {
          ctx.moveTo(visiblePoints[0].x, visiblePoints[0].y);
          for (let i = 1; i < visiblePoints.length; i++) {
            ctx.lineTo(visiblePoints[i].x, visiblePoints[i].y);
          }
          ctx.stroke();
        }
        
      } else {
        // Fase 2: Transformación a φ (25% final)
        const transformProgress = (progress - 0.75) / 0.25;
        const easing = 1 - Math.pow(1 - transformProgress, 3);
        
        // Interpolar entre el trazo final y la forma φ
        const finalTrailPoints = trailPoints.slice(0, Math.min(phiPoints.length, numTrailPoints));
        
        // Dibujar círculo del φ
        ctx.beginPath();
        const circlePoints = phiPoints.slice(0, 33);
        
        for (let i = 0; i < circlePoints.length; i++) {
          const sourcePoint = finalTrailPoints[i] || finalTrailPoints[finalTrailPoints.length - 1];
          const targetPoint = circlePoints[i];
          
          const x = sourcePoint.x + (targetPoint.x - sourcePoint.x) * easing;
          const y = sourcePoint.y + (targetPoint.y - sourcePoint.y) * easing;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();
        
        // Dibujar línea vertical del φ
        if (phiPoints.length > 33) {
          ctx.beginPath();
          const linePoints = phiPoints.slice(33);
          
          for (let i = 0; i < linePoints.length; i++) {
            const sourceIndex = Math.min(i + 10, finalTrailPoints.length - 1);
            const sourcePoint = finalTrailPoints[sourceIndex];
            const targetPoint = linePoints[i];
            
            const x = sourcePoint.x + (targetPoint.x - sourcePoint.x) * easing;
            const y = sourcePoint.y + (targetPoint.y - sourcePoint.y) * easing;
            
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
      }

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setAnimationComplete(true);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [dimensions]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-white flex items-center justify-center overflow-hidden"
    >
      {/* Canvas para la animación */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          animationComplete ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Símbolo φ final estático */}
      <div 
        className={`text-8xl md:text-9xl font-light text-black transition-all duration-1000 transform ${
          animationComplete 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
        style={{ fontFamily: 'Georgia, serif' }}
      >
        φ
      </div>

      {/* Texto sutil que aparece después de la animación */}
      <div 
        className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          animationComplete 
            ? 'opacity-60 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="text-sm text-gray-500 tracking-widest uppercase">
          Artista Sonoro
        </p>
      </div>
    </div>
  );
};

export default Home;
