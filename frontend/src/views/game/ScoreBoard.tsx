import ScoreCard from "components/Cards/ScoreCard.tsx";
import styles from "./styles.module.scss";

type Props = {
  type?: "pvp" | "pve";
};
function ScoreBoard(props) {
  const { type = "pvp" } = props;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <ScoreCard orientation={"left"} player={"one"} />
      <ScoreCard orientation={"right"} player={"two"} />
    </div>
  );
}

export default ScoreBoard;
