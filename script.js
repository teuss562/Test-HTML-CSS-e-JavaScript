// Função para criar corações flutuantes
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}

// Criar corações a cada 300ms
setInterval(createHeart, 300);

// Função para criar estrelas piscando
function createStars() {
  const starsContainer = document.querySelector('.stars');
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.animationDuration = (Math.random() * 2 + 1) + 's';
    starsContainer.appendChild(star);
  }
}

// Iniciar estrelas piscando
createStars();

// Função para contar o tempo desde 11 de setembro de 2024
function updateCountdown() {
  const eventDate = new Date('2024-09-11T00:00:00-03:00'); // 11 de setembro de 2024 em horário de Brasília
  const now = new Date();
  const timeDiff = eventDate - now;

  if (timeDiff < 0) {
    document.getElementById('countdown').innerText = "O evento já aconteceu!";
    return;
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  document.getElementById('countdown').innerText = `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos`;
}

// Atualizar a contagem a cada segundo
setInterval(updateCountdown, 1000);
