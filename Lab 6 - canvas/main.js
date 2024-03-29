document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let balls = [];
  const numBalls = 10;
  const minDistance = 100;
  let animationFrameId;

  let mouseX = 0, mouseY = 0;
  let mouseForce = document.getElementById('mouseForce').value; // Dodatnia wartość odpycha

  document.getElementById('mouseForce').addEventListener('input', function() {
    mouseForce = this.value;
  });

  canvas.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  canvas.addEventListener('click', function(e) {
    for (let i = balls.length - 1; i >= 0; i--) {
      const dx = e.clientX - balls[i].x;
      const dy = e.clientY - balls[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < balls[i].radius) {
          balls.splice(i, 1);
          balls.push(new Ball(), new Ball());
          break;
      }
    }
  });

  class Ball {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 10;
      this.vy = (Math.random() - 0.5) * 10;
      this.radius = 20;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Odbijanie od ścian
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.vx *= -1;
      }
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.vy *= -1;
      }

      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Odpychanie od kursora
      if (distance < 150) { 
        this.vx += mouseForce * dx / distance;
        this.vy += mouseForce * dy / distance;
      }
    }
  }

  function drawLine(ball1, ball2) {
    ctx.beginPath();
    ctx.moveTo(ball1.x, ball1.y);
    ctx.lineTo(ball2.x, ball2.y);
    ctx.stroke();
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
        ball.update();
        ball.draw();
    });

    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const dx = balls[i].x - balls[j].x;
        const dy = balls[i].y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) {
            drawLine(balls[i], balls[j]);
        }
      }
    }

    animationFrameId = requestAnimationFrame(update);
  }

  document.getElementById('start').addEventListener('click', () => {
    if (!animationFrameId) {
      balls = Array.from({ length: numBalls }, () => new Ball());
      update();
    }
  });

  document.getElementById('reset').addEventListener('click', () => {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls = [];
  });
});
