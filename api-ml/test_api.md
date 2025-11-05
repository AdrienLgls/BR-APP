# Guide de test de l'API

## Prérequis

1. Installer les dépendances:
```bash
pip install -r requirements.txt
```

2. Placer une image de test dans `test_images/test.jpg`

## 1. Test local de RemBG (sans API)

```bash
python test_rembg.py
```

Résultat attendu: Une image sans fond dans `output_images/test_no_bg.png`

## 2. Lancer l'API

```bash
python main.py
```

Ou:
```bash
uvicorn main:app --reload
```

L'API démarre sur `http://localhost:8000`

## 3. Tester l'API

### Option A: Documentation interactive Swagger

1. Ouvrez votre navigateur sur: `http://localhost:8000/docs`
2. Cliquez sur `POST /remove-background`
3. Cliquez sur "Try it out"
4. Uploadez une image
5. Cliquez sur "Execute"
6. Téléchargez le résultat

### Option B: cURL (ligne de commande)

```bash
curl -X POST "http://localhost:8000/remove-background" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@test_images/test.jpg" \
  --output result.png
```

### Option C: Postman

1. Créer une nouvelle requête POST
2. URL: `http://localhost:8000/remove-background`
3. Dans "Body", sélectionner "form-data"
4. Ajouter une clé `file` de type "File"
5. Sélectionner votre image
6. Envoyer la requête
7. Sauvegarder la réponse comme fichier PNG

### Option D: Python (script de test)

Créez un fichier `test_api_client.py`:

```python
import requests

url = "http://localhost:8000/remove-background"

with open("test_images/test.jpg", "rb") as f:
    files = {"file": f}
    response = requests.post(url, files=files)

if response.status_code == 200:
    with open("result.png", "wb") as out:
        out.write(response.content)
    print("✓ Image traitée avec succès!")
else:
    print(f"✗ Erreur: {response.status_code}")
    print(response.json())
```

Puis:
```bash
pip install requests
python test_api_client.py
```

## Vérification des résultats

- Vérifiez que le fond a bien été supprimé
- Le fichier résultat doit être au format PNG avec transparence
- Vérifiez les logs de l'API pour voir le temps de traitement

## Problèmes courants

### L'API ne démarre pas
- Vérifiez que les dépendances sont installées
- Vérifiez qu'aucun autre service n'utilise le port 8000

### Erreur 400
- Vérifiez que vous envoyez bien une image (JPG, PNG, WEBP)
- Vérifiez que le fichier n'est pas vide

### Erreur 500
- Vérifiez les logs de l'API
- Vérifiez que RemBG est correctement installé
