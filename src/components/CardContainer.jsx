import { useEffect, useState } from "react";
import Card from "./Card";

function CardContainer() {
  const [cards, setCards] = useState([]);
  const [clickedCardIds, setClickedCardIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    let cancelFetch = false; // Flag to track if the fetch should be cancelled

    const fetchCards = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.giphy.com/v1/gifs/trending?api_key=YOUR_API_KEY"
        );
        const data = await response.json();
        if (!cancelFetch) {
          setCards(data.data.map((item) => ({ ...item, clicked: false })));
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelFetch) {
          setError(err.message);
        }
      } finally {
        if (!cancelFetch) {
          setIsLoading(false);
        }
      }
    };

    fetchCards();

    return () => {
      cancelFetch = true;
    };
  }, []);

  function handleCardClick(id) {
    if (clickedCardIds.has(id)) {
      // Card has been clicked before, reset the score
      setScore(0);
      setClickedCardIds(new Set());
    } else {
      // Increment the score and mark the card as clicked
      setScore((prev) => prev + 1);
      setClickedCardIds((prev) => new Set(prev).add(id));
      if (score + 1 > bestScore) {
        setBestScore(score + 1);
      }
    }
    // Shuffle the cards
    setCards((prevCards) => [...prevCards].sort(() => 0.5 - Math.random()));
  }

  return (
    <div className="card-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        cards.map((card) => (
          <Card
            key={card.id}
            imageUrl={card.images.fixed_height.url}
            title={card.title}
            onClick={() => handleCardClick(card.id)}
          />
        ))
      )}
    </div>
  );
}

export default CardContainer;
