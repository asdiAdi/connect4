import ScoreCard from "components/Cards/ScoreCard.tsx";
import PlayerOneIcon from "components/Icons/PlayerOneIcon.tsx";
import PlayerTwoIcon from "components/Icons/PlayerTwoIcon.tsx";
import { PlayerData } from "types/game";

type Props = {
  playerOne: PlayerData;
  playerTwo: PlayerData;
  className?: string;
};

function ScoreBoard(props: Props) {
  const { playerOne, playerTwo, className = undefined } = props;

  return (
    <div className={className}>
      <ScoreCard
        orientation={"left"}
        playerData={playerOne}
        // Icon={gameType === "pvp" ? PlayerOneIcon : PlayerYouIcon}
        Icon={PlayerOneIcon}
      />
      <ScoreCard
        orientation={"right"}
        playerData={playerTwo}
        // Icon={gameType === "pvp" ? PlayerTwoIcon : PlayerCpuIcon}
        Icon={PlayerTwoIcon}
      />
    </div>
  );
}

export default ScoreBoard;
