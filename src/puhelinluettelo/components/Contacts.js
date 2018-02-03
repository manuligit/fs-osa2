import React from 'react'

const Contacts = ({filterResults, deleteContact}) => {
  return (
    <table>
      <tbody>
        {filterResults.map((person =><Contact key={person.name} name={person.name} number={person.number} id={person.id} deleteContact={deleteContact}/>))}
      </tbody>
    </table>
  )
}

const Contact = ({name, number, deleteContact, id}) => {
  return <tr><td>{name}</td><td>{number}</td><td><button value={id} onClick={deleteContact}>Delete contact</button></td><td>{id}</td></tr>
}

export default Contacts