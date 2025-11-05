import { useState } from 'react';
import axios from 'axios';
import './ImageUploader.css';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processingTime, setProcessingTime] = useState(null);

  // Gérer la sélection d'image
  const handleImageSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Vérifier que c'est bien une image
      if (!file.type.startsWith('image/')) {
        setError('Veuillez sélectionner une image valide (JPG, PNG, WEBP)');
        return;
      }

      setSelectedImage(file);
      setError(null);
      setResultImage(null);

      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Envoyer l'image à l'API
  const handleUpload = async () => {
    if (!selectedImage) {
      setError('Veuillez sélectionner une image');
      return;
    }

    setLoading(true);
    setError(null);
    setResultImage(null);

    try {
      // Créer un FormData pour envoyer le fichier
      const formData = new FormData();
      formData.append('file', selectedImage);

      // Envoyer la requête POST à l'API
      const response = await axios.post(
        'http://localhost:8000/remove-background',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob', // Important pour recevoir l'image
        }
      );

      // Récupérer le temps de traitement depuis les headers
      const time = response.headers['x-processing-time'];
      if (time) {
        setProcessingTime(parseFloat(time).toFixed(2));
      }

      // Créer une URL pour afficher l'image résultante
      const imageBlob = new Blob([response.data], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(imageBlob);
      setResultImage(imageUrl);

    } catch (err) {
      console.error('Erreur:', err);
      if (err.response) {
        setError(`Erreur ${err.response.status}: ${err.response.data.detail || 'Erreur du serveur'}`);
      } else if (err.request) {
        setError('Impossible de contacter l\'API. Vérifiez qu\'elle est lancée sur http://localhost:8000');
      } else {
        setError('Une erreur est survenue lors de l\'envoi de l\'image');
      }
    } finally {
      setLoading(false);
    }
  };

  // Télécharger l'image résultante
  const handleDownload = () => {
    if (!resultImage) return;

    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `no_bg_${selectedImage.name.split('.')[0]}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Réinitialiser
  const handleReset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setResultImage(null);
    setError(null);
    setProcessingTime(null);
  };

  return (
    <div className="image-uploader">
      <h1>Suppression de fond d'image</h1>
      <p className="subtitle">Uploadez une image pour retirer automatiquement son fond</p>

      {/* Zone de sélection */}
      <div className="upload-section">
        <label htmlFor="file-input" className="file-input-label">
          {previewUrl ? 'Changer d\'image' : 'Sélectionner une image'}
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="file-input"
        />
      </div>

      {/* Aperçu de l'image sélectionnée */}
      {previewUrl && (
        <div className="preview-section">
          <h3>Image originale</h3>
          <img src={previewUrl} alt="Aperçu" className="preview-image" />
          <button
            onClick={handleUpload}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Traitement en cours...' : 'Retirer le fond'}
          </button>
        </div>
      )}

      {/* Indicateur de chargement */}
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Traitement de l'image en cours...</p>
        </div>
      )}

      {/* Erreur */}
      {error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
        </div>
      )}

      {/* Résultat */}
      {resultImage && (
        <div className="result-section">
          <h3>Résultat</h3>
          {processingTime && (
            <p className="processing-time">
              Temps de traitement: {processingTime}s
            </p>
          )}
          <img src={resultImage} alt="Résultat" className="result-image" />
          <div className="result-actions">
            <button onClick={handleDownload} className="btn btn-success">
              Télécharger l'image
            </button>
            <button onClick={handleReset} className="btn btn-secondary">
              Nouvelle image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
