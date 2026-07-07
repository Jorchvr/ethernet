const btn = document.getElementById('magicBtn');
const card = document.getElementById('revealCard');
const closeBtn = document.getElementById('closeBtn');
const againBtn = document.getElementById('againBtn');
const confetti = document.getElementById('confetti');

const COLORS = ['#ffde59', '#ff6b9d', '#a29bfe', '#74e0ff', '#ffb6d9', '#7bed9f'];

function launchConfetti(count = 80) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span');
    const size = 6 + Math.random() * 12;
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.width = size + 'px';
    piece.style.height = size + 'px';
    piece.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.animationDuration = 2 + Math.random() * 2.5 + 's';
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    confetti.appendChild(piece);
    setTimeout(() => piece.remove(), 5000);
  }
}

function openCard() {
  card.classList.add('show');
  card.setAttribute('aria-hidden', 'false');
  launchConfetti();
}

function closeCard() {
  card.classList.remove('show');
  card.setAttribute('aria-hidden', 'true');
}

btn.addEventListener('click', openCard);
closeBtn.addEventListener('click', closeCard);
againBtn.addEventListener('click', () => {
  launchConfetti(60);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCard();
});

let dodging = false;
btn.addEventListener('mouseenter', () => {
  if (dodging) return;
  if (Math.random() < 0.35) {
    dodging = true;
    const maxX = window.innerWidth - btn.offsetWidth - 40;
    const maxY = window.innerHeight - btn.offsetHeight - 40;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
    btn.style.transition = 'left 0.35s ease, top 0.35s ease, transform 0.15s ease';
    setTimeout(() => { dodging = false; }, 400);
  }
});
