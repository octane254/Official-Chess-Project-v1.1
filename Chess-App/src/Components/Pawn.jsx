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

   const calculateValidMoves = () => {
    const movements = [];
    const x = position.x;
    const y = position.y;
    const direction = color === 'white' ? 1 : -1; // 🟨 White moves up, Blue moves down
    const startingRow = color === 'white' ? 1 : 6;

    // Forward move
    const oneStepY = y + direction;
    if (isOnBoard(x, oneStepY) && isSquareEmpty(x, oneStepY)) {
      movements.push({ x, y: oneStepY, type: 'move' });

      // Initial double move
      const twoStepY = y + 2 * direction;
      if (y === startingRow && isOnBoard(x, twoStepY) && isSquareEmpty(x, twoStepY)) {
        movements.push({ x, y: twoStepY, type: 'move' });
      }
    }

    // Diagonal captures
    const diagonals = [
      { dx: -1, dy: direction },
      { dx: 1, dy: direction }
    ];

    diagonals.forEach(({ dx, dy }) => {
      const newX = x + dx;
      const newY = y + dy;
      if (isOnBoard(newX, newY) && isEnemyPiece(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'capture' });
      }
    });

    return movements;
  };
}

export default Pawn;