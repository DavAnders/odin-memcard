import "/src/styles/scoreboard.css";

function ScoreBoard({ score, bestScore }) {
  return (
    <div className="scoreboard">
      <h2>Score: {score}</h2>
      <h2>Best Score: {bestScore}</h2>
    </div>
  );
}

export default ScoreBoard;
