import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../pokemonCard";
import "./pokemon.css";
import HomeButton from "../home";

const Pokemon = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/pokemons/${id}`)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement du Pokémon :", error);
      });
  }, [id]);

  if (!pokemon) return <p>Chargement...</p>;

  return (
    <div className="pokemon-detail-page">
      <HomeButton></HomeButton>
      <h1>Détail de {pokemon.name.french} </h1>
      <div className="pokemon-card-solo">
        <PokemonCard
            pokemon={pokemon}
            name={pokemon.name.french}
            image={pokemon.image}
            types={pokemon.type}
            hp={pokemon.base.HP}
            attack={pokemon.base.Attack}
            defense={pokemon.base.Defense}
            id={pokemon._id}
        />
      </div>

    </div>
  );
};

export default Pokemon;
