import Pawn  from "./Pawn";
import Rook from "./Rook";
import knight from "./knight";
import Bishop from "./Bishop";
import Queen from "./Queen";
import King from "./King";

const pieceComponents = {
  pawn: Pawn,
  rook: Rook,
  knight:knight,
  bishop: Bishop,
  queen: Queen,
  king: King
};

function AddingPieces({ piece, position, board, selectedPosition, validMoves, onSelect, onMove }) {
  if (!piece) return null;

  const { x, y } = position;
  const [color, type] = piece.split("-");

  const isSelected =
    selectedPosition &&
    selectedPosition.x === x &&
    selectedPosition.y === y;

  const Component = pieceComponents[type];
  if (!Component) return null;

  return (
    
    <Component
      position={{ x, y }}
      board={board}
      color={color}
      isSelected={isSelected}
      onSelect={onSelect}
      onMove={onMove}
    />
  );
}

export default AddingPieces