import axios from 'axios';

const API_URL = 'http://localhost:3000/api/pokemons'; 

export const getAllPokemons = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.pokemons;
    } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon :", error);
        throw error;
    }
};

export const getPokemonById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération du Pokémon avec l'ID ${id} :`, error);
        throw error;
    }
};

export const createPokemon = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/post`, data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout du Pokémon :", error);
        throw error;
    }
};

export const updatePokemon = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la mise à jour du Pokémon avec l'ID ${id} :`, error);
        throw error;
    }
};

export const deletePokemon = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la suppression du Pokémon avec l'ID ${id} :`, error);
        throw error;
    }
};
