import react from "react";
import { useState } from "react";
import { BoardState } from "./Board";
import Board from "./Board";

type Step = {
  squares: BoardState;
  xIsNext: boolean;
};

type GameState = {
  readonly history: Step[];
  readonly stepNumber: number;
};

const calculateWinner = (squares: BoardState) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Game: react.FC = () => {
  const [state, setState] = useState<GameState>({
    history: [
      {
        squares: [null, null, null, null, null, null, null, null, null],
        xIsNext: true
      }
    ],
    stepNumber: 0
  });

  const current = state.history[state.stepNumber];
  const winner = calculateWinner(current.squares);
  let status: string;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${current.xIsNext ? "X" : "O"}`;
  }

  const handleClick = (i: number) => {
    setState(({ history, stepNumber }) => {
      const next: Step = (({ squares, xIsNext }) => {
        const nextSquares = squares.slice() as BoardState;
        nextSquares[i] = xIsNext ? "X" : "O";
        return {
          squares: nextSquares,
          xIsNext: !xIsNext
        };
      })(current);

      const newHistory = history.slice(0, stepNumber + 1).concat(next);

      return {
        history: newHistory,
        stepNumber: newHistory.length - 1
      };
    });
  };

  const jumpTo = (move: number) => {
    setState((prev) => ({
      ...prev,
      stepNumber: move
    }));
  };

  const moves = state.history.map((step, move) => {
    const desc = move > 0 ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
