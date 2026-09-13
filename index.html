(() => {
  'use strict';
  const cv = document.getElementById('game'); const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
  cv.width = W * dpr; cv.height = H * dpr; ctx.scale(dpr, dpr);
  const minesEl = document.getElementById('mines'), timeEl = document.getElementById('time');
  const overlay = document.getElementById('overlay'), ovTitle = document.getElementById('ov-title'), ovSub = document.getElementById('ov-sub');
  const COLS = 9, ROWS = 10, CELL = 40, MINE = 12;
  let grid, over, started, timer, secs;

  function reset() {
    grid = []; over = false; started = false; secs = 0;
    if (timer) clearInterval(timer); timer = null;
    for (let r = 0; r < ROWS; r++) { grid[r] = []; for (let c = 0; c < COLS; c++) grid[r][c] = { mine: false, open: false, flag: false, n: 0 }; }
    minesEl.textContent = MINE; timeEl.textContent = '0'; overlay.classList.add('hidden');
  }
  function placeMines(sr, sc) {
    let placed = 0;
    while (placed < MINE) {
      const r = Math.floor(Math.random() * ROWS), c = Math.floor(Math.random() * COLS);
      if (grid[r][c].mine) continue;
      if (Math.abs(r - sr) <= 1 && Math.abs(c - sc) <= 1) continue;
      grid[r][c].mine = true; placed++;
    }
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      if (grid[r][c].mine) continue; let n = 0;
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc].mine) n++;
      }
      grid[r][c].n = n;
    }
  }
  function flood(r, c) {
    const st = [[r, c]];
    while (st.length) {
      const [y, x] = st.pop();
      if (grid[y][x].open || grid[y][x].flag) continue;
      grid[y][x].open = true;
      if (grid[y][x].n === 0) for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        const nr = y + dr, nc = x + dc;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !grid[nr][nc].mine && !grid[nr][nc].open) st.push([nr, nc]);
      }
    }
  }
  function reveal(r, c) {
    if (over || grid[r][c].flag) return;
    if (!started) { started = true; placeMines(r, c); timer = setInterval(() => { secs++; timeEl.textContent = secs; }, 1000); }
    if (grid[r][c].mine) return lose();
    flood(r, c);
    if (checkWin()) win();
  }
  function toggleFlag(r, c) {
    if (over || grid[r][c].open) return;
    grid[r][c].flag = !grid[r][c].flag;
    minesEl.textContent = MINE - countFlags();
  }
  function countFlags() { let f = 0; for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) if (grid[r][c].flag) f++; return f; }
  function checkWin() { for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) if (!grid[r][c].mine && !grid[r][c].open) return false; return true; }
  function lose() {
    over = true; if (timer) clearInterval(timer);
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) if (grid[r][c].mine) grid[r][c].open = true;
    ovTitle.textContent = '踩雷了！'; ovSub.textContent = '用时 ' + secs + ' 秒'; overlay.classList.remove('hidden');
  }
  function win() {
    over = true; if (timer) clearInterval(timer);
    ovTitle.textContent = '你赢了！'; ovSub.textContent = '用时 ' + secs + ' 秒'; overlay.classList.remove('hidden');
  }
  function draw() {
    ctx.fillStyle = '#1a1c3a'; ctx.fillRect(0, 0, W, H);
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      const x = c * CELL, y = r * CELL, g = grid[r][c];
      if (g.open) {
        ctx.fillStyle = g.mine ? '#ff5c7a' : '#2a2d55'; ctx.fillRect(x + 1, y + 1, CELL - 2, CELL - 2);
        if (g.mine) { ctx.font = (CELL * 0.55) + 'px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('💣', x + CELL / 2, y + CELL / 2); }
        else if (g.n > 0) { const cols = ['', '#4fd1ff', '#43d97a', '#ff5c7a', '#4f7bff', '#b15cff', '#ff9f43', '#ffd23f', '#eee']; ctx.fillStyle = cols[g.n]; ctx.font = 'bold ' + (CELL * 0.5) + 'px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(g.n, x + CELL / 2, y + CELL / 2); }
      } else {
        ctx.fillStyle = '#34386e'; ctx.fillRect(x + 1, y + 1, CELL - 2, CELL - 2);
        if (g.flag) { ctx.font = (CELL * 0.5) + 'px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('🚩', x + CELL / 2, y + CELL / 2); }
      }
    }
  }
  function cellAt(e) { const rect = cv.getBoundingClientRect(); const px = (e.clientX - rect.left) / rect.width * W, py = (e.clientY - rect.top) / rect.height * H; return [Math.floor(py / CELL), Math.floor(px / CELL)]; }
  cv.addEventListener('click', e => { const [r, c] = cellAt(e); if (r >= 0 && r < ROWS && c >= 0 && c < COLS) reveal(r, c); });
  cv.addEventListener('contextmenu', e => { e.preventDefault(); const [r, c] = cellAt(e); if (r >= 0 && r < ROWS && c >= 0 && c < COLS) toggleFlag(r, c); });
  let tt = 0;
  cv.addEventListener('touchstart', () => { tt = Date.now(); }, { passive: true });
  cv.addEventListener('touchend', e => { const [r, c] = cellAt(e.changedTouches[0]); if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return; if (Date.now() - tt > 450) toggleFlag(r, c); else reveal(r, c); }, { passive: true });
  document.getElementById('new').addEventListener('click', reset);
  document.getElementById('ov-btn').addEventListener('click', reset);
  function loop() { draw(); requestAnimationFrame(loop); }
  reset(); requestAnimationFrame(loop);
})();
