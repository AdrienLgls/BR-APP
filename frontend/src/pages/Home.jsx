import ImageUploader from '../components/ImageUploader';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <ImageUploader />

      <footer className="footer">
        <p>Powered by RemBG & FastAPI</p>
      </footer>
    </div>
  );
};

export default Home;
