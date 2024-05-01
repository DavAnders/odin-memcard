import { useEffect, useState } from "react";
import Card from "./Card";

function CardContainer() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
          setCards(data.data);
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
            onClick={() => console.log("Card clicked")}
          />
        ))
      )}
    </div>
  );
}

export default CardContainer;
