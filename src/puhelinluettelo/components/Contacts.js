import React from 'react'

const Contacts = ({filterResults}) => {
    return (
        <table>
            <tbody>
            {filterResults.map((person => <Contact key={person.name} name={person.name} number={person.number} />))}
            </tbody>
        </table>
    )
}

const Contact = ({name, number}) => {
    return <tr><td>{name}</td><td>{number}</td></tr>
}

export default Contacts