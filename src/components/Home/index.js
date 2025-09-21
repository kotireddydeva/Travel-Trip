import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

const Home = () => (
  <>
    <Navbar />
    <div className="home-conatiner">
      <div className="image-container">
        <img
          src="https://res.cloudinary.com/dyz8l9er0/image/upload/v1758473373/travel-trip_mryqrw.png"
          alt="Book A Trip"
          className="home-image"
        />
      </div>
      <div className="text-container">
        <h1 className="home-heading">Travel. Relax. Memories</h1>
        <p className="home-text">
          With travel trip you can experience new travel and the best tourist
          destinations.
        </p>
        <Link to="/book-a-new-trip">
          <button type="button" className="home-button">
            Book a New Trip
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
