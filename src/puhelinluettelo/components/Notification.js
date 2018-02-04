import React from 'react'

const Notification = ({ message, divname }) => {
  if (message === null) {
    return null
  }
  
  return (
    <div className="updateItem">
      {message}
    </div>
  )

}

export default Notification