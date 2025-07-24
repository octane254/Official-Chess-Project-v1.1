import whitePawn from '../assets/wp.png';
import bluePawn from '../assets/bp.png';

function Pawn({ position, isSelected, onSelect, board, color }) {
   const isOnBoard = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

  const isSquareEmpty = (x, y) =>
    !board.some(piece => piece.x === x && piece.y === y);

  const isEnemyPiece = (x, y) => {
    const piece = board.find(p => p.x === x && p.y === y);
    return piece && piece.color !== color;
  };
}

export default Pawn;