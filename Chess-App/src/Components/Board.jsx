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


    // function to render the pieces on the board

    const renderpieces = ()=>{

    

    let board = []

    // Loop to generate the tiles
    
    for (let i=0; i<rows.length; i++){
        for(let j=0; j<columns.length; j++){

            
            const tilecolors = (i+j)%2
            const position = `${columns[j]}${rows[i]}`
            
            // store tileclass variable as undifined to allow the tiles for it to change color with specified validation 

            let tileclass;

            if(tilecolors === 0){

                tileclass = "white-color" 
            }
            else{

                tileclass = "blue-color"  
            }

            // Add Tiles to the board 

            board.push(

                <div

                key={position}
                className={`tile ${tileclass}`}

                >
                    <ChessPieces piece={pieces[position]} />                    

                <div className="coordinates">[{position}]</div>

                </div>

            )

        }
    }

        return board
}
        return (

            <div className="chessboard-container" style={{ display: "flex" }}>
                <div className="welcome-message" style={{ marginRight: "20px", fontSize: "18px", fontWeight: "bold", alignSelf: "flex-start" }}>
                    Welcome, {username}!
                </div>
                <div className="chessboard">
                    {renderpieces()}
                </div>
            </div>
        )



}

export default ChessBoard
