# Pokédex Pokémon + Mini-jeu Memory

Bienvenue dans notre application web Pokémon ! Cette app fullstack vous permet de :
- Parcourir un Pokédex avec stats et visuels
- Gérer l’authentification des utilisateurs (inscription, login)
- Modifier et supprimer des Pokémons (CRUD complet)
- Jouer à un mini-jeu **Memory Pokémon** 🃏



## 📌 À propos

Ce projet a été réalisé dans le cadre du module **Technologie Web**. Il met en pratique :
- La création d’API REST sécurisées
- L’authentification avec JWT
- Le développement d’un front React dynamique
- L'intégration d'un jeu interactif




## 🚀 Technologies utilisées

- **Frontend** : React
- **Backend** : Node.js + Express
- **Base de données** : MongoDB
- **Sécurité** : JWT pour l'authentification, Bcrypt pour le hash des mots de passe


## 📦 Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/ton-utilisateur/nom-du-repo.git
cd nom-du-repo
```

### 2. Installer les dépendances

#### Backend

```bash
cd pokedex-api-AntoineGrenouillet
npm install
```

#### Frontend

```bash
cd pokedex-starter-AntoineGrenouillet
npm install
```

### 3. Configuration de l’environnement

Créer un fichier `.env` dans le dossier `backend` avec les variables suivantes :

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/pokemon-api
JWT_SECRET=secret
```

### 4. Lancer le projet

Dans deux terminaux séparés :

#### Backend

```bash
cd pokedex-api-AntoineGrenouillet
npm run dev
```

#### Frontend

```bash
cd pokedex-starter-AntoineGrenouillet
npm run dev
```

## 💪 API – Documentation rapide

### 🔐 Authentification

- `POST /api/register` – Inscription utilisateur  
  Body : `{ "username": "exemple", "password": "1234" }`

- `POST /api/login` – Connexion utilisateur  
  Body : `{ "username": "exemple", "password": "1234" }`  
  → Retourne un **token JWT**

- `GET /api/me` – Données de l’utilisateur connecté (protégé par token)

### 🧪 Pokémons

Toutes les routes ci-dessous nécessitent une authentification via token (JWT dans l’en-tête `Authorization`).

- `GET /api/pokemons` – Récupère tous les Pokémons
- `GET /api/pokemons/:id` – Récupère un Pokémon spécifique
- `POST /api/pokemons` – Crée un nouveau Pokémon
- `PUT /api/pokemons/:id` – Met à jour un Pokémon
- `DELETE /api/pokemons/:id` – Supprime un Pokémon



## 🎮 Mini-jeu : Memory Pokémon

Retrouvez les paires de Pokémons identiques pour gagner ! Le jeu mesure :
- Le **nombre de clics**
- Le **temps écoulé**
- Et vous félicite quand vous gagnez 🏆

Lance automatiquement une nouvelle partie à chaque chargement de la page.



## 🎥 Démo en vidéo

👉 [Lien vers la démo YouTube](https://youtu.be/ton-lien-video)





