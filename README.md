# Application de Suppression de Fond

Application web complète permettant de supprimer automatiquement le fond d'images et de vidéos grâce à l'intelligence artificielle.

## 🎯 Fonctionnalités

- ✅ **Suppression de fond d'images** : Retirez le fond de vos images en quelques secondes
- 🎬 **Traitement vidéo** (à venir) : Support pour les vidéos
- 🚀 **API REST** : Backend FastAPI performant
- 💻 **Interface moderne** : Frontend React avec Vite
- 🤖 **IA intégrée** : Utilise RemBG basé sur U²-Net

## 📋 Prérequis

- **Python 3.12+** pour l'API backend
- **Node.js 18+** pour le frontend React
- **pip** pour les dépendances Python
- **npm** pour les dépendances JavaScript

## 🚀 Installation et lancement

### 1. Cloner le projet

```bash
git clone https://github.com/VOTRE_USERNAME/BR-APP.git
cd BR-APP
```

### 2. Lancer l'API Backend (FastAPI)

```bash
cd api-ml
pip install -r requirements.txt
python main.py
```

L'API sera accessible sur : `http://localhost:8000`

Documentation interactive : `http://localhost:8000/docs`

### 3. Lancer le Frontend (React)

Dans un **nouveau terminal** :

```bash
cd frontend
npm install
npm run dev
```

L'application sera accessible sur : `http://localhost:5173`

## 📁 Structure du projet

```
BR-APP/
├── api-ml/                      # API FastAPI
│   ├── main.py                  # Point d'entrée de l'API
│   ├── test_rembg.py           # Script de test local
│   ├── requirements.txt         # Dépendances Python
│   ├── test_images/            # Images de test
│   └── output_images/          # Résultats des tests
│
├── frontend/                    # Application React
│   ├── src/
│   │   ├── components/         # Composants React
│   │   │   └── ImageUploader.jsx
│   │   ├── pages/              # Pages
│   │   │   └── Home.jsx
│   │   └── App.jsx             # Composant racine
│   ├── package.json
│   └── vite.config.js
│
├── projet.md                    # Documentation du projet
├── .gitignore                   # Fichiers à ignorer
└── README.md                    # Ce fichier
```

## 🛠️ Technologies utilisées

### Backend
- **FastAPI** : Framework web Python moderne et rapide
- **RemBG** : Bibliothèque de suppression de fond basée sur U²-Net
- **Uvicorn** : Serveur ASGI pour FastAPI
- **Pillow** : Manipulation d'images
- **ONNX Runtime** : Exécution du modèle de Deep Learning

### Frontend
- **React** : Bibliothèque JavaScript pour interfaces utilisateur
- **Vite** : Build tool rapide et moderne
- **Axios** : Client HTTP pour les requêtes API
- **CSS3** : Styles et animations

## 📖 Utilisation

1. **Démarrer l'API** backend sur le port 8000
2. **Démarrer le frontend** sur le port 5173
3. **Ouvrir le navigateur** sur `http://localhost:5173`
4. **Sélectionner une image** depuis votre ordinateur
5. **Cliquer sur "Retirer le fond"**
6. **Attendre le traitement** (quelques secondes)
7. **Télécharger le résultat** en PNG avec fond transparent

## 🧪 Tests

### Tester l'API sans interface

```bash
cd api-ml
python test_rembg.py
```

### Tester l'API avec cURL

```bash
curl -X POST "http://localhost:8000/remove-background" \
  -F "file=@test_images/test.jpg" \
  -o result.png
```

## 🎨 Captures d'écran

_À ajouter après déploiement_

## 🗺️ Roadmap

- [x] API FastAPI de suppression de fond d'images
- [x] Interface React pour upload et affichage
- [ ] Système d'authentification (JWT)
- [ ] Traitement vidéo
- [ ] Traitement asynchrone avec Celery
- [ ] Stockage sur AWS S3
- [ ] Gestion des quotas utilisateurs
- [ ] Système de paiement Stripe
- [ ] Déploiement en production

## 📝 Étapes du projet

Ce projet suit un tutoriel complet en 19 étapes :

1. ✅ Identifier les fonctionnalités
2. ✅ Définir l'architecture
3. ✅ Rechercher et choisir un algorithme (RemBG)
4. ✅ Tester et intégrer RemBG dans une API FastAPI
5. ✅ Créer une interface React
6. ✅ Mettre le projet sur Git
7. ⏳ Ajouter un système de compte utilisateur
8. ⏳ Déploiement sur VPS
9. ⏳ Acquisition d'un nom de domaine
10. ⏳ Déployer FastAPI et le modèle sur EC2
11. ⏳ Communication et premiers retours
12. ⏳ Créer une branche de développement
13. ⏳ Créer une Landing Page
14. ⏳ Gérer les quotas d'utilisation
15. ⏳ Intégrer un système de paiement (Stripe)
16. ⏳ Stocker les fichiers sur Amazon S3
17. ⏳ Retirer le fond d'une vidéo
18. ⏳ Traitement asynchrone avec Celery
19. ⏳ Lancer et itérer

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

Votre nom - [GitHub](https://github.com/VOTRE_USERNAME)

## 🙏 Remerciements

- [RemBG](https://github.com/danielgatis/rembg) pour l'algorithme de suppression de fond
- [FastAPI](https://fastapi.tiangolo.com/) pour le framework backend
- [React](https://react.dev/) pour le framework frontend
