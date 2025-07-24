const isOnBoard = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

const isFriendlyPiece = (x, y, board, color) => {
  const piece = board.find(p => p.x === x && p.y === y);
  return piece && piece.color === color;
};

const isEnemyPiece = (x, y, board, color) => {
  const piece = board.find(p => p.x === x && p.y === y);
  return piece && piece.color !== color;
};

const isSquareEmpty = (x, y, board) => {
  if (!Array.isArray(board)) return false;
  return board.every(p => p.x !== x || p.y !== y);
};
