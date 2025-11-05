"""
Script de test local pour RemBG
Ce script permet de tester la suppression de fond sur une image avant l'intégration dans l'API
"""

import time
from pathlib import Path
from rembg import remove
from PIL import Image
import io

def test_remove_background(input_path: str, output_path: str):
    """
    Teste la suppression de fond sur une image

    Args:
        input_path: Chemin vers l'image d'entrée
        output_path: Chemin où sauvegarder l'image sans fond
    """
    try:
        print(f"Traitement de l'image: {input_path}")

        # Mesurer le temps de traitement
        start_time = time.time()

        # Ouvrir l'image
        with open(input_path, 'rb') as input_file:
            input_data = input_file.read()

        # Supprimer le fond
        output_data = remove(input_data)

        # Sauvegarder le résultat
        with open(output_path, 'wb') as output_file:
            output_file.write(output_data)

        processing_time = time.time() - start_time

        print(f"[OK] Image traitee avec succes en {processing_time:.2f} secondes")
        print(f"[OK] Resultat sauvegarde dans: {output_path}")

        # Afficher les informations sur les fichiers
        input_size = Path(input_path).stat().st_size / 1024
        output_size = Path(output_path).stat().st_size / 1024
        print(f"Taille originale: {input_size:.2f} KB")
        print(f"Taille resultat: {output_size:.2f} KB")

        return True

    except Exception as e:
        print(f"[ERREUR] Erreur lors du traitement: {str(e)}")
        return False

if __name__ == "__main__":
    # Exemple d'utilisation
    # Placez une image de test dans le dossier test_images/

    test_input = "test_images/test.jpeg"
    test_output = "output_images/test_no_bg.png"

    if not Path(test_input).exists():
        print(f"[ATTENTION] Aucune image de test trouvee dans {test_input}")
        print("Placez une image dans le dossier test_images/ et nommez-la 'test.jpg'")
    else:
        test_remove_background(test_input, test_output)
