const calculateParticles = (particles, mousePosition, canvasWidth, canvasHeight) => {
  return particles.map(particle => {
    const updatedParticle = { ...particle };
    
    // Update particle velocity based on mouse position
    if (mousePosition.x !== null && mousePosition.y !== null) {
      const dx = particle.x - mousePosition.x;
      const dy = particle.y - mousePosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const repelRadius = 100;

      if (distance < repelRadius) {
        const force = (1 - distance / repelRadius) * 2.5; // Increased force
        const angle = Math.atan2(dy, dx);
        
        // Enhanced movement
        updatedParticle.vx = updatedParticle.vx * 0.8 + Math.cos(angle) * force * 2.2;
        updatedParticle.vy = updatedParticle.vy * 0.8 + Math.sin(angle) * force * 2.2;
      } else {
        // Smoother return to original velocity
        updatedParticle.vx = updatedParticle.vx * 0.95 + updatedParticle.originalVx * 0.05;
        updatedParticle.vy = updatedParticle.vy * 0.95 + updatedParticle.originalVy * 0.05;
      }
    } else {
      updatedParticle.vx = updatedParticle.vx * 0.98 + updatedParticle.originalVx * 0.02;
      updatedParticle.vy = updatedParticle.vy * 0.98 + updatedParticle.originalVy * 0.02;
    }

    // Update position with improved physics
    updatedParticle.x += updatedParticle.vx;
    updatedParticle.y += updatedParticle.vy;

    // Improved edge handling
    updatedParticle.x = ((updatedParticle.x % canvasWidth) + canvasWidth) % canvasWidth;
    updatedParticle.y = ((updatedParticle.y % canvasHeight) + canvasHeight) % canvasHeight;

    return updatedParticle;
  });
};

self.onmessage = (e) => {
  const { particles, mousePosition, canvasWidth, canvasHeight } = e.data;
  
  particles.forEach(particle => {
    if (mousePosition.x !== null && mousePosition.y !== null) {
      const dx = mousePosition.x - particle.x;
      const dy = mousePosition.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Increased interaction radius and force
      if (distance < 120) {
        const force = Math.pow((120 - distance) / 120, 2) * 2;
        particle.vx += (dx / distance) * force;
        particle.vy += (dy / distance) * force;
        
        // Add orbital motion
        const angle = Math.atan2(dy, dx);
        particle.vx += Math.cos(angle + Math.PI/2) * force * 0.5;
        particle.vy += Math.sin(angle + Math.PI/2) * force * 0.5;
      }
    }
    
    // Update position with enhanced movement
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    // More natural random movement
    const randomAngle = Math.random() * Math.PI * 2;
    particle.vx += Math.cos(randomAngle) * 0.02;
    particle.vy += Math.sin(randomAngle) * 0.02;
    
    // Smoother damping
    particle.vx *= 0.985;
    particle.vy *= 0.985;
    
    // Improved edge wrapping
    if (particle.x < -50) particle.x = canvasWidth + 50;
    if (particle.x > canvasWidth + 50) particle.x = -50;
    if (particle.y < -50) particle.y = canvasHeight + 50;
    if (particle.y > canvasHeight + 50) particle.y = -50;
  });
  
  self.postMessage(particles);
};