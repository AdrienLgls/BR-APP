# Frontend - Application de suppression de fond

Interface React pour interagir avec l'API de suppression de fond d'images.

## Installation

```bash
npm install
```

## Lancer l'application

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## Structure du projet

```
src/
├── components/
│   ├── ImageUploader.jsx    # Composant principal pour uploader et traiter les images
│   └── ImageUploader.css     # Styles du composant
├── pages/
│   ├── Home.jsx              # Page d'accueil
│   └── Home.css              # Styles de la page
├── App.jsx                   # Composant racine
├── App.css                   # Styles globaux
└── main.jsx                  # Point d'entrée
```

## Fonctionnalités

- ✅ Sélection d'image (JPG, PNG, WEBP)
- ✅ Aperçu de l'image sélectionnée
- ✅ Envoi à l'API FastAPI
- ✅ Affichage du résultat avec fond transparent
- ✅ Téléchargement du résultat
- ✅ Indicateur de chargement
- ✅ Gestion des erreurs
- ✅ Affichage du temps de traitement
- ✅ Design responsive

## Utilisation

1. **Lancer l'API backend** :
   ```bash
   cd ../api-ml
   python main.py
   ```

2. **Lancer le frontend** :
   ```bash
   npm run dev
   ```

3. **Ouvrir le navigateur** : `http://localhost:5173`

4. **Utiliser l'application** :
   - Cliquer sur "Sélectionner une image"
   - Choisir une image depuis votre ordinateur
   - Cliquer sur "Retirer le fond"
   - Attendre le traitement
   - Télécharger le résultat

## Technologies utilisées

- **React** : Framework frontend
- **Vite** : Build tool rapide
- **Axios** : Requêtes HTTP vers l'API
- **CSS3** : Styles et animations

## API Endpoint

L'application communique avec l'API backend sur :

```
POST http://localhost:8000/remove-background
```

## Scripts disponibles

```bash
# Développement
npm run dev

# Build pour production
npm run build

# Prévisualiser le build
npm run preview

# Linter
npm run lint
```

## Prochaines étapes

- Ajout de l'authentification (Étape 7)
- Intégration du traitement vidéo (Étape 17)
- Gestion des quotas utilisateurs (Étape 14)
- Système de paiement Stripe (Étape 15)
