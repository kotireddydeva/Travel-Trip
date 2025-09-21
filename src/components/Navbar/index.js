import {Link, withRouter, useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'
import {CiHome, CiLogout} from 'react-icons/ci'
import {PiSuitcaseRolling} from 'react-icons/pi'
import './index.css'

const Navbar = props => {
  const location = useLocation()

  const getActiveMenu = () => {
    if (location.pathname === '/') {
      return 'Home'
    }

    if (location.pathname === '/my-trips') {
      return 'My Trips'
    }
    return ''
  }

  const activeMenu = getActiveMenu()

  const onLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.push('/login')
  }
  return (
    <>
      <div className="navbar-container">
        <div className="navbar-desktop">
          <h1 className="logo">Travel Trip</h1>
          <nav>
            <ul className="menu">
              <li key="home">
                <Link to="/">
                  <button
                    type="button"
                    className={`link ${activeMenu === 'Home' ? 'active' : ''}`}
                  >
                    Home
                  </button>
                </Link>
              </li>
              <li key="myTrips">
                <Link to="/my-trips">
                  <button
                    type="button"
                    className={`link ${
                      activeMenu === 'My Trips' ? 'active' : ''
                    }`}
                  >
                    My Trips
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
          <button type="button" className="logout-button" onClick={onLogOut}>
            Logout
          </button>
        </div>
      </div>
      <div className="mobile-nav">
        <Link to="/">
          <button
            type="button"
            className={`mobile-link ${activeMenu === 'Home' ? 'active' : ''}`}
          >
            <CiHome />
          </button>
        </Link>
        <Link to="/my-trips">
          <button
            type="button"
            className={`mobile-link ${
              activeMenu === 'My Trips' ? 'active' : ''
            }`}
          >
            <PiSuitcaseRolling />
          </button>
        </Link>
        <button type="button" className="mobile-link" onClick={onLogOut}>
          <CiLogout />
        </button>
      </div>
    </>
  )
}
export default withRouter(Navbar)
