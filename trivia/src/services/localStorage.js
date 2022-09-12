const getRanking = () => {
  const players = localStorage.getItem('ranking');
  return players ? JSON.parse(players) : [];
};

const savePlayerInRanking = (player) => {
  const players = getRanking();
  players.push(player);
  localStorage.setItem('ranking', JSON.stringify(players));
};

export { getRanking, savePlayerInRanking };
