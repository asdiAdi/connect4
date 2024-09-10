import ScoreCard from "components/Cards/ScoreCard.tsx";
import useGameStore from "stores/useGameStore.ts";
import PlayerOneIcon from "components/Icons/PlayerOneIcon.tsx";
import PlayerYouIcon from "components/Icons/PlayerYouIcon.tsx";
import PlayerTwoIcon from "components/Icons/PlayerTwoIcon.tsx";
import PlayerCpuIcon from "components/Icons/PlayerCpuIcon.tsx";

type Props = {
  className?: string;
};

function ScoreBoard(props: Props) {
  const { className = undefined } = props;
  const { playerOne, playerTwo, gameType } = useGameStore();

  return (
    <div className={className}>
      <ScoreCard
        orientation={"left"}
        playerData={playerOne}
        Icon={gameType === "pvp" ? PlayerOneIcon : PlayerYouIcon}
      />
      <ScoreCard
        orientation={"right"}
        playerData={playerTwo}
        Icon={gameType === "pvp" ? PlayerTwoIcon : PlayerCpuIcon}
      />
    </div>
  );
}

export default ScoreBoard;
