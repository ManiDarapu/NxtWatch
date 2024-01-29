import React from 'react'

const Context = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  savedVideos: [],
  addSavedVideos: () => {},
})

export default Context
