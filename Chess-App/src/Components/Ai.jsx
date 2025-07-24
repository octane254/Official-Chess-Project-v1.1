import { generateValidMoves } from "./MoveLogic";


const scorePoint = {
  pawn: 3,
  knight: 2,
  bishop: 3,
  rook: 5,
  queen: 9,
  king: 100
};

function scoreMove(move, board) {
  const target = board.find(p => p.x === move.to.x && p.y === move.to.y);
  if (!target) return 1; // quiet move
  return scorePoint[target.type] || 0;
}

export const getAllPossibleMoves = (board, color) => {
  const moves = [];

  board.forEach(piece => {
    if (!piece || piece.color !== color || !piece.type) return;

    const validMoves = generateValidMoves(piece, board, color);

    validMoves.forEach(move => {
      const target = board.find(p => p.x === move.x && p.y === move.y);
      if (target && target.color === piece.color) return;

      moves.push({
        from: { x: piece.x, y: piece.y },
        to: move
      });
    });
  });

  return moves;
};

export const makeRandomMove = (board, color) => {
  const allMoves = getAllPossibleMoves(board, color).filter(move => {
    const piece = board.find(p => p.x === move.from.x && p.y === move.from.y);
    return piece && piece.color === color && move.from && move.to;
  });

  if (allMoves.length === 0) return null;

  const scoredMoves = allMoves.map(move => ({
    ...move,
    score: scoreMove(move, board)
  }));

 
  const topMoves = scoredMoves
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

      const randomIndex = Math.floor(Math.random() * topMoves.length);
  console.log(randomIndex)
  return topMoves[randomIndex];
};