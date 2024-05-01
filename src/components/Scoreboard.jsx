import "/src/styles/scoreboard.css";

function ScoreBoard({ score, bestScore, children }) {
  return (
    <div className="scoreboard">
      <h2 className="left">Score: {score}</h2>
      {children}
      <h2 className="right">Best Score: {bestScore}</h2>
    </div>
  );
}

export default ScoreBoard;
