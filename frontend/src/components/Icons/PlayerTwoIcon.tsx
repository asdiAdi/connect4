import p2 from "assets/player-two.svg";

type Props = { className?: string };

function PlayerTwoIcon(props: Props) {
  const { className = undefined } = props;
  return <img src={p2} alt="player-one" className={className} />;
}

export default PlayerTwoIcon;
