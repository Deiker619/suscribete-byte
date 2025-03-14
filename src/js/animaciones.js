document.addEventListener('DOMContentLoaded', () => {
    const frases = [
        "¡Suscríbete y enterate!",
      ];
      let fraseIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      const speed = 100; // Velocidad de escritura
      const eraseSpeed = 50; // Velocidad de borrado
      const delayBetween = 1000; // Tiempo entre frases
      const typewriterElement = document.getElementById("suscribete");
    
      function typeEffect() {
        const currentPhrase = frases[fraseIndex];
        if (isDeleting) {
          typewriterElement.textContent = currentPhrase.substring(0, charIndex--);
        } else {
          typewriterElement.textContent = currentPhrase.substring(0, charIndex++);
        }
    
        let timeout = isDeleting ? eraseSpeed : speed;
    
        
    
        setTimeout(typeEffect, timeout);
      }
    
      typeEffect();
    });

    