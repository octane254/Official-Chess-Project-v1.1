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
