
        // Dark/Light Mode Toggle
        const modeToggle = document.querySelector('.mode-toggle');
        const modeIcon = document.querySelector('.mode-icon');
        const modeText = document.querySelector('.mode-text');
        const body = document.body;

        modeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            
            if (body.classList.contains('light-mode')) {
                modeIcon.textContent = '☀';
                modeText.textContent = 'Light';
            } else {
                modeIcon.textContent = '☽';
                modeText.textContent = 'Dark';
            }
        });

        // Project Modal Functionality
        const projectCards = document.querySelectorAll('.project-card');
        const modals = document.querySelectorAll('.modal');
        const closeButtons = document.querySelectorAll('.close-modal');

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project');
                const modal = document.getElementById(`project-modal-${projectId}`);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Scroll Animation
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.process-step, .project-card, .about-image, .about-content');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

        // Set initial state for animated elements
        document.querySelectorAll('.process-step, .project-card, .about-image, .about-content').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);

      

        /* Add this to your JavaScript */
let currentPosition = 0;
const galleryTrack = document.querySelector('.gallery-track');
const galleryItems = document.querySelectorAll('.gallery-item');

function updateGallery() {
  galleryTrack.style.transform = `translateX(${currentPosition}px)`;
  
  galleryItems.forEach((item, index) => {
    const distanceFromCenter = Math.abs(index * 320 + currentPosition - window.innerWidth/2);
    const scale = 1 - Math.min(distanceFromCenter / 2000, 0.3);
    const zIndex = Math.round(100 - distanceFromCenter / 10);
    const opacity = 1 - Math.min(distanceFromCenter / 1000, 0.5);
    
    item.style.transform = `scale(${scale})`;
    item.style.zIndex = zIndex;
    item.style.opacity = opacity;
  });
}

// Add mouse wheel/arrow key navigation
window.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) {
    currentPosition -= 100;
  } else {
    currentPosition += 100;
  }
  updateGallery();
});


// Add this to your JavaScript
class Particle {
  constructor(canvas) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = `hsl(${Math.random() * 60 + 200}, 80%, 60%)`;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Initialize canvas and particles
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';
canvas.style.opacity = '0.3';
document.body.appendChild(canvas);

let particles = [];
function initParticles() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = Array(100).fill().map(() => new Particle(canvas));
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


const colorThemes = {
  1: { primary: '#6e45e2', secondary: '#88d3ce' },
  2: { primary: '#ff6b6b', secondary: '#4ecdc4' },
  3: { primary: '#48dbfb', secondary: '#1dd1a1' },
  4: { primary: '#feca57', secondary: '#ff6b6b' },
  5: { primary: '#5f27cd', secondary: '#00d2d3' },
  6: { primary: '#1dd1a1', secondary: '#ff9ff3' }
};

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const projectId = card.getAttribute('data-project');
    const theme = colorThemes[projectId];
    document.documentElement.style.setProperty('--accent', theme.primary);
    card.style.boxShadow = `0 20px 40px ${theme.secondary}33`;
  });
  
  card.addEventListener('mouseleave', () => {
    document.documentElement.style.setProperty('--accent', '#6e45e2');
    card.style.boxShadow = 'none';
  });
});

// Add parallax effect
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.parallax-layer').forEach(layer => {
    const depth = layer.getAttribute('data-depth');
    const movement = scrollY * depth;
    layer.style.transform = `translateY(${movement}px)`;
  });
});
    


// Position nodes in a circle
function positionNodesInCircle() {
  const nodes = document.querySelectorAll('.node');
  const centerX = document.querySelector('.ai-process').offsetWidth / 2;
  const centerY = document.querySelector('.ai-process').offsetHeight / 2;
  const radius = Math.min(centerX, centerY) * 0.7; // 70% of half the smaller dimension
  
  nodes.forEach((node, index) => {
    const angle = (index * (2 * Math.PI / nodes.length)) - Math.PI/2; // Start from top
    const x = centerX + radius * Math.cos(angle) - 50; // 50 is half node width
    const y = centerY + radius * Math.sin(angle) - 50; // 50 is half node height
    
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
  });
}

// Draw circular connections
function drawCircularConnections() {
  const canvas = document.getElementById('process-canvas');
  const ctx = canvas.getContext('2d');
  const nodes = document.querySelectorAll('.node');
  
  // Set canvas dimensions
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw connecting arcs
  nodes.forEach((node, i) => {
    const nextNode = nodes[(i + 1) % nodes.length];
    const rect1 = node.getBoundingClientRect();
    const rect2 = nextNode.getBoundingClientRect();
    
    const x1 = rect1.left + rect1.width/2 - canvas.getBoundingClientRect().left;
    const y1 = rect1.top + rect1.height/2 - canvas.getBoundingClientRect().top;
    const x2 = rect2.left + rect2.width/2 - canvas.getBoundingClientRect().left;
    const y2 = rect2.top + rect2.height/2 - canvas.getBoundingClientRect().top;
    
    // Draw connecting line
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `hsla(${200 + i*30}, 80%, 60%, 0.6)`;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw animated pulse if active
    if (node.classList.contains('active')) {
      const progress = Date.now() % 2000 / 2000;
      const pulseX = x1 + (x2 - x1) * progress;
      const pulseY = y1 + (y2 - y1) * progress;
      
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 5 + 3 * Math.sin(progress * Math.PI), 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${200 + i*30}, 80%, 60%, 0.8)`;
      ctx.fill();
    }
  });
  
  requestAnimationFrame(drawCircularConnections);
}

// Animate process steps in circle
function animateCircularProcess() {
  const steps = [1, 2, 3, 4, 5];
  let current = 0;
  
  setInterval(() => {
    document.querySelectorAll('.node').forEach(node => {
      node.classList.remove('active');
    });
    
    document.querySelector(`.node[data-step="${steps[current]}"]`).classList.add('active');
    current = (current + 1) % steps.length;
  }, 1500);
}

// Initialize
window.addEventListener('load', () => {
  positionNodesInCircle();
  drawCircularConnections();
  animateCircularProcess();
});

window.addEventListener('resize', () => {
  positionNodesInCircle();
});

document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.menu-overlay');
    const navItems = document.querySelectorAll('.nav-links a');

    menuBtn.addEventListener('click', function() {
        // Toggle active states
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Toggle body scroll
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when clicking overlay or nav items
    overlay.addEventListener('click', closeMenu);
    navItems.forEach(item => item.addEventListener('click', closeMenu));

    function closeMenu() {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});


    console.log('Current viewport width:', window.innerWidth);
    console.log('Nav links display:', getComputedStyle(document.querySelector('.nav-links')).display);
    console.log('Mobile button display:', getComputedStyle(document.querySelector('.mobile-menu-btn')).display);

    //form
  const form = document.querySelector('.contact-form');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const spinner = document.getElementById('spinner');
  const successMsg = document.getElementById('formSuccess');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Show spinner, disable button
    spinner.style.display = 'inline-block';
    btnText.style.display = 'none';
    submitBtn.disabled = true;

    const formData = new FormData(form);
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');

    try {
      const response = await fetch('https://formsubmit.co/ajax/raphaelpeace2002@gmail.com', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        form.reset();
        successMsg.style.display = 'block';
        setTimeout(() => {
          successMsg.style.opacity = '1';
        }, 100);
      } else {
        alert('❌ Something went wrong. Try again.');
      }
    } catch (error) {
      alert('❌ Network error. Please check your connection.');
    }

    // Hide spinner, re-enable button
    spinner.style.display = 'none';
    btnText.style.display = 'inline-block';
    submitBtn.disabled = false;
  });

    