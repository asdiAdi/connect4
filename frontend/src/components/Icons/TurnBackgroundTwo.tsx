import turn from "assets/turn-background-yellow.svg";

type Props = { className?: string };

function TurnBackgroundTwo(props: Props) {
  const { className = undefined } = props;
  return <img src={turn} alt="turn-background-two" className={className} />;
}

export default TurnBackgroundTwo;
