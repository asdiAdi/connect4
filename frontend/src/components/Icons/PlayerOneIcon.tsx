import p1 from "assets/player-one.svg";

type Props = { className?: string };

function PlayerOneIcon(props: Props) {
  const { className } = props;
  return <img src={p1} alt="player-one" className={className} />;
}

export default PlayerOneIcon;
