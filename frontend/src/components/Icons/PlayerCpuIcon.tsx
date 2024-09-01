import cpu from "assets/cpu.svg";

type Props = { className?: string };

function PlayerCpuIcon(props: Props) {
  const { className = undefined } = props;
  return <img src={cpu} alt="player-cpu" className={className} />;
}

export default PlayerCpuIcon;
