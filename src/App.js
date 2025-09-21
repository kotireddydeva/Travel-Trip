import {Route, Switch} from 'react-router-dom'
import './App.css'

import Login from './components/Login'
import Home from './components/Home'
import MyTrips from './components/MyTrips'
import BookANewTrip from './components/BookANewTrip'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import {ListProvider} from './context/ListContext'

// Note: Use the lists in your code to pass the test cases
/*
const stepsList = [
  {stepId: 'YOUR_DETAILS', displayText: 'Your Details'},
  {stepId: 'DATE_SELECTION', displayText: 'Date Selection'},
  {stepId: 'GUESTS', displayText: 'Guests'},
  {stepId: 'TRAVEL_ASSISTANCE', displayText: 'Travel Assistance'},
  {stepId: 'CONFIRMATION', displayText: 'Confirmation'},
]
*/
/* const travelAssistanceList = [
  {value: 'car', displayText: 'Car'},
  {value: 'flight', displayText: 'Flight'},
  {value: 'bus', displayText: 'Bus'},
  {value: 'train', displayText: 'Train'},
]
*/
// Replace your code here
const App = () => (
  <ListProvider>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />

      <ProtectedRoute exact path="/my-trips" component={MyTrips} />
      <ProtectedRoute exact path="/book-a-new-trip" component={BookANewTrip} />
      <Route component={NotFound} />
    </Switch>
  </ListProvider>
)

export default App
