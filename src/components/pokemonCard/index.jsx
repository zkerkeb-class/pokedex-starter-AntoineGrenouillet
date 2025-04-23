import { useState } from "react";
import "./index.css";
import axios from "axios";
import { useNavigate } from "react-router";

const typeToImageIndex = {
  normal: 1,
  fighting: 2,
  flying: 3,
  poison: 4,
  ground: 5,
  rock: 6,
  bug: 7,
  gosht: 8,
  steel: 9,
  fire: 10,
  water: 11,
  grass: 12,
  electric: 13,
  psychic: 14,
  ice: 15,
  dragon: 16,
  dark: 17,
  fairy: 18,
};

const PokemonCard = ({ name, image, types, hp, attack, defense, id, setPokemons, pokemon }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const navigate = useNavigate();

  const goToPokemon = (id) => {
    navigate(`/pokemon/${id}`);
  };

  const deletePokemon = (id) => {
    axios
      .delete(`http://localhost:3000/api/pokemons/${id}`)
      .then((response) => {
        setPokemons(response.data.newPokemonsList);
      })
      .catch((error) => {
        console.log('erreur lors de la suppression du pokemon', error);
      });
  };

  const editPokemon = (id) => {
    const newPokemon = {
      ...pokemon,
      name: {
        ...pokemon.name,
        french: editedName,
      },
    };

    axios
      .put(`http://localhost:3000/api/pokemons/${id}`, newPokemon)
      .then((response) => {
        setIsEditing(false);
      })
      .catch((error) => {
        alert('Erreur lors de la modification du pokemon');
        console.log(error);
      });
  };

  return (
    <div className="pokemon-card">
      <div className="pokemon-name-container">
        {isEditing ? (
          <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
        ) : (
          <span className="pokemon-name">{editedName}</span>
        )}
      </div>

      <img className="pokemon-image" src={image} alt={name} />

      <div className="pokemon-types-container">
        {types.map((type) => {
          const typeIndex = typeToImageIndex[type.toLowerCase()];
          if (!typeIndex) return null;
          return (
            <img
              key={type}
              src={`../../src/assets/types/${typeIndex}.png`}
              alt={type}
              className="type-icon"
            />
          );
        })}
      </div>

      <div className="pokemon-stats-container">
        <span>HP: {hp}</span>
        <span>Attack: {attack}</span>
        <span>Defense: {defense}</span>
      </div>

      <button className="delete-btn" onClick={() => deletePokemon(id)}>Supprimer</button>
      <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Annuler' : 'Modifier'}
      </button>
      {isEditing && <button className="save-btn" onClick={() => editPokemon(id)}>Enregistrer</button>}
      <button className="view-btn" onClick={() => goToPokemon(id)}>Voir le pokemon</button>
    </div>
  );
};

export default PokemonCard;
