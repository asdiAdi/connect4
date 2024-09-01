import you from "assets/you.svg";

type Props = { className?: string };

function PlayerYouIcon(props: Props) {
  const { className = undefined } = props;
  return <img src={you} alt="player-you" className={className} />;
}

export default PlayerYouIcon;
