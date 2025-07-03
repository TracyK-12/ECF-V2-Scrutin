# 🗳️ ECF V2 – Scrutin (API + Application Ionic React)

Ce projet est une refonte complète d'une application de vote électronique, développé dans le cadre de l’ECF.  
Il est composé de deux parties : une **API Node.js/SQLite** (fournie par l’enseignant) et une **application frontend Ionic React** conçue et développée pour interagir avec cette API.

---

## 📁 Structure du projet

```
VoteAPP-MAIN/
├── Api-v2-stats-main/        # Backend – API Express (fournie, partiellement corrigée)
└── scrutinApp/               # Frontend – Application Ionic React (créée de zéro)
```

---

## ✍️ Travail réalisé

### ✅ Partie API (backend)

L’API nous a été fournie avec une base en SQLite. J’ai effectué les actions suivantes :

- ✔️ **Correction du fichier** `member.js`, dans la fonction :
  ```js
  async function getMembersByScrutin(scrutinId)
  ```
  J’ai corrigé une erreur SQL (`ORDER BY ... scrutinId` sur une colonne inexistante).
- 🚀 Lancement local sur le port `3000` via :
  ```bash
  npm install
  npm start
  ```

---

### ✅ Partie Application (Ionic React)

Création complète du frontend :

#### ⚙️ Configuration

- Création du projet via `ionic start` avec le template React
- Configuration des routes dans `App.tsx` avec `IonTabs` pour la navigation
- Ajout des dépendances utiles (`recharts` pour les graphiques, `react-router`, etc.)

#### 📄 Pages créées

- **Home.tsx**
  - Liste tous les scrutins disponibles
  - Affiche le titre, date de début/fin
  - Boutons : `Voir` pour voter + `Statistiques` pour consulter les résultats

- **Vote.tsx**
  - Liste des membres pour un scrutin donné
  - Affiche : nom, prénom, date de naissance, statut du vote
  - Bouton `Voter` (disparaît après vote, devient "A voté")
  - Ajout d’un bouton (avec icône) pour retourner à l’accueil

- **Stats.tsx**
  - Page dédiée aux statistiques globales
  - Requête sur tous les scrutins et affichage d’un graphique avec **Recharts**
  - Affichage total votants vs membres inscrits

#### 📦 Composants créés

- **Nav.tsx**
  - En-tête réutilisable avec titre dynamique
- **Footer.tsx**
  - Pied de page simple, centré, commun à toutes les pages

---

## 🔗 Connexion API ↔️ App Ionic

L’intégration a été faite via `fetch` sur les routes de l’API locale :

| Page        | Appel API                                      | Action                            |
|-------------|-----------------------------------------------|------------------------------------|
| `Home.tsx`  | `GET /api/v1/scrutins`                         | Récupère tous les scrutins         |
| `Vote.tsx`  | `GET /api/v1/scrutins/:id/members`             | Liste des membres par scrutin      |
| `Vote.tsx`  | `POST /api/v1/scrutins/:id/members/:id/vote`   | Enregistrement du vote             |
| `Stats.tsx` | `GET /api/v1/scrutins/:id/stats`               | Données statistiques               |

---

## 🚀 Lancer le projet

### 1. Backend API

```bash
cd Api-v2-stats-main
npm install
npm start
# => API sur http://localhost:3000
```

### 2. Frontend (Ionic App)

```bash
cd scrutinApp
npm install
npm run dev
# => App sur http://localhost:5173
```

---

## ✨ Bonus / Design

- Utilisation d’un **layout responsive** avec `grid` et `flexbox`
- Composants bien structurés pour une meilleure lisibilité
- Navigation fluide avec `IonTabs` et icônes

---

## 🧑‍💻 Développement

Développé par **Tracy K.**  
Projet validé dans le cadre de l’ECF 2025 – Fullstack Web & Mobile

---
