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

