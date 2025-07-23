import whiteBishop from '../assets/wb.png';
import blueBishop from '../assets/bb.png';

function Bishop({position, isSlected, onSelect, board, color}){


    const isOnBoard =(x,y) => x >= 0 && x < 8 && y >= 0 && y < 8;

    const isSquareEmpty = (x, y) => {


        // LOop through the Array to check if the square is Empty 

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
        const x = position.x;
        const y = position.y;


    }
       // Check top-right diagonal

    for (let i = 1; i < 8; i++) {

      const newX = x + i;
      const newY = y + i;

      if (!isOnBoard(newX, newY)) break;
      if (isSquareEmpty(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'move' });
      } else if (isEnemyPiece(newX, newY)) {
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
      if (isSquareEmpty(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'move' });
      } else if (isEnemyPiece(newX, newY)) {
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
      if (isSquareEmpty(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'move' });
      } else if (isEnemyPiece(newX, newY)) {
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

      if (isSquareEmpty(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'move' });
        
      } else if (isEnemyPiece(newX, newY)) {
        movements.push({ x: newX, y: newY, type: 'capture' });
        break;
      } else {
        break;
      }
    }

    return movements;
}; 

