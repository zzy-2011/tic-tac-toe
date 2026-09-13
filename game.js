(() => {
  'use strict';
  const cv = document.getElementById('game'); const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
  cv.width = W * dpr; cv.height = H * dpr; ctx.scale(dpr, dpr);
  const youEl = document.getElementById('you'), cpuEl = document.getElementById('cpu'), drawEl = document.getElementById('draw');
  const overlay = document.getElementById('overlay'), ovTitle = document.getElementById('ov-title'), ovSub = document.getElementById('ov-sub');
  const N = 3, CELL = W / N;
  let board, over;

  function reset() { board = Array(9).fill(''); over = false; overlay.classList.add('hidden'); }
  function winLine(p) {
    const L = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (const l of L) if (l.every(i => board[i] === p)) return l; return null;
  }
  function cpuMove() {
    const empt = []; for (let i = 0; i < 9; i++) if (!board[i]) empt.push(i);
    if (!empt.length) return;
    let pick = empt[0];
    for (const i of empt) { board[i] = 'O'; if (winLine('O')) { pick = i; board[i] = ''; break; } board[i] = ''; }
    if (pick === empt[0]) for (const i of empt) { board[i] = 'X'; if (winLine('X')) { pick = i; board[i] = ''; break; } board[i] = ''; }
    if (pick === empt[0] && !board[4]) pick = 4;
    if (pick === empt[0]) pick = empt[Math.floor(Math.random() * empt.length)];
    board[pick] = 'O';
    if (winLine('O')) { over = true; cpuEl.textContent = +cpuEl.textContent + 1; ovTitle.textContent = '电脑赢了'; ovSub.textContent = 'O 连成一线'; overlay.classList.remove('hidden'); return; }
    if (board.every(v => v)) { over = true; drawEl.textContent = +drawEl.textContent + 1; ovTitle.textContent = '平局'; ovSub.textContent = '棋盘已满'; overlay.classList.remove('hidden'); }
  }
  function clickCell(i) {
    if (over || board[i]) return;
    board[i] = 'X';
    if (winLine('X')) { over = true; youEl.textContent = +youEl.textContent + 1; ovTitle.textContent = '你赢了！'; ovSub.textContent = 'X 连成一线'; overlay.classList.remove('hidden'); return; }
    if (board.every(v => v)) { over = true; drawEl.textContent = +drawEl.textContent + 1; ovTitle.textContent = '平局'; ovSub.textContent = '棋盘已满'; overlay.classList.remove('hidden'); return; }
    cpuMove();
  }
  function draw() {
    ctx.fillStyle = '#1a1c3a'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#34386e'; ctx.lineWidth = 3;
    for (let i = 1; i < N; i++) { ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, H); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(W, i * CELL); ctx.stroke(); }
    ctx.lineWidth = 5; ctx.lineCap = 'round';
    for (let i = 0; i < 9; i++) {
      if (!board[i]) continue;
      const cx = (i % 3) * CELL + CELL / 2, cy = Math.floor(i / 3) * CELL + CELL / 2;
      if (board[i] === 'X') { ctx.strokeStyle = '#4fd1ff'; ctx.beginPath(); ctx.moveTo(cx - CELL * 0.25, cy - CELL * 0.25); ctx.lineTo(cx + CELL * 0.25, cy + CELL * 0.25); ctx.moveTo(cx + CELL * 0.25, cy - CELL * 0.25); ctx.lineTo(cx - CELL * 0.25, cy + CELL * 0.25); ctx.stroke(); }
      else { ctx.strokeStyle = '#ff5c7a'; ctx.beginPath(); ctx.arc(cx, cy, CELL * 0.26, 0, Math.PI * 2); ctx.stroke(); }
    }
  }
  cv.addEventListener('click', e => { const rect = cv.getBoundingClientRect(); const px = (e.clientX - rect.left) / rect.width * W, py = (e.clientY - rect.top) / rect.height * H; clickCell(Math.floor(py / CELL) * 3 + Math.floor(px / CELL)); });
  cv.addEventListener('touchend', e => { const t = e.changedTouches[0]; const rect = cv.getBoundingClientRect(); const px = (t.clientX - rect.left) / rect.width * W, py = (t.clientY - rect.top) / rect.height * H; clickCell(Math.floor(py / CELL) * 3 + Math.floor(px / CELL)); }, { passive: true });
  document.getElementById('new').addEventListener('click', reset);
  document.getElementById('ov-btn').addEventListener('click', reset);
  function loop() { draw(); requestAnimationFrame(loop); }
  reset(); requestAnimationFrame(loop);
})();
