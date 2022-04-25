import react from "react";

export type SquareState = "O" | "X" | null;

export type SquareProps = {
  value: SquareState;
  onClick: () => void;
};

const Square: react.FC<SquareProps> = (props: SquareProps) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
