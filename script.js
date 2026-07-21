const stages = {
  hero: document.getElementById("hero"),
  bubble: document.getElementById("bubbleStage"),
  puzzle: document.getElementById("puzzleStage"),
  wish: document.getElementById("wishCard"),
};

const progressBar = document.getElementById("progressBar");
const confettiContainer = document.getElementById("confetti");
const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("birthdayMusic");

const BUBBLE_COUNT = 12;
const SECRET_LETTERS = ["R", "A", "J", "A", "N", "I"];
const PUZZLE_TILES = ["🎂", "🎈", "🎁", "✨", "🌸", "💖", "🎉", "🎵"];

let currentStage = 0;
let poppedCount = 0;
let collectedLetters = [];
let puzzleMoves = 0;
let puzzleTimerInterval = null;
let puzzleSeconds = 0;
let puzzleTiles = [];
let emptyIndex = 8;

const confettiColors = [
  "#ff6b9d", "#ffd700", "#9b59b6", "#00d2ff",
  "#ff4757", "#2ed573", "#ffa502",
];

/* ── Stage navigation ── */

function setProgress(step) {
  currentStage = step;
  progressBar.querySelectorAll(".step").forEach((el, i) => {
    el.classList.toggle("active", i === step);
    el.classList.toggle("done", i < step);
  });
}

function showStage(name) {
  Object.values(stages).forEach((el) => {
    el.classList.add("hidden");
    el.style.display = "none";
  });
  const target = stages[name];
  target.classList.remove("hidden");
  target.style.display = "";
  target.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ── Confetti ── */

function createConfetti(count = 80) {
  confettiContainer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.width = `${6 + Math.random() * 8}px`;
    piece.style.height = `${6 + Math.random() * 8}px`;
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    piece.style.animationDuration = `${2 + Math.random() * 3}s`;
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    confettiContainer.appendChild(piece);
  }
  setTimeout(() => { confettiContainer.innerHTML = ""; }, 5000);
}

/* ── Pop sound (Web Audio) ── */

function playPopSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(400 + Math.random() * 200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } catch { /* audio not available */ }
}

/* ── Bubble Game ── */

function initLetterSlots() {
  const container = document.getElementById("letterSlots");
  container.innerHTML = "";
  SECRET_LETTERS.forEach((_, i) => {
    const slot = document.createElement("div");
    slot.className = "letter-slot";
    slot.dataset.index = i;
    slot.textContent = "?";
    container.appendChild(slot);
  });
}

function spawnBubbles() {
  const arena = document.getElementById("bubbleArena");
  arena.innerHTML = "";
  poppedCount = 0;
  collectedLetters = [];
  initLetterSlots();
  updateBubbleProgress();

  const letterIndices = new Set();
  while (letterIndices.size < SECRET_LETTERS.length) {
    letterIndices.add(Math.floor(Math.random() * BUBBLE_COUNT));
  }
  const letterArr = [...letterIndices];

  for (let i = 0; i < BUBBLE_COUNT; i++) {
    const bubble = document.createElement("button");
    bubble.className = "bubble";
    bubble.type = "button";
    bubble.setAttribute("aria-label", "Pop bubble");

    const size = 50 + Math.random() * 40;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${5 + Math.random() * 75}%`;
    bubble.style.top = `${5 + Math.random() * 70}%`;
    bubble.style.animationDuration = `${3 + Math.random() * 4}s`;
    bubble.style.animationDelay = `${Math.random() * 2}s`;

    const letterIdx = letterArr.indexOf(i);
    if (letterIdx !== -1) {
      bubble.classList.add("secret");
      bubble.dataset.letter = SECRET_LETTERS[letterIdx];
      bubble.dataset.letterIndex = letterIdx;
    }

    bubble.addEventListener("click", () => popBubble(bubble));
    arena.appendChild(bubble);
  }
}

function popBubble(bubble) {
  if (bubble.classList.contains("popped")) return;

  bubble.classList.add("popped");
  playPopSound();
  poppedCount++;

  if (bubble.classList.contains("secret")) {
    const letter = bubble.dataset.letter;
    const idx = parseInt(bubble.dataset.letterIndex, 10);
    revealLetter(letter, idx);
  }

  createMiniBurst(bubble);
  updateBubbleProgress();

  if (poppedCount >= BUBBLE_COUNT) {
    onAllBubblesPopped();
  }
}

function createMiniBurst(bubble) {
  const rect = bubble.getBoundingClientRect();
  const arena = document.getElementById("bubbleArena");
  const arenaRect = arena.getBoundingClientRect();

  for (let i = 0; i < 6; i++) {
    const particle = document.createElement("span");
    particle.className = "burst-particle";
    particle.style.left = `${rect.left - arenaRect.left + rect.width / 2}px`;
    particle.style.top = `${rect.top - arenaRect.top + rect.height / 2}px`;
    particle.style.setProperty("--angle", `${i * 60}deg`);
    arena.appendChild(particle);
    setTimeout(() => particle.remove(), 600);
  }
}

function revealLetter(letter, index) {
  const slot = document.querySelector(`.letter-slot[data-index="${index}"]`);
  if (slot && slot.textContent === "?") {
    slot.textContent = letter;
    slot.classList.add("revealed");
  }
}

function updateBubbleProgress() {
  const fill = document.getElementById("bubbleProgressFill");
  const text = document.getElementById("bubbleProgressText");
  const pct = (poppedCount / BUBBLE_COUNT) * 100;
  fill.style.width = `${pct}%`;
  text.textContent = `${poppedCount} / ${BUBBLE_COUNT} popped`;
}

function onAllBubblesPopped() {
  const status = document.getElementById("bubbleStatus");
  status.textContent = "🎉 Secret revealed: RAJANI! Now unlock the puzzle...";
  status.classList.add("success");
  document.getElementById("bubbleNext").classList.remove("hidden");
  createConfetti(50);
}

/* ── Sliding Puzzle ── */

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isPuzzleSolvable(tiles) {
  let inversions = 0;
  const filtered = tiles.filter((t) => t !== null);
  for (let i = 0; i < filtered.length; i++) {
    for (let j = i + 1; j < filtered.length; j++) {
      if (filtered[i] > filtered[j]) inversions++;
    }
  }
  return inversions % 2 === 0;
}

function initPuzzle() {
  puzzleMoves = 0;
  puzzleSeconds = 0;
  document.getElementById("moveCount").textContent = "0";
  document.getElementById("puzzleTimer").textContent = "0:00";
  document.getElementById("puzzleStatus").textContent = "Click a tile next to the empty space to slide it";
  document.getElementById("puzzleStatus").classList.remove("success");
  document.getElementById("puzzleNext").classList.add("hidden");

  let indices = shuffleArray([...Array(8).keys()]);
  while (!isPuzzleSolvable(indices)) {
    indices = shuffleArray([...Array(8).keys()]);
  }

  puzzleTiles = [...indices, null];
  emptyIndex = 8;
  renderPuzzle();

  clearInterval(puzzleTimerInterval);
  puzzleTimerInterval = setInterval(() => {
    puzzleSeconds++;
    const m = Math.floor(puzzleSeconds / 60);
    const s = puzzleSeconds % 60;
    document.getElementById("puzzleTimer").textContent = `${m}:${s.toString().padStart(2, "0")}`;
  }, 1000);
}

function renderPuzzle() {
  const board = document.getElementById("puzzleBoard");
  board.innerHTML = "";

  puzzleTiles.forEach((tile, index) => {
    const el = document.createElement("button");
    el.className = "puzzle-tile";
    el.type = "button";
    if (tile === null) {
      el.classList.add("empty");
      el.textContent = "";
      el.disabled = true;
    } else {
      el.textContent = PUZZLE_TILES[tile];
      el.addEventListener("click", () => moveTile(index));
    }
    board.appendChild(el);
  });
}

function getNeighbors(index) {
  const row = Math.floor(index / 3);
  const col = index % 3;
  const neighbors = [];
  if (row > 0) neighbors.push(index - 3);
  if (row < 2) neighbors.push(index + 3);
  if (col > 0) neighbors.push(index - 1);
  if (col < 2) neighbors.push(index + 1);
  return neighbors;
}

function moveTile(index) {
  if (!getNeighbors(emptyIndex).includes(index)) return;

  puzzleTiles[emptyIndex] = puzzleTiles[index];
  puzzleTiles[index] = null;
  emptyIndex = index;
  puzzleMoves++;
  document.getElementById("moveCount").textContent = puzzleMoves;
  renderPuzzle();

  if (isPuzzleSolved()) {
    onPuzzleSolved();
  }
}

function isPuzzleSolved() {
  for (let i = 0; i < 8; i++) {
    if (puzzleTiles[i] !== i) return false;
  }
  return puzzleTiles[8] === null;
}

function onPuzzleSolved() {
  clearInterval(puzzleTimerInterval);
  const status = document.getElementById("puzzleStatus");
  status.textContent = "🎊 Puzzle solved! Your birthday wish is unlocked!";
  status.classList.add("success");
  document.getElementById("puzzleNext").classList.remove("hidden");
  createConfetti(80);
}

/* ── Event listeners ── */

document.getElementById("startAdventure").addEventListener("click", () => {
  setProgress(1);
  showStage("bubble");
  spawnBubbles();
});

document.getElementById("bubbleNext").addEventListener("click", () => {
  setProgress(2);
  showStage("puzzle");
  initPuzzle();
});

document.getElementById("shufflePuzzle").addEventListener("click", initPuzzle);

document.getElementById("puzzleNext").addEventListener("click", () => {
  setProgress(3);
  showStage("wish");
  createConfetti(100);
});

document.getElementById("celebrateBtn").addEventListener("click", () => {
  const btn = document.getElementById("celebrateBtn");
  createConfetti(120);
  btn.textContent = "🎉 Yay! 🎉";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = "Celebrate! 🎊";
    btn.disabled = false;
  }, 2000);
});

/* ── Music ── */

let isPlaying = false;

musicBtn.addEventListener("click", async () => {
  try {
    if (isPlaying) {
      music.pause();
      musicBtn.classList.remove("playing");
      musicBtn.querySelector(".music-label").textContent = "Play Music";
      isPlaying = false;
    } else {
      await music.play();
      musicBtn.classList.add("playing");
      musicBtn.querySelector(".music-label").textContent = "Pause Music";
      isPlaying = true;
    }
  } catch {
    musicBtn.querySelector(".music-label").textContent = "No music file";
    musicBtn.style.opacity = "0.6";
  }
});

music.addEventListener("ended", () => {
  isPlaying = false;
  musicBtn.classList.remove("playing");
  musicBtn.querySelector(".music-label").textContent = "Play Music";
});

window.addEventListener("load", () => {
  setTimeout(() => createConfetti(20), 1000);
});
