import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {BiHide, BiShow} from 'react-icons/bi'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [pShow, setPShow] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const isLoggedIn = Cookies.get('jwt_token')
  if (isLoggedIn !== undefined) {
    return <Redirect to="/" />
  }

  const loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = props
    history.push('/')
  }

  const submitForm = async e => {
    e.preventDefault()
    try {
      const response = await fetch('https://apis.ccbp.in/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
      })
      const data = await response.json()
      if (response.ok) loginSuccess(data.jwt_token)
      else setErrorMessage(data.error_msg)
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  return (
    <div>
      <form className="login-form" onSubmit={submitForm}>
        <h1 className="form-heading">Travel Trip</h1>
        <div className="input-fields">
          <label htmlFor="username">Username</label>
          <div className="input-section">
            <input
              id="username"
              type="text"
              required
              value={username}
              placeholder="Username"
              className="input"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <label htmlFor="password">Password</label>
          <div className="input-section">
            <input
              id="password"
              type={pShow ? 'text' : 'password'}
              value={password}
              placeholder="Password"
              className="input"
              required
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              data-testid="show-password"
              className="show-hide-button"
              onClick={() => setPShow(prev => !prev)}
            >
              {pShow ? <BiShow /> : <BiHide />}
            </button>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </form>
    </div>
  )
}

export default Login
