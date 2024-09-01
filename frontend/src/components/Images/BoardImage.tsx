import boardLayerBlackSmall from "assets/board-layer-black-small.svg";
import boardLayerBlackLarge from "assets/board-layer-black-large.svg";

type Props = { size?: "s" | "l"; className?: string };

function Board(props: Props) {
  const { size = "s", className = undefined } = props;
  return (
    <img
      src={size === "l" ? boardLayerBlackLarge : boardLayerBlackSmall}
      alt="check-icon"
      className={className}
    />
  );
}

export default Board;
