import turn from "assets/turn-background-red.svg";

type Props = { className?: string };

function TurnBackgroundOne(props: Props) {
  const { className } = props;
  return <img src={turn} alt="turn-background-one" className={className} />;
}

export default TurnBackgroundOne;
