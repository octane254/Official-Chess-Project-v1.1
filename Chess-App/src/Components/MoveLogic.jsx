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

export const generateValidMoves = (piece, board,color) => {
  const position = { x: piece.x, y: piece.y };
    if (piece.color !== color) return [];
  const logicFunction = pieceLogicMap[piece.type];
  return logicFunction ? logicFunction(position, board, color) : [];
};

export const calculateValidBishopMoves = (position,board,color) => {
    const movements = [];
    const x = position.x;
    const y = position.y;

    // Check top-right diagonal
    for (let i = 1; i < 8; i++) {
      const newX = x + i;
      const newY = y + i;
      if (!isOnBoard(newX, newY)) break;
      if (isFriendlyPiece(newX, newY, board, color)) break;
      if (isSquareEmpty(newX, newY,board)) {
        movements.push({ x: newX, y: newY, type: 'move' });
      } else if (isEnemyPiece(newX, newY,board,color)) {
        movements.push({ x: newX, y: newY, type: 'capture' });
        break;
      } else {
        break;
      }
    }

    // Check bottom-right diagonal
    for (let i = 1; i < 8; i++) {
      const newX = x + i;
      const newY = y - i;
      if (!isOnBoard(newX, newY)) break;
      if (isFriendlyPiece(newX, newY, board, color)) break;
      if (isSquareEmpty(newX, newY,board)) {
        movements.push({ x: newX, y: newY, type: 'move' });
      } else if (isEnemyPiece(newX, newY,board,color)) {
        movements.push({ x: newX, y: newY, type: 'capture' });
        break;
      } else {
        break;
      }
    }

    // Check top-left diagonal
    for (let i = 1; i < 8; i++) {
      const newX = x - i;
      const newY = y + i;
      if (!isOnBoard(newX, newY)) break;
      if (isFriendlyPiece(newX, newY, board, color)) break;
      if (isSquareEmpty(newX, newY,board)) {
        movements.push({ x: newX, y: newY, type: 'move' });
      } else if (isEnemyPiece(newX, newY,board,color)) {
        movements.push({ x: newX, y: newY, type: 'capture' });
        break;
      } else {
        break;
      }
    }

    // Check bottom-left diagonal
    for (let i = 1; i < 8; i++) {
      const newX = x - i;
      const newY = y - i;
      if (!isOnBoard(newX, newY)) break;
      if (isFriendlyPiece(newX, newY, board, color)) break;
      if (isSquareEmpty(newX, newY,board)) {
        movements.push({ x: newX, y: newY, type: 'move' });
      } else if (isEnemyPiece(newX, newY,board,color)) {
        movements.push({ x: newX, y: newY, type: 'capture' });
        break;
      } else {
        break;
      }
    }

    return movements;
  };

  export const calculateValidKingMoves = (position,board,color) => {
    const movements = [];
    const x = position.x;
    const y = position.y;

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;

        const newX = x + dx;
        const newY = y + dy;

        if (!isOnBoard(newX, newY)) continue;
        if (isFriendlyPiece(newX, newY,board,color)) continue;

        const type = isEnemyPiece(newX, newY,board,color) ? 'capture' : 'move';
        movements.push({ x: newX, y: newY, type });
      }
    }

    return movements;
  };

      export const calculateValidKnightMoves = (position,board,color) => {
    const movements = [];
    const x = position.x;
    const y = position.y;

    const jumps = [
      { dx: 1, dy: 2 },
      { dx: 2, dy: 1 },
      { dx: -1, dy: 2 },
      { dx: -2, dy: 1 },
      { dx: 1, dy: -2 },
      { dx: 2, dy: -1 },
      { dx: -1, dy: -2 },
      { dx: -2, dy: -1 },
    ];                            
    for (let i = 0; i < jumps.length; i++) {
      const newX = x + jumps[i].dx;
      const newY = y + jumps[i].dy;
      if (!isOnBoard(newX, newY)) continue;

      if (isFriendlyPiece(newX, newY,board,color)) continue;

      const type = isEnemyPiece(newX, newY,board,color) ? 'capture' : 'move';
      movements.push({ x: newX, y: newY, type });
    }

    return movements;
  };