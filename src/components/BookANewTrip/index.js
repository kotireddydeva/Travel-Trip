import {useState, useContext} from 'react'
import {v4 as uuidv4} from 'uuid'
import {CiCirclePlus, CiCircleMinus} from 'react-icons/ci'
import {ListContext} from '../../context/ListContext'

import Navbar from '../Navbar'
import './index.css'

const stepsList = [
  {stepId: 'YOUR_DETAILS', displayText: 'Your Details'},
  {stepId: 'DATE_SELECTION', displayText: 'Date Selection'},
  {stepId: 'GUESTS', displayText: 'Guests'},
  {stepId: 'TRAVEL_ASSISTANCE', displayText: 'Travel Assistance'},
  {stepId: 'CONFIRMATION', displayText: 'Confirmation'},
]

const travelAssistanceList = [
  {value: 'car', displayText: 'Car'},
  {value: 'flight', displayText: 'Flight'},
  {value: 'bus', displayText: 'Bus'},
  {value: 'train', displayText: 'Train'},
]

const BookANewTrip = () => {
  const [currentStep, setCurrentStep] = useState(stepsList[0].stepId)
  const [username, setUsername] = useState('')
  const [nameError, setNameError] = useState()
  const [startLocation, setStartLocation] = useState('')
  const [startLocationError, setStartLocationError] = useState()
  const [endLocation, setEndLocation] = useState('')
  const [endLocationError, setEndLocationError] = useState()
  const [completedSteps, setCompletedSteps] = useState([])
  const [startDateError, setStartDateError] = useState()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endDateError, setEndDateError] = useState()
  const [inavlidEndDate, setInvalidEndDate] = useState()
  const [adultsCount, setAdultsCount] = useState(1)
  const [childrenCount, setChildrenCount] = useState(0)
  const [infantsCount, setInfantsCount] = useState(0)
  const [travelAssistanceStatus, setTravelAssistanceStatus] = useState(false)
  const [travelAssistanceSelected, setTravelAssistanceSelected] = useState(
    travelAssistanceList[0].displayText,
  )
  const [confirmStatus, setConfirmStatus] = useState(false)
  const {setTravelList} = useContext(ListContext)

  const resetAll = () => {
    setUsername('')
    setStartLocation('')
    setEndLocation('')
    setStartDate('')
    setEndDate('')
    setAdultsCount(1)
    setChildrenCount(0)
    setInfantsCount(0)
    setTravelAssistanceStatus(false)
    setTravelAssistanceSelected(travelAssistanceList[0].displayText)
    setCurrentStep(stepsList[0].stepId)
    setCompletedSteps([])
    setConfirmStatus(false)
  }

  const handleUserDetailsNextButton = () => {
    let isAllValid = true
    if (username === '') {
      setNameError('Enter your name')
      isAllValid = false
    }
    if (startLocation === '') {
      setStartLocationError('Enter your start location')
      isAllValid = false
    }
    if (endLocation === '') {
      setEndLocationError('Enter your end location')
      isAllValid = false
    }

    if (!isAllValid) return

    const currentIndex = stepsList.findIndex(
      step => step.stepId === currentStep,
    )

    setCurrentStep(stepsList[currentIndex + 1].stepId)
    setCompletedSteps(prev => [...prev, stepsList[currentIndex].stepId])
  }

  const handleDateSelectionNextButton = () => {
    let isAllValid = true
    if (startDate === '') {
      setStartDateError('Select start date')
      isAllValid = false
    }
    if (endDate === '') {
      setEndDateError('Select end date')
      isAllValid = false
    }

    if (startDate > endDate) {
      setInvalidEndDate('The end date cannot be less than the start date')
      isAllValid = false
    }

    if (!isAllValid) return

    const currentIndex = stepsList.findIndex(
      step => step.stepId === currentStep,
    )

    setCurrentStep(stepsList[currentIndex + 1].stepId)
    setCompletedSteps(prev => [...prev, stepsList[currentIndex].stepId])
  }

  const handleNextButton = async () => {
    const currentIndex = stepsList.findIndex(
      step => step.stepId === currentStep,
    )
    setCurrentStep(stepsList[currentIndex + 1].stepId)
    setCompletedSteps(prev => [...prev, stepsList[currentIndex].stepId])
  }

  const handlePreviousButton = () => {
    const currentIndex = stepsList.findIndex(
      step => step.stepId === currentStep,
    )
    const previousStep = stepsList[currentIndex - 1].stepId

    setCurrentStep(previousStep)
    setCompletedSteps(prev => prev.filter(id => id !== previousStep))
  }

  const handleCancelButton = () => {
    resetAll()
  }

  const handleSubmit = e => e.preventDefault()

  const handleConfirmSubmit = e => {
    e.preventDefault()
    const newTravelTrip = {
      id: uuidv4(),
      startLocation,
      endLocation,
      startDate,
      endDate,
    }
    setTravelList(prev => [...prev, newTravelTrip])
    const currentIndex = stepsList.findIndex(
      step => step.stepId === currentStep,
    )

    setCurrentStep(null)
    setCompletedSteps(prev => [...prev, stepsList[currentIndex].stepId])
    setConfirmStatus(true)
  }

  const handleBookANewTrip = e => {
    e.preventDefault()
    resetAll()
  }

  const handleUserDetails = e => {
    const {name, value} = e.target
    switch (name) {
      case 'your-name':
        setNameError()
        setUsername(value)
        break
      case 'start-location':
        setStartLocationError()
        setStartLocation(value)
        break
      case 'end-location':
        setEndLocationError()
        setEndLocation(value)
        break
      case 'start-date':
        setStartDateError()
        setStartDate(value)
        break
      case 'end-date':
        setEndDateError()
        setInvalidEndDate()
        setEndDate(value)
        break
      default:
        break
    }
  }
  const handleAudultCountMinus = () => {
    if (adultsCount > 1) setAdultsCount(prev => prev - 1)
  }
  const handleAudultCountPlus = () => setAdultsCount(prev => prev + 1)

  const handleChildrenCountMinus = () => {
    if (childrenCount > 0) setChildrenCount(prev => prev - 1)
  }
  const handleChildrenCountPlus = () => setChildrenCount(prev => prev + 1)

  const handleInfantCountMinus = () => {
    if (infantsCount > 0) setInfantsCount(prev => prev - 1)
  }
  const handleInfantCountPlus = () => setInfantsCount(prev => prev + 1)

  const yourDetails = () => (
    <>
      <h1 className="your-details-heading">Your Details</h1>
      <p className="your-details-text">Enter your name and location details</p>
      <form className="user-form" onSubmit={handleSubmit}>
        <label htmlFor="your-name">Name</label>
        <input
          type="text"
          id="your-name"
          name="your-name"
          placeholder="Enter name"
          className={`user-input-field ${
            nameError !== undefined ? 'error-field' : ''
          }`}
          value={username}
          onChange={handleUserDetails}
        />
        {nameError && <p className="error-text">{nameError}</p>}
        <label htmlFor="start-location">Start Location</label>
        <input
          type="text"
          id="start-location"
          name="start-location"
          placeholder="Enter start location"
          className={`user-input-field ${
            startLocationError !== undefined ? 'error-field' : ''
          }`}
          value={startLocation}
          onChange={handleUserDetails}
        />
        {startLocationError && (
          <p className="error-text">{startLocationError}</p>
        )}
        <label htmlFor="end-location">End Location</label>
        <input
          type="text"
          id="end-location"
          name="end-location"
          placeholder="Enter end location"
          className={`user-input-field ${
            endLocationError !== undefined ? 'error-field' : ''
          }`}
          value={endLocation}
          onChange={handleUserDetails}
        />
        {endLocationError && <p className="error-text">{endLocationError}</p>}
        <button
          type="button"
          className="next-button"
          onClick={handleUserDetailsNextButton}
        >
          Next
        </button>
      </form>
    </>
  )

  const dateSelection = () => (
    <>
      <h1 className="your-details-heading">Date Selection</h1>
      <p className="your-details-text">Select your Start and End Date.</p>
      <form className="user-form" onSubmit={handleSubmit}>
        <label htmlFor="start-date">Start Date</label>
        <input
          type="date"
          id="start-date"
          name="start-date"
          className="user-input-field"
          value={startDate}
          onChange={handleUserDetails}
        />
        {startDateError && <p className="error-text">{startDateError}</p>}
        <label htmlFor="end-date">End Date</label>
        <input
          type="date"
          id="end-date"
          name="end-date"
          className="user-input-field"
          value={endDate}
          onChange={handleUserDetails}
        />
        {endDateError && <p className="error-text">{endDateError}</p>}
        {inavlidEndDate && <p className="error-text">{inavlidEndDate}</p>}
        <div className="buttons-container">
          <button
            type="button"
            className="previous-button"
            onClick={handlePreviousButton}
          >
            Previous
          </button>
          <button
            type="button"
            className="next-button"
            onClick={handleDateSelectionNextButton}
          >
            Next
          </button>
        </div>
      </form>
    </>
  )

  const guestsDetails = () => (
    <>
      <h1 className="your-details-heading">Guests</h1>
      <p className="your-details-text">Select your Guests</p>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="guests-fields">
          <div>
            <p className="guest-heading">Audults</p>
            <p className="guest-text">Age 13 or above</p>
          </div>
          <div className="inc-dec-count">
            <button
              type="button"
              className="inc-dec-button"
              onClick={handleAudultCountMinus}
            >
              <CiCircleMinus />
            </button>
            {adultsCount}
            <button
              type="button"
              className="inc-dec-button"
              onClick={handleAudultCountPlus}
            >
              <CiCirclePlus />
            </button>
          </div>
        </div>
        <hr />
        <div className="guests-fields">
          <div>
            <p className="guest-heading">Children</p>
            <p className="guest-text">Age 2-12</p>
          </div>
          <div className="inc-dec-count">
            <button
              type="button"
              className="inc-dec-button"
              onClick={handleChildrenCountMinus}
            >
              <CiCircleMinus />
            </button>
            {childrenCount}
            <button
              type="button"
              className="inc-dec-button"
              onClick={handleChildrenCountPlus}
            >
              <CiCirclePlus />
            </button>
          </div>
        </div>
        <hr />
        <div className="guests-fields">
          <div>
            <p className="guest-heading">Infants</p>
            <p className="guest-text">Under 2</p>
          </div>
          <div className="inc-dec-count">
            <button
              type="button"
              className="inc-dec-button"
              onClick={handleInfantCountMinus}
            >
              <CiCircleMinus />
            </button>
            {infantsCount}
            <button
              type="button"
              className="inc-dec-button"
              onClick={handleInfantCountPlus}
            >
              <CiCirclePlus />
            </button>
          </div>
        </div>
        <div className="buttons-container">
          <button
            type="button"
            className="previous-button"
            onClick={handlePreviousButton}
          >
            Previous
          </button>
          <button
            type="button"
            className="next-button"
            onClick={handleNextButton}
          >
            Next
          </button>
        </div>
      </form>
    </>
  )

  const travelAssistance = () => (
    <>
      <h1 className="your-details-heading">Travel Assistance</h1>
      <p className="your-details-text">Select your Travel Assistance.</p>
      <form className="user-form" onSubmit={handleSubmit}>
        <div>
          <input
            type="checkbox"
            id="travel-assistance"
            onChange={() => setTravelAssistanceStatus(prev => !prev)}
          />
          <label htmlFor="travel-assistance">Travel Assistance</label>
        </div>
        {travelAssistanceStatus && (
          <div>
            <select
              value={travelAssistanceSelected}
              onChange={e => setTravelAssistanceSelected(e.target.value)}
            >
              {travelAssistanceList.map(t => (
                <option key={t.value} value={t.displayText}>
                  {t.displayText}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="buttons-container">
          <button
            type="button"
            className="previous-button"
            onClick={handlePreviousButton}
          >
            Previous
          </button>
          <button
            type="button"
            className="next-button"
            onClick={handleNextButton}
          >
            Next
          </button>
        </div>
      </form>
    </>
  )

  const confirmation = () => (
    <>
      <h1 className="your-details-heading">Confirmation</h1>
      <p className="your-details-text">Confirm your details</p>
      <form className="user-form" onSubmit={handleConfirmSubmit}>
        <div>
          <p>Name: {username}</p>
          <p>Start Locatio : {startLocation}</p>
          <p>End Location: {endLocation}</p>
          <p>Start Date: {startDate}</p>
          <p>End Date: {endDate}</p>
          <p>Guests: {adultsCount + childrenCount + infantsCount}</p>
          <p>Travel Assistance: {travelAssistanceSelected}</p>
        </div>

        <div className="buttons-container">
          <button
            type="button"
            className="previous-button"
            onClick={handleCancelButton}
          >
            Cancel
          </button>
          <button type="submit" className="next-button">
            Confirm
          </button>
        </div>
      </form>
    </>
  )

  const onConfirm = () => (
    <form className="user-form" onSubmit={handleBookANewTrip}>
      <div className="completed-display">
        <img
          src="https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png"
          alt="success"
          className="completed-image"
        />
        <h1>Awesome!</h1>
        <p>Your booking has been confirmed.</p>
        <button type="submit" className="next-button">
          Book a New Trip
        </button>
      </div>
    </form>
  )

  const displaySteps = () => {
    switch (currentStep) {
      case stepsList[0].stepId:
        return yourDetails()
      case stepsList[1].stepId:
        return dateSelection()
      case stepsList[2].stepId:
        return guestsDetails()
      case stepsList[3].stepId:
        return travelAssistance()
      case stepsList[4].stepId:
        return confirmation()
      default:
        return null
    }
  }

  return (
    <>
      <Navbar />
      <div className="progress-container">
        {stepsList.map(s => {
          const isActive = s.stepId === currentStep
          return (
            <hr
              key={s.stepId}
              className={`progress-step ${isActive ? 'active' : ''}
              }`}
            />
          )
        })}
      </div>
      <div className="book-trip-container">
        <div className="items-container">
          <div className="left-side">
            <ul className="steps-list">
              {stepsList.map((s, i) => {
                const stepIndexClass =
                  s.stepId === currentStep
                    ? 'steps-index-circle current'
                    : 'steps-index-circle'
                const stepTextClass =
                  s.stepId === currentStep
                    ? 'steps-display-text current'
                    : 'steps-display-text'
                const isCompleted = completedSteps.includes(s.stepId)
                return (
                  <li key={s.stepId} className="steps-list-item">
                    {isCompleted ? (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png"
                        alt="completed"
                        className="completed-image"
                      />
                    ) : (
                      <p className={stepIndexClass}>{i + 1}</p>
                    )}
                    <p className={stepTextClass}>{s.displayText}</p>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="steps-content">
            {displaySteps()}
            {confirmStatus && onConfirm()}
          </div>
        </div>
      </div>
    </>
  )
}

export default BookANewTrip
