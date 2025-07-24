import { useEffect, useState } from "react"
import ChessPieces from "./Chess-Piece"
import "../Css/Board.css"
import { makeRandomMove } from "./Ai";

function ChessBoard ({ username }) {
    
    const [pieces, setPieces] =useState({}) // initial state is an empty object
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [validMoves, setValidMoves] = useState([]);
    const [turn, setTurn] = useState("white");



    // changed how the board is recieving data from the components 
    const coordKey = (x, y) => `${x},${y}`;



    

   useEffect(() => {
    
    const initialPieces = {};
    const backRow = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];

    // Blue side
    for (let x = 0; x < 8; x++) {


      initialPieces[coordKey(x, 7)] = `blue-${backRow[x]}`;
      initialPieces[coordKey(x, 6)] = "blue-pawn";

    }

    // White side
    for (let x = 0; x < 8; x++) {


      initialPieces[coordKey(x, 0)] = `white-${backRow[x]}`;
      initialPieces[coordKey(x, 1)] = "white-pawn";

    }





    setPieces(initialPieces);
  }, []);

  const getBoardState = () => {
  return Object.entries(pieces)
    .filter(([key, value]) => value && typeof value === "string" && value.includes("-"))
    .map(([key, value]) => {
      const [x, y] = key.split(",").map(Number);
      const [color, type] = value.split("-");
      return { x, y, color, type };
    });
};

const handleSelectPiece = (position, moves, piece) => {

  if (!piece || piece.color !== turn) return; 
  setSelectedPosition(position);
  setValidMoves(moves || []);
};

const handleAITurn = () => {
  const boardState = getBoardState();
  const aiMove = makeRandomMove(boardState, "blue"); 

  if (!aiMove) return;

  const fromKey = coordKey(aiMove.from.x, aiMove.from.y);
  const toKey = coordKey(aiMove.to.x, aiMove.to.y);
  const movingPiece = pieces[fromKey];

  if (!movingPiece || !movingPiece.startsWith("blue-")) return;

  setPieces(prev => {
    const updated = { ...prev };
    updated[toKey] = updated[fromKey];
    delete updated[fromKey];
    return updated;
  });

  setSelectedPosition(null);
  setValidMoves([]);
  setTurn("white");
};


  const handleMovePiece = (targetCoords) => {
    if (!selectedPosition) return;

    const updatedPieces = { ...pieces };
    const fromKey = coordKey(selectedPosition.x, selectedPosition.y);
    const toKey = coordKey(targetCoords.x, targetCoords.y);

    const movingPiece = updatedPieces[fromKey];
    updatedPieces[toKey] = movingPiece;
    delete updatedPieces[fromKey];

    setPieces(updatedPieces);
    setSelectedPosition(null);
    setValidMoves([]);
    setTurn("blue"); 

  setTimeout(() => {
  handleAITurn(); 
  }, 500);
  };

  const handleTileClick = (coords) => {

    if (turn !== "white") return;
    if (!selectedPosition || !validMoves.length) return;

    const validMove = validMoves.find(move => move.x === coords.x && move.y === coords.y);
    if (validMove) {
      handleMovePiece(coords, validMove.type);
    }
  };


   const boardState = getBoardState();


    // function to render the pieces on the board

  const renderBoard = () => {


    const board = [];


    for (let y = 7; y >= 0; y--) {

      for (let x = 0; x < 8; x++) {

        const key = coordKey(x, y);

        const tileColor = (x + y) % 2 === 0 ? "white-tiles" : "blue-tiles";

        const isSelectedTile = selectedPosition && selectedPosition.x === x && selectedPosition.y === y;


        const hasValidMove = validMoves.some(move => move.x === x && move.y === y);

        const moveType = hasValidMove

          ? validMoves.find(move => move.x === x && move.y === y)?.type
          : null;

        board.push(
          <div
            key={key}
            className={`tiles ${tileColor} ${hasValidMove ? "valid-move" : ""} ${isSelectedTile ? "selected-tile" : ""}`}

            onClick={() => handleTileClick({ x, y })}
          >
            <ChessPieces

              piece={pieces[key]}
              position={{ x, y }}
              board={boardState}
              selectedPosition={selectedPosition}
              validMoves={validMoves}
              onSelect={handleSelectPiece}
              onMove={handleMovePiece}
            />
            {hasValidMove && <div className={`move-indicator ${moveType}`} />}
            <div className="coordinates">[{x},{y}]</div>
          </div>
        );
      }
    }

    return board;
  };

  return <div className="chessboard">{renderBoard()}</div>;
}

export default ChessBoard
