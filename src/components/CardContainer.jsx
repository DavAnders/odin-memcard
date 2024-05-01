import { useEffect, useState, useCallback } from "react";
import Card from "./Card";
import ScoreBoard from "./Scoreboard";
import ToggleButton from "./ToggleButton";
import "/src/styles/cardContainer.css";

function CardContainer() {
  const [cards, setCards] = useState([]);
  const [clickedCardIds, setClickedCardIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [contentType, setContentType] = useState("gifs");

  const fetchCards = useCallback(async () => {
    const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
    const limit = 12;
    setCards([]);
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/${contentType}/trending?api_key=${apiKey}&limit=${limit}`
      );
      const data = await response.json();
      setCards(data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [contentType]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  function handleCardClick(id) {
    if (clickedCardIds.has(id)) {
      setScore(0);
      setClickedCardIds(new Set());
    } else {
      setClickedCardIds((prev) => new Set(prev.add(id)));
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    }
    setCards(shuffleArray(cards));
  }

  function handleContentTypeToggle() {
    setContentType((prevType) => (prevType === "gifs" ? "stickers" : "gifs"));
  }

  return (
    <div>
      <ScoreBoard score={score} bestScore={bestScore}>
        <ToggleButton
          contentType={contentType}
          onToggle={handleContentTypeToggle}
        />
      </ScoreBoard>
      <div className="card-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          cards.map((card, index) => (
            <Card
              key={card.id + index}
              imageUrl={card.images.fixed_height.url}
              title={card.title}
              isClicked={clickedCardIds.has(card.id)}
              onClick={() => handleCardClick(card.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default CardContainer;
