import "./index.css"; // Assure-toi d'importer ton fichier CSS

const types = [
  "Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying",
  "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock",
  "Steel", "Water"
];

const SearchBar = ({ search, setSearch, selectedTypes, setSelectedTypes }) => {
  return (
    <div className="search-container">
      <div className="search-bar-wrapper">
        <div className="form-control">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
          <label>
          {"Rechercher un pokemon".split("").map((char, index) => (
            <span
              key={index}
              style={{ transitionDelay: `${index * 30}ms` }}
              className={char === " " ? "space" : ""}
            >
              {char}
            </span>
          ))}

          </label>
        </div>
        <button className="clear-btn" onClick={() => setSearch("")}>X</button>
      </div>
      <div className="types-container">
        {types.map((type) => (
          <button
            key={type}
            className={selectedTypes.includes(type) ? "selected-type" : ""}
            onClick={() =>
              setSelectedTypes(
                selectedTypes.includes(type)
                  ? selectedTypes.filter((t) => t !== type)
                  : [...selectedTypes, type]
              )
            }
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
