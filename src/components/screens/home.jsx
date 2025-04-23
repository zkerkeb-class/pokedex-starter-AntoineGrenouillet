import "./home.css";
import axios from "axios";
import PokemonCard from "../pokemonCard";
import SearchBar from "../searchBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import HomeButton from "../home";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/pokemons').then((response) => {
      setPokemons(response.data.pokemons);
    }).catch((error) => {
      alert('Erreur lors de la récupération des pokémons');
      console.log(error);
    });
  }, []);

  // Filtrage des pokémons selon la recherche et les types
  const filteredPokemons = pokemons.filter((pokemon) => {
    return (
      pokemon.name.french.toLowerCase().includes(search.toLowerCase()) &&
      selectedTypes.every(type => pokemon.type.includes(type))
    );
  });

  // Calcul pour la pagination
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  const goToMemory = () => {
    navigate(`/memory`);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" }); // scroll vers le haut
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" }); // scroll vers le haut
    }
  };
  
  // Réinitialise la page à 1 si la recherche ou les types changent
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedTypes]);

  return (
    <div className="app-container">
      <HomeButton />
      <h1>Mes Pokémons</h1>
      <button className="view-btn" onClick={goToMemory}>🎮 Pokémon Memory</button>

      <div className="search-bar-container">
        <SearchBar
          search={search}
          setSearch={setSearch}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
      </div>

      <div className="pokemon-list-container">
        {currentPokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card-container">
            <PokemonCard
              pokemon={pokemon}
              setPokemons={setPokemons}
              name={pokemon.name.french}
              image={pokemon.image}
              types={pokemon.type}
              hp={pokemon.base.HP}
              attack={pokemon.base.Attack}
              defense={pokemon.base.Defense}
              id={pokemon._id}
            />
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>
          ◀ Précédent
        </button>
        <span>Page {currentPage} / {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Suivant ▶
        </button>
      </div>
    </div>
  );
}

export default App;
