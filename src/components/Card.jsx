import "/src/styles/card.css";

function Card({ imageUrl, title, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={imageUrl} alt={title} />
      <p>{title}</p>
    </div>
  );
}

export default Card;
