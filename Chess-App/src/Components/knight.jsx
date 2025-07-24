import whiteKnight from '../assets/wn.png';
import blueKnight from "../assets/bn.png";

function Knight({ position, isSelected, onSelect, board, color }) {

    const isOnBoarimportd = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

  const isFriendlyPiece = (x, y) => {
    const piece = board.find(p => p.x === x && p.y === y);
    return piece && piece.color === color;
  };

  const isEnemyPiece = (x, y) => {
    const piece = board.find(p => p.x === x && p.y === y);
    return piece && piece.color !== color;
  };
}
 const calculateValidMoves = () => {
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

      if (isFriendlyPiece(newX, newY)) continue;

      const type = isEnemyPiece(newX, newY) ? 'capture' : 'move';
      movements.push({ x: newX, y: newY, type });
    }

    return movements;
  };


