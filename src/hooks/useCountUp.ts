// src/hooks/useCountUp.ts
import { useState, useEffect } from 'react';

export function useCountUp(endValue: number, duration: number = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Só inicia a animação se o valor final for maior que 0
    if (endValue <= 0) {
      setCount(0);
      return;
    }

    let startTime: number;
    const animationFrame = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const currentCount = Math.floor(endValue * percentage);
      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(animationFrame);
      } else {
        setCount(endValue); // Garante que o valor final seja exato
      }
    };

    requestAnimationFrame(animationFrame);
    
    // Reseta a contagem se o valor final mudar
    return () => setCount(0);
  }, [endValue, duration]);

  return count;
}