import blueQueen from '../assets/bq.png';
import whiteQueen from '../assets/wq.png';

function Queen({ position, isSelected, onSelect, board, color }) {

  const isOnBoard = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

  const isSquareEmpty = (x, y) => {
    for (let i = 0; i < board.length; i++) {
      const piece = board[i];
      if (piece.x === x && piece.y === y) {
        return false;
      }
    }
    return true;
  };

  const isEnemyPiece = (x, y) => {
    const piece = board.find(p => p.x === x && p.y === y);
    return piece && piece.color !== color;
  };

  const calculateValidMoves = () => {
    const movements = [];
    const { x, y } = position;

    // Diagonal: top-right
    for (let i = 1; i < 8; i++) {
      const newX = x + i;
      const newY = y + i;
      if (!isOnBoard(newX, newY)) break;
      if (isSquareEmpty(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'move' });
      } else if (isEnemyPiece(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'capture' });
        break;
      } else break;
    }

    // Diagonal: bottom-right
    for (let i = 1; i < 8; i++) {
      const newX = x + i;
      const newY = y - i;
      if (!isOnBoard(newX, newY)) break;
      if (isSquareEmpty(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'move' });
      } else if (isEnemyPiece(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'capture' });
        break;
      } else break;
    }

    // Diagonal: top-left
    for (let i = 1; i < 8; i++) {
      const newX = x - i;
      const newY = y + i;
      if (!isOnBoard(newX, newY)) break;
      if (isSquareEmpty(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'move' });
      } else if (isEnemyPiece(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'capture' });
        break;
      } else break;
    }

    // Diagonal: bottom-left
    for (let i = 1; i < 8; i++) {
      const newX = x - i;
      const newY = y - i;
      if (!isOnBoard(newX, newY)) break;
      if (isSquareEmpty(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'move' });
      } else if (isEnemyPiece(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'capture' });
        break;
      } else break;
    }

    // Straight: right
    for (let i = 1; i < 8; i++) {
      const newX = x + i;
      const newY = y;
      if (!isOnBoard(newX, newY)) break;
      if (isSquareEmpty(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'move' });
      } else if (isEnemyPiece(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'capture' });
        break;
      } else break;
    }

    // Straight: left
    for (let i = 1; i < 8; i++) {
      const newX = x - i;
      const newY = y;
      if (!isOnBoard(newX, newY)) break;
      if (isSquareEmpty(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'move' });
      } else if (isEnemyPiece(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'capture' });
        break;
      } else break;
    }

    // Straight: up
    for (let i = 1; i < 8; i++) {
      const newX = x;
      const newY = y - i;
      if (!isOnBoard(newX, newY)) break;
      if (isSquareEmpty(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'move' });
      } else if (isEnemyPiece(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'capture' });
        break;
      } else break;
    }

    // Straight: down
    for (let i = 1; i < 8; i++) {
      const newX = x;
      const newY = y + i;
      if (!isOnBoard(newX, newY)) break;
      if (isSquareEmpty(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'move' });
      } else if (isEnemyPiece(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'capture' });
        break;
      } else break;
    }

    return movements;
  };

  const handleSelect = () => {
    if (isSelected) {
      onSelect(null, []);
    } else {
      const moves = calculateValidMoves();
      onSelect(position, moves);
    }
  };

  return (
    <div
      className={`chessPiece queen-piece ${color} ${isSelected ? 'selected' : ''}`}
      onClick={handleSelect}
    >
      <img
        src={color === 'white' ? whiteQueen : blueQueen}
        alt={`${color} queen`}
        style={{
          width: '70px',
          height: '70px',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}

export default Queen;