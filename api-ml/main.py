"""
API FastAPI pour la suppression de fond d'images et de vidéos
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from rembg import remove
from PIL import Image
import io
import time

app = FastAPI(
    title="Background Removal API",
    description="API pour supprimer le fond d'images et de vidéos",
    version="1.0.0"
)

# Configuration CORS pour permettre les requêtes depuis le frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # À restreindre en production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    """Route de base pour vérifier que l'API fonctionne"""
    return {
        "message": "API de suppression de fond opérationnelle",
        "version": "1.0.0",
        "endpoints": {
            "remove_background": "/remove-background",
            "health": "/health"
        }
    }

@app.get("/health")
def health_check():
    """Vérification de l'état de l'API"""
    return {"status": "healthy", "timestamp": time.time()}

@app.post("/remove-background")
async def remove_background(file: UploadFile = File(...)):
    """
    Supprime le fond d'une image

    Args:
        file: Image à traiter (formats supportés: JPG, PNG, WEBP)

    Returns:
        Image sans fond au format PNG
    """

    # Validation du type de fichier
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Le fichier doit être une image (JPG, PNG, WEBP)"
        )

    try:
        # Lire le contenu du fichier
        contents = await file.read()

        # Vérifier que le fichier n'est pas vide
        if not contents:
            raise HTTPException(
                status_code=400,
                detail="Le fichier est vide"
            )

        # Mesurer le temps de traitement
        start_time = time.time()

        # Supprimer le fond
        output_data = remove(contents)

        processing_time = time.time() - start_time

        # Log pour le monitoring
        print(f"Image traitée en {processing_time:.2f}s - Taille: {len(contents)/1024:.2f}KB")

        # Retourner l'image sans fond
        return Response(
            content=output_data,
            media_type="image/png",
            headers={
                "X-Processing-Time": str(processing_time),
                "Content-Disposition": f"attachment; filename=no_bg_{file.filename}"
            }
        )

    except Exception as e:
        print(f"Erreur lors du traitement: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors du traitement de l'image: {str(e)}"
        )

@app.post("/remove-video-background")
async def remove_video_background(file: UploadFile = File(...)):
    """
    Route prévue pour le traitement vidéo (à implémenter ultérieurement)

    Cette route sera développée dans les étapes suivantes avec:
    - Extraction des frames
    - Traitement asynchrone avec Celery
    - Stockage sur S3
    """
    raise HTTPException(
        status_code=501,
        detail="Le traitement vidéo sera disponible dans une prochaine version"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
