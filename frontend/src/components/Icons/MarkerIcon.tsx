import markerRed from "assets/marker-red.svg";
import markerYellow from "assets/marker-yellow.svg";

type Props = { color?: "red" | "yellow"; className?: string };

function MarkerIcon(props: Props) {
  const { color = "red", className = undefined } = props;
  return (
    <>
      {color === "red" && (
        <img src={markerRed} alt="marker red" className={className} />
      )}
      {color === "yellow" && (
        <img src={markerYellow} alt="marker yellow" className={className} />
      )}
    </>
  );
}

export default MarkerIcon;
