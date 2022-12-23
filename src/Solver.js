export function toggle(grid, i, j) {
  grid[i][j] = !grid[i][j];
  if (i > 0) grid[i - 1][j] = !grid[i - 1][j];
  if (i < grid.length - 1) grid[i + 1][j] = !grid[i + 1][j];
  if (j > 0) grid[i][j - 1] = !grid[i][j - 1];
  if (j < grid[0].length - 1) grid[i][j + 1] = !grid[i][j + 1];
}

function allToggled(grid) {
  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[0].length; j++) if (!grid[i][j]) return false;
  return true;
}

function encode(grid) {
  let num = 0;
  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[0].length; j++) {
      num = num << 1;
      if (grid[i][j]) num += 1;
    }
  return num;
}

function coordToNum(i, j, n) {
  return i * n + j;
}

function numToCoord(num, n) {
  return [Math.floor(num / n), num % n];
}

function toggleSequence(grid) {
  let n = grid.length;
  let queue = [[grid, []]];
  let visited = new Set();
  while (queue.length > 0) {
    let [grid, seq] = queue.shift();
    if (allToggled(grid)) return seq;
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++) {
        let newGrid = grid.map((row) => row.slice());
        toggle(newGrid, i, j);
        if (!visited.has(encode(newGrid))) {
          visited.add(encode(newGrid));
          queue.push([newGrid, seq.concat(coordToNum(i, j, n))]);
        }
      }
  }
  return [];
}

function makeGrid(n) {
  let grid = [];
  for (let i = 0; i < n; i++) {
    grid[i] = [];
    for (let j = 0; j < n; j++) {
      grid[i][j] = false;
    }
  }
  return grid;
}

export function solveSeq(num, gridSize) {
  let grid = makeGrid(gridSize);
  for (let i of num) {
    let [x, y] = numToCoord(i, gridSize);
    grid[x][y] = !grid[x][y];
  }
  let seq = toggleSequence(grid);
  return seq;
}
