import { useEffect, useState } from "react";
import axios from "axios";
import "./memory.css";
import HomeButton from "../home";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [gameWon, setGameWon] = useState(false);

  const startGame = () => {
    axios.get("http://localhost:3000/api/pokemons")
      .then((response) => {
        let allPokemons = response.data.pokemons;
        let randomPokemons = shuffleArray(allPokemons).slice(0, 12);
        let duplicated = [...randomPokemons, ...randomPokemons];
        let shuffled = shuffleArray(duplicated.map((p, index) => ({
          ...p,
          uniqueId: index,
        })));
        setCards(shuffled);
        setFlippedCards([]);
        setMatchedCards([]);
        setClicks(0);
        setTimeElapsed(0);
        setGameWon(false);

        const newStartTime = Date.now();
        setStartTime(newStartTime);
      });
  };

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      setTimerId(interval);
      return () => clearInterval(interval);
    }
  }, [startTime]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameWon(true);
      if (timerId) {
        clearInterval(timerId);
      }
    }
  }, [matchedCards, cards, timerId]);

  const handleCardClick = (card) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.find((c) => c.uniqueId === card.uniqueId) ||
      matchedCards.includes(card.uniqueId)
    ) return;

    setClicks((prev) => prev + 1);
    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      if (newFlipped[0].id === newFlipped[1].id) {
        setMatchedCards((prev) => [...prev, newFlipped[0].uniqueId, newFlipped[1].uniqueId]);
        setTimeout(() => setFlippedCards([]), 1000);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <div className="memory-game">
      <HomeButton></HomeButton>
      <h1>Memory Pokémon</h1>

      <div className="game-stats">
        <p>Temps écoulé : {timeElapsed} secondes</p>
        <p>Clics : {clicks}</p>
      </div>

      <div className="memory-grid">
        {cards.map((card) => {
          const isFlipped =
            flippedCards.find((c) => c.uniqueId === card.uniqueId) ||
            matchedCards.includes(card.uniqueId);

          return (
            <div
              key={card.uniqueId}
              className={`memory-card ${isFlipped ? "flipped" : ""}`}
              onClick={() => handleCardClick(card)}
            >
              {isFlipped ? (
                <img src={card.image} alt={card.name.french} />
              ) : (
                <img src="../../src/assets/pokemoncard.jpg" alt="Card back" className="card-back" />
              )}
            </div>
          );
        })}
      </div>

      {gameWon && (
        <div className="modal">
          <div className="modal-content">
            <h2>Félicitations jeune dresseur!</h2>
            <p>Vous avez gagné en {timeElapsed} secondes et {clicks} clics !</p>
            <button onClick={startGame}>Rejouer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
