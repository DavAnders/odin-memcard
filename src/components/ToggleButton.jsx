function ToggleButton({ contentType, onToggle }) {
  return (
    <div className="button-container">
      <button onClick={onToggle}>
        Switch to {contentType === "gifs" ? "Stickers" : "GIFs"}
      </button>
    </div>
  );
}

export default ToggleButton;
