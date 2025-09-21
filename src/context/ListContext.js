import {useState, createContext} from 'react'

export const ListContext = createContext()

export const ListProvider = ({children}) => {
  const [travelList, setTravelList] = useState([])
  return (
    <ListContext.Provider value={{travelList, setTravelList}}>
      {children}
    </ListContext.Provider>
  )
}
