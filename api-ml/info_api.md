# API ML - Suppression de fond

API FastAPI pour la suppression de fond d'images et de vidéos utilisant RemBG.

## Installation

1. Installer les dépendances:
```bash
pip install -r requirements.txt
```

## Utilisation

### 1. Tester RemBG localement

Placez une image dans le dossier `test_images/` et nommez-la `test.jpg`, puis:

```bash
python test_rembg.py
```

### 2. Lancer l'API FastAPI

```bash
python main.py
```

Ou avec uvicorn:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

L'API sera accessible sur: `http://localhost:8000`

### 3. Tester l'API

#### Avec cURL:

```bash
curl -X POST "http://localhost:8000/remove-background" \
  -H "accept: image/png" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@test_images/test.jpg" \
  --output result.png
```

#### Documentation interactive:

Accédez à la documentation Swagger: `http://localhost:8000/docs`

## Routes disponibles

- `GET /` - Informations sur l'API
- `GET /health` - Vérification de l'état de l'API
- `POST /remove-background` - Suppression de fond d'image
- `POST /remove-video-background` - (À venir) Suppression de fond vidéo

## Structure du projet

```
api-ml/
├── main.py              # API FastAPI
├── test_rembg.py        # Script de test local
├── requirements.txt     # Dépendances Python
├── test_images/         # Images de test
└── output_images/       # Résultats des tests
```

## Prochaines étapes

- Intégration du traitement vidéo (Étape 17)
- Déploiement sur EC2 avec Docker (Étape 10)
- Configuration du traitement asynchrone avec Celery (Étape 18)
