import {useContext} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import {ListContext} from '../../context/ListContext'
import './index.css'

const MyTrips = () => {
  const {travelList, setTravelList} = useContext(ListContext)
  const handleCancelButton = id => {
    const newList = travelList.filter(t => id !== t.id)
    setTravelList(newList)
  }
  return (
    <>
      <Navbar />
      <div className="my-trips-page">
        {travelList.length === 0 ? (
          <div className="no-trip-items">
            <img
              src="https://res.cloudinary.com/dyz8l9er0/image/upload/v1758473510/travel-bag_wyjusi.png"
              alt="no upcoming trips"
              className="upcoming-trips"
            />
            <h1 className="home-heading">No upcoming trips.</h1>
            <p className="home-text">
              When you book a trip, you will see your trip details here.
            </p>
            <Link to="/book-a-new-trip">
              <button type="button" className="home-button">
                Book a New Trip
              </button>
            </Link>
          </div>
        ) : (
          <ul className="travel-list">
            {travelList.map(t => (
              <li key={t.id}>
                <div className="travel-list-items">
                  <p className="list-location">{t.endLocation}</p>
                  <div>
                    <p className="list-date">Date</p>
                    <p className="list-date-display">
                      {t.startDate} to
                      {t.endDate}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => handleCancelButton(t.id)}
                  >
                    Cancel
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default MyTrips
