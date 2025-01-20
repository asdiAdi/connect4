type GameIdProps = {
  value: string;
};
function GameId(props: GameIdProps) {
  const { value } = props;

  return <input type="text" value={value} readOnly />;
}

export default GameId;
