import { useState } from "react";
import "./TicTacToe.css";

function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button className={`square ${isWinningSquare ? "highlight" : ""}`} onClick={onSquareClick} >
      {value}
    </button>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move: #" + move
    }
    else {
      description = "Game start"
    }

    if (currentMove == move) {
      return (
        <li key={move}>
          <p>{description}</p>
        </li>
      );
    }
    else {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>
            {description}
          </button>
        </li>
      );
    }
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className="game-info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}

export function Board({ xIsNext, squares, onPlay }) {

  function handleClick(index) {
    // Check if already had data
    if (calculateWinner(squares) || squares[index]) {
      return
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = 'X';
    }
    else {
      nextSquares[index] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let winningSquares = [];
  let status;
  if (winner) {
    status = "Winner: " + squares[winner[0]];
    winningSquares = winner;
  }
  else {
    status = "Next Player: " + (xIsNext ? "X" : "O")
  }

  return (
    <>
      <div className="status">
        {status}
      </div>

      {Array(3).fill(null).map((_, row) => (
        <div key={row} className="board-row">
          {Array(3).fill(null).map((_, col) => {
            const index = row * 3 + col;
            const isWinningSquare = winningSquares.includes(index);
            return (
              <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} isWinningSquare={isWinningSquare} />
            );
          })}
        </div>
      ))}
    </>
  );

}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}
