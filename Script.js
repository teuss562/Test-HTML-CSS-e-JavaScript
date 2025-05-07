// Corações flutuando
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }
  setInterval(createHeart, 300);
  
  // Temporizador crescente
  let startDate = new Date();
  startDate.setHours(startDate.getHours() - 1);
  startDate.setDate(startDate.getDate() - 7);
  startDate.setMonth(startDate.getMonth() - 7);
  
  function updateTimer() {
    let now = new Date();
    let diff = now - startDate;
  
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 30);
  
    hours = hours % 24;
    days = days % 30;
  
    document.getElementById('months').textContent = String(months).padStart(2, '0');
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  }
  
  updateTimer();
  setInterval(updateTimer, 1000);
  